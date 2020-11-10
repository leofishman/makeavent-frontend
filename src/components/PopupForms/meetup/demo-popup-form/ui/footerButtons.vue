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
import {mapActions} from 'vuex'

export default {
    props:['demosArray','updated', 'submitDisabled'],
    methods: {
        ...mapActions(['getMeetupById']),
        async submit(){
            const updated = this.$props.updated
            const id = this.$root.meetup._id
            const demosArray = this.$props.demosArray.map(item => {
                return {                    
                    link: this.util.formYoutubeVideoToEmbed(item.link),
                    name: item.name,
                }
            })        

            if(id && demosArray){   
                let data = {}             
                if(updated){
                    data = {                    
                        id: id,
                        demos: demosArray,
                        update: true
                    }
                } else {
                    data = {                    
                        id: id,
                        demos: demosArray
                    }
                }
                
                await router.postAddDemos(data)

                await this.getMeetupById({ id: id })

                window.EventBus.$emit('DemoPopupForm:close')
            }
        }
    }
}
</script>