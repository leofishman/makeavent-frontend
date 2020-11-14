import rtmp from '@/services/rtmp'

const opts = {
  headers: {
    Authorization: localStorage.auth
  }
}

export default {
  getRecordings (params) {
    return rtmp().get('/v1/api/recordings/get-by-id', {
      ...opts,
      params
    })
  }, 
}