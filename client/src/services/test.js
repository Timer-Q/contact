import http from '@/services/http.js'

export default {
  test () {
    return http.get('/')
  }
}
