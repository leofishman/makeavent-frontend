<template>
    <div id="reset-pwd-popup" class="modal-card">
        <div class="modal-card-head">
            <p class="">
                {{content.text}}
            </p>
        </div>
        <div class="modal-card-body">
            <b-field :label="globContent.email">
                <b-input autocomplete="on" id="reset-pwd-email-input" type="email" v-model="email"></b-input>
            </b-field>
        </div>
         <footer class="modal-card-foot">
            <b-button :disabled="!buttonActive" type="is-primary" v-on:click="sendReset()">{{content.reset}}</b-button>
        </footer>
    </div>
</template>
<script>
import Axios from 'axios'

export default {
    data() {
        this.email = ""
        this.buttonActive = false

        return {
            content: this.$root.content.ResetPwdPopup,
            globContent: this.$root.content,

            buttonActive: this.buttonActive,
            email: this.email
        }
    },
    mounted () {
        const self = this

        const onEnter = function (event) {
            if (self.buttonActive) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    self.sendReset()
                }
            }
        }

        const timer = setInterval(() => {
            const input = document.getElementById('reset-pwd-email-input')
            if ( input ) {
                clearInterval(timer)
                input.addEventListener('keyup', onEnter)
            }
        })
    },
    methods: {
        sendReset () {
            Axios.post(this.api + `/login/resetuserpwd`, {
                email: this.email
            })
            .then(res => {
                if (res.data) {
                    this.$buefy.dialog.confirm({
                        title: 'Success',
                        message: this.content.emailSent,
                        cancelText: '',
                        canCancel: false,
                        confirmText: this.$root.content.common.ok,
                        onConfirm: () => {
                            this.$parent.close()
                        }
                    })
                }
            })
            .catch(e => {
                if (e.response)
                    if (e.response.data)
                        if (compare(e.response.data.error, "NO USER WITH THAT ACCESS ID")) {
                            this.$root.createError(this.globContent.ErrorMessages[8], 'oops')
                        }
                        else if (compare(e.response.data.error, "RESET EMAIL ALREADY SENT")) {
                            this.$root.createError(this.$root.capitalizeFirstLetter(e.response.data.error.toLowerCase()), 'oops')
                        }
                        else
                            this.$root.createError(e, 'oops')
                    else
                        this.$root.createError(e, 'oops')
                else
                    this.$root.createError(e, 'oops')
            })
        }
    },
    watch: {
        email: function () {
            if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.email))
                this.buttonActive = true
        }
    },
}
</script>