<template>
    <b-button :disabled="isLoading" class="is-green" @click="click">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <div class="btn-wrap">
            <div class="bnt-icon--binding"></div>
            <div>{{this.$root.content.adminSidebar.items.streaming.buttons.start}}</div>
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
                mode: "stream", //recording mode, either `file` or `stream`.
                dropboxToken: "", //dropbox oauth2 token.
                shouldShare: false, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
                youtubeStreamKey: this.$root.meetup._id, //the youtube stream key.
                youtubeBroadcastID: this.$root.meetup._id //the youtube broacast ID.
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