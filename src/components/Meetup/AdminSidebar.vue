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
            <div class="content">
                <HintControls :parent="this" />
                <NetworkingRoomSwitcher :parent="this" />
                <StartWebinar :parent="this" />
                <BackstageControls
                    v-if="$root.speakerProfiles"
                    :Speakers="$root.speakerProfiles"
                    :parent="this" />
            </div>
        </b-sidebar>
    </div>
</template>

<script>
    import Axios from 'axios'
    import {MEETUP} from '@/api/endpoints'
    import NetworkingRoomSwitcher from './AdminSidebar/NetworkingRoomSwitcher.vue'
    import StartWebinar from './AdminSidebar/StartWebinar.vue'
    import BackstageControls from './AdminSidebar/BackstageControls.vue'
    import HintControls from './AdminSidebar/HintControls.vue'

    export default {
        name: "AdminSidebar",
        components: {
            NetworkingRoomSwitcher,
            StartWebinar,
            BackstageControls,
            HintControls
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
        },
        methods: {
            shouldShowHint () {
                if ( localStorage.showHints == 'false' )
                    return false
                else
                    return true
            }
        },
        watch: {
            'showHints': function () {
                if ( this.showHints ) {
                    this.showHints = false
                    localStorage.showHints = 'false'
                }
                else {
                    this.showHints = true
                    localStorage.showHints = 'true'
                }
            }
        },
    }
</script>
<style lang="scss">
    @import "./index.scss";
</style>