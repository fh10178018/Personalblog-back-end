import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from '../src/components/common'
import hljs from 'highlight.js'
import resizeListen from './directives/resizeListen'
import positionListen from './directives/positionListen'
import clickoutside from './directives/clickoutside'
import Loading from '@/components/common/Loading/directive'
// new Vue({
//   el:"#app",
//   router:router,
//   render:h=>h(App)
// })

const createElm = function () {
  const elm = document.createElement('div')
  elm.id = 'app'
  document.body.appendChild(elm)
  return elm
}

const app = createApp(App)

export const vue = app
  .use(store)
  .use(hljs)
  .use(common)
  .use(Loading)
  .use(router)
  .directive('resize', resizeListen)
  .directive('position', positionListen)
  .directive('clickoutside', clickoutside)
  .directive('highlight', (el) => {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  })
  .mount(createElm())

  app.config.errorHandler = function(err, vm, info) {
    console.error(`组件${vm.$el}发生错误：${err.message},${info}`)
  }