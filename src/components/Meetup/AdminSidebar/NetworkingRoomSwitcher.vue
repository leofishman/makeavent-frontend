<template>
    <div class="menu-el">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <div class="menu-el">
            <p v-if="parent.showHints" class="menu-label" v-html="content.netRoomHint"></p>

            <b-switch v-model="isSwitchedCustom">{{ getSwitchText() }}</b-switch>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {MEETUP} from '@/api/endpoints'

export default {
    name: "NetworkingRoomSwitcher",
    props: {
        parent: Object
    },
    data () {
        return {
            isSwitchedCustom: this.$root.meetup.networkingRoomOpened,
            isLoading: false,
            content: this.$root.content.MeetupAdminSidebar
        }
    },
    methods: {
        closeSidebar () {
            this.$root.openMeetupSettings = false
        },

        switchNetworkingRoom () {
            Axios.post(MEETUP.toggleNetworkingRoom, {
                id: this.$root.meetup._id
            },
            {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                this.$root.meetup.networkingRoomOpened = res.data.newStatus
                this.isLoading = false
            })
        },

        getSwitchText () {
            return this.$root.meetup.networkingRoomOpened 
                ? this.content.networkingRoom + this.content.isOpened
                : this.content.networkingRoom + this.content.isClosed;
        }
    },
    watch: {
        isSwitchedCustom: function () {
            this.isLoading = true
            this.switchNetworkingRoom()
        }
    },
}
</script>