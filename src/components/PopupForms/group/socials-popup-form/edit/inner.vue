<template>
    <section class="group-steps stuff-popup-form">
        <h2 class="title">{{$root.content.meetupSocialsPopupFrom.labels.title}}</h2>     
        <div class="socials-edit__add-item stuff-field">
            <b-field>
                <autocomplete-socials
                    :item="socialsItem"
                    :index="index"
                    @changeSocial="updateSocial"
                />                  
            </b-field>
            <b-field class="stuff-field__link">
                <b-input 
                    required
                    v-model="socialsItem.link"
                    :placeholder="$root.content.stuffPopupForm.placeholder.file"
                    :validation-message="$root.content.stuffPopupForm.validation.file"
                ></b-input>
                <p 
                    class="valid-url help is-danger first"
                    v-if="!socialsItem.validURL"
                >Invalid link</p>
            </b-field>
            <b-field class="socials-edit__buttons">
                <b-button
                    class="button is-danger is-outlined submit-button stuff-popup add-new" 
                    @click="clearItem"           
                >
                    {{$root.$root.content.globalForms.buttons.cancel}}
                </b-button>
                <b-button
                    v-if="!isUpdateItem"
                    class="button is-success submit-button stuff-popup add-new" 
                    @click="addNew"                      
                    :disabled="addDisabled"
                >
                    {{$root.$root.content.globalForms.buttons.addNew}}
                </b-button>
                <b-button
                    v-if="isUpdateItem"
                    class="button is-success submit-button stuff-popup add-new" 
                    @click="updateSingle"                      
                    :disabled="addDisabled"
                >
                    {{$root.$root.content.globalForms.buttons.update}}
                </b-button>
            </b-field>
        </div> 
        <div class="stuff-list">
            <socialRow 
                v-for="(item, index) of socialsArray" 
                :key="index" 
                :socialsItem="item" 
                :index="index"
                @updateItem="updateItem"
                @removeItem="removeItem"
                />
        </div>  
        
        <!-- <input-list :socialsArray="socialsArray" @checkArr="checkSubmit" :updated="true" /> -->
        <footer-buttons :socialsArray="socialsArray" :submitDisabled="submitDisabled" :updated="true" />
    </section>
</template>

<script>
import autocompleteSocials from '@/components/Global/popup-form/socials/autocompleteSocials'
import inputList from '@/components/Global/popup-form/socials/inputList'
import socialRow from '@/components/Global/popup-form/socials/socialRow'
import footerButtons from '../ui/footerButtons'

import {mapActions, mapGetters} from 'vuex'

export default {
    components: {
        inputList, footerButtons, socialRow, autocompleteSocials
    },
    async mounted(){      
        const obj = {
            name: 'test'
        }
        
        await this.getAllSocials()
        await this.getGroupByName(obj)

        const newArray = this.$store.state.groupForm.socials
        const socNames = this._.map(newArray, 'name');
        let allSocials = this.$store.state.socialsForm.allSocials
        this.$store.state.socialsForm.allValidSocials = this._.differenceBy(allSocials, newArray, 'name')
        this.socialsArray = newArray.map(item => {
            item.validURL = this.util.validURL(item.link)
            return {                
                link: item.link,
                name: item.name,
                validURL: item.validURL,
            }
        })
    },
    data(){
        return {   
            socialsArray: [],
            index: false,
            socialsItem: {
                link: '',
                name: '',
                validURL: true,
            },
            isUpdateItem: false,
            addDisabled: true,
            submitDisabled: false
        }
    },
    watch: {
        socialsItem: {            
            handler(val, oldVal){
                this.checkAllFields()
            },
            deep: true
        }
    },
    methods: {        
        ...mapActions(['getAllSocials', 'getGroupByName']),
        checkSubmit(val){
            this.submitDisabled = val
        },
        addNew(){
            this.socialsArray.push(                
                {   
                    link: this.socialsItem.link,
                    name: this.socialsItem.name,
                    validURL: true
                }
            )
        },
        clearItem() {
            this.isUpdateItem = false
            this.index = false
            this.socialsItem =  {
                link: '',
                name: '',
                validURL: true,
            }            
        },
        updateSocial(val){
            this.checkAllFields()
            if(val) this.socialsItem.name = val.selectedItem.name
        },
        checkAllFields(){
            // Variables  
            let item = this.socialsItem
            let validArray = []        
            // Check required fields
            let validName = Boolean(item.name.length) 
            let validfile = Boolean(item.link.length) && this.util.validURL(item.link)
            validArray.push(validName && validfile)
            // Check valid link 
            if(item.link.length && !this.util.validURL(item.link)) item.validURL = false
            else item.validURL = true        
            this.addDisabled = validArray.includes(false)
        }, 
        updateItem(index){
            this.isUpdateItem = true
            this.index = index
            this._.assign(this.socialsItem,this.socialsArray[index])  
        },
        updateSingle(){
            this._.assign(this.socialsArray[this.index], this.socialsItem)  
            this.clearItem()
            
            let allSocials = this.$store.state.socialsForm.allSocials
            this.$store.state.socialsForm.allValidSocials = this._.differenceBy(allSocials, this.socialsArray, 'name')
        
        },
        removeItem(index){
            this.socialsArray.splice(index, 1)
        }
    },
}
</script>