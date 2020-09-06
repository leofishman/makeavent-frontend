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
import router from '@/store/routes/meetup-form'

export default {
    props:['stuffArray','updated', 'submitDisabled'],
    methods: {
        submit(){
            const updated = this.$props.updated
            const id = this.$root.meetup._id
            const stuffArray = this.$props.stuffArray.map(item => {
                return {                    
                    file: item.file,
                    name: item.name,
                }
            })        

            if(id && stuffArray){   
                let data = {}             
                if(updated){
                    data = {                    
                        id: id,
                        stuff: stuffArray,
                        update: true
                    }
                } else {
                    data = {                    
                        id: id,
                        stuff: stuffArray
                    }
                }
                
                router.postAddStuff(data)

                window.EventBus.$emit('MaterialsPopup:close')
            }
        }
    }
}
</script>

<style>

</style>