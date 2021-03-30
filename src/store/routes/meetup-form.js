import api from '@/services/api'

const opts = () => {
  const authToken = localStorage.getItem("auth")

  return {
    headers: {
      Authorization: authToken
    }
  }
}

export default {
  getById (params) {
    return api().get('/meetup/get', {
      ...opts(),
      params
    })
  },
  getMeetupStreamingSources (params) {
    return api().get('/meetup/get-streaming-sources', {
      ...opts(),
      params
    })
  },
  getStreamStats (params) {
    return api().get('/meetup/get-stream-stats', {
      ...opts(),
      params
    })
  },
  postAddMeetup (params) {
    return api().post('/meetup/add-meetup', params, {
      ...opts()
    })
  },
  postUpdate (params) {
    return api().post('/meetup/update-meetup', params, {
      ...opts()     
    })
  },
  postAddStuff (params) {
    return api().post('/meetup/add-stuff', params, {
      ...opts()     
    })
  },
  postAddDemos (params) {
    return api().post('/meetup/add-demos', params, {
      ...opts()     
    })
  },
  postAddSocials (params) {
    return api().post('/meetup/add-socials', params, {
      ...opts()     
    })
  },
  postAddScreensaver (params) {
    return api().post('/meetup/add-screensaver', params, {
      ...opts()     
    })
  },
  postCreateInviteLink(params){
    return api().post('/meetup/create-inv-link', params, {
      ...opts()     
    })    
  },
  toggleNetworkingRoom(params){
    return api().post('/meetup/toggle-networking-room', params, {
      ...opts()     
    })    
  },
  toggleMeetupRoom(params){
    return api().post('/meetup/toggle-webinar-status', params, {
      ...opts()     
    })    
  },
  closeMeetup (params) {
    return api().post('/meetup/set-meetup-finished', params, {
      ...opts()
    })
  },
  addStreamingSource(params) {
    return api().post('/meetup/add-streaming-source', params, {
      ...opts()
    })
  },
  deleteStreamingSource(params) {
    return api().post('/meetup/delete-streaming-source', params, {
      ...opts()
    })
  },
  postInviteByEmail (params) {
    return api().post('/meetup/invite-email', params, {
      ...opts()
    })
  }
}

// export default function postAddPreview (params) {
//   return api().post('/meetup/add-preview', params, {
//     ...opts     
//   })
// }