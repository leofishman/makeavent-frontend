import api from '@/services/api'

const opts = {
  headers: {
    Authorization: localStorage.auth
  }
}

export default {
  getSocials () {
    return api().get('/meetup/get-all-socials', {
      ...opts,      
    })
  }, 
}