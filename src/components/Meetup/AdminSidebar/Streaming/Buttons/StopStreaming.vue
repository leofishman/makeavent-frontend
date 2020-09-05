<template>
    <b-button :disabled="isLoading" class="is-green-dark" @click="click">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <div class="btn-wrap">
            <div class="bnt-icon--binding"></div>
            <div>{{this.$root.content.adminSidebar.items.streaming.buttons.stop}}</div>
        </div>
    </b-button>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false        
        }
    },
    methods: {
        click(){
            this.isLoading = true
            this.$root.mainroom_streamApp.stream.executeCommand('stopRecording', {
                mode: "stream", //recording mode, either `file` or `stream`.
            })
            setTimeout(() => {
                this.isLoading = false
                this.$emit('clicked')
            }, 10000)
        }
    }
}
</script>

<style>

</style>