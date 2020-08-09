<template>
    <div>
        <b-sidebar id="meetup-admin-sidebar"
            type="is-light"
            :fullheight="true"
            :fullwidth="false"
            :overlay="false"
            :right="false"
            :can-cancel="false"
            :open.sync="$root.openMeetupSettings"
        >
        <div v-on:click="closeSidebar()" class="sidebar-background"></div>
        <div class="content">
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <div class="menu-el">
                <p class="menu-label">
                    
                </p>

                <b-switch v-model="isSwitchedCustom">{{ getSwitchText() }}</b-switch>
            </div>
        </div>
        </b-sidebar>
    </div>
</template>

<script>
    import Axios from 'axios'
	import {MEETUP} from '@/api/endpoints'

    export default {
        name: "AdminSidebar",
        data() {
            this.content = this.$root.content.MeetupAdminSidebar

            return {
                content: this.content,
                comm_content: this.$root.content.common,

                isSwitchedCustom: true,
                isLoading: false,
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
<style lang="scss">
    @import "./index.scss";
</style>