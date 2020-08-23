<template>
    <section class="group-steps stuff-popup-form">
        <h2 class="title">{{$root.content.demoPopupFrom.labels.demo}}</h2> 
        <div>
            <b-button
                class="button is-success submit-button stuff-popup add-new" 
                @click="addNew"           
            >
                {{$root.$root.content.globalForms.buttons.addNew}}
            </b-button>
        </div>  
        <input-list :demosArray="demosArray" @checkArr="checkSubmit" />
        <footer-buttons :demosArray="demosArray" :submitDisabled="submitDisabled" :updated="true" />
    </section>
</template>

<script>
import axios from 'axios'
import router from '@/store/routes/group-form'

import footerButtons from '../ui/footerButtons'
import inputList from '@/components/Global/popup-form/demo/inputList'

import {mapActions} from 'vuex'

export default {
    components: {
        footerButtons, inputList
    },
    async mounted(){        
        const obj = {
            name: 'test'
        }

        await this.getGroupByName(obj)
        
        const newArray = this.$store.state.groupForm.demo

        this.demosArray = newArray.map(item => {
            item.validURL = this.util.validURL(item.link)
            const iframeMarkup = this.checkLink(item)
            return {                
                link: item.link,
                name: item.name,
                validURL: item.validURL,
                iframeMarkup: iframeMarkup
            }
        })
    },
    data(){
        return {   
            demosArray: [],
            submitDisabled: true
        }
    },
    methods: {
        ...mapActions(['getGroupByName']),
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
        },
        checkLink(item){
            item.validURL = this.util.validURL(item.link)
            if( item.validURL && item.link && this.util.getYtbOmb(item.link) ) {
                item.iframeMarkup = this.util.getYtbOmb(item.link)
            } else if (item.validURL && item.link && this.util.validURL(this.link)) {
                if (new URL(item.link)) {
                    const link = new URL(item.link)
                    if(link.host === 'vimeo.com') {
                        axios
                            .get('https://vimeo.com/api/oembed.json?url='+item.link)
                            .then(res => {
                                item.iframeMarkup = res.data.html
                            })
                            .catch(err => {
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

            return item.iframeMarkup
        }
    },
}
</script>