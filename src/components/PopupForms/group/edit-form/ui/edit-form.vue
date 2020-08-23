<template>
    <section class="group-steps">
        <h2 class="form-title">{{$root.content.groupEditPopupForm.title}}</h2>
        <div class="edit-field basic-info">
            <h2 class="title">{{$root.content.groupEditPopupForm.labels.name}}</h2>
            <b-field>
                <b-input 
                    :placeholder="content.groupEditPopupForm.placeholders.name"
                    v-model="name"
                    :validation-message="content.groupEditPopupForm.validation.name"
                    required 
                >
                </b-input>
            </b-field>
            <p v-if="!unqName" class="unqName help is-danger">{{$root.content.groupEditPopupForm.validation.unqName}}</p>
        
            <b-field>
                <b-input 
                    v-model="message"
                    :placeholder="content.groupEditPopupForm.placeholders.massage"
                    maxlength="200" 
                    type="textarea"
                    :validation-message="content.groupEditPopupForm.validation.massage"
                    required
                >
                </b-input>
            </b-field>
        </div>

        <div class="edit-field location-field">
            <h2 class="title">{{$root.content.groupEditPopupForm.labels.location}}</h2>
            <autocompleteLocation
                :location="location"
                @changeLocation="updateLocation"
            />
        </div>


        <div class="edit-field logo-field">
            <h2 class="title">{{$root.content.groupEditPopupForm.labels.logo}}</h2>
            <b-field class="file">
                <b-upload 
                    v-model="file"
                    @input="updateLogo"
                    required
                >
                    <a class="button is-primary">
                        <b-icon icon="upload"></b-icon>
                        <span>{{$root.content.groupEditPopupForm.placeholders.file}}</span>
                    </a>
                </b-upload>
                <template v-if="!_.isEmpty(file)">
                    <span class="file-name" v-if="file.name.length">
                        {{ file.name }}
                    </span>
                    <span class="file-name" v-if="!file.name.length">
                        {{$root.content.groupEditPopupForm.placeholders.sizes}}
                    </span>
                </template>                
            </b-field>            
        </div>

        <div class="edit-field interets-field">
            <h2 class="title">{{$root.content.groupEditPopupForm.labels.interest}}</h2>
            <autocompleteInterests
                :interest="interest"
                @changeInterets="updateInterets"
            />
        </div>

        <div class="edit-field sub-interests sub-interests-field">
            <autocompleteSubInterests
                @changeSubInterets="updateSubInterets"
                :interest="interest"
                :subInterest="subInterest"
            />
        </div> 

        <div class="group-steps__buttons">
            <b-button
                outlined
                type="is-danger"
            >
                {{$root.$root.content.globalForms.buttons.cancel}}
            </b-button>        
            <b-button
                class="button is-success is-outlined submit-button"  
                :disabled="saveDisabled"
                @click.prevent="submit"           
            >
                {{$root.$root.content.globalForms.buttons.submit}}
            </b-button>
        </div>
    </section>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import eng from '@/english'
    import autocompleteLocation from './autocompleteLocation'
    import autocompleteInterests from './autocompleteInterests'
    import autocompleteSubInterests from './autocompleteSubInterests'
    import Controllers from '@/store/controllers/group-form'

    export default {
        data() {
            return {
                location: '',
                name: this.$store.state.groupForm.name,
                oldName: '', 
                message: this.$store.state.groupForm.message,
                file: {},        
                oldInterest: false,
                interest: false,     
                subInterest: false,            
                content: eng,
                saveDisabled: false,
                unqName: true
            }
        },
        components:{
            autocompleteLocation, autocompleteInterests, autocompleteSubInterests
        },
        async mounted(){
            const groupNameObj = {
                name: 'test'
            }
            await this.getGroupByName(groupNameObj)        

            this.name = this.$store.state.groupForm.name;
            this.oldName = this.$store.state.groupForm.name;
            this.message = this.$store.state.groupForm.message;
            this.location = this.$store.state.groupForm.country;
            this.interest = this.$store.state.groupForm.interest;
            this.oldInterest = this.$store.state.groupForm.interest;
            this.subInterest = this.$store.state.groupForm.subInterest;
            this.file.name = this.$store.state.groupForm.logo
            const filePath = this.$store.state.groupForm.logo;

            if(filePath) {
                const fileName = filePath.slice(filePath.lastIndexOf('/')+1, filePath.length)
                this.file.name = fileName
            }
            

            this.saveDisabled = false
        },
        watch: {
            name() {
                if(!this.name.length) this.unqName = true
                this.setName(this.name)
                this.сheckAllFields()
                return this.name
            },
            message() {
                this.setMessage(this.message)
                this.сheckAllFields()
                return this.message
            },
            file() {
                this.сheckAllFields()
                return this.file
            },
            interest(){
                if( this.interest !== this.oldInterest) this.subInterest = []
                return this.interest                
            }
        },
        methods: {
            ...mapActions(['getGroupByName', 'setName','setMessage', 'setLogo', 'getAddGroup', 'getSubInterests', 'postUpdateGroup']),
            // End steps checkers
            // Fields events
            updateLocation(locationName){
                this.location = locationName                                      
                this.сheckAllFields()

                return false;
            },
            updateInterets(interestName){
                const allInterests = this.$store.getters.allInterests;                                    
                if(allInterests.includes(interestName)) {
                    this.interest = interestName
                }
                else if(this.interest !== this.oldInterest) this.saveDisabled = true                 
                else if(!interestName) this.saveDisabled = true  
                return false;
            },
            updateSubInterets(tags){ 
                if(!tags.length) this.saveDisabled = true
                else this.сheckAllFields()
                return false;
            },
            сheckAllFields(){
                const name = this.name;
                const message = this.message;
                const logo = this.$store.state.groupForm.logo;
                const interest = this.$store.state.groupForm.interest;
                const subInterest = this.subInterest;                                

                const allCountries = this.$store.getters.allCountries; 
                const validLocation = allCountries.includes(this.location)
                
                // if(validLocation && name && message && logo && interest && subInterest ){
                if(validLocation && name && message &&  interest && subInterest ){
                    this.saveDisabled = false
                    return true
                } else {
                    this.saveDisabled = true
                    return false
                }
            },
            updateLogo(e){
                if(this.file) {
                    const image = this.file
                    const reader = new FileReader()
                    reader.readAsDataURL(image)
                    reader.onload = e => {
                        this.setLogo(e.target.result)
                    }
                }
            },
            // Submit form
            async submit() {
                if(await this.uniqueName()){
                    this.unqName = true
                    
                    const name = this.$store.state.groupForm.name;
                    const oldName = this.oldName;
                    const message = this.$store.state.groupForm.message;
                    const country = this.$store.state.groupForm.country;
                    const interest = this.$store.state.groupForm.interest;
                    const subInterest = this.$store.state.groupForm.subInterest;
                    const logo = this.$store.state.groupForm.logo;
                    const fileName = this.file.name
                    const format = fileName.slice(fileName.lastIndexOf('.'), fileName.length)
                    
                    const data = {                    
                        country: country,
                        interest: interest,
                        subinterest: subInterest,
                        name: name,
                        oldName: oldName,
                        message: message,
                        image: logo,
                        ext: format
                    }
                    const res = await this.postUpdateGroup(data)

                    return false
                } else {
                    this.unqName = false
                    this.saveDisabled = true
                }
            },            
            async uniqueName(){
                if(this.name !== this.oldName){
                    const nameObj = {
                        name: this.name
                    }
                    let result = await Controllers.getGroupName(nameObj)
                    return result
                } else {
                    return true
                }
            }
        },
        computed: mapGetters(['allSubInterests'])
    }

</script>

<style lang="scss">
</style>