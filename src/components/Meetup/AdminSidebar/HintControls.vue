<template>
    <div class="menu-el">
        <div class="menu-el">
            <p v-if="parent.showHints" class="menu-label" v-html="content.hintHints"></p>

            <b-switch v-model="isSwitchedCustom">{{ getContent() }}</b-switch>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {MEETUP} from '@/api/endpoints'

export default {
    name: "HintControls",
    props: {
        parent: Object
    },
    data () {
        return {
            isSwitchedCustom: this.translateStatusToBoolean(),
            content: this.$root.content.MeetupAdminSidebar
        }
    },
    methods: {
        translateStatusToBoolean () {
            if (localStorage.showHints == 'false')
                return false
            else
                return true
        },

        getContent () {
            return this.translateStatusToBoolean()
                ? this.content.hintShowed
                : this.content.hintClosed
        }
    },
}
</script>