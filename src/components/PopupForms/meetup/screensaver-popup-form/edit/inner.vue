<template>
    <section class="group-steps stuff-popup-form">
        <b-loading style="margin:15px" :is-full-page="false" :active.sync="loader" :can-cancel="false"></b-loading>
        
        <p style="margin:-10px 0px 20px 0px">
            {{content.description}}
        </p>
        <!-- <div class="scr-saver-fileld stuff-field__link">
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
        </div> -->
        <div class="columns">
            <div class="column">
                <h2 class="title">{{content.create.labels.video}}</h2>
                <p class="warn">{{$root.content.common.filesizelimit}}</p>
                <section class="file-uploader file-uploader--video">
                    <b-field>
                        <b-upload v-model="previewFile"
                            :class="[ !previewFileValid ? 'invalid-file': '']"
                            drag-drop
                            @input="updatePreview"
                            required
                        >
                            <section class="section">
                                <div class="content has-text-centered">
                                    <p>
                                        <b-icon
                                            icon="upload"
                                            size="is-large">
                                        </b-icon>
                                    </p>
                                    <p>{{$root.content.groupPopupForm.validation.dropFile}}</p>
                                </div>
                            </section>
                        </b-upload>
                    </b-field>
                    <div class="tags">
                        <span class="file-name" v-if="previewFile">
                            {{ previewFile.name }}
                        </span>
                        <span v-if="!previewFileValid" class="help is-danger">
                            {{$root.content.groupPopupForm.validation.invalidFileType}}
                        </span>
                    </div>
                </section>
            </div>
            <div class="column">
                <h2 class="title">{{content.create.labels.preview}}</h2>

                <template v-if="showBg()">
                    <template v-if="util.isVideo(screensaver)">       
                        <div class="confirm-data__col-value confirm-data__col-value--bg--square" style="position: relative;">
                            <video controls>
                                <div class="scr-saver-fileld__bg" 
                                    :style="{ backgroundColor: activeCP ? defaultColor : '#333', opacity: activeCP ? .6 : 0}">
                                </div>
                                <source :src="screensaver">
                            </video>
                        </div>
                    </template>
                    <!-- preview if image -->
                    <template v-if="util.isImage(screensaver)">                            
                        <div class="confirm-data__col-value confirm-data__col-value--bg--square" style="position: relative;">
                            <div class="scr-saver-fileld__bg" 
                                :style="{ backgroundColor: activeCP ? defaultColor : '#333', opacity: activeCP ? .6 : 0}">
                            </div>
                            <img :src="screensaver" alt="">
                        </div>
                    </template>
                    <template>
                        <div class="close-icon" @click="deleteBg">
                            <span>x</span>
                        </div>
                    </template>
                </template>

                <div v-if="previewFile.name">
                    <!-- preview if video -->
                    <template v-if="util.isVideo(previewFile.name)">       
                        <div class="confirm-data__col-value confirm-data__col-value--bg--square" style="position: relative;">
                            <div class="scr-saver-fileld__bg" 
                                :style="{ backgroundColor: activeCP ? defaultColor : '#333', opacity: activeCP ? .6 : 0}">
                            </div>
                            <video controls>
                                <source :src="previewUplodated">
                            </video>
                        </div>
                    </template>
                    <!-- preview if image -->
                    <template v-if="util.isImage(previewFile.name)">                            
                        <div class="confirm-data__col-value confirm-data__col-value--bg--square" style="position: relative;">
                            <div class="scr-saver-fileld__bg" 
                                :style="{ backgroundColor: activeCP ? defaultColor : '#333', opacity: activeCP ? .6 : 0}">
                            </div>
                            <img :src="previewUplodated" alt="">
                        </div>
                    </template>
                    <!-- delete button -->
                    <template>
                        <div class="close-icon" @click="deleteBg">
                            <span>x</span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="scr-saver-fileld scr-saver-fileld--cp">
            <b-switch v-model="activeCP">{{content.backdrop}}</b-switch>
            <div v-if="activeCP" class="scr-saver-fileld__colorpicker">
                <colorPicker :color="defaultColor" v-model="defaultColor"/>
            </div>
        </div>
        <!-- <div class="wrapper">        
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
                    :style="{ backgroundColor: activeCP ? defaultColor : '#333', opacity: activeCP ? .6 : 0}">
                </div>
                <div class="preview-item-wrap">
                    <div class="preview-item">
                        <div 
                            class="preview-item__logo"
                            :style="{ backgroundImage: `url(${$root.meetup.image})`,
                            backgroundRepeat: 'round' }"
                        >
                        </div>
                        <div class="preview-item__title">{{$root.meetup.company_name}}</div>
                    </div>
                </div>
            </div> 
        </div>  -->
        <div class="sbt-btn">
            <!-- <b-button
                outlined
                type="is-danger"
                @click="close"
                class="button is-danger is-outlined"
            >
                {{global_content.buttons.cancel}}
            </b-button>  -->
            <b-button
                class="button is-success is-outlined submit-button"  
                :disabled="submitDisabled"
                @click="submit()"
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
    async mounted () {
        this.loader = true
        const obj = {
            id: this.$root.meetup._id
        }
        await this.getMeetupById(obj)
        this.meetup = this.$store.state.meetupForm
        this.defaultColor = this.meetup.screensaverColor
        this.screensaver = this.meetup.screensaver;
        this.updatePreview()
    },
    data () {
        return {
            content: this.$root.content.screenSaverPopupFrom,
            global_content: this.$root.content.globalForms,

            meetup: {},
            link: '',
            iframeMarkup: false,
            validURL: true,
            activeCP: this.$root.meetup.screensaverColor ? true : false,
            defaultColor: '',
            submitDisabled: false,
            loader: true,

            previewFile: {},
            PfileUplodated: false,
            previewFileValid: true,
            previewUplodated: "",
            previewToup: ""
        }
    },
    watch: {
        link() {
            this.checkLink()
        },
        activeCP () {
            if ( !this.activeCP ) 
                this.defaultColor = ""
        }
    },
    methods: {
        ...mapActions(['getMeetupById']),

        showBg () {
            if (!this.loader) {
                // console.log(219, this.screensaver.split(this.communitySrv)[1], this.previewUplodated);
				if (this.screensaver.split(this.communitySrv)[1])
					return true
				else
					return false
            }
            else
                return false
		},

        updatePreview (e) {
            try {
                if ( this.previewFile.size > 1000000 ) {
					this.$root.createError(this.$root.content.ErrorMessages[12], 'oops')
				}
				else {
                    if ( this.previewFile ) {
                        const name = this.previewFile.name
                        if(this.util.isImage(name)){
                            const image = this.previewFile
                            const reader = new FileReader()
        
                            reader.readAsDataURL(image)
                            reader.onload = e => {
                                this.previewUplodated = e.target.result
                                this.previewToup = e.target.result
                            }
                        }
                        
                        else if ( this.util.isVideo(name) ) {
                            const video = this.previewFile
                            const reader = new FileReader()
                            reader.readAsDataURL(video)
                            this.previewUplodated = URL.createObjectURL(video)
                            reader.onload = e => {
                                this.previewToup = e.target.result
                            }
                            this.previewFileValid = true
                        }
                    }
                    
                    this.loader = false
                }
			}
			catch (e) {
                console.log(e);
            }
        },

        deleteBg () {
			this.filePreview = ""
			this.previewFile = {}
			this.previewUplodated = ""
            this.screensaver = ""
            this.previewToup = ""
        },
        
        submit(){
            this.submitDisabled = true
            this.loader = true
            const id = this.$root.meetup._id

            let filePreview = '',
            formatPreview =  '',
            fileNamePreview = '';
            
            if ( this.previewFile )
				if(this.previewFile.name) {
					filePreview = this.previewToup
					fileNamePreview = this.previewFile.name
					formatPreview = fileNamePreview.slice(fileNamePreview.lastIndexOf('.'), fileNamePreview.length)
				}

            const obj = {
                id: id,
                screensaver: filePreview,
                screensaverExt: formatPreview,
                screensaverColor: this.defaultColor,
                update: true
            }
            router.postAddScreensaver(obj)
        
            this.loader = false
            window.EventBus.$emit('ScreenSaverPopupForm:close')
            this.submitDisabled = false
        },
        // checkLink(){
        //     this.validURL = this.util.validURL(this.link)

        //     if ( this.validURL && this.link && this.util.getYtbOmb(this.link) ) {
        //         this.iframeMarkup = this.util.getYtbOmb(this.link)
        //     }
        //     else if (this.validURL && this.link && this.util.validURL(this.link)) {
        //         if ( new URL(this.link) ) {
        //             const link = new URL(this.link)
        //             if ( link.host === 'vimeo.com' ) {
        //                 axios
        //                     .get('https://vimeo.com/api/oembed.json?url='+this.link)
        //                     .then(res => {
        //                         this.iframeMarkup = res.data.html
        //                     })
        //                     .catch(err => {
        //                         this.submitDisabled = true
        //                         this.iframeMarkup = false
        //                     });
        //             } else {
        //                 this.iframeMarkup = false
        //             }
        //         } else {                            
        //             this.iframeMarkup = false
        //         }
        //     } else {   
        //         this.iframeMarkup = false
        //     }

        //     if (this.validURL && this.link) {
        //         this.submitDisabled = false
        //     }  else {
        //         this.submitDisabled = true
        //     }
        // },
        close () {
            this.$parent.close()
        }
    },
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