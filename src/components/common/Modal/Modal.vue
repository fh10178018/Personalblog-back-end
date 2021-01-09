<!--Modal组件
@click.self的使用,不包括子元素
初始化属性modalStatus（值为fade或show），来初始化modal的初始出现状态
可以通过父访问子的方式，进行handleModalShow
-->
<template>
  <transition name="modal-fade"
              @after-enter="afterEnter"
              @after-leave="afterLeave"
              appear>
    <div class="modal-wrap"
         @click.self="handleWrapFade"
         @keydown.esc.stop.prevent="visible = false"
         :class="{'mask': mask}"
         v-show="visible">
      <div class="modal circle"
           :class="showModalClass"
           :style="modalStyle">
        <button class="close-btn"
                v-if="showClose"
                @click="handleModalFade"><i class="fa fa-close"></i></button>
        <div class="modal-header"
             v-if="slots.header">
          <slot name="header"></slot>
        </div>
        <div class="modal-content"
             v-loading="isLoading"
             v-if="slots.content">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer"
             v-if="slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  toRefs,
  ref,
  unref,
  computed,
  onMounted
} from 'vue'

const useModal = (
  top,
  width,
  circle,
  size,
  loading
) => {
  const visible = ref(false)
  const showModalClass = computed(() => {
    return [
      unref(circle) ? 'circle' : '',
      unref(size)
    ]
  })
  const modalStyle = computed(() => {
    const style = {}
    style.marginTop = top.value
    if (width && width.value) {
      style.width = width.value
    }
    return style
  })

  const isLoading = computed(() => unref(loading))

  return {
    visible,
    modalStyle,
    showModalClass,
    isLoading
  }
}

const useInteractive = (
  visible,
  emit,
  closeOnClickMask
) => {
  const handleWrapFade = () => {
    if (!unref(closeOnClickMask)) return
    handleModalFade()
  }
  const handleModalFade = () => {
    emit('close')
    visible.value = false
  }

  const afterEnter = () => {
    emit('opened')
  }
  const afterLeave = () => {
    emit('closed')
  }

  const handleModalShow = () => {
    emit('open')
    visible.value = true
  }

  return {
    afterEnter,
    afterLeave,
    handleModalFade,
    handleModalShow,
    visible,
    handleWrapFade
  }
}

export default {
  name: 'Modal',
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'lg'
    },
    mask: { // 决定是否显示遮罩层
      type: Boolean,
      default: true
    },
    top: {
      type: String,
      default: '15vh'
    },
    circle: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    closeOnClickMask: {
      type: Boolean,
      default: true
    },
    width: String
  },
  emits: ['close', 'opened', 'open', 'closed'],
  setup (props, { slots, emit }) {
    const { showModal, top, width, circle, size, loading, closeOnClickMask } = toRefs(props)

    const {
      visible,
      modalStyle,
      showModalClass,
      isLoading
    } = useModal(
      top,
      width,
      circle,
      size,
      loading
    )

    const {
      afterEnter,
      afterLeave,
      handleModalFade,
      handleModalShow,
      handleWrapFade
    } = useInteractive(
      visible,
      emit,
      closeOnClickMask
    )

    onMounted(() => {
      visible.value = unref(showModal)
    })

    return {
      modalStyle,
      slots,
      handleModalFade,
      handleModalShow,
      handleWrapFade,
      ...toRefs(props),
      afterEnter,
      afterLeave,
      visible,
      showModalClass,
      isLoading
    }
  }
}
</script>

<style lang="less">
.modal-wrap {
  z-index: 2000;
  position: fixed;
  overflow: auto;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: 500ms;
  background-color: rgba(229, 229, 229, 0.6);
  .circle {
    border-radius: 10px;
  }
  .modal {
    background: var(--main-color);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    position: relative;
    margin: 0 auto 50px;
    z-index: 2001;
    overflow: hidden;
    transition: 500ms;
    .close-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 36px;
      height: 36px;
      background-color: transparent;
      border: 0;
      font-size: 25px;
      cursor: pointer;
      transition: 500ms;
      color: var(--main-font-color);
    }
    .close-btn:hover {
      color: #d2b356;
    }
    .close-btn:focus {
      outline: 0;
    }
    .modal-header {
      padding: 10px 20px;
      font-size: 18px;
      color: var(--main-font-color);
    }
    .modal-content {
      padding: 10px 20px;
    }
    .modal-footer {
      padding: 10px;
      color: var(--main-font-color);
    }
  }
}
.modal.lg {
  width: 80%;
}
.modal.xs {
  width: 50%;
}
.modal.sm {
  width: 40%;
}
@media screen and (max-width: 830px) {
  .modal {
    width: 100% !important;
    top: auto;
    border-radius: 20px 20px 0 0;
  }
}
.modal-fade-enter-active {
  .modal {
    opacity: 0;
    transform: scale(0.5);
  }
}
.modal-fade-leave-active {
  .modal {
    opacity: 0;
    transform: scale(0.5);
  }
}
</style>
