import { get } from 'http/index'
import { reactive } from 'vue'

const newResumes = reactive({
  name: '',
  jobIntention: '',
  birthdate: 0,
  finalEducation: '',
  major: '',
  tel: '',
  email: '',
  web: '',
  educationBackground: '',
  workExperience: '',
  project: '',
  editTime: 0
})
const loading = reactive({
  newResumes: false,
  resumesList: false
})

const resumesList = reactive([])

const state = {
  newResumes,
  loading,
  resumesList
}

const actions = {
  getResumes (context) {
    context.state.loading.newResumes = true
    return get('/resumes/getNewResumes').then(res => {
      context.state.loading.newResumes = false
      context.commit('SETNEWRESUMES', res)
    })
  },
  getResumesList (context) {
    context.state.loading.resumesList = true
    return get('/resumes/getResumesList').then(res => {
      context.state.loading.resumesList = false
      context.commit('SETRESUMESLIST', res)
    })
  }
}

const mutations = {
  SETNEWRESUMES (state, data) {
    state.newResumes = data
  },
  SETRESUMESLIST (state, data) {
    state.resumesList = data
  }
}

export default {
  state,
  actions,
  mutations
}
