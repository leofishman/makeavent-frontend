<template>
    <section class="group-steps stuff-popup-form">
        <h2 class="title">{{$root.content.demoPopupFrom.labels.demo}}</h2> 
        <div>
            <b-button
                class="button is-success submit-button stuff-popup add-new" 
                @click="addNew"           
            >
                {{$root.content.globalForms.buttons.addNew}}
            </b-button>
        </div>  
        <input-list :demosArray="demosArray" @checkArr="checkSubmit" />
        <footer-buttons :demosArray="demosArray" :submitDisabled="submitDisabled" :updated="false" />
    </section>
</template>

<script>
import axios from 'axios'
import router from '@/store/routes/meetup-form'

import inputList from '@/components/Global/popup-form/demo/inputList'
import footerButtons from '../ui/footerButtons'

export default {
    components: {
        inputList, footerButtons
    },
    data(){
        return {   
            demosArray: [
                {   
                    link: '',
                    name: '',
                    validURL: true,
                    iframeMarkup: false
                }
            ],
            submitDisabled: true
        }
    },
    methods: {
        addNew(){
            this.demosArray.push(                
                {   
                    link: '',
                    name: '',
                    validURL: true,
                    iframeMarkup: false
                }
            )
            this.submitDisabled = true
        },
        checkSubmit(val){
            this.submitDisabled = val
        }
    },
}
</script>