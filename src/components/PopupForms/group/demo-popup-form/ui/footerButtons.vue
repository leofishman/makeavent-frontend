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
    props:['demosArray','updated', 'submitDisabled'],
    methods: {
        submit(){
            const updated = this.$props.updated
            const name = 'test'
            const demosArray = this.$props.demosArray.map(item => {
                return {                    
                    link: item.link,
                    name: item.name,
                }
            })        

            if(name && demosArray){   
                let data = {}             
                if(updated){
                    data = {                    
                        name: name,
                        demos: demosArray,
                        update: true
                    }
                } else {
                    data = {                    
                        name: name,
                        demos: demosArray
                    }
                }
                
                router.postAddDemos(data)
            }
        }
    }
}
</script>