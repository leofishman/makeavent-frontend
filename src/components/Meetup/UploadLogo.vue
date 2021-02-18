<template>
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
					<p>{{$root.content.groupPopupForm.validation.dropFile}}</p>
                </div>
            </section>
        </b-upload>
		<div></div>
			<div class="tags">
				<div v-if="fileUplodated" class="column">
					<div class="confirm-data__col-value confirm-data__col-value--img">
						<img style="object-fit:contain" :src="fileUplodated" alt="">
					</div>
				</div>				

				<span v-if="!fileValid && fileUplodated" class="help is-danger">
					{{$root.content.groupPopupForm.validation.invalidFileType}}
				</span>
			</div>
    </b-field>
	
</template> 

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: "UploadLogo",
    
    data() {
        return {
			file: {},  
			fileUplodated: false,
			previewFile: {},  
			previewUplodated: false,            
        }
    },

    methods: {
		...mapActions(['setName','setMessage', 'setLogo', 'getAddGroup', 'getSubInterests']),
        updateLogo(e){console.log(39, e)
			try {
				if ( this.file.size > 1000000 ) {console.log(41)
					this.$root.createError(this.$root.content.ErrorMessages[12], 'oops')
				}
				else {
					if ( this.file ) {console.log(45, this.file)
						const image = this.file
		
						const reader = new FileReader()
						reader.readAsDataURL(image)
						reader.onload = e => {console.log(59, e)
							this.setLogo(e.target.result)
							this.fileUplodated = e.target.result
							console.log(61, this.fileUplodated)
						}
						 this.fileValid = true
						this.saveDisabled = false
						console.log(64, this.fileUplodated)
					}
					else {
						this.fileValid = false
						this.saveDisabled = true
					}
					
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
		
    }
}
</script>
    