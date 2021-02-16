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
                </div>
            </section>
        </b-upload>
    </b-field>
</template>

<script>
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
		
    }
}
</script>
    