// import ProfileControllers from '../controllers/profile'
import routes from '../routes/profile'
import meetupRoutes from '../routes/meetup-form'
import util from '../../util'

export default {
    actions: {
        deleteMeetup (ctx, obj) {
            return new Promise(async (resolve, reject) => {
                try {
                    ctx.commit('toggleMeetupTabsReady')
                    await routes.deleteMeetup(obj)
                    resolve(true)
                }
                catch (e) {
                    console.log(e)
                }
            })
        },
    },
    mutations: {
        setMeetupsState (state, newState) {
            state.loadedMeetups = newState
        },
        toggleMeetupTabsReady (state) {
            state.meetupTabsReady = !state.meetupTabsReady
        }
    },
    state: {
        filteredOnlyAdmin: [],
        loadedMeetups: [],

        meetupTabsReady: false
    },
    getters: {
        async filterMeetupsOnlyAdminStatus (state) {
            return function (profile) {
                return new Promise(async (resolve, reject) => {

                    state.filteredOnlyAdmin = []
                    state.loadedMeetups     = []
        
                    const promises = profile.meetups.map(async meetupId => new Promise(async (resolve, reject) => {
                        const res = await meetupRoutes.getById({ id: meetupId })
                        const admins = res.data.meetup.admins
                        
                        state.loadedMeetups.push(res.data.meetup)
                        window.EventBus.$emit(`MeetupsRow:cachedChanged`)
                        
                        if (admins)
                            if ( admins.includes(profile._id) ) {
                                state.filteredOnlyAdmin.push(state.loadedMeetups.filter(el => el._id == meetupId)[0])
                            }
        
                        resolve(true)
                    }))
                    await Promise.all(promises)
        
                    state.filteredOnlyAdmin = util.sortArrayBy(state.filteredOnlyAdmin, 'meetup_name')
                    state.loadedMeetups     = util.sortArrayBy(state.loadedMeetups, 'meetup_name')
    
                    state.meetupTabsReady = true

                    resolve(true)
                })
            };  
        },
    }
}