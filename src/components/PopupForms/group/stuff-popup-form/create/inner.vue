<template>
    <section class="group-steps stuff-popup-form">
        <h2 class="title">{{$root.content.stuffPopupForm.labels.document}}</h2>     
        <div>
            <b-button
                class="button is-success submit-button stuff-popup add-new" 
                @click="addNew"           
            >
                {{$root.content.globalForms.buttons.addNew}}
            </b-button>
        </div>   
        <input-list :stuffArray="stuffArray" @checkArr="checkSubmit" :updated="false" />
        <footer-buttons :stuffArray="stuffArray" :submitDisabled="submitDisabled" :updated="false" />
    </section>
</template>

<script>
import inputList from '@/components/Global/popup-form/stuff/inputList'
import footerButtons from '../ui/footerButtons'

export default {
    components: {
        inputList, footerButtons
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