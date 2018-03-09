import axios from 'axios'

const http = axios.create({
  baseURL: 'http://10.14.133.63:3000'
})

http.interceptors.request.use(config => {
  return config
}, error => console.error(error))

export default {
  get (url, params) {
    return new Promise((resolve, reject) => {
      http({
        method: 'get',
        url,
        params
      }).then(response => {
        resolve(response)
      })
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      http({
        method: 'post',
        url,
        data
      }).then(response => {
        resolve(response)
      })
    })
  }
}
