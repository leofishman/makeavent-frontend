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
            <b-step-item step="1" :label="content.groupPopupForm.stepName.location" :clickable="isStepsClickable">
                <h2 class="title">{{$root.content.groupPopupForm.labels.location}}</h2>
                <autocomplete-location
                    @changeLocation="updateLocationStep"
                />
            </b-step-item>

            <b-step-item step="2" :label="content.groupPopupForm.stepName.name" :clickable="isStepsClickable" disabled>
                <h2 class="title">{{$root.content.groupPopupForm.labels.name}}</h2>
                <div class="info-wrap">
                </div>
                <b-field class="name-field">
                    <b-input 
                        :placeholder="content.groupPopupForm.placeholders.name"
                        v-model="name"
                        @input="updateNameStep"
                        :validation-message="content.groupPopupForm.validation.name"
                        required 
                    >
                    </b-input>
                    <p v-if="!unqName" class="unqName help is-danger">{{$root.content.groupPopupForm.validation.nameExt}}</p>
                </b-field>
                <b-field>
                    <b-input 
                        :placeholder="content.groupPopupForm.placeholders.message"
                        maxlength="200" 
                        type="textarea"
                        v-model="message" 
                        @input="updateMessageStep"
                        :validation-message="content.groupPopupForm.validation.message"
                        required
                    ></b-input>
                </b-field>
            </b-step-item>

            <b-step-item step="3" :label="content.groupPopupForm.stepName.logo" :clickable="isStepsClickable" disabled>
                <h2 class="title">{{$root.content.groupPopupForm.labels.logo}}</h2>
                 <section class="file-uploader">
                    <b-field>
                        <b-upload v-model="file"
                            drag-drop
                            @input="updateLogo"
                            :class="[ !fileValid ? 'invalid-file': '']"
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

            <b-step-item step="4" :label="content.groupPopupForm.stepName.interest" :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}">
                <h2 class="title">{{$root.content.groupPopupForm.labels.interest}}</h2>
                <autocomplete-interests
                    @changeInterets="updateInterestsStep"
                />
            </b-step-item>

            <b-step-item class="step-item sub-interests" step="5" :label="content.groupPopupForm.stepName.subInterest" :clickable="isStepsClickable">
                <h2 class="title">{{$root.content.groupPopupForm.labels.subInterest}}</h2>
                <autocomplete-sub-interests
                    @changeSubInterets="updateSubInterets"
                    :interest="interest"
                />
            </b-step-item>

            <b-step-item step="6" :label="content.groupPopupForm.stepName.confirm" :clickable="isStepsClickable">
                <div class="confirm-data">
                    <div class="image-preview-wrap">
                        <img class="image-preview" :src="fileUplodated" alt="">
                    </div>
                    <div class="confirm-data__row">
                        <div class="confirm-data__col-field">{{$root.content.groupPopupForm.confirmFields.location}}</div>
                        <div class="confirm-data__col-value">{{storeLocation}}</div>
                    </div>
                    <div class="confirm-data__row">
                        <div class="confirm-data__col-field">{{$root.content.groupPopupForm.confirmFields.name}}</div>
                        <div class="confirm-data__col-value">{{name}}</div>
                    </div>
                    <div class="confirm-data__row confirm-data__row--description">
                        <div class="confirm-data__col-field">{{$root.content.groupPopupForm.confirmFields.message}}</div>
                        <div class="confirm-data__col-value">{{message}}</div>
                    </div>
                    <div class="confirm-data__row confirm-data__row--description">
                        <div class="confirm-data__col-field">{{$root.content.groupPopupForm.confirmFields.interest}}</div>
                        <div class="confirm-data__col-value">{{storeInterest}}</div>
                    </div>
                    <div class="confirm-data__row confirm-data__row--description">
                        <div class="confirm-data__col-field">{{$root.content.groupPopupForm.confirmFields.subInterest}}</div>
                        <div class="confirm-data__col-value">                            
                            <template v-if="_.isEmpty(this.allSubInterests)">{{$root.content.groupPopupForm.validation.noItems}}</template>
                            <template v-if="!_.isEmpty(this.allSubInterests)">{{storeSubInterest}}</template>
                        </div>
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
                        {{$root.$root.content.globalForms.buttons.cancel}}                        
                    </b-button>       
                    <b-button
                        outlined
                        type="is-danger"
                        :disabled="previous.disabled"
                        @click.prevent="previous.action"
                        v-if="!firstStep"
                    >
                        {{$root.$root.content.globalForms.buttons.back}}
                    </b-button>                    
                    <b-button
                        outlined
                        type="is-success"
                        :disabled="nextDisabled"
                        @click.prevent="nextStep(next.action)"            
                        v-if="!lastStep"  
                    >
                        {{$root.$root.content.globalForms.buttons.next}}
                    </b-button>
                    <b-button
                        class="button is-success is-outlined submit-button"  
                        @click.prevent="submit"         
                        v-if="lastStep"  
                    >
                        {{$root.$root.content.globalForms.buttons.submit}}
                    </b-button>
                </div>
            </template>
        </b-steps>
    </section>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import autocompleteLocation from './autocompleteLocation'
    import autocompleteInterests from './autocompleteInterests'
    import autocompleteSubInterests from './autocompleteSubInterests'
    import eng from '@/english'
    
    import Controllers from '@/store/controllers/group-form'

    export default {
        components: {
            autocompleteLocation, autocompleteInterests, autocompleteSubInterests
        },
        watch: {
            name(){
                this.updateName(this.name)
                if(this.name.length) this.unqName = true             
                return this.name
            },
            message(){
                this.updateMessage(this.message)
                return null
            },
            interest: function() {
                this.getSubInterests({
                    interest: this.interest
                })
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

                fileValid: true,
                nextDisabled: true,

                interest: false,
                file: {},
                fileUplodated: null,

                unqName: true,
                
                content: eng
            }
        },
        methods: {
            ...mapActions(['setName','setMessage', 'setLogo', 'getAddGroup', 'getSubInterests']),
            // Steps checkers
            updateLocationStep(locationName){   
                const allCountries = this.$store.getters.allCountries;                                    
                if(allCountries.includes(locationName) ) this.nextDisabled = false
                else this.nextDisabled = true                           
            },
            updateInterestsStep(interestName){    
                const allInterests = this.$store.getters.allInterests;                                    
                if(allInterests.includes(interestName)) {
                    this.nextDisabled = false
                    this.interest = interestName
                }
                else this.nextDisabled = true                           
            },
            updateSubInterets(tagsArray){    
                if(tagsArray.length > 0) {this.nextDisabled = false}
                else if(tagsArray === 'empty') {this.nextDisabled = false}
                else {this.nextDisabled = true}   
            },
            updateNameStep(){                               
                if(this.name.length > 0 && this.message.length > 0) this.nextDisabled = false
                else this.nextDisabled = true
            },
            updateMessageStep(){
                if(this.name.length > 0 && this.message.length > 0) this.nextDisabled = false
                else this.nextDisabled = true
            },
            updateLogo(e){
                const fileName = this.file.name
                if(this.file && this.util.isImage(fileName)) {
                    const image = this.file
                    const reader = new FileReader()
                    reader.readAsDataURL(image)
                    reader.onload = e => {
                        this.setLogo(e.target.result)
                        this.fileUplodated = e.target.result
                    }
                    
                    // this.setLogo(formData);
                    this.fileValid = true
                    this.nextDisabled = false
                }
                else {
                    this.fileValid = false
                    this.nextDisabled = true
                }
            },
            changeStep() {           
                const currentStep = this.activeStep+1;

                const country = this.$store.state.groupForm.country;
                const name = this.$store.state.groupForm.name;
                const message = this.$store.state.groupForm.message;
                const logo = this.$store.state.groupForm.logo;
                const interest = this.$store.state.groupForm.interest;
                const subInterestLength = this.$store.state.groupForm.subInterest.length;
                
                
                // Check previous steps
                if(currentStep === 1 && country) {
                    this.nextDisabled = false 
                } else if (currentStep === 2 && name && message) {
                    this.nextDisabled = false 
                } else if (currentStep === 3 ) {
                    this.nextDisabled = false 
                } else if (currentStep === 4 && interest) {  
                    this.nextDisabled = false 
                } else if (currentStep === 5 && subInterestLength) {
                    this.nextDisabled = false 
                } else if (currentStep === 5 && this._.isEmpty(this.allSubInterests)) {
                    this.nextDisabled = false 
                } else {
                    this.nextDisabled = true
                }
            },
            // End steps checkers
            updateName(e){        
                this.setName(e)
                return false
            },
            updateMessage(e){        
                this.setMessage(e)
                return false
            },
            nextStep(event){                
                if(this.activeStep === 1) {
                    this.activeStep = 1   
                    this.uniqueName.then(res => {                        
                        if(res) {
                            if(!this.name.length) this.unqName = true                            
                            return event()
                        } else {
                            this.unqName = false
                            this.activeStep = 1                        
                        }
                    })
                } else {
                    return event()
                }
            },
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            },
            // Submit form
            async submit() {
                const currentStep = this.activeStep+1

                const country = this.$store.state.groupForm.country;
                const interest = this.$store.state.groupForm.interest;
                const subInterest = this.$store.state.groupForm.subInterest;
                const name = this.$store.state.groupForm.name;
                const message = this.$store.state.groupForm.message;

                const fileName = this.file.name
                const format = fileName.slice(fileName.lastIndexOf('.'), fileName.length)

                // Image
                const logo = this.fileUplodated;

                if(currentStep === 6){
                    const data = {                    
                        country: country,
                        interest: interest,
                        subinterest: subInterest,
                        name: name,
                        description: message,
                        image: logo,
                        ext: format
                    }
                    const res = await this.getAddGroup(data)
                    return false
                }
            }
        },
        computed: {
            ...mapGetters(['allSubInterests']),
            lastStep(){
                const currentStep = this.activeStep+1
                return currentStep === 6
            },
            firstStep(){
                const currentStep = this.activeStep+1
                return currentStep === 1
            },
            data(){ 
                const country = this.$store.state.groupForm.country;
                const interest = this.$store.state.groupForm.interest;
                const subInterest = this.$store.state.groupForm.subInterest;
                const name = this.$store.state.groupForm.name;
                const message = this.$store.state.groupForm.message;

                if(country && interest && subInterest && name && message){
                    const groupForm = [
                        {field: 'country', value: country},
                        {field: 'interest', value: interest},
                        {field: 'subInterest', value: subInterest.join(', ')},
                        {field: 'name', value: name},
                        {field: 'message', value: message}
                    ]
                    return groupForm                    
                } else {
                    return [{field: '', value: ''}]
                }
            },            
            async uniqueName(){
                const nameObj = {
                    name: this.name
                }
                let result = await Controllers.getGroupName(nameObj)
                return result
            },
            storeLocation(){                
                const country = this.$store.state.groupForm.country
                if(country) return country
                else return ''
            },
            storeInterest(){
                const interest = this.$store.state.groupForm.interest;
                if(interest) return interest
                else return ''                
            },
            storeSubInterest(){
                const subInterest = this.$store.state.groupForm.subInterest;
                if(subInterest) {
                    return subInterest.join(', ')
                }
                else return ''                
            }
        },
    }
</script>
<style lang="scss">
.group-steps .step-item .upload.control {
    width: 278px;
    height: 173px;
}
.group-steps .step-item .file-uploader .tags,
.group-steps .step-item .file-uploader .field {
    display: flex;
    justify-content: center;
}
</style>