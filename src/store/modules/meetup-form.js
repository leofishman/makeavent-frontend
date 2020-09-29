import MeetupController from '../controllers/meetup-form'
import MeetupRouter from '../routes/meetup-form'

export default {
    actions: {
        // getMeetupById
        async getMeetupById(ctx, meetupIdObj) {
            return new Promise(async (resolve, reject) => {
                try {
                    const meetup = await MeetupController.getMeetupById(meetupIdObj)
                    ctx.commit('updateMeetup', meetup)
                    resolve(true)
                }
                catch (e) { console.log(e) }
            })
        },
        async getStreamingSources (ctx, meetupIdObj) {
            return new Promise(async (resolve, reject) => {
                try {
                    const sources = await MeetupController.getMeetupStreamingSources(meetupIdObj)
                    ctx.commit('updateMeetupStreamSources', sources)
                    resolve(true)
                }
                catch (e) { console.log(e) }
            })
        },
        async toggleMeetupNetworkingRoom(ctx, meetupIdObj){
            return new Promise(async (resolve, reject) => {
                try {
                    await MeetupRouter.toggleNetworkingRoom(meetupIdObj)
                    ctx.commit('toggleNetworkingRoom')  
                    resolve(true)
                }
                catch (e) { console.log(e) }
            })
        },
        async toggleMeetupRoom(ctx, meetupIdObj){
            return new Promise(async (resolve, reject) => {
                try {
                    await MeetupRouter.toggleMeetupRoom(meetupIdObj)
                    ctx.commit('toggleRoom')  
                    resolve(true)
                }
                catch (e) { console.log(e) }
            })
        },
    },
    mutations: {
        // update Meetup
        updateMeetup(state, meetup){            
            state.name = meetup.meetup_name           
            state.message = meetup.meetup_topic
            state.company_name = meetup.company_name
            state.company_description = meetup.company_description
            state.date = meetup.date
            state.logo = meetup.image
            state.preview = meetup.preview
            state.demo = meetup.demo
            state.stuff = meetup.stuff
            state.socials = meetup.socials
            state.speakers = meetup.speakers
            state.networkingRoomOpened = meetup.networkingRoomOpened
            state.meetupRoomOpened = meetup.meetupRoomOpened
            state.screensaverColor = meetup.screensaverColor
            state.screensaver = meetup.screensaver
            state.custom_colors = meetup.custom_colors
            state.color_schema = meetup.color_schema
            state.streamingSources = []
        },
        updateMeetupStreamSources (state, streamingSources) {
            state.streamingSources = streamingSources
        },
        updateCustomColor(state, val){
            state.custom_colors = val
            state.isDefault = false
        },
        updateColorMode(state, val){
            state.color_schema.isLight = val
            state.isDefault = false
        },
        updateSchemaColor(state, color){
            state.color_schema[color.key] = color.value
            state.isDefault = false
        },
        updateIsDefault(state){
            state.isDefault = true
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
        company_name: '',
        company_description: '',
        logo: '',
        date: '',
        preview: '',
        custom_colors: false,
        color_schema: {
            isLight: true,
            primary: '#0051d9',
            dark: '#4b4b4b',
            light: '#ffffff',
        },
        networkingRoomOpened: false,
        meetupRoomOpened: false,
        demo: [],
        stuff: [],
        socials: [],
        speakers: [],
        isDefault: true
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