<!--Modal组件
@click.self的使用,不包括子元素
初始化属性modalStatus（值为fade或show），来初始化modal的初始出现状态
可以通过父访问子的方式，进行handleModalShow
-->
<template>
  <transition
    name="modal-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
    appear>
    <div class="modal-wrap"
         @click.self="handleModalFade"
         :class="{'mask': mask}"
         v-show="visable">
      <div class="modal"
           :class="size"
           :style="modalStyle"
      >
        <button class="close-btn"  @click="handleModalFade"><i class="fa fa-close"></i></button>
        <div class="modal-header" v-if="slots.header">
          <slot name="header"></slot>
        </div>
        <div class="modal-content" v-if="slots.content">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer"  v-if="slots.footer">
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
  width
) => {
  const visable = ref(false)

  const modalStyle = computed(() => {
    const style = {}
    style.marginTop = top.value
    if (width && width.value) {
      style.width = width.value
    }
    return style
  })

  return {
    visable,
    modalStyle
  }
}

const useInteractive = (
  visable,
  emit
) => {
  const handleModalFade = () => {
    emit('close')
    visable.value = false
  }

  const afterEnter = () => {
    emit('opened')
  }
  const afterLeave = () => {
    emit('closed')
  }

  const handleModalShow = () => {
    emit('open')
    visable.value = true
  }

  return {
    afterEnter,
    afterLeave,
    handleModalFade,
    handleModalShow,
    visable
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
    width: String
  },
  emits: ['close', 'opened', 'open', 'closed'],
  setup (props, { slots, emit }) {
    const { showModal, top, width } = toRefs(props)

    const {
      visable,
      modalStyle
    } = useModal(
      top,
      width
    )

    const {
      afterEnter,
      afterLeave,
      handleModalFade,
      handleModalShow
    } = useInteractive(
      visable,
      emit
    )

    onMounted(() => {
      visable.value = unref(showModal)
    })

    return {
      modalStyle,
      slots,
      handleModalFade,
      handleModalShow,
      ...toRefs(props),
      afterEnter,
      afterLeave,
      visable
    }
  }
}
</script>

<style lang="less">
  .modal-wrap{
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
    .modal{
      background: var(--main-color);
      box-shadow: 0 2px 5px rgba(0,0,0,.3);
      position: relative;
      margin: 0 auto 50px;
      z-index: 2001;
      .close-btn{
        position: absolute;
        top: 0;
        right: 0;
        width: 36px;
        height: 36px;
        background-color: transparent;
        border: 0;
        font-size: 25px;
        cursor: pointer;
      }
      .close-btn:hover{
        color: #d2b356;
      }
      .close-btn:focus{
        outline: 0;
      }
      .modal-header{
        padding: 10px;
        font-size: 18px;
      }
      .modal-content{
        padding: 10px;
      }
      .modal-footer{
        padding: 10px;
      }
    }
  }
  .modal.lg{
    width: 80%;
  }
  .modal.xs{
    width: 50%;
  }
  .modal.sm{
    width: 40%;
  }
  @media screen and (max-width: 830px){
    .modal{
      width: 100% !important;
      top: auto;
      border-radius: 20px 20px 0 0;
    }
  }
  .modal-fade-enter-active {
    opacity: 0;
    .modal{
      opacity: 0;
      transform: translateY(100%);
    }
  }
  .modal-fade-leave-active {
    opacity: 0;
    .modal{
      opacity: 0;
      transform: translateY(-100%);
    }
  }
</style>
