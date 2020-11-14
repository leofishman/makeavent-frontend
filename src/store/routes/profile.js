import api from '@/services/api'

const opts = {
  headers: {
    Authorization: localStorage.auth
  }
}

export default {
  deleteMeetup (params) {
    return api().post('/meetup/delete-meetup-by-id', params, {
      ...opts,      
    })
  }, 
}