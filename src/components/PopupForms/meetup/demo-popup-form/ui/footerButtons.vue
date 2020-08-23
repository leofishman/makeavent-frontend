<template>  
    <div class="sbt-btn">
        <b-button
            class="button is-success is-outlined submit-button "  
            :disabled="submitDisabled"
            @click.prevent="submit"           
        >
            {{$root.$root.content.globalForms.buttons.submit}}
        </b-button>
    </div>
</template>

<script>
import router from '@/store/routes/meetup-form'

export default {
    props:['demosArray','updated', 'submitDisabled'],
    methods: {
        submit(){
            const updated = this.$props.updated
            const id = '5f0f049050da105c781d8533'
            const demosArray = this.$props.demosArray.map(item => {
                return {                    
                    link: item.link,
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
                
                router.postAddDemos(data)
            }
        }
    }
}
</script>