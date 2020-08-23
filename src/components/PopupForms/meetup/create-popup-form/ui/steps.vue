<template>
    <section class="group-steps">
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
            <b-step-item step="1" :label="$root.content.meetupPopupForm.stepName.company" :clickable="isStepsClickable" disabled>
                <company-step @update="updateCompany"/>
            </b-step-item>
            <!-- End Company info -->            
            <!-- Base info -->
            <b-step-item step="2" :label="$root.content.meetupPopupForm.stepName.name" :clickable="isStepsClickable" disabled>
                <h2 class="title">{{$root.content.meetupPopupForm.labels.title}}</h2>
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
            </b-step-item>
            <!-- END Base info -->
            <!-- Logo -->
            <b-step-item step="3" :label="$root.content.meetupPopupForm.stepName.date" :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}">
                <h2 class="title">{{$root.content.meetupPopupForm.labels.date}}</h2>                
                <b-field class="input-date">
                    <b-datetimepicker
                        :placeholder="$root.content.meetupPopupForm.placeholders.date"
                        icon="calendar-today"
                        v-model="date"
                        @input="inputDate">
                    </b-datetimepicker>
                    <p class="date-placeholder">{{$root.content.meetupPopupForm.placeholders.date}}</p>
                </b-field>
            </b-step-item>
            <!-- Logo -->
            <b-step-item step="4" :label="$root.content.meetupPopupForm.stepName.logo" :clickable="isStepsClickable" disabled>
                <h2 class="title">{{$root.content.meetupPopupForm.labels.logo}}</h2>
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
                            Invalid file type
                        </span>
                    </div>
                </section>
            </b-step-item>
            <!-- END Logo -->
            <!-- Preview -->
            <b-step-item step="5" :label="$root.content.meetupPopupForm.stepName.preview" :clickable="isStepsClickable" disabled>
                <h2 class="title">{{$root.content.meetupPopupForm.labels.preview}}</h2>
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
                            Invalid file type
                        </span>
                    </div>
                </section>
            </b-step-item>
            <!-- END preview -->
            <b-step-item step="6" :label="$root.content.meetupPopupForm.stepName.confirm" :clickable="isStepsClickable">
                <h2 class="title last-step">{{$root.content.meetupPopupForm.labels.confirm}}</h2>
                <div class="confirm-data">
                    <div class="confirm-data__row">
                        <div class="confirm-data__col-field">{{$root.content.meetupPopupForm.confirmFields.name}}</div>
                        <div class="confirm-data__col-value">{{name}}</div>
                    </div>
                    <div class="confirm-data__row confirm-data__row--description">
                        <div class="confirm-data__col-field">{{$root.content.meetupPopupForm.confirmFields.massage}}</div>
                        <div class="confirm-data__col-value">{{message}}</div>
                    </div>
                    <div class="confirm-data__row">
                        <div class="confirm-data__col-field">{{$root.content.meetupPopupForm.confirmFields.date}}</div>
                        <div class="confirm-data__col-value">{{formatDate}}</div>
                    </div>
                    <div class="confirm-data__row confirm-data__row--img-bg">
                        <div class="confirm-data__col-field">Images</div>
                        <div class="confirm-data__col-value confirm-data__col-value--img">
                            <img :src="fileUplodated" alt="">
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
                        :disabled="previous.disabled"
                        @click.prevent="previous.action"
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
        mounted(){
            this.hideDatePlaceholder()
        },
        watch: {
            name(){                                 
                const validDate = this.name.length && this.message.length
                if(validDate) this.nextDisabled = false
                else this.nextDisabled = true
                return this.name
            },
            message(){               
                const validDate = this.name.length && this.message.length
                if(validDate) this.nextDisabled = false
                else this.nextDisabled = true
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
                activeStep: 0,

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
                nextDisabled: true,
            }
        },
        methods: {
            updateCompany(obj){
                this.company_name = obj.company_name
                this.company_description = obj.company_description
                this.nextDisabled = !obj.valid
            },
            changeStep() {                
                const currentStep = this.activeStep+1
                const validCompany = Boolean(this.company_name.length && this.message)
                const validStep = Boolean(this.name.length && this.company_description.length)
                const validDate = this.date.getTime() !== this.currentDate.getTime()

                if(currentStep === 1 && validCompany) this.nextDisabled = false
                else if(currentStep === 2 && validStep) this.nextDisabled = false
                else if(currentStep === 3 && validDate) this.nextDisabled = false
                else if(currentStep === 4 && this.fileUplodated) this.nextDisabled = false
                else if(currentStep === 5 && this.PfileUplodated) this.nextDisabled = false
                else this.nextDisabled = true                
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
            updateLogo(e){
                const fileName = this.file.name
                
                if(this.file && this.util.isImage(fileName)) {
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
            },
            updatePreview(e){
                const fileName = this.previewFile.name
                // && (this.util.isImage(fileName) || this.util.isVideo(fileName) )
                if(this.previewFile && this.util.isImage(fileName)) {
                    const image = this.previewFile
                    const reader = new FileReader()
                    reader.readAsDataURL(image)
                    reader.onload = e => {
                        this.PfileUplodated = e.target.result
                    }                    
                    
                    this.previewFileValid = true
                    this.nextDisabled = false
                } else if (this.previewFile && this.util.isVideo(fileName)) {
                    const video = this.previewFile
                    this.PfileUplodated = URL.createObjectURL(video)

                    this.previewFileValid = true
                    this.nextDisabled = false
                } else {
                    this.previewFileValid = false
                    this.nextDisabled = true
                }
            },
            // Submit form
            async submit() {
                const name = this.name;
                const description = this.message;

                const company_name = this.company_name;
                const company_description = this.company_description;

                const date = this.date;

                const fileName = this.file.name
                const format = fileName.slice(fileName.lastIndexOf('.'), fileName.length)

                const fileNamePreview = this.previewFile.name
                const formatPreview = fileNamePreview.slice(fileNamePreview.lastIndexOf('.'), fileNamePreview.length)

                let PfileUplodated = '';
                if(typeof this.PfileUplodated === 'string') PfileUplodated = this.PfileUplodated 
                else {
                    const video = this.previewFile
                    const reader = new FileReader()
                    reader.readAsDataURL(video)
                    reader.onload = e => {
                        PfileUplodated = e.target.result
                    }
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
                    // console.log('data', data);
                    const res = await MeetupFormRoutes.postAddMeetup(data)
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