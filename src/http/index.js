import router from '@/router'
import axios from 'axios'
import showMessage from 'components/common/Message'
import store from '../store'

export const get = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.get('/api' + url, { params: data }).then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(' /api' + url, data).then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export const deleteAxios = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.delete(' /api' + url, { params: data }).then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
const uploadConfig = {
  headers: { 'Content-Type': 'multipart/form-data' }
}
export const postFile = (url, name, file, description) => {
  const params = new FormData() // 创建一个form对象
  params.append(name, file, file.name) // append 向form表单添加数据
  params.append('description', description) // append 向form表单添加数据
  return new Promise((resolve, reject) => {
    axios.post(' /api' + url, params, uploadConfig).then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//  请求拦截,localStorage有值放在Authorization中，方便token请求
axios.interceptors.request.use(config => {
  if (localStorage.Authorization) {
    config.headers.Authorization = localStorage.Authorization
  }
  return config
})

const httpStatus = {
  500: '尚未连接到后端'
}

// 相应拦截，错误处理
axios.interceptors.response.use(res => {
  switch (res.status) {
    case 201:
      showMessage({
        content: httpStatus[res.status] ? httpStatus[res.status] : res.data.msg,
        type: 'success'
      })
  }
  return res
}, error => {
  if (error.response) {
    showMessage({
      content: httpStatus[error.response.status] ? httpStatus[error.response.status] : error.response.data.msg,
      type: 'error'
    })
    switch (error.response.status) {
      case 401:
        if (error.response.data.code === 1001) {
          store.commit('SETREFRESHSTATUS', true)
          store.dispatch('refreshToken', localStorage.refreshAuthorization)
        }
        break
      case 500:
        router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } })
        break
    }
  }
  return Promise.reject(error)
})
