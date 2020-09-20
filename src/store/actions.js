import { post, get } from 'http/index'
import showMessage from 'components/common/Message'

const actions = {
  LoginAction (context, loginData) {
    return post('/user/login', loginData)
  },
  LogoutAction (context, loginData) {
  },
  getUserInfo (context) {
    return get('/user').then(res => {
      console.log(context.state.userInfo)
      for (const key in res) {
        context.state.userInfo[key] = res[key]
      }
      console.log(context.state.userInfo)
      showMessage({
        content: '你好！' + res.name,
        type: 'success'
      })
    })
  }
}
export default actions
