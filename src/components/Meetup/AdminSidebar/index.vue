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
                <h3 class="admin-sidebar-wrap-header">{{content.options}}</h3>
                <shortcuts/>
                <transmition/>
                <information :id="this.$root.meetup._id"/>
                <speakers/>
                <streaming/>
                <share/>
                <design/>
            </div>
        </div>
    </b-sidebar>
</template>

<script>
import BackstageControls from './BackstageControls'
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
            id: this.$root.meetup._id
        }
        await this.getMeetupById(obj)
    },
    methods: {
        ...mapActions(['getMeetupById'])
    },
    data() {
        return {
            content: this.$root.content.MeetupAdminSidebar,
            comm_content: this.$root.content.common,
        }
    }
}
</script>

<style>

</style>