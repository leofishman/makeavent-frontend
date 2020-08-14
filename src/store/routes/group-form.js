import api from '@/services/api'

const opts = {
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjVlNzg5ZWIxNWY5OWQ0MzRjZGVhYTlhNCIsImlhdCI6MTU4NDk2NzM4MiwiZXhwIjoxNTg1MTQwMTgyfQ.4NEDDM9-qxw-wdKm9W8AdqSbcAQpK3dR9JFM3FRde0Q'
  }
}

export default {
  getGroupByName (params) {
    return api().get('/group/get', {
      ...opts,
      params
    })
  },
  getCountries () {
    return api().get('/group/get-locations', opts)
  },
  getInterests () {
    return api().get('/group/get-interests', opts)
  },
  getSubInterests (params) {
    return api().get('/group/get-subinterests', {
      ...opts,
      params
    })
  },
  getAddGroup (params) {
    return api().post('/group/add-group', params, {
      ...opts     
    })
  },
  postUpdateGroup (params) {
    return api().post('/group/update-group', params, {
      ...opts     
    })
  },
  getGroupName (params) {
    return api().get('/group/is-unique-group-name', {
      ...opts,
      params
    })
  },
  postAddStuff (params) {
    return api().post('/group/add-stuff', params, {
      ...opts     
    })
  },
  postAddDemos (params) {
    return api().post('/group/add-demos', params, {
     ...opts     
    })
  },
  postAddSocials (params) {
    return api().post('/group/add-socials', params, {
      ...opts     
    })
  }
}