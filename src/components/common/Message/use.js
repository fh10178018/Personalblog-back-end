import {
  unref,
  computed,
  ref
} from 'vue'
import Format from '@/config/data_format'

const typeMap = { // message 信息类型
  success: 'fa-check-square-o',
  info: 'fa-info-circle',
  warning: 'fa-warning',
  error: 'fa-window-close'
}

export const useMessage = (
  center,
  type
) => {
  const closed = ref(false)
  const timer = ref(null)

  const msgClass = computed(() => {
    return [
      unref(center) ? 'is-center' : '',
      unref(type) ? 'message-' + unref(type) : ''
    ]
  })

  const iconClass = computed(() => {
    return typeMap[unref(type)]
  })

  const nowDate = computed(() => {
    const date = new Date()
    return Format('yyyy-MM-dd hh:mm:ss', date)
  })

  return {
    closed,
    timer,
    msgClass,
    iconClass,
    nowDate
  }
}

export const useInteractive = (
  duration,
  onClose,
  timer,
  closed
) => {
  const close = () => {
    closed.value = true
    if (typeof onClose === 'function') {
      onClose(this)
    }
  }

  const clearTimer = () => { // 清除延迟
    clearTimeout(unref(timer))
  }

  const startTimer = () => { // 延迟关闭
    if (unref(duration) > 0) {
      timer.value = setTimeout(() => {
        if (!unref(closed)) {
          close()
        }
      }, unref(duration))
    }
  }

  const handleAfterLeave = (currentElement) => { // 动画结束，删除该实例缓存
    currentElement.parentNode && currentElement.parentNode.removeChild(currentElement)
  }

  const keydown = (e) => { // 当keydown为esc时，关闭
    if (e.keyCode === 27) {
      // esc关闭消息
      close()
      if (!unref(closed)) {
        onClose(this)
      }
    }
  }

  return {
    close,
    clearTimer,
    startTimer,
    keydown,
    handleAfterLeave
  }
}
