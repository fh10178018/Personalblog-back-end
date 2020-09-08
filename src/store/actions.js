import { post } from 'http/index'

const actions = {
  LoginAction (context, loginData) {
    return post('/user/login', loginData)
  },
  LogoutAction (context, loginData) {
  }
}
export default actions
