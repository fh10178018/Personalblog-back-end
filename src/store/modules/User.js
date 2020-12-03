import { post, get } from 'http/index'
import showMessage from 'components/common/Message'
import { reactive, ref } from 'vue'

// 创建响应式状态
const userInfo = reactive({
  isAdmin: false,
  _id: '',
  username: '',
  name: ''
})
const AdminUserList = reactive([])
const isLoading = reactive({
  delete: false,
  table: false,
  edit: false
})
const totalList = ref(0)
const state = {
  Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
  userInfo,
  AdminUserList,
  isLoading,
  totalList
}

const actions = {
  LoginAction (context, loginData) {
    return post('/user/login', loginData)
  },
  LogoutAction (context, loginData) {
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
    return post('/user/deleteAdminUser', _id).then(res => {
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
