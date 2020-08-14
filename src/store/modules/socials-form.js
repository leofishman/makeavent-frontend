import router from '@/store/routes/socials-form'

function sortArray(arr) {
    return arr.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
}

export default {
    actions: {
        async getAllSocials(ctx){
            const res =  await router.getSocials()
            ctx.commit('setAllSocials', res.data);
        }
    },
    mutations: {
        pushSocial(state, socialObj){   
            state.socials.push(socialObj)   
            if(socialObj.social) {
                state.allValidSocials = state.allValidSocials.filter(item => {
                    return item !== socialObj.social
                })
            }
        },
        updateSocial(state, socialObj){    
            if(state.socials.length) {
                state.allValidSocials.push(state.socials[socialObj.index].social)
                
                if(state.allSocials.includes(socialObj.social)) {
                    state.allValidSocials = state.allValidSocials.filter(item => {
                        return item !== socialObj.social
                    })
                    state.socials[socialObj.index] = socialObj;
                } else {
                    state.socials = state.socials.filter((item, index) => index !== socialObj.index)
                }
            }
            else {
                if(socialObj.length) {
                    state.socials.push(socialObj.social)
                    state.allValidSocials = state.allValidSocials.filter(item => {
                        return item.name !== socialObj.social.name
                    })
                }
            }

            
            sortArray(state.allValidSocials)
        },
        removeSocial(state, index) {
            if(state.socials[index].social){
                state.allValidSocials.push(state.socials[index].social)
            }
            sortArray(state.allValidSocials)

            state.socials.splice(index, 1)
        },
        setAllSocials(state, socials) {
            state.allSocials = socials
            state.allValidSocials = socials
        }
    },
    state: {
        socials: [],
        allSocials: [],
        allValidSocials: []
    },
    getters: {
        socials(state){
            return state.allSocials
        },
        validSocials(state){
            return state.allValidSocials
        },
    }
}