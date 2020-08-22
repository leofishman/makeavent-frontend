<template>
    <section class="group-steps stuff-popup-form">
        <h2 class="title">{{$root.content.meetupSocialsPopupFrom.labels.title}}</h2>     
        <div>
            <b-button
                class="button is-success submit-button stuff-popup add-new" 
                @click="addNew"           
            >
                {{$root.content.globalForms.buttons.addNew}}
            </b-button>
        </div>   
        <input-list :socialsArray="socialsArray" @checkArr="checkSubmit" :updated="false" />
        <footer-buttons :socialsArray="socialsArray" :submitDisabled="submitDisabled" :updated="false" />
      </section>
</template>

<script>
import inputList from '@/components/Global/popup-form/socials/inputList'
import footerButtons from '../ui/footerButtons'

import {mapMutations, mapActions} from 'vuex'

export default {
    components: {
        inputList, footerButtons
    },
    mounted(){
        
    },
    data(){
        return {   
            socialsArray: [
                {   
                    link: '',
                    name: '',
                    validURL: true
                }
            ],
            submitDisabled: true
        }
    },
    mounted(){
        this.getAllSocials()
    },
    methods: {        
        ...mapActions(['getAllSocials']),
        checkSubmit(val){
            this.submitDisabled = val
        },
        addNew(){
            this.socialsArray.push(                
                {   
                    link: '',
                    name: '',
                    validURL: true
                }
            )
            this.submitDisabled = true
        },
    },
}
</script>