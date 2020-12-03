import Loading from './Loading.vue'
// import { nextTick } from 'vue'
import { createComponent } from '@/utils/createComponent'
import { nextTick } from 'vue'

const toggleLoading = (el, binding) => {
  if (binding.value) {
    nextTick(() => {
      let parentEl = document.body
      if (!binding.modifiers.fullscreen) { // 判断是否是全局加载
        parentEl = el
      }
      el.className += ' loader-wrap'
      el.instance.show()
      parentEl.appendChild(el.mask)
    })
  } else {
    setTimeout(() => {
      el.instance.$el && el.removeChild(el.instance.$el)
      el.className = el.className.replace(' loader-wrap', '')
    }, 50)
  }
}

const loadingDirective = {
  mounted (el, binding) {
    const component = createComponent(
      Loading
    )
    el.instance = component.ctx
    el.mask = component.ctx.$el
    binding.value && toggleLoading(el, binding)
  },
  updated (el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  }
}
export default {
  install (app) {
    // if (Vue.prototype.$isServer) return
    app.directive('loading', loadingDirective)
  }
}
