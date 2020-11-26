const mutations = {
  // 登录修改token，并将token存入localStorage
  CONNECTEDSTATUS (state, res) {
    state.isConnected = res
  }
}

export default mutations
