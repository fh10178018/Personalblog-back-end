import axios from 'axios'
import showMessage from 'components/common/Message'
const that = this

export const get = (url) => {
  return new Promise((resolve, reject) => {
    axios.get('/api' + url).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(' /api' + url, data).then(res => {
      resolve(res.data)
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
  return res
}, error => {
  if (error.response) {
    showMessage({
      content: httpStatus[error.response.status] ? httpStatus[error.response.status] : error.response.data,
      type: 'error'
    })
    switch (error.response.status) {
      case 401:
        that.$store.commit('LOGOUT')
        that.$router.replace({
          path: 'login',
          query: { redirect: that.$router.currentRoute.fullPath }
        })
    }
  }
  return Promise.reject(error)
})
