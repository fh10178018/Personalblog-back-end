import { post, get, deleteAxios } from 'http/index'
import showMessage from 'components/common/Message'
import { reactive, ref } from 'vue'
import router from '../../router'

// 创建响应式状态
const userInfo = reactive({
  isAdmin: false,
  _id: '',
  username: '',
  name: ''
})
const AdminUserList = reactive([])
const isRefresh = false
const isLoading = reactive({
  delete: false,
  table: false,
  edit: false,
  password: false,
  login: false
})
const totalList = ref(0)
const state = {
  Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
  refreshAuthorization: localStorage.getItem('refreshAuthorization') ? localStorage.getItem('refreshAuthorization') : '',
  userInfo,
  AdminUserList,
  isLoading,
  totalList,
  isRefresh
}

const actions = {
  LoginAction (context, data) {
    context.state.isLoading.login = true
    return post('/user/login', data.loginData).then(res => {
      setTimeout(() => {
        context.state.isLoading.login = false
        context.commit('LOGIN', { Authorization: 'Bearer ' + res.token })
        context.commit('SETREFRESHTOKEN', { refreshAuthorization: 'Bearer ' + res.refreshToken }) // 创建Token刷新
        router.push({ path: '/power' })
      }, 500)
    }).catch(() => {
      context.state.isLoading.login = false
      data.resetForm()
    })
  },
  LogoutAction (context) {
    context.commit('LOGOUT')
    post('/user/logout')
    router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } })
  },
  getUserInfo (context) {
    return get('/user').then(res => {
      for (const key in res) {
        context.state.userInfo[key] = res[key]
      }
      showMessage({
        content: '你好！' + res.name,
        type: 'success'
      })
    })
  },
  refreshToken (context, refreshAuthorization) { // 用于在token失效，获取新的token
    context.commit('SETREFRESHSTATUS', false)
    return post('/user/refreshtoken', { refreshAuthorization }).then(res => {
      context.commit('LOGIN', { Authorization: 'Bearer ' + res.token })
      context.commit('SETREFRESHTOKEN', { refreshAuthorization: 'Bearer ' + res.refreshToken }) // 创建Token刷新
    }).catch(res => { // 说明真的是长时间没登陆，我们将其导向login界面
      router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } })
    })
  },
  getAdminUserList (context, tableQuery) {
    context.state.isLoading.table = true
    return post('/user/getAdminUserList', tableQuery).then(res => {
      context.commit('GETADMINUSERLIST', res.data)
      context.commit('GETADMINUSERLISTLENGTH', res.total)
      setTimeout(() => {
        context.state.isLoading.table = false
      }, 20)
    }).catch(() => {
      setTimeout(() => {
        context.state.isLoading.table = false
      }, 20)
    })
  },
  deleteAdminUser (context, _id) {
    context.state.isLoading.delete = true
    return deleteAxios('/user/deleteAdminUser', _id).then(res => {
      context.state.isLoading.delete = false
      context.dispatch('getAdminUserList', { page: 1, rows: 20 })
    }).catch(() => {
      setTimeout(() => {
        context.state.isLoading.delete = false
      }, 20)
    })
  },
  EditAdminUser (context, operation) {
    const { adminDate, handleModalFade } = operation
    context.state.isLoading.edit = true
    return post('/user/editAdminUser', adminDate).then(res => {
      context.dispatch('getAdminUserList', { page: 1, rows: 20 })
      setTimeout(() => {
        context.state.isLoading.edit = false
        handleModalFade()
      }, 20)
    }).catch(() => {
      setTimeout(() => {
        context.state.isLoading.edit = false
      }, 20)
    })
  },
  EditAdminUserPassword (context, operation) {
    const { adminDate, handleModalFade } = operation
    context.state.isLoading.password = true
    return post('/user/editAdminUserPassword', adminDate).then(res => {
      context.dispatch('getAdminUserList', { page: 1, rows: 20 })
      setTimeout(() => {
        context.state.isLoading.password = false
        handleModalFade()
      }, 20)
    }).catch(() => {
      setTimeout(() => {
        context.state.isLoading.password = false
      }, 20)
    })
  }
}

const mutations = {
  // 登录修改token，并将token存入localStorage
  LOGIN (state, user) {
    state.Authorization = user.Authorization
    localStorage.setItem('Authorization', user.Authorization)
  },
  SETREFRESHSTATUS (state, status) {
    state.isRefresh = status
  },
  SETREFRESHTOKEN (state, user) {
    state.refreshAuthorization = user.refreshAuthorization
    localStorage.setItem('refreshAuthorization', user.refreshAuthorization)
  },
  LOGOUT (state) {
    localStorage.removeItem('Authorization')
    state.Authorization = null
    localStorage.removeItem('refreshAuthorization')
    state.refreshAuthorization = null
  },
  GETADMINUSERLIST (state, userlist) {
    state.AdminUserList = userlist
  },
  GETADMINUSERLISTLENGTH (state, total) {
    state.totalList = total
  }
}

export default {
  state,
  actions,
  mutations
}
