<template>  
    <div class="stuff-item">
        <div class="stuff-field">
            <b-field>
                <b-input 
                    required
                    :placeholder="$root.content.stuffPopupForm.placeholder.name"
                    v-model="stuffItem.name"
                    :validation-message="$root.content.stuffPopupForm.validation.name"
                ></b-input>
            </b-field>
            <b-field class="stuff-field__link">
                <b-input 
                    required
                    :placeholder="$root.content.stuffPopupForm.placeholder.file"
                    v-model="stuffItem.file"
                    :validation-message="$root.content.stuffPopupForm.validation.file"
                ></b-input>            
                <p 
                    :class="index ? 'valid-url help is-danger' : ' valid-url help is-danger'"
                    v-if="!stuffItem.validURL"
                >Invalid link</p>
            </b-field>
            <span v-if="showFisrt" class="close-icon" @click="removeItem(index)">
                <span class="inner-icon">x</span>                
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['stuffItem', 'index', 'updated'],
    watch: {
        stuffItem: {
            handler(val, oldVal){
                this.checkAllFields()
            },
            deep: true
        }
    },
    methods: {        
        checkAllFields(){
            // Check required fields 
            let item = this.$props.stuffItem
            let submitDisabled = true
            let validArray = []

            let validName = Boolean(item.name.length) 
            let validfile = Boolean(item.file.length) && this.util.validURL(item.file)
            validArray.push(validName && validfile)

            // Check valid link             
            if(item.file.length && !this.util.validURL(item.file)) item.validURL = false
            else item.validURL = true                
            
            const obj = {
                index: this.$props.index,
                submitDisabled: validArray.includes(false)
            }

            this.$emit('submitDisabled', obj) 
        },       
        removeItem(index){
            this.$emit('removeItem', index)
        },
    },
    computed: {
        showFisrt(){
            if(this.$props.index === 0) return this.$props.updated
            else return true
        }
    }
}
</script>

<style>

</style>