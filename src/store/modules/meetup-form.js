import MeetupController from '../controllers/meetup-form'
import MeetupRouter from '../routes/meetup-form'

export default {
    actions: {
        // getMeetupById
        async getMeetupById(ctx, meetupIdObj) {
            const meetup = await MeetupController.getMeetupById(meetupIdObj) 
            console.log('meetupmeetupmeetupmeetupmeetupmeetupmeetupmeetupmeetupmeetup', meetup);
            ctx.commit('updateMeetup', meetup)                 
        },
        async toggleMeetupNetworkingRoom(ctx, meetupIdObj){
            await MeetupRouter.toggleNetworkingRoom(meetupIdObj)
            ctx.commit('toggleNetworkingRoom')  
        },
        async toggleMeetupRoom(ctx, meetupIdObj){
            await MeetupRouter.toggleMeetupRoom(meetupIdObj)
            ctx.commit('toggleRoom')  
        }
    },
    mutations: {
        // update Meetup
        updateMeetup(state, meetup){             
            state.name = meetup.name           
            state.message = meetup.description
            state.date = meetup.date
            state.logo = meetup.image
            state.preview = meetup.preview
            state.demo = meetup.demo
            state.stuff = meetup.stuff
            state.socials = meetup.socials
            state.networkingRoomOpened = meetup.networkingRoomOpened
            state.meetupRoomOpened = meetup.meetupRoomOpened
            state.screensaverColor = meetup.screensaverColor
            state.screensaver = meetup.screensaver
            state.custom_colors = meetup.custom_colors
            state.color_schema = meetup.color_schema
        },
        updateCustomColor(state, val){
            state.custom_colors = val
        },
        updateSchemaColor(state, color){
            state.color_schema[color.key] = color.value
        },
        toggleNetworkingRoom(state){
            state.networkingRoomOpened = !state.networkingRoomOpened
        },
        toggleRoom(state){
            state.meetupRoomOpened = !state.meetupRoomOpened
        }
    },
    state: {
        name: '',
        message: '',
        logo: '',
        date: '',
        preview: '',
        custom_colors: false,
        color_schema: {
            primary: '#0051d9',
            dark: '#4b4b4b',
            light: '#ffffff',
        },
        networkingRoomOpened: false,
        meetupRoomOpened: false,
        demo: [],
        stuff: [],
        socials: []
    },
    getters: {
        meetupFull(state){
            return state
        },
        meetupColorSchema(state){
            return state.color_schema
        },
        meetupSocials(state){
            return state.socials
        }
    }
}