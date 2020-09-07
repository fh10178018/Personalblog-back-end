const mutations = {
  // 登录修改token，并将token存入localStorage
  LOGIN (state, user) {
    state.Authorization = user.Authorization
    localStorage.setItem('Authorization', user.Authorization)
  },
  LOGOUT (state) {
    localStorage.removeItem('Authorization')
    state.Authorization = null
  }
}

export default mutations
