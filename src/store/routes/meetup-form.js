import api from '@/services/api'

const opts = {
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjVlNzg5ZWIxNWY5OWQ0MzRjZGVhYTlhNCIsImlhdCI6MTU4NDk2NzM4MiwiZXhwIjoxNTg1MTQwMTgyfQ.4NEDDM9-qxw-wdKm9W8AdqSbcAQpK3dR9JFM3FRde0Q'
  }
}

export default {
  getById (params) {
    return api().get('/meetup/get', {
      ...opts,
      params
    })
  },
  postAddMeetup (params) {
    return api().post('/meetup/add-meetup', params, {
      ...opts     
    })
  },
  postUpdate (params) {
    return api().post('/meetup/update-meetup', params, {
      ...opts     
    })
  },
  postAddStuff (params) {
    return api().post('/meetup/add-stuff', params, {
      ...opts     
    })
  },
  postAddDemos (params) {
    return api().post('/meetup/add-demos', params, {
      ...opts     
    })
  },
  postAddSocials (params) {
    return api().post('/meetup/add-socials', params, {
      ...opts     
    })
  },
  postAddScreensaver (params) {
    return api().post('/meetup/add-screensaver', params, {
      ...opts     
    })
  },
  postCreateInviteLink(params){
    return api().post('/meetup/create-inv-link', params, {
      ...opts     
    })    
  },
  toggleNetworkingRoom(params){
    console.log('params', params);
    return api().post('/meetup/toggle-networking-room', params, {
      ...opts     
    })    
  },
  toggleMeetupRoom(params){
    console.log('params', params);
    return api().post('/meetup/toggle-meetup-room', params, {
      ...opts     
    })    
  },
}

// export default function postAddPreview (params) {
//   return api().post('/meetup/add-preview', params, {
//     ...opts     
//   })
// }