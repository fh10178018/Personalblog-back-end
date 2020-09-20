import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import common from '../src/components/common'
import store from './store'
import hljs from 'highlight.js'
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
  .directive('highlight', (el) => {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  })
  .mount(createElm())
