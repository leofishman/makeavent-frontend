<template>  
    <div>        
        <h2 class="title">{{$root.content.meetupPopupForm.labels.company}}</h2>
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
</template>

<script>
export default {
    watch: {
        company_name(){
            this.validFields()
        },
        company_description(){
            this.validFields()
        }
    },
    data(){
        return {
            company_name: '',
            company_description: ''
        }
    },
    methods: {
        validFields(){
            const validStep = Boolean(this.company_name.length && this.company_description.length)
            const obj = {
                valid: validStep,
                company_name: this.company_name,
                company_description: this.company_description
            }
            this.$emit('update', obj)
        }
    }
}
</script>

<style>

</style>