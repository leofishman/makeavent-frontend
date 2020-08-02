<template>
    <div id="loginwithnewpwd">
        <div class="container">
            <section class="section section-registrationhall">
                <div class="columns">
                    <div class="column is-half is-offset-one-quarter data-login">
                        <figure class="image">
                            <img src="@/assets/logo_dark.svg">
                        </figure>

                        <div class="box">
                            <p style="margin:10px 0px;">{{$root.content.googleHint}}</p>
                            <section v-if="ready">
                                <b-field :label="$root.content.email">
                                    <b-input disabled type="email" v-model="email" ></b-input>
                                </b-field>

                                <div class="columns only-bot-margin">
                                    <div class="column" style="padding-left:0px;">
                                        <b-field :label="$root.content.password">
                                            <b-input id="new-pwd-setter" type="password" v-model="password"></b-input>
                                        </b-field>
                                    </div>
                                    <div class="column" style="padding-left:0px;">
                                        <b-field :label="$root.content.passwordConfirmation">
                                            <b-input id="new-pwd-setter" type="password" v-model="passwordConfirmation"></b-input>
                                        </b-field>
                                    </div>
                                </div>

                                <div class="danger-text" v-if="(password && passwordConfirmation) && (password != passwordConfirmation)">
                                    {{$root.content.passwordNotSame}}
                                </div>
                                <div class="danger-text" v-if="(password && passwordConfirmation) && (password == passwordConfirmation) && password.length < 6">
                                    {{$root.content.minLength}}
                                </div>
                                
                                <b-button :disabled="!buttonready" v-on:click="login()" type="is-primary" size="is-medium">
                                    {{$root.content.common.submit}}
                                </b-button>

                                <div class="bottom">
                                    {{$root.content.contactSupport}} support@blockconf.digital
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import Axios from 'axios'
    import {self, api} from '@/env'
    import SponsorsCol from '@/components/SponsorsCol'

    export default {
        components: {
            SponsorsCol
        },
        data() {
            this.ready = false
            this.buttonready = false
            this.password = ""
            this.passwordConfirmation = ""
            this.email = ""

            if (this.$router.currentRoute.query.token) {
                Axios.post(api + '/login/approve_reset_pwd', {
                    token: this.$router.currentRoute.query.token
                })
                .then(res => {
                    const decrypted = res.data
                    this.email = decrypted.email
                    this.ready = true
                })
                .catch(e => {
                    if (e.response)
                        if (e.response.data)
                            if (compare(e.response.data.error, "WRONG RESET PWD TOKEN")) {
                                this.$router.push("/login")
                            }
                            else
                                this.$root.createError(e, 'oops')
                            else
                                this.$root.createError(e, 'oops')
                            else
                                this.$root.createError(e, 'oops')
                        })
            }
            else {
                this.$router.push('/login')
            }

            return {
                content: this.$root.content.LoginWithNewPassword,
                ready: this.ready,

                buttonready: this.buttonready,

                password: this.password,
                passwordConfirmation: this.passwordConfirmation,
                email: this.email
            }
        },
        mounted () {
            let input = document.getElementById("new-pwd-setter")
            let self = this
            input.addEventListener('keyup', function (event) {
                if (self.buttonready) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        self.login()
                    }
                }
            })
        },
        methods: {
            login () {
                Axios.post(`${api}/login/setNewPassowrd`, {
                    token: this.$router.currentRoute.query.token,
                    email: this.email,
                    password: this.password,
                })
                .then(res => {
                    const decrypted = res.data
                    this.$root.profile = decrypted.profile[0]
                    this.$root.usertype = decrypted.type
                    this.$root.token = decrypted.accessLink

                    window.location.search = ""
                    localStorage.auth = res.headers.authorization

                    this.$router.push(`/`)
                })
                .catch(e => {
                    if (e.response)
                        if (e.response.data)
                            if (compare(e.response.data.error, "WRONG RESET PWD TOKEN")) {
                                this.$router.push("/login")
                            }
                            else
                                this.$root.createError(e, 'oops')
                            else
                                this.$root.createError(e, 'oops')
                            else
                                this.$root.createError(e, 'oops')
                        })
            },

            checkInputReadyness () {
                if ((this.password && this.passwordConfirmation) && (this.password == this.passwordConfirmation) && this.password.length >= 6) {
                    return true
                }
                else 
                    return false
            }
        },
        watch: {
            password: function () {
                if (this.checkInputReadyness())
                    this.buttonready = true
                else
                    this.buttonready = false
            },
            passwordConfirmation: function () {
                if (this.checkInputReadyness())
                    this.buttonready = true
                else
                    this.buttonready = false
            }
        },
    }
</script>
<style lang="scss">
#loginwithnewpwd {
    .bottom {
        margin-top:30px;
        font-size:14px;
        text-align: center;
        color: grey;
    }
    .danger-text {
        color: #ff3860;
        font-weight: 400;
    }
}
.only-bot-margin {
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
}
.nopadding {
    padding: 0px !important;
}
</style>
