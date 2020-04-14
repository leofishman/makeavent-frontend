<template>
    <div>
        <b-modal header-bg-variant="warning" v-model="opened" size="md" centered :title="title">
            {{text}}
        </b-modal>    
    </div>
</template>
<script>
export default {
    data() {
        this.text   = ""
        this.title  = ""
        this.opened = false

        window.EventBus.$on('show-error-modal', ({ text, errorMessage }) => {
            this.text = text
            this.title = this.$root.content.ErrorMessageModal[errorMessage]
            this.opened = true
        })

        return {
            text:this.text,
            title: this.title,
            opened: this.opened
        }
    },
}
</script>