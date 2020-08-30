<template> 
    <div class="stuff-item">
        <div class="stuff-field">
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
                    :placeholder="$root.content.demoPopupForm.placeholder.file"
                    v-model="socialsItem.link"
                    :validation-message="$root.content.demoPopupForm.validation.file"
                ></b-input>            
                <p 
                    :class="[index > 0 ? 'valid-url help is-danger' : 'valid-url help is-danger first' ]"
                    v-if="!socialsItem.validURL"
                >{{$root.content.demoPopupForm.validation.invalidLink}}</p>
            </b-field>
            <span class="close-icon" v-if="showFisrt" @click="removeItem(index)">
                <span class="inner-icon">x</span>                
            </span>
        </div>
    </div>
</template>

<script>
import autocompleteSocials from './autocompleteSocials'
import {mapMutations} from 'vuex'

export default {
    props: ['socialsItem', 'index', 'updated'],
    components: {
        autocompleteSocials
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
        checkAllFields(){
            // Variables  
            let item = this.$props.socialsItem
            let validArray = []        
            // Check required fields
            let validName = Boolean(item.name.length) 
            let validfile = Boolean(item.link.length) && this.util.validURL(item.link)
            validArray.push(validName && validfile)
            // Check valid link 
            if(item.link.length && !this.util.validURL(item.link)) item.validURL = false
            else item.validURL = true          
            // Check count valid socials            
            const obj = {
                index: this.$props.index,
                submitDisabled: validArray.includes(false)
            }

            this.$emit('submitDisabled', obj) 
        },      
        removeItem(index){
            this.$emit('removeItem', index)
        },
        updateSocial(selectedItem){
            if(selectedItem){
                const selected = selectedItem.selectedItem
                const index = selectedItem.index
                const socials = this.$store.getters.socials
                const socialsState = this.$store.state.socialsForm.socials
                
                const socialsArray = this.socialsArray
                
                if(socials.includes(selected)) {
                    socialsState.map(item => {
                        if(item.social){
                            if (selected === item.social) {
                                this.socialsItem.name = item.social.name
                                this.checkAllFields()
                            }
                        }
                    })
                } else {
                    this.socialsArray[index].name = ''
                    this.submitDisabled = true
                }
            } else {
                this.submitDisabled = true
            }
        },
    },
    computed: {
        showFisrt(){
            if(this.$props.index === 0) return this.$props.updated
            else return true
        }
    }
}
</script>