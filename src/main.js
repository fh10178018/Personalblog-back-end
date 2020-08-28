import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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
export const vue = createApp(App).use(store).use(router).mount(createElm())

console.log(vue.$el)
