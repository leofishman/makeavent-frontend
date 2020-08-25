<template>

    <section class="group-steps">
        <!-- <h2 class="form-title">{{$root.content.groupEditPopupForm.title}}</h2> -->
        <div class="group-popup-form--edit-from__scroll">
            <div class="edit-field basic-info">
                <h2 class="title">{{$root.content.meetupPopupForm.labels.title}}</h2>         
                <b-field>
                    <b-input 
                        :placeholder="$root.content.meetupPopupForm.placeholders.company_name"
                        v-model="company_name"
                        :validation-message="$root.content.meetupPopupForm.validation.name"
                        required 
                    >
                    </b-input>
                </b-field>
                <b-field>
                    <b-input 
                        v-model="company_description"
                        :placeholder="$root.content.meetupPopupForm.placeholders.company_description"
                        maxlength="200" 
                        type="textarea"
                        :validation-message="$root.content.meetupPopupForm.validation.massage"
                        required
                    >
                    </b-input>
                </b-field>
            </div>

            <div class="edit-field">  
                <b-field>
                    <b-input 
                        :placeholder="$root.content.meetupPopupForm.placeholders.name"
                        v-model="name"
                        :validation-message="$root.content.meetupPopupForm.validation.name"
                        required 
                    >
                    </b-input>
                </b-field>
                <b-field>
                    <b-input 
                        v-model="message"
                        :placeholder="$root.content.meetupPopupForm.placeholders.massage"
                        maxlength="200" 
                        type="textarea"
                        :validation-message="$root.content.meetupPopupForm.validation.massage"
                        required
                    >
                    </b-input>
                </b-field>     
            </div>

            <div class="edit-field location-field">
                <h2 class="title">{{$root.content.meetupPopupForm.labels.date}}</h2>                
                <b-field class="input-date">
                    <b-datetimepicker
                        :placeholder="$root.content.meetupPopupForm.placeholders.date"
                        icon="calendar-today"
                        v-model="date">
                    </b-datetimepicker>
                </b-field>
            </div>

            <div class="edit-field logo-field">
                <h2 class="title">{{$root.content.meetupPopupForm.labels.logo}}</h2>
                <section class="file-uploader">
                    <b-field>
                        <b-upload v-model="file"
                            drag-drop
                            @input="updateLogo"
                            required
                        >
                            <section class="section">
                                <div class="$root.content has-text-centered">
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
                    <!-- <div class="tags">
                        <span class="file-name" v-if="file">
                            {{ file.name }}
                        </span>
                    </div> -->
                    <div class="preview-image" v-if="!fileUplodated">
                        <img :src="logo" alt="">
                    </div>
                    <div class="preview-image" v-if="fileUplodated">
                        <img :src="fileUplodated" alt="">
                    </div>
                </section>
            
            </div>

            <div class="edit-field interets-field">
                <h2 class="title">{{$root.content.meetupPopupForm.labels.preview}}</h2>
                <section class="file-uploader">
                    <b-field>
                        <b-upload v-model="previewFile"
                            drag-drop
                            @input="updatePreview"
                            required
                        >
                            <section class="section">
                                <div class="$root.content has-text-centered">
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
                    <!-- <div class="preview-image" v-if="util.isImage(previewFile.name)">
                        <img :src="previewUplodated" alt="">
                    </div>
                    <div class="preview-image" v-if="util.isVideo(previewFile.name)">
                        <video controls>
                            <source :src="previewUplodated">
                        </video>
                    </div> -->
                    <template v-if="_.isEmpty(previewFile)">
                        <div class="preview-image" v-if="util.isImage(previewUplodated)">
                            <img :src="previewUplodated" alt="">
                        </div>
                        <div class="preview-image" v-if="util.isVideo(previewUplodated)">
                            <video controls>
                                <source :src="previewUplodated">
                            </video>
                        </div>
                    </template>
                    <template v-if="previewFile.name">
                        <div class="preview-image" v-if="util.isImage(previewFile.name)">
                            <img :src="previewUplodated" alt="">
                        </div>
                        <div class="preview-image" v-if="util.isVideo(previewFile.name)">
                            <video controls>
                                <source :src="previewUplodated">
                            </video>
                        </div>
                    </template>
                    <!-- <div class="tags">
                        <span class="file-name" v-if="previewFile">
                            {{ previewFile.name }}
                        </span>
                    </div> -->
                </section>
            </div>
        </div>

        <div class="group-steps__buttons">
            <b-button
                outlined
                type="is-danger"
            >
                {{$root.content.globalForms.buttons.cancel}}
            </b-button>        
            <b-button
                class="button is-success is-outlined submit-button"  
                :disabled="saveDisabled"
                @click.prevent="submit"           
            >
                {{$root.content.globalForms.buttons.submit}}
            </b-button>
        </div>
    </section>
</template>

<script>
import {mapActions} from 'vuex'
import MeetupFormRoutes from '@/store/routes/meetup-form'

export default {
  data(){
    return {
        name: '',
        message: '',
        company_name: '',
        company_description: '',
        date: new Date(),
        file: {},  
        fileUplodated: false,
        previewFile: {},  
        previewUplodated: false,
        saveDisabled: false,

        logo: '',
        background: '',
        previewToup: false
    }
  },
  watch: {
      name() {
        this.сheckAllFields()
      },
      message() {
        this.сheckAllFields()
      },
      company_name() {
        this.сheckAllFields()
      },
      company_description() {
        this.сheckAllFields()
      },
      date() {
        this.сheckAllFields()
      },
  },
  async mounted(){
        const obj = {
            id: this.$root.meetup._id
        }
        await this.getMeetupById(obj)
        this.name = this.$store.state.meetupForm.name;
        this.message = this.$store.state.meetupForm.message;
        this.company_name = this.$store.state.meetupForm.company_name;
        this.company_description = this.$store.state.meetupForm.company_description
        this.message = this.$store.state.meetupForm.message;
        const date = new Date(Date.parse(this.$store.state.meetupForm.date));

        this.logo = this.config.server_url+this.$store.state.meetupForm.logo;
        this.background = this.config.server_url+this.$store.state.meetupForm.preview;
        this.previewUplodated = this.config.server_url+this.$store.state.meetupForm.preview;
  },
  methods: {      
    ...mapActions(['getMeetupById']),
    updateLogo(e){
        if(this.file) {
            const image = this.file

            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onload = e => {
                this.fileUplodated = e.target.result
            }

            
            this.saveDisabled = false
        }
        else this.saveDisabled = true
    },
    updatePreview(e){
        if(this.previewFile) {
            const name = this.previewFile.name
            if(this.util.isImage(name)){
                const image = this.previewFile
                const reader = new FileReader()

                reader.readAsDataURL(image)
                reader.onload = e => {
                    this.previewUplodated = e.target.result
                    this.previewToup = e.target.result
                }
            } else if (this.util.isVideo(name)){
                const video = this.previewFile
                const reader = new FileReader()
                reader.readAsDataURL(video)
                this.previewUplodated = URL.createObjectURL(video)
                reader.onload = e => {
                    this.previewToup = e.target.result
                }
                this.previewFileValid = true
                this.nextDisabled = false
            }
            
            this.saveDisabled = false
        }
        else this.saveDisabled = true
    },
    сheckAllFields(){
        const name = this.name;
        const message = this.message;
        const company_name = this.company_name;
        const company_description = this.company_description;
        const logo = this.$store.state.meetupForm.logo;   
        // if(validLocation && name && message && logo && interest && subInterest ){
        if(name && message && logo && company_name && company_description){
            this.saveDisabled = false
            return true
        } else {
            this.saveDisabled = true
            return false
        }
    },
    // Submit form
    async submit() {
        const name = this.name;
        const description = this.message;
        const company_name = this.company_name;
        const company_description = this.company_description;
        const date = this.date;

        let file =  '', 
            fileName =  '',
            format =  '',
            filePreview =  '',
            formatPreview =  '',
            fileNamePreview = ''

        if(this.file.name) {
            file = this.fileUplodated
            fileName = this.file.name
            format = fileName.slice(fileName.lastIndexOf('.'), fileName.length)
        }

        if(this.previewFile.name) {
            filePreview = this.previewToup
            fileNamePreview = this.previewFile.name
            formatPreview = fileNamePreview.slice(fileNamePreview.lastIndexOf('.'), fileNamePreview.length)
        }
        
        const data = {    
            id: this.$root.meetup._id,
            name: name,
            description: description,
            company_name: company_name,
            company_description: company_description,
            date: date,
            image: file,
            preview: filePreview,
            ext: format,                      
            previewExt: formatPreview,
        }
        const res = await MeetupFormRoutes.postUpdate(data)
        return false
    },
  }
}
</script>
<style lang="scss">
.edit-field .file-uploader {
    display: flex;
    .preview-image {
        margin-left: 20px;
        video, img {
            max-width: 470px;
            max-height: 190px;
            object-fit: cover;
        }
    }
    @media (max-width: 575.98px) {
        flex-flow: column;
    }
}
</style>