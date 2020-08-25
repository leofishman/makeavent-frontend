<template>
        <div class="admin-bar__shortcuts-btn">
            <ActiveButton
                @clicked="showBackstageControlPopup = true" 
                :name="content.backstageSettings"
                class="admin-bar__shortcuts-btn admin-bar__button">
            </ActiveButton>
        </div>
</template>
<script>
import Axios from 'axios'
import {MEETUP} from '@/api/endpoints'
import BackstageControls from '@/components/Meetup/Modals/BackstageControls/BackstageControls'


import {ActiveButton} from '@/components/Global/controll/'

export default {
    name: "BackstageControls",
    props: {
        parent: Object,
        Speakers: Array
    },
    components: {
        ActiveButton
    },
    data () {
        return {
            showBackstageControlPopup: false,
            content: this.$root.content.MeetupAdminSidebar
        }
    },
    methods: {
        closeSidebar () {
            this.$root.openMeetupSettings = false
        },
        getSwitchText () {
            return this.$root.meetup.networkingRoomOpened 
                ? this.content.networkingRoom + this.content.isOpened
                : this.content.networkingRoom + this.content.isClosed;
        }
    },
    watch: {
        showBackstageControlPopup : function () {
            if ( this.showBackstageControlPopup )
                this.$buefy.modal.open({
                    parent: this,
                    component: BackstageControls,
                    props: {
                        Speakers: this.Speakers
                    },
                    hasModalCard: true,
                    customClass: 'backstage-controls',
                    trapFocus: true,
                    onCancel: () => {
                        this.showBackstageControlPopup = false
                    }
                })
        }
    },
}
</script> 