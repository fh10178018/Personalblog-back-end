import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// new Vue({
//   el:"#app",
//   router:router,
//   render:h=>h(App)
// })
export const vue = createApp(App).use(store).use(router).mount('#app')
