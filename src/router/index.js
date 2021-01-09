import { createRouter, createWebHistory } from 'vue-router'
import { toRefs } from 'vue'
import routes from './routes'
import store from '../store'

// vue-router默认是hash模式，在hash模式下，是会有#号在URL上的
const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHistory(),
  routes
})

// 前置钩子(hook)
router.beforeEach((to, from, next) => {
  // if (to.params.sortname) {
  //   document.title = to.matched[0].meta.title + '-' + to.params.sortname
  // } else {
  //   document.title = to.matched[0].meta.title
  // }
  // // 判断后端是否正常
  // if (store.state.isConnected === null && to.path === '/login') {
  //   store.dispatch('determineConnected')
  // }
  if (to.path === '/login') { // 未登陆拦截
    next()
  } else {
    const isToken = !!localStorage.Authorization
    isToken ? next() : next('/login')
  }
  if (to.path !== '/login' && toRefs(store.state.User.userInfo)._id.value === '') {
    store.dispatch('getUserInfo')
  }
})

export default router
