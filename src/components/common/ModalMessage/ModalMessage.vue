<template>
  <transition name="modal-fade"
              @after-leave="afterLeave"
              appear>
    <div class="modal-msg-wrap"
         v-show="visible">
      <div class="modal-msg circle">
        <div class="modal-msg-head">
          <h5>
            <i class="fa"
               :class="iconClass" />
            {{showTitle}}
          </h5>
        </div>
        <div class="modal-msg-content">
          <h5>{{content}}</h5>
        </div>
        <div class="modal-msg-action">
          <Button v-if="showClose"
                  @click="handleCancel">
            <span>{{concelButtonText}}</span>
          </Button>
          <Button :loading="isLoading"
                  :type="confirmBtnType"
                  @click="submitForm">
            <span>{{confirmButtonText}}</span>
          </Button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Button from '@/components/common/Button/Button.vue'
import { ref, unref, toRefs, computed } from 'vue'
export default {
  components: { Button },
  name: 'ModalMessage',
  props: {
    content: String,
    showClose: { type: Boolean, default: true },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    concelButtonText: {
      type: String,
      default: '取消'
    },
    type: {
      type: String,
      default: 'info',
      validator (val) {
        return ['success', 'warning', 'info'].indexOf(val) > -1
      }
    },
    callback: {
      type: Function,
      default: () => { }
    },
    onClose: {
      type: Function,
      default: () => { }
    },
    loading: { type: Boolean, default: false }
  },
  setup (props) {
    const res = ref(false)
    const visible = ref(true)
    const { callback, type, onClose, loading } = toRefs(props)

    const isLoading = computed(() => unref(loading))
    const typeMap = { // message 信息类型
      success: ['fa-check-square-o', 'success', '成功'],
      info: ['fa-info-circle', 'theme', '提示'],
      warning: ['fa-warning', 'error', '警告']
    }

    const showTitle = computed(() => typeMap[unref(type)][2])

    const iconClass = computed(() => typeMap[unref(type)][0])

    const confirmBtnType = computed(() => typeMap[unref(type)][1])

    const handleModalShow = () => {
      visible.value = true
    }

    const submitForm = () => {
      unref(callback)()
      handleCancel()
    }
    const handleCancel = () => {
      visible.value = false
    }
    const close = () => {
      visible.value = false
      if (typeof unref(onClose) === 'function') {
        unref(onClose)(this)
      }
    }

    const afterLeave = currentElement => {
      currentElement.parentNode && currentElement.parentNode.removeChild(currentElement)
    }

    return {
      ...toRefs(props),
      afterLeave,
      close,
      visible,
      handleModalShow,
      submitForm,
      res,
      handleCancel,
      iconClass,
      confirmBtnType,
      showTitle,
      isLoading
    }
  }
}
</script>
<style lang="less">
.modal-msg-wrap {
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
  .modal-msg {
    background: var(--main-color);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    transition: 500ms;
    width: 420px;
    top: 35vh;
  }
  .fa {
    font-size: larger;
    color: var(--theme-color);
  }
  .fa-warning {
    color: var(--error-color);
  }
}
.modal-msg-head {
  padding: 10px;
  color: var(--main-font-color);
}
.modal-msg-content {
  padding: 0 10px;
  color: var(--main-font-color);
}
.modal-msg-action {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  .btn {
    margin-left: 10px;
  }
}
</style>
