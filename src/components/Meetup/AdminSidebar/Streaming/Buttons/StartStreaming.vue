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
import MeetupFormRoutes from '@/store/routes/meetup-form'
import {mapActions} from 'vuex'
import Axios from 'axios'
import {MEETUP} from '@/api/endpoints'

export default {
    data() {
        return {
            link: '',
            isLoading: false
        }
    },
    async mounted(){
        const obj = {
            role: 'speaker',
            userId: this.$root.profile._id,
            id: this.$root.meetup._id
        }
        const res = await MeetupFormRoutes.postCreateInviteLink(obj);
        this.link = res.data
    },
    methods: {
        ...mapActions(['toggleMeetupRoom']),
        async click () {
            if ( !this.$store.state.meetupForm.speakers.length ) {
                this.$buefy.dialog.confirm({
                    title: this.$root.content.common.attention,
                    message: this.$root.content.adminSidebar.items.streaming.warningNospeaker,
                    confirmText: 'Add me as a speaker',
                    cancelText: this.$root.content.common.cancel,
                    canCancel: true,
                    onConfirm: async () => {
                        window.location.href = this.link
                    }
                })
            }
            else {
                this.isLoading = true
                const obj = {
                    id: this.$root.meetup._id,
                    newStatus: 'ongoing'
                }
                await this.toggleMeetupRoom(obj)

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
                    this.$forceUpdate()
                }, 10000)
            }
        }
    }
}
</script>

<style>

</style>