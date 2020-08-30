<template>
    <div class="stuff-item">
        <div class="stuff-field">
            <b-field>
                <b-input 
                    required
                    :placeholder="demoPopupForm.placeholder.name"
                    v-model="demosItem.name"
                    :validation-message="demoPopupForm.validation.name"
                ></b-input>
            </b-field>
            <b-field class="stuff-field__link">
                <b-input 
                    required
                    :placeholder="demoPopupForm.placeholder.file"
                    v-model="demosItem.link"
                    :validation-message="demoPopupForm.validation.file"
                ></b-input>    
                <p 
                    :class="index ? 'valid-url help is-danger' : 'first valid-url help is-danger'"
                    v-if="!demosItem.validURL"
                >{{demoPopupForm.validation.invalidLink}}</p>
            </b-field>
            <span v-if="showFisrt" class="close-icon" @click="removeItem(index)">
                <span class="inner-icon">x</span>                
            </span>
        </div>
        <accordion v-if="demosItem.validURL && demosItem.iframeMarkup && demosItem.link.length">
            <accordion-item :valid="demosItem.validURL && demosItem.iframeMarkup">
                <template slot="accordion-trigger">
                    <div v-if="demosItem.name">
                        <h3>{{demosItem.name}} {{demoPopupForm.preview}}</h3>
                    </div>                 
                    <div v-if="!demosItem.name">
                        <h3>{{demoPopupForm.preview}}</h3>
                    </div>                        
                </template>
                <template slot="accordion-content" v-if="demosItem.validURL && demosItem.iframeMarkup">
                    <iframe 
                        v-if="util.getYtbOmb(demosItem.link)"
                        :src="'//www.youtube.com/embed/'+demosItem.iframeMarkup"
                        frameborder="0" 
                        allowfullscreen
                    ></iframe>
                    <div v-if="!util.getYtbOmb(demosItem.link)">
                        <div v-html="demosItem.iframeMarkup"></div>
                    </div>
                </template>
            </accordion-item>
        </accordion>
    </div>
</template>

<script>
import Accordion from "@/components/Global/accordion/accordion";
import AccordionItem from "@/components/Global/accordion/accordion-item";

export default {
    props: ['demosItem', 'index', 'updated'],
    components: {
        Accordion, AccordionItem
    },
    watch: {
        demosItem: {            
            handler(val, oldVal){
                this.checkAllFields()
            },
            deep: true
        }
    },
    data () {
        return {
            demoPopupForm: this.$root.content.demoPopupForm,

        }
    },
    methods: {        
        checkAllFields(){
            // Variables  
            let item = this.$props.demosItem
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

            if( item.validURL && item.link && this.util.getYtbOmb(item.link) ) {
                item.iframeMarkup = this.util.getYtbOmb(item.link)
            } else if (item.validURL && item.link && this.util.validURL(item.link)) {
                if (new URL(item.link)) {
                    const link = new URL(item.link)
                    if(link.host === 'vimeo.com') {
                        axios
                            .get('https://vimeo.com/api/oembed.json?url='+item.link)
                            .then(res => {
                                item.iframeMarkup = res.data.html
                            })
                            .catch(err => {
                                this.submitDisabled = true
                                item.iframeMarkup = false
                            });
                    } else {
                        item.iframeMarkup = false
                    }
                } else {                            
                    item.iframeMarkup = false
                }
            } else {   
                item.iframeMarkup = false
            }

            this.$emit('submitDisabled', obj) 
        },      
        removeItem(index){
            this.$emit('removeItem', index)
        },
        updateSocial(selectedItem){
            if ( selectedItem ) {
                const selected = selectedItem.selectedItem
                const index = selectedItem.index
                const socials = this.$store.getters.socials
                const socialsState = this.$store.state.socialsForm.socials
                
                const socialsArray = this.socialsArray
                
                if(socials.includes(selected)) {
                    socialsState.map(item => {
                        if(item.social){
                            if (selected === item.social) {
                                this.demosItem.name = item.social.name
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

<style>

</style>