<template>
    <b-sidebar id="meetup-admin-sidebar"
        type="is-light"
        :fullheight="true"
        :fullwidth="false"
        :overlay="true"
        :right="false"
        :can-cancel="false"
        :open.sync="$root.openMeetupSettings"
    >
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <div class="menu-el">
            <p class="menu-label">
                
            </p>

            <b-switch v-model="isSwitchedCustom"
                :true-value="content.networkingRoom + content.isOpened"
                :false-value="content.networkingRoom + content.isClosed">
                {{ isSwitchedCustom }}
            </b-switch>
        </div>
    </b-sidebar>
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

                isSwitchedCustom: this.$root.meetup.networkingRoomOpened
                    ? this.content.networkingRoom + this.content.isOpened
                    : this.content.networkingRoom + this.content.isClosed,
                isLoading: false,

            }
        },
        methods: {
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
    #meetup-admin-sidebar {
        .sidebar-content {
            padding: 90px 10px;
            width: 300px;
            display: block;

            .menu-el {
                margin: 10px 0px;

                .menu-label {
                    font-size: 1.25em;
                }
            }            
        }
    }
</style>