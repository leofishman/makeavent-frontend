<template>

    <section class="group-steps">
		<b-loading class="loading-overlay--dark" style="margin:15px" :is-full-page="false" :active.sync="loading" :can-cancel="false"></b-loading>
        <!-- <h2 class="form-title">{{$root.content.groupEditPopupForm.title}}</h2> -->
        <div class="group-popup-form--edit-from__scroll">
            <div class="edit-field basic-info">
                <h2 class="title">{{meetupPopupForm.labels.company}}</h2>         
                <b-field>
                    <b-input 
                        :placeholder="meetupPopupForm.placeholders.company_name"
                        v-model="company_name"
                        :validation-message="meetupPopupForm.validation.name"
                        required 
                    >
                    </b-input>
                </b-field>
                <b-field>
                    <b-input 
                        v-model="company_description"
                        :placeholder="meetupPopupForm.placeholders.company_description"
                        maxlength="200" 
                        type="textarea"
                        :validation-message="meetupPopupForm.validation.massage"
                        required
                    >
                    </b-input>
                </b-field>
            </div>

			<div class="edit-field">
				<h2 class="title">{{meetupPopupForm.labels.website}}</h2>         
				<b-field>
					<b-input 
						:placeholder="meetupPopupForm.placeholders.website"
						v-model="website"
						:validation-message="meetupPopupForm.validation.name"
						required 
					>
					</b-input>
				</b-field>
            </div>

            <div class="edit-field">
				<h2 class="title">{{meetupPopupForm.labels.title}}</h2>         
				<b-field>
					<b-input 
						:placeholder="meetupPopupForm.placeholders.name"
						v-model="name"
						:validation-message="meetupPopupForm.validation.name"
						required 
					>
					</b-input>
				</b-field>
				<b-field>
					<b-input 
						v-model="message"
						:placeholder="meetupPopupForm.placeholders.massage"
						maxlength="200" 
						type="textarea"
						:validation-message="meetupPopupForm.validation.massage"
						required
					>
					</b-input>
				</b-field>     
            </div>

            <div class="edit-field location-field">
                <h2 class="title">{{meetupPopupForm.labels.date}}</h2>                
                <b-field class="input-date">
                    <b-datetimepicker
                        :placeholder="meetupPopupForm.placeholders.date"
                        icon="calendar-today"
                        v-model="date">
                    </b-datetimepicker>
                </b-field>
            </div>

            <div class="edit-field logo-field">
                <h2 class="title">{{meetupPopupForm.labels.logo}}</h2>
				<p class="warn">{{$root.content.common.filesizelimit}}</p>
                <section class="file-uploader">
					<!-- upload section -->
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
                                    <p>{{globalPopupForm.validation.dropFile}}</p>
                                </div>
                            </section>
                        </b-upload>
                    </b-field>
                    <div class="preview-image" v-if="!fileUplodated">
                        <img :src="logo" alt="">
                    </div>
                    <div class="preview-image" v-if="fileUplodated">
                        <img :src="fileUplodated" alt="">
                    </div>
					<!-- delete section -->
					<template v-if="showImage">
						<div class="close-icon" @click="deleteImage">
							<span>x</span>
						</div>
					</template>
                </section>
            </div>

            <div class="edit-field interets-field">
                <h2 class="title">{{meetupPopupForm.labels.background}}</h2>
				<p class="warn">{{$root.content.common.filesizelimit}}</p>
                <section class="file-uploader">
					<!-- upload bg -->
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
                                    <p>{{globalPopupForm.validation.dropFile}}</p>
                                </div>
                            </section>
                        </b-upload>
                    </b-field>

					<!-- preview test 1 -->
                    <template v-if="showBg">
                        <div class="preview-image" v-if="util.isImage(background)">
                            <img :src="background" alt="">
                        </div>
                        <div class="preview-image" v-if="util.isVideo(background)">
                            <video controls>
                                <source :src="background">
                            </video>
                        </div>
                    </template>
					<!-- preview test 2 -->
					<template v-if="previewFile.name">
						<div class="preview-image" v-if="util.isImage(previewFile.name)">
							<img :src="previewUplodated" >
						</div>
						<div class="preview-image" v-if="util.isVideo(previewFile.name)">
							<video controls>
								<source :src="previewUplodated" >
							</video>
						</div>
					</template>
					<!-- delete file -->
					<template v-if="showBg">
						<div class="close-icon" @click="deleteBg">
							<span>x</span>
						</div>
					</template>
                </section>
            </div>
        </div>

        <div class="group-steps__buttons">
            <b-button
				outlined
				@click="close"
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
	name: "MeetupPopupFormUi",
	props: {
		id: String
	},
	data () {
		return {
			meetupPopupForm: this.$root.content.meetupPopupForm,
			globalPopupForm: this.$root.content.groupPopupForm,

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
			website: "",

			logo: '',
			background: '',
			previewToup: false,
			loading: true
		}
	},
	computed: {
		showImage () {
			if (!this.loading) {
				if (this.logo.split(this.communitySrv)[1] || this.fileUplodated)
					return true
				else
					return false
			}
		},

		showBg () {
			if (!this.loading) {
				if (this.background.split(this.communitySrv)[1] || this.previewUplodated)
					return true
				else
					return false
			}
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
		website () {
			this.сheckAllFields()
		}
 	},
	async mounted(){
		const obj = {
			id: this.id
		}
		await this.getMeetupById(obj)
		this.name = this.$store.state.meetupForm.name;
		this.message = this.$store.state.meetupForm.message;
		this.company_name = this.$store.state.meetupForm.company_name;
		this.company_description = this.$store.state.meetupForm.company_description
		this.message = this.$store.state.meetupForm.message;
		this.website = this.$store.state.meetupForm.website;
		this.date = new Date(Date.parse(this.$store.state.meetupForm.date));

		this.logo = this.$store.state.meetupForm.logo;
		this.background = this.$store.state.meetupForm.preview;
		this.updateLogo()
		this.updatePreview()
		this.loading = false
	},
	methods: {      
		...mapActions(['getMeetupById']),
			
		updateLogo(e){
			try {
				if ( this.file.size > 1000000 ) {
					this.$root.createError(this.$root.content.ErrorMessages[12], 'oops')
				}
				else {
					if ( this.file ) {
						const image = this.file
		
						const reader = new FileReader()
						reader.readAsDataURL(image)
						reader.onload = e => {
							this.fileUplodated = e.target.result
						}
						
						this.saveDisabled = false
					}
					else this.saveDisabled = true
				}
			}
			catch (e) {}
		},
			
		updatePreview(e){
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
						} else if ( this.util.isVideo(name) ){
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
				}
			}
			catch (e) {}
		},
			
		сheckAllFields(){
			const name                = this.name ? this.name : 'no_update';
			const message             = this.message ? this.message : 'no_update';
			const company_name        = this.company_name ? this.company_name : 'no_update';
			const company_description = this.company_description ? this.company_description : 'no_update';
			const logo                = this.$store.state.meetupForm.logo ? this.$store.state.meetupForm.logo : 'no_update';
			const website             = this.website ? this.website : 'no_update';
			// if(validLocation && name && message && logo && interest && subInterest ){
			// if(name && message && logo && company_name && company_description && website){
				this.saveDisabled = false
				return true
			// } else {
			// 	this.saveDisabled = true
			// 	return false
			// }
		},
	 
    	async submit() {
			this.loading = true

			const name                = this.name
			const description         = this.message
			const company_name        = this.company_name
			const company_description = this.company_description
			const date                = this.date
			const website             = this.website

			let file = this.logoDeleted ? '' : 'no_update', 
				fileName =  '',
				format =  '',
				filePreview =  this.bgDeleted ? '' : 'no_update',
				formatPreview =  '',
				fileNamePreview = ''

			if ( this.file )
				if(this.file.name) {
					file = this.fileUplodated
					fileName = this.file.name
					format = fileName.slice(fileName.lastIndexOf('.'), fileName.length)
				}

			if ( this.previewFile )
				if(this.previewFile.name) {
					filePreview = this.previewToup
					fileNamePreview = this.previewFile.name
					formatPreview = fileNamePreview.slice(fileNamePreview.lastIndexOf('.'), fileNamePreview.length)
				}
		
			const data = {    
				id: this.id,
				meetup_name: name,
				description: description,
				company_name: company_name,
				company_description: company_description,
				website: website,
				date: date,
				image: file,
				preview: filePreview,
				ext: format,                      
				previewExt: formatPreview,
				custom_colors: 'no_update',
				color_schema: 'no_update'
			}

			const res = await MeetupFormRoutes.postUpdate(data)

			this.close()
			this.loading = false
			return false
		},

		deleteImage () {
			this.logoDeleted = true
			this.file = ""
			this.logo = ""
			this.fileUplodated = ""
		},

		deleteBg () {
			this.bgDeleted = true
			this.filePreview = ""
			this.previewFile = ""
			this.previewUplodated = ""
			this.background = ""
		},
		
		close () {
			window.EventBus.$emit('EditMeetupForm:close')
		}
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