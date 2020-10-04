import api from '@/services/api'

const opts = {
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjVlNzg5ZWIxNWY5OWQ0MzRjZGVhYTlhNCIsImlhdCI6MTU4NDk2NzM4MiwiZXhwIjoxNTg1MTQwMTgyfQ.4NEDDM9-qxw-wdKm9W8AdqSbcAQpK3dR9JFM3FRde0Q'
  }
}

export default {
  getSocials () {
    return api().get('/meetup/get-all-socials', {
      ...opts,      
    })
  }, 
}