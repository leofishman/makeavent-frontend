<template>
    <b-button :disabled="isLoading" class="is-red" @click="click">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <div class="btn-wrap">
            <div class="bnt-icon--cycle"></div>
            <div>{{this.$root.content.adminSidebar.items.shortcuts.buttons.o_recording}}</div>
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
            this.$root.mainroom_streamApp.stream.executeCommand('startRecording', {
                mode: "file", //recording mode, either `file` or `stream`.
                dropboxToken: "", //dropbox oauth2 token.
                shouldShare: false, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
                youtubeStreamKey: "", //the youtube stream key.
                youtubeBroadcastID: "" //the youtube broacast ID.
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