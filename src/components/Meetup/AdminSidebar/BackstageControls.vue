<template>
    <div class="menu-el">
        <div class="menu-el">
            <p v-if="parent.showHints" class="menu-label" v-html="content.backstageHint"></p>

            <p @click="showBackstageControlPopup = true" class="click menu-label"><strong>{{content.backstageSettings}}</strong></p>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {MEETUP} from '@/api/endpoints'
import BackstageControls from '@/components/Meetup/Modals/BackstageControls/BackstageControls'

export default {
    name: "BackstageControls",
    props: {
        parent: Object,
        Speakers: Array
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