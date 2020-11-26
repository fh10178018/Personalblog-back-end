import { createStore } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import modules from './modules/index'

const state = {
  isConnected: null
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules
})
