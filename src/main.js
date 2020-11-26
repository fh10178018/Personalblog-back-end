import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from '../src/components/common'
import hljs from 'highlight.js'
import resizeListen from './directives/resizeListen'
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

export const vue = createApp(App)
  .use(store)
  .use(hljs)
  .use(common)
  .use(router)
  .directive('resize', resizeListen)
  .directive('highlight', (el) => {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  })
  .mount(createElm())
