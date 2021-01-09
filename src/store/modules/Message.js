import { post, deleteAxios, get } from 'http/index'
import { reactive, ref } from 'vue'

const MessageList = reactive([])
const Message = reactive({})
const isLoading = reactive({
  delete: false,
  table: false,
  mask: false
})
const totalList = ref(0)
const state = {
  MessageList,
  isLoading,
  totalList,
  Message
}

const actions = {
  deleteMessage (context, data) {
    const { _id, isReady } = data
    context.state.isLoading.delete = true
    return deleteAxios('/resumes/deleteMessage', _id).then(res => {
      context.state.isLoading.delete = false
      context.dispatch('getMessageList', { page: 1, rows: 20, isReady })
    }).catch(() => {
      context.state.isLoading.delete = false
    })
  },
  getMessageList (context, tableQuery) {
    context.state.isLoading.table = true
    return post('/resumes/getMessageList', tableQuery).then(res => {
      context.state.isLoading.table = false
      context.commit('SETMESSAGELIST', res.data)
    }).catch(() => {
      context.state.isLoading.table = false
    })
  },
  getMessage (context, _id) {
    context.state.isLoading.detail = true
    return get('/resumes/getMessage', _id).then(res => {
      context.state.isLoading.detail = false
      context.commit('SETMESSAGE', res)
    }).catch(() => {
      context.state.isLoading.detail = false
    })
  },
  setReaded (context, data) {
    const { _id, isReady } = data
    context.state.isLoading.mask = true
    return post('/resumes/getMessageList', { _id }).then(res => {
      context.state.isLoading.mask = false
      context.dispatch('getMessageList', { page: 1, rows: 20, isReady })
    }).catch(() => {
      context.state.isLoading.mask = false
    })
  }
}

const mutations = {
  SETMESSAGELIST (state, data) {
    state.MessageList = data
  },
  SETMESSAGE (state, data) {
    state.Message = data
  }
}

export default {
  state,
  actions,
  mutations
}
