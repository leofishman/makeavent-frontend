<template>
    <div class="menu-el">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <div class="menu-el">
            <p v-if="parent.showHints" class="menu-label" v-html="content.videoConfHint"></p>

            <b-switch v-model="isSwitchedCustom">{{ getSwitchText() }}</b-switch>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {MEETUP} from '@/api/endpoints'

export default {
    name: "StartWebinar",
    props: {
        parent: Object
    },
    data () {
        return {
            isSwitchedCustom: this.translateStatusToBoolean(),
            isLoading: false,
            content: this.$root.content.MeetupAdminSidebar
        }
    },
    methods: {
        translateStatusToBoolean () {
            if ( this.$root.meetup.status == 'ongoing' )
                return true
            else
                return false
        },

        closeSidebar () {
            this.$root.openMeetupSettings = false
        },

        switchVideoConference () {
            Axios.post(MEETUP.toggleWebinarStatus, {
                id: this.$root.meetup._id
            },
            {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                this.$root.meetup.status = res.data.newStatus
                this.isLoading = false
            })
        },

        getSwitchText () {
            return this.translateStatusToBoolean()
                ? this.content.videoConference + this.content.isOpened
                : this.content.videoConference + this.content.isClosed;
        }
    },
    watch: {
        isSwitchedCustom: function () {
            this.isLoading = true
            this.switchVideoConference()
        }
    },
}
</script>