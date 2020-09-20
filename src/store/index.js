import { createStore } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import modules from './modules/index'
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

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules
})
