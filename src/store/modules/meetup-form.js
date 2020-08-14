import MeetupController from '../controllers/meetup-form'

export default {
    actions: {
        // getMeetupById
        async getMeetupById(ctx, meetupIdObj) {
            const meetup = await MeetupController.getMeetupById(meetupIdObj) 
            ctx.commit('updateMeetup', meetup)                 
        }
    },
    mutations: {
        // update Meetup
        updateMeetup(state, meetup){ 
            const name = meetup.name
            const description = meetup.description  
            const logo =  meetup.image
            const preview =  meetup.preview
            const demo =  meetup.demo
            const stuff =  meetup.stuff
            const screensaverColor = meetup.screensaverColor
            const screensaver = meetup.screensaver
            const socials = meetup.socials

            const date =  meetup.date
            
            state.name = name           
            state.message = description
            state.date = date
            state.logo = logo
            state.preview = preview
            state.demo = demo
            state.stuff = stuff
            state.socials = socials
            state.screensaverColor = screensaverColor
            state.screensaver = screensaver
        }
    },
    state: {
        name: '',
        message: '',
        logo: '',
        date: '',
        preview: '',
        demo: [],
        stuff: [],
        socials: []
    },
    getters: {
        meetupSocials(state){
            return state.socials
        }
    }
}