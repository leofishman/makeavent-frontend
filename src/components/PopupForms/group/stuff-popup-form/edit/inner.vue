<template>
    <section class="group-steps stuff-popup-form">
        <h2 class="title">{{$root.content.stuffPopupForm.labels.document}}</h2>     
        <div>
            <b-button
                class="button is-success submit-button stuff-popup add-new" 
                @click="addNew"           
            >
                {{$root.$root.content.globalForms.buttons.addNew}}
            </b-button>
        </div>   
        <input-list :stuffArray="stuffArray" @checkArr="checkSubmit" :updated="true" />
        <footer-buttons :stuffArray="stuffArray" :submitDisabled="submitDisabled" :updated="true" />
    </section>
</template>

<script>
import inputList from '@/components/Global/popup-form/stuff/inputList'
import footerButtons from '../ui/footerButtons'

import {mapActions} from 'vuex'

export default {    
    components: {
        inputList, footerButtons
    },
    async mounted(){
        const obj = {
            name: 'test'
        }

        await this.getGroupByName(obj)
        
        const newArray = this.$store.state.groupForm.stuff
        
        this.stuffArray = newArray.map(item => {
            item.validURL = this.util.validURL(item.link)
            return {                
                file: item.link,
                name: item.name,
                validURL: item.validURL,
            }
        })
        
    },
    data(){
        return {   
            stuffArray: [
                {   
                    file: '',
                    name: '',
                    validURL: true 
                }
            ],
            submitDisabled: true
        }
    },
    methods: {
        ...mapActions(['getGroupByName']),
        addNew(){
            this.stuffArray.push(                
                {   
                    file: '',
                    name: '',
                    validURL: true 
                }
            )
            this.submitDisabled = true
        },
        checkSubmit(val){
            this.submitDisabled = val
        }
    }
}
</script>