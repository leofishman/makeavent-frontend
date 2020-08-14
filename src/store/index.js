import Vue from 'vue'
import Vuex from 'vuex'

import groupForm from './modules/group-form'
import meetupForm from './modules/meetup-form'
import socialsForm from './modules/socials-form'
import country from './modules/country'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    groupForm,
    meetupForm,
    socialsForm,
    country
  }
})
