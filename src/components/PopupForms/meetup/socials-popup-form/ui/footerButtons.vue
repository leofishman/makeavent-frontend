<template>  
    <div class="sbt-btn">
        <b-button
            class="button is-success is-outlined submit-button "  
            :disabled="submitDisabled"
            @click.prevent="submit"           
        >
            {{$root.content.globalForms.buttons.submit}}
        </b-button>
    </div>
</template>

<script>
import router from '@/store/routes/meetup-form'

export default {
    props:['socialsArray','updated', 'submitDisabled'],
    methods: {
        submit(){
            const updated = this.$props.updated
            const id = this.$root.meetup._id
            const socialsArray = this.$props.socialsArray.map(item => {
                return {                    
                    link: item.link,
                    name: item.name,
                }
            })        

            if(id && socialsArray){   
                let data = {}             
                if(updated){
                    data = {                    
                        id: id,
                        socials: socialsArray,
                        update: true
                    }
                } else {
                    data = {                    
                        id: id,
                        socials: socialsArray
                    }
                }
                
                router.postAddSocials(data)

                this.close()
                this.loading = false
                return false
            }
        },
        close () {
			window.EventBus.$emit('SocialsPopupForm:close')
		}
    }
}
</script>