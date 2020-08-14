import Vue from 'vue'
import CountryController from '../controllers/country'

export default {
    namespaced: true,
    actions: {
        // getMeetupById
        async fetch(ctx, meetupIdObj) {
            const meetup = await CountryController.fetch()
            ctx.commit('setCountries', meetup)                 
        }
    },
    mutations: {
        setCountries(state, data){ 
            Vue.set(state, 'countries', data)
        },
    },
    state: {
        countries: [],
    },
    getters: {
        countries: state => state.countries,
    }
}