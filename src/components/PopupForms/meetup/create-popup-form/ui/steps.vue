<template>
    <section class="group-steps">
        <b-loading class="loading-overlay--dark" style="margin:15px" :is-full-page="false" :active.sync="loading" :can-cancel="false"></b-loading>

        <b-steps
            v-model="activeStep"
            :animated="isAnimated"
            :rounded="isRounded"
            :has-navigation="hasNavigation"
            :label-position="labelPosition"
            :mobile-mode="mobileMode"            
            @change="changeStep"
        >   
            <!-- Company info -->
            <b-step-item step="1" :label="content.stepName.company" :clickable="isStepsClickable" disabled>
                <company-step @update="updateCompany"/>
            </b-step-item>
            <!-- End Company info -->            
            <!-- Base info -->
            <b-step-item step="2" :label="content.stepName.name" :clickable="isStepsClickable" disabled>
                <h2 class="title">{{content.labels.title}}</h2>
                <b-field>
                    <b-input 
                        :placeholder="content.placeholders.name"
                        v-model="name"
                        :validation-message="content.validation.name"
                        required 
                    >
                    </b-input>
                </b-field>
                <b-field>
                    <b-input 
                        v-model="message"
                        :placeholder="content.placeholders.massage"
                        maxlength="200" 
                        type="textarea"
                        :validation-message="content.validation.massage"
                        required
                    >
                    </b-input>
                </b-field>
            </b-step-item>
            <!-- END Base info -->
            <!-- Logo -->
            <b-step-item step="3" :label="content.stepName.date" :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}">
                <h2 class="title">{{content.placeholders.date}}</h2>                
                <b-field class="input-date">
                    <b-datetimepicker
                        :placeholder="content.placeholders.date"
                        icon="calendar-today"
                        v-model="date"
                        @input="inputDate">
                    </b-datetimepicker>
                </b-field>
            </b-step-item>
            <!-- Logo -->
            <b-step-item step="4" :label="content.stepName.logo" :clickable="isStepsClickable" disabled>
                <h2 class="title">{{content.labels.logo}}</h2>
                <div class="columns">
                    <div class="collumn">
                        <section class="file-uploader">
                            <b-field>
                                <b-upload v-model="file"
                                    :class="[ !fileValid ? 'invalid-file': '']"
                                    drag-drop
                                    @input="updateLogo"
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
                                <span class="file-name" v-if="file">
                                    {{ file.name }}
                                </span>
                                <span v-if="!fileValid" class="help is-danger">
                                    {{$root.content.groupPopupForm.validation.invalidFileType}}
                                </span>
                            </div>
                        </section>
                    </div>
                    <div v-if="fileUplodated" class="column">
                        <div class="confirm-data__col-value confirm-data__col-value--img">
                            <img style="object-fit:contain" :src="fileUplodated" alt="">
                        </div>
                    </div>
                </div>
            </b-step-item>
            <!-- END Logo -->
            <!-- Preview -->
            <b-step-item step="5" :label="content.stepName.preview" :clickable="isStepsClickable" disabled>
                <h2 class="title">{{content.labels.preview}}</h2>
                <div class="columns">
                    <div class="column">
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
                        <template v-if="util.isVideo(previewFile.name)">       
                            <div class="confirm-data__col-value confirm-data__col-value--bg">
                                <video controls>
                                    <source :src="PfileUplodated">
                                </video>
                            </div>
                        </template>
                        <template v-if="util.isImage(previewFile.name)">                            
                            <div class="confirm-data__col-value confirm-data__col-value--bg">
                                <img :src="PfileUplodated" alt="">
                            </div>
                        </template>
                    </div>
                </div>
            </b-step-item>
            <!-- END preview -->
            <b-step-item step="6" :label="content.stepName.confirm" :clickable="isStepsClickable">
                <h2 class="title last-step">{{content.labels.confirm}}</h2>
                <div class="confirm-data">
                    <div class="confirm-data__row">
                        <div class="confirm-data__col-field">{{content.confirmFields.company_name}}</div>
                        <div class="confirm-data__col-value">{{company_name}}</div>
                    </div>
                    <div class="confirm-data__row confirm-data__row--description">
                        <div class="confirm-data__col-field">{{content.confirmFields.company_description}}</div>
                        <div class="confirm-data__col-value">{{company_description}}</div>
                    </div>
                    <div class="confirm-data__row">
                        <div class="confirm-data__col-field">{{content.confirmFields.name}}</div>
                        <div class="confirm-data__col-value">{{name}}</div>
                    </div>
                    <div class="confirm-data__row confirm-data__row--description">
                        <div class="confirm-data__col-field">{{content.confirmFields.massage}}</div>
                        <div class="confirm-data__col-value">{{message}}</div>
                    </div>
                    <div class="confirm-data__row">
                        <div class="confirm-data__col-field">{{content.confirmFields.date}}</div>
                        <div class="confirm-data__col-value">{{formatDate}}</div>
                    </div>
                    <div class="confirm-data__row confirm-data__row--img-bg">
                        <div class="confirm-data__col-field">{{content.confirmFields.images}}</div>
                        <div class="confirm-data__col-value confirm-data__col-value--img">
                            <img style="object-fit:contain" :src="fileUplodated" alt="">
                        </div>
                        <template v-if="util.isVideo(previewFile.name)">       
                            <div class="confirm-data__col-value confirm-data__col-value--bg">
                                <video controls>
                                    <source :src="PfileUplodated">
                                </video>
                            </div>
                        </template>
                        <template v-if="util.isImage(previewFile.name)">                            
                            <div class="confirm-data__col-value confirm-data__col-value--bg">
                                <img :src="PfileUplodated" alt="">
                            </div>
                        </template>
                    </div>
                </div>
            </b-step-item>

            <template
                v-if="customNavigation"
                slot="navigation"
                slot-scope="{previous, next}"                
            >
                <div class="group-steps__buttons">
                    <b-button
                        outlined
                        type="is-danger"
                        @click="close"
                        v-if="firstStep"
                    >
                        {{$root.content.globalForms.buttons.cancel}}
                    </b-button>       
                    <b-button
                        outlined
                        type="is-danger"
                        :disabled="previous.disabled"
                        @click.prevent="previous.action"
                        v-if="!firstStep"
                    >
                        {{$root.content.globalForms.buttons.back}}
                    </b-button>                    
                    <b-button
                        outlined
                        type="is-success"
                        :disabled="nextDisabled"
                        @click.prevent="next.action"            
                        v-if="!lastStep"  
                    >
                        {{$root.content.globalForms.buttons.next}}
                    </b-button>
                    <b-button
                        class="button is-success is-outlined submit-button"  
                        @click.prevent="submit"         
                        v-if="lastStep"  
                    >
                        {{$root.content.globalForms.buttons.submit}}
                    </b-button>
                </div>
            </template>
        </b-steps>
    </section>
</template>

<script>
    import {mapActions} from 'vuex'
    import MeetupFormRoutes from '@/store/routes/meetup-form'

    import CompanyStep from './CompanyStep'

    export default {
        components: {
            CompanyStep
        },
        mounted () {
            let timer = setInterval(() => {
                if ( document.querySelector('.date-placeholder') ) {
                    clearInterval(timer)
                    this.hideDatePlaceholder()
                }
            })
        },
        watch: {
            name(){                                 
                const validDate = this.name.length && this.message.length
                // if(validDate) this.nextDisabled = false
                // else this.nextDisabled = true
                return this.name
            },
            message(){               
                const validDate = this.name.length && this.message.length
                // if(validDate) this.nextDisabled = false
                // else this.nextDisabled = true
                return this.message
            },
            date(){
                const validDate = this.date.getTime() !== this.currentDate.getTime()
                if(validDate) this.nextDisabled = false
                else this.nextDisabled = true
                return this.date
            }
        },
        data() {
            return {
                content: this.$root.content.meetupPopupForm,
                activeStep: 0,
                loading: false,

                isAnimated: true,
                isRounded: true,
                isStepsClickable: false,

                hasNavigation: false,
                customNavigation: true,
                isProfileSuccess: false,

                labelPosition: 'bottom',
                mobileMode: 'minimalist',

                name: '',
                message: '',
                company_name: '',
                company_description: '',
                date: new Date(),
                file: {},  
                fileUplodated: false,
                fileValid: true,
                previewFile: {},  
                PfileUplodated: false,
                previewFileValid: true,
                currentDate: new Date(),
                nextDisabled: false,
            }
        },
        methods: {
            close () {
                window.EventBus.$emit('CreateNewMeetup:close')
            },

            updateCompany(obj){
                this.company_name = obj.company_name
                this.company_description = obj.company_description
                // this.nextDisabled = !obj.valid
                this.nextDisabled = false
            },
            changeStep() {                
                const currentStep = this.activeStep+1
                const validCompany = Boolean(this.company_name.length && this.message)
                const validStep = Boolean(this.name.length && this.company_description.length)
                const validDate = this.date.getTime() !== this.currentDate.getTime()

                // if(currentStep === 1 && validCompany) this.nextDisabled = false
                // if(currentStep === 2 && validStep) this.nextDisabled = false
                // if(currentStep === 3 && validDate) this.nextDisabled = false
                // else if(currentStep === 4 && this.fileUplodated) this.nextDisabled = false
                // else if(currentStep === 5 && this.PfileUplodated) this.nextDisabled = false
                // else if (currentStep !== 1 && currentStep !== 2 && currentStep !== 4) this.nextDisabled = true                
            },
            // End steps checkers
            hideDatePlaceholder(){
                const elInput = document.querySelector('.field.input-date input')
                const elPlaceholder = document.querySelector('.date-placeholder')

                elPlaceholder.addEventListener('click', () => {
                    elInput.click()
                } )
            },
            inputDate(){
                const elem = document.querySelector('.group-steps .step-item .input-date');
                elem.classList.add('is-active')                
            },
            updateLogo (e) {
                try {
                    const fileName = this.file.name
                    
                    if ( this.file && this.util.isImage(fileName) ) {
                        const image = this.file
                        const reader = new FileReader()
                        reader.readAsDataURL(image)
                        reader.onload = e => {
                            this.fileUplodated = e.target.result
                        }
                        
                        this.fileValid = true
                        this.nextDisabled = false
                    }
                    else {
                        this.fileValid = false
                        this.nextDisabled = true
                    }
                }
                catch (e) {}
            },
            updatePreview (e) {
                try {
                    const fileName = this.previewFile.name
                    // && (this.util.isImage(fileName) || this.util.isVideo(fileName) )
                    if ( this.previewFile && this.util.isImage(fileName) ) {
                        const image = this.previewFile
                        const reader = new FileReader()
                        reader.readAsDataURL(image)
                        reader.onload = e => {
                            this.PfileUplodated = e.target.result
                        }                    
                        
                        this.previewFileValid = true
                        this.nextDisabled = false
                    } else if ( this.previewFile && this.util.isVideo(fileName) ) {
                        const video = this.previewFile
                        this.PfileUplodated = URL.createObjectURL(video)
    
                        this.previewFileValid = true
                        this.nextDisabled = false
                    } else {
                        this.previewFileValid = false
                        this.nextDisabled = true
                    }
                }
                catch (e) {}
            },
            // Submit form
            async submit() {
                this.loading = true

                const name = this.name;
                const description = this.message;

                const company_name = this.company_name;
                const company_description = this.company_description;

                const date = this.date;

                let fileName, format;
                if (this.file.name) {
                    fileName = this.file.name
                    format = fileName.slice(fileName.lastIndexOf('.'), fileName.length)
                }

                let fileNamePreview, formatPreview;
                if (this.previewFile.name) {
                    fileNamePreview = this.previewFile.name
                    formatPreview = fileNamePreview.slice(fileNamePreview.lastIndexOf('.'), fileNamePreview.length)
                }

                let PfileUplodated = '';
                if ( typeof this.PfileUplodated === 'string' ) PfileUplodated = this.PfileUplodated 
                else {
                    try {
                        const video = this.previewFile
                        const reader = new FileReader()
                        reader.readAsDataURL(video)
                        reader.onload = e => {
                            PfileUplodated = e.target.result
                        }
                    }
                    catch (e) {}
                }

                if(this.lastStep){
                    const data = {      
                        name: name,
                        description: description,
                        company_name: company_name,
                        company_description: company_description,
                        date: date,
                        image: this.fileUplodated,
                        preview: PfileUplodated,
                        ext: format,                      
                        previewExt: formatPreview,
                        groupName: 'test'
                    }
                    
                    const res = await MeetupFormRoutes.postAddMeetup(data)
                    this.close()

                    window.location.reload()
                    this.$buefy.dialog.alert(this.content.success)

                    this.loading = false
                    return false
                }
            },
        },
        computed: {
            lastStep(){
                const currentStep = this.activeStep+1
                return currentStep === 6
            },
            firstStep(){
                const currentStep = this.activeStep+1
                return currentStep === 1
            },
            formatDate(){
                let formatDate = ''
                formatDate += this.date.getDate()
                formatDate += '/' + this.date.getMonth()
                formatDate += '/' + this.date.getFullYear()
                return formatDate
            },
            previewIsVideo(){                
                const fileName = this.previewFile.name
                if(fileName) {
                    return this.util.isVideo(fileName);
                }
                return false
            }
        },
    }

</script>