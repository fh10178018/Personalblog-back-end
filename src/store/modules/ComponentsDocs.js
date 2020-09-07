import allComponentsDocs from '../../components/docs/index'

const state = {
  allDocs: allComponentsDocs,
  id: 0
}
const mutations = {
  setDocsId (state, id) {
    state.id = id
  }
}
const getters = {
  getComponentDocs () {
    return state.allDocs.filter((item) => {
      if (item._id === state.id) {
        console.log(item)
        return item
      }
    })
  }
}

export default {
  state,
  mutations,
  getters
}
