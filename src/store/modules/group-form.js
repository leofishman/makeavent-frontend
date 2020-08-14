import GroupForm from '../controllers/group-form'
import routes from '../routes/group-form'

export default {
    actions: {
        // getGroupByName
        async getGroupByName(ctx, groupNameObj) {
            const group = await GroupForm.getGroupByName(groupNameObj) 
            ctx.commit('updateGroup', group)                 
        },
        // Countries
        async getCountries(ctx) {
            const countries = await GroupForm.getCountries()    
            ctx.commit('updateCountries', countries)                 
        },
        setCountry(ctx, country) {            
            ctx.commit('updateCountry', country)     
        },
        // Interests
        async fetchInterests(ctx){
            const interests = await GroupForm.getInterests()    
            ctx.commit('updateInterests', interests) 
        },
        setInterest(ctx, interest) {            
            ctx.commit('updateInterest', interest)     
        },
        // SubInterests
        async getSubInterests(ctx, subInterestsObj){
            const subInterests = await GroupForm.getSubInterests(subInterestsObj)    
            ctx.commit('updateSubInterests', subInterests) 
        },
        setSubInterest(ctx, interest) {            
            ctx.commit('updateSubInterest', interest)     
        },
        // Name        
        setName(ctx, name) {            
            ctx.commit('updateName', name)     
        },
        // Message        
        setMessage(ctx, message) {            
            ctx.commit('updateMessage', message)     
        },
        // Logo        
        setLogo(ctx, logo) {            
            ctx.commit('updateLogo', logo)     
        },
        getAddGroup(ctx, groupObj) {
            routes.getAddGroup(groupObj)  
            return false;           
        },
        postUpdateGroup(ctx, groupObj){
            routes.postUpdateGroup(groupObj) 
            return false;
        },
        // add Preview
        postAddPreview(ctx, groupObj){
            routes.postAddPreview(groupObj)  
            return false;       
        }
    },
    mutations: {
        // update Group
        updateGroup(state, group){ 
            const country = group.location
            const interest = group.interest
            const subInt = group.subinterest
            const name = group.name
            const description = group.description  
            const image =  group.image
            const demo =  group.demo
            const stuff =  group.stuff
            const socials = group.socials

            state.country = country           
            state.interest = interest            
            state.subInterest = subInt          
            state.name = name           
            state.message = description
            state.logo = image
            state.demo = demo
            state.stuff = stuff
            state.socials = socials
        },
        // Countries
        updateCountries(state, countries){            
            state.countries = countries
        },
        updateCountry(state, country){            
            state.country = country
        },
        // Interests
        updateInterests(state, interests){            
            state.interests = interests
        },
        updateInterest(state, interest){            
            state.interest = interest
        },
        // SubInterests
        updateSubInterests(state, subInterests){            
            state.subInterests = subInterests
        },
        updateSubInterest(state, subInterest){            
            state.subInterest = subInterest
        },
        // Name
        updateName(state, name){            
            state.name = name
        },
        // Message
        updateMessage(state, message){            
            state.message = message
        },
        // Logo 
        updateLogo(state, logo){            
            state.logo = logo
        }
    },
    state: {
        countries: [],
        country: '',
        interests: [],
        interest: '',
        subInterests: [],
        subInterest: [],
        name: '',
        message: '',
        logo: '',
        demo: [],
        stuff: [],
        socials: []
    },
    getters: {
        allCountries(state){
            return state.countries
        },
        allInterests(state){
            return state.interests
        },
        allSubInterests(state){
            return state.subInterests
        },
    }
}