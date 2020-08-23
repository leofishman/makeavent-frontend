<template>
    <b-sidebar id="meetup-admin-sidebar"
    
            type="is-light"
            :fullheight="true"
            :fullwidth="false"
            :overlay="false"
            :right="false"
            :can-cancel="false"
            :open.sync="$root.openMeetupSettings"
        
    >   
        <div class="content">
            <div class="admin-sidebar-wrap">
                    <h3 class="admin-sidebar-wrap-header">Options</h3>
                    <!-- <HintControls :parent="this" />
                    <NetworkingRoomSwitcher :parent="this" />
                    <StartWebinar :parent="this" />
                    <BackstageControls 
                        v-if="$root.speakerProfiles" 
                        :Speakers="$root.speakerProfiles"
                        :parent="this" 
                    /> -->
                    <shortcuts/>
                    <transmition/>
                    <information/>
                    <speakers/>
                    <streaming/>
                    <share/>
                    <design/>
            </div>
        </div>
    </b-sidebar>
</template>

<script>
// import NetworkingRoomSwitcher from './NetworkingRoomSwitcher'
// import StartWebinar from './StartWebinar'
import BackstageControls from './BackstageControls'
// import HintControls from './HintControls'


import Transmition from './Transmition/'
import Information from './Information/'
import Design from './Design/'

import Share from './Share/'
import Streaming from './Streaming/'
import Shortcuts from './Shortcuts/'
import Speakers from './Speakers/'

import {mapActions} from 'vuex'

export default {
    name: 'AdminSidebarWrap',
    components: {
        BackstageControls, Transmition, Information, Design,
        Share, Streaming, Shortcuts, Speakers
    },
    async mounted() {
        const obj = {
            id: '5f3130b5804407190c832711'
        }
        await this.getMeetupById(obj)
    },
    methods: {
        ...mapActions(['getMeetupById'])
    },
    data() {
        this.content = this.$root.content.MeetupAdminSidebar

        if ( !localStorage.showHints )
            localStorage.showHints = 'true'

        return {
            content: this.content,
            comm_content: this.$root.content.common,
            showHints: this.shouldShowHint()
        }
    }
}
</script>

<style>

</style>