import { createStore } from 'vuex'

export default createStore({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    User: ''
  },
  mutations: {
    // 登录修改token，并将token存入localStorage
    LOGIN (state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
    },
    LOGOUT (state) {
      localStorage.removeItem('Authorization')
      state.token = null
    }
  },
  actions: {
  },
  modules: {
  }
})
