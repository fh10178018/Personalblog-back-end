import { post, get, deleteAxios } from 'http/index'
import { reactive, ref } from 'vue'

// 创建响应式状态
const BlogList = reactive([])
const BlogTypes = reactive([])
const isLoading = reactive({
  delete: false,
  table: false,
  edit: false,
  types: false
})
const totalList = ref(0)
const state = {
  BlogList,
  isLoading,
  totalList,
  BlogTypes
}

const actions = {
  getBlogTypes (context) {
    context.state.isLoading.types = true
    return get('/blog/getBlogType').then(res => {
      context.commit('GETBLOGTYPES', res)
      setTimeout(() => {
        context.state.isLoading.types = false
      }, 20)
    }).catch(() => {
      setTimeout(() => {
        context.state.isLoading.types = false
      }, 20)
    })
  },
  getBlogList (context, tableQuery) {
    context.state.isLoading.table = true
    return post('/blog/getBlogList', tableQuery).then(res => {
      context.commit('GETBLOGLIST', res.data)
      context.commit('GETBLOGLISTLENGTH', res.total)
      setTimeout(() => {
        context.state.isLoading.table = false
      }, 20)
    }).catch(() => {
      setTimeout(() => {
        context.state.isLoading.table = false
      }, 20)
    })
  },
  deleteBlog (context, data) { // {_id,type}
    context.state.isLoading.delete = true
    return deleteAxios('/blog/deleteBlog', { _id: data._id }).then(res => {
      context.state.isLoading.delete = false
      context.dispatch('getBlogList', { page: 1, rows: 20, type: data.type })
    }).catch(() => {
      setTimeout(() => {
        context.state.isLoading.delete = false
      }, 20)
    })
  },
  EditBlog (context, operation) {
    const { adminDate, handleModalFade, type } = operation
    context.state.isLoading.edit = true
    return post('/blog/editBlog', adminDate).then(res => {
      context.dispatch('getBlogList', { page: 1, rows: 20, type: type })
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
  GETBLOGLIST (state, bloglist) {
    state.BlogList = bloglist
  },
  GETBLOGLISTLENGTH (state, total) {
    state.totalList = total
  },
  GETBLOGTYPES (state, types) {
    state.BlogTypes = types
  }
}

export default {
  state,
  actions,
  mutations
}
