import { postFile } from 'http/index'
import { reactive, ref } from 'vue'

const loading = reactive({
  image: false
})
const imageUrl = ref()
const state = {
  loading,
  imageUrl
}

// data:{url:'',file:}
const actions = {
  imageUpload (context, file) {
    context.state.loading.image = true
    return postFile('/imagefile/uploadSingleImage', 'imageFile', file).then(_res => {
      context.state.loading.image = false
      context.commit('SETIMAGEURL', _res)
    }).catch(_err => {
      context.state.loading.image = false
    })
  }
}

const mutations = {
  SETIMAGEURL (state, data) {
    state.imageUrl = data.imageUrl
  }
}

export default {
  state,
  actions,
  mutations
}
