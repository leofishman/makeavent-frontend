<template>
    <div class="modal-card">
        <div class="modal-card-head">
            <p class="modal-card-title">
                {{content.reqPrivateCall}}
            </p>
        </div>
        <div class="modal-card-body">
            <div class="columns">
                <div class="column">
                    {{content.selectDateAndTime}}
                </div>
                <div class="column">
                    {{content.checkAvailability}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {api} from '@/env'
import Axios from 'axios'

export default {
    name: "Privatecall",
    props: {
        contact: Object
    },
    data () {
        this.profile = this.$root.profile

        return {
            content: this.$root.content.Privatecall
        }
    },
    methods: {

    }
}
</script>