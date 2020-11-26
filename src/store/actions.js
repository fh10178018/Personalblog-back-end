import { get } from 'http/index'

const actions = {
  determineConnected (context) { // 用于判断是否连接到后端
    return get('/connected').then(res => {
      context.commit('CONNECTEDSTATUS', true)
    })
  }
}
export default actions
