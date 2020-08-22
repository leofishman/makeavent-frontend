<template>
    <div class="sbt-btn">
        <b-button
            class="button is-success is-outlined submit-button"  
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
    props:['stuffArray','updated', 'submitDisabled'],
    methods: {
        submit(){
            const updated = this.$props.updated
            const name = 'test'      
            const stuffArray = this.$props.stuffArray.map(item => {
                return {                    
                    file: item.file,
                    name: item.name,
                }
            })        

            if(name && stuffArray){   
                let data = {}             
                if(updated){
                    data = {                    
                        name: name,
                        stuff: stuffArray,
                        update: true
                    }
                } else {
                    data = {                    
                        name: name,
                        stuff: stuffArray
                    }
                }
                
                router.postAddStuff(data)
            }
        }
    }
}
</script>

<style>

</style>