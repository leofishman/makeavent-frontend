<template>
    <div id="set-calendly-modal" class="modal-card">
        <div class="modal-card-head">
            <p style="color:white; font-weight: 400">
                Please set Your calendly link, starting with https://calendly.com/your_id
            </p>
        </div>
        <div class="modal-card-body">
            <b-field>
                <b-input type="url" v-model="calendly"></b-input>
            </b-field>
        </div>
         <footer class="modal-card-foot">
            <b-button :disabled="!buttonActive" type="is-primary" v-on:click="send()">Update</b-button>
        </footer>
    </div>
</template>
<script>
import {host} from '@/env'
import Axios from 'axios'

export default {
    data() {
        this.calendly = ""
        this.buttonActive = false

        return {
            content: this.$root.content.ResetPwdPopup,
            globContent: this.$root.content,

            buttonActive: this.buttonActive,
            calendly: this.calendly
        }
    },
    methods: {
        send () {
            Axios.post(host + `/login/socials_reg`, {
                calendly: this.calendly
            }, {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                this.$parent.close()
                this.$buefy.dialog.alert(this.$root.content.common.success)
            })
            .catch(e => {
                this.$root.createError(e, 'oops')
            })
        }
    },
    watch: {
        calendly: function () {
            if (/https:\/\/calendly.com/i.test(this.calendly))
                this.buttonActive = true
        }
    },
}
</script>