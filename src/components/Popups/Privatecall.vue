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
import {host} from '@/env'
import Axios from 'axios'

export default {
    name: "Privatecall",
    props: {
        contact: Object
    },
    data () {
        this.profile = this.$root.profile
        console.log(this.contact)

        Axios.get(host + "/interviews/user/" + this.contact._id, {
            headers: {
                authorization: localStorage.auth
            }
        })
        .then(res => {
            console.log(res)
        })

        return {
            content: this.$root.content.Privatecall
        }
    },
    methods: {

    }
}
</script>