import { post, get } from 'http/index'
import showMessage from 'components/common/Message'
import { reactive } from 'vue'

// 创建响应式状态
const userInfo = reactive({
  isAdmin: false,
  _id: -1,
  username: '',
  name: ''
})

const state = {
  Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
  userInfo: userInfo
}

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

export default {
  state,
  actions,
  mutations
}
