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
import router from '@/store/routes/group-form'

export default {
    props:['socialsArray','updated', 'submitDisabled'],
    methods: {
        submit(){
            const updated = this.$props.updated
            const name = 'test'
            const socialsArray = this.$props.socialsArray.map(item => {
                return {                    
                    link: item.link,
                    name: item.name,
                }
            })        

            if(name && socialsArray){   
                let data = {}             
                if(updated){
                    data = {                    
                        name: name,
                        socials: socialsArray,
                        update: true
                    }
                } else {
                    data = {                    
                        name: name,
                        socials: socialsArray
                    }
                }
                
                router.postAddSocials(data)
            }
        }
    }
}
</script>

<style>

</style>