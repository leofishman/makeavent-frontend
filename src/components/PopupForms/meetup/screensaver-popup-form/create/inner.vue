<template>
    <section class="group-steps stuff-popup-form">
        <b-loading :is-full-page="false" :active.sync="loader" :can-cancel="false"></b-loading>

        <h2 class="title">{{content.create.labels.video}}</h2>     
        <div class="scr-saver-fileld stuff-field__link">
            <b-field>
                <b-input 
                    required
                    v-model="link"
                    :placeholder="global_content.placeholders.exmLink"
                    :validation-message="global_content.validation.required"
                ></b-input>
                <p 
                    class="valid-url help is-danger"
                    v-if="!validURL && link"
                >{{content.invalidLink}}</p>
            </b-field>
        </div>
        <div class="scr-saver-fileld scr-saver-fileld--cp">
            <b-switch v-model="activeCP">{{content.backdrop}}</b-switch>
            <div v-if="activeCP" class="scr-saver-fileld__colorpicker">
                <colorPicker  :color="defaultColor" v-model="defaultColor"/>
            </div>
        </div>
        <h2 class="title">{{content.create.labels.preview}}</h2>  
        <div class="wrapper">        
            <div class=" frame-container scr-saver-fileld__iframe" >
                <iframe 
                    v-if="util.getYtbOmb(link) && util.validURL(link)"
                    :src="'//www.youtube.com/embed/'+iframeMarkup+'?rel=0&version=3&&amp&mute=1&loop=1&fs=0&amp&autoplay=1&controls=0&cc_load_policy=0&playsinline=0&fs=0&disablekb=0&playlist='+iframeMarkup"
                    frameborder="0" 
                    allowfullscreen
                ></iframe>
                <div v-if="!util.getYtbOmb(link) && util.validURL(link)">
                    <div v-html="iframeMarkup"></div>
                </div>
                <div class="scr-saver-fileld__bg" 
                :style="{ backgroundColor: activeCP ? defaultColor : '#333', opacity: activeCP ? .6 : 1}">
                </div>
                <div class="preview-item-wrap">
                    <div class="preview-item">
                        <div 
                            class="preview-item__logo"
                            :style="{ backgroundImage: config.server_url+meetup.logo}"
                        >
                        </div>
                        <div class="preview-item__title">{{meetup.meetup_name}}</div>
                    </div>
                </div>
            </div> 
        </div> 
        <div class="sbt-btn">
            <b-button
                outlined
                type="is-danger"
                @click="$parent.close"
                class="button is-danger is-outlined"
            >
                {{global_content.buttons.cancel}}
            </b-button> 
            <b-button
                class="button is-success is-outlined submit-button"  
                :disabled="submitDisabled"
                @click="submit"           
            >
                {{global_content.buttons.submit}}
            </b-button>
        </div>
    </section>
</template>

<script>
import router from '@/store/routes/meetup-form'
import {mapActions} from 'vuex'
import colorPicker from '@/components/Global/colorpicker'

export default {
    components: {
        colorPicker
    },
    async mounted(){
        this.loader = true
        const obj = {
            id: this.$root.meetup._id
        }
        await this.getMeetupById(obj)
        this.meetup = this.$store.state.meetupForm
        this.loader = false
    },
    data(){
        return {
            content: this.$root.content.screenSaverPopupFrom,
            global_content: this.$root.content.globalForms,

            meetup: {},
            link: '',
            iframeMarkup: false,
            validURL: true,
            activeCP: true,
            defaultColor: '',
            submitDisabled: true,
            loader: false
        }
    },
    watch: {
        link() {
            this.checkLink()
        }
    },
    methods: {
        ...mapActions(['getMeetupById']),
        submit(){

            const id = this.$root.meetup._id
            if(this.validURL && this.link && id) {
                const obj = {
                    id: id,
                    screensaver: this.link,
                    screensaverColor: this.defaultColor
                }
                router.postAddScreensaver(obj)
            }
            
        },
        checkLink(){
            this.validURL = this.util.validURL(this.link)
            if( this.validURL && this.link && this.util.getYtbOmb(this.link) ) {
                this.iframeMarkup = this.util.getYtbOmb(this.link)
            } else if (this.validURL && this.link && this.util.validURL(this.link)) {
                if (new URL(this.link)) {
                    const link = new URL(this.link)
                    if(link.host === 'vimeo.com') {
                        axios
                            .get('https://vimeo.com/api/oembed.json?url='+this.link)
                            .then(res => {
                                this.iframeMarkup = res.data.html
                            })
                            .catch(err => {
                                this.submitDisabled = true
                                this.iframeMarkup = false
                            });
                    } else {
                        this.iframeMarkup = false
                    }
                } else {                            
                    this.iframeMarkup = false
                }
            } else {   
                this.iframeMarkup = false
            }

            if (this.validURL && this.link) {
                this.submitDisabled = false
            }  else {
                this.submitDisabled = true
            }
        }
    }
}
</script>

<style >
.frame-container {
    position: relative;
    padding-bottom: 48.25%; /* 16:9 */  
    padding-top: 25px;
    width: 300%; /* enlarge beyond browser width */
    left: -100%; /* center */
}

.frame-container iframe {
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
}
.wrapper {
   overflow: hidden;
   max-width: 100%;
   margin-bottom: 30px;
}
.button.button.is-danger.is-outlined.is-danger.is-outlined {
    margin-right: 21px;
}
</style>