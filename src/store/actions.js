import { post } from 'http/index'

const actions = {
  LoginAction (context, loginData) {
    return post('/user/login', loginData).then(res => {
      context.LOGIN({ Authorization: 'Bearer ' + res })
    })
  },
  LogoutAction (context, loginData) {
  }
}
export default actions
