<template>
    <div>
        <img class="logo" src="../assets/logo.svg" alt="">
        <div class="center">
            <div class="title">
                {{$root.content.loginWithTicket}}
            </div>
            <b-form-group
                :label="$root.content.email"
            >
                <b-form-input v-model="email" :placeholder="$root.content.emailPlaceholder"></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$root.content.password"
            >
                <b-form-input type="password" v-model="password" :placeholder="$root.content.passwordPlaceholderFromEmail"></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$root.content.optionalyProvide('Linkedin, Telegram, Facebook')"
            ></b-form-group>

            <b-form-group>
                <b-input-group
                    label="Telegram"
                >
                    <b-input-group-prepend is-text>
                        <b-form-checkbox v-model="tgswitch" switch class="mr-n2"></b-form-checkbox>
                    </b-input-group-prepend>
                    <b-form-input type="text" :disabled="!tgswitch" v-model="tg" :placeholder="$root.content.pleaseEnter + 'Telegram ID' + $root.content.example + 'blockconf'"></b-form-input>
                </b-input-group>

                <b-input-group
                    label="Linkedin"
                >
                    <b-input-group-prepend is-text>
                        <b-form-checkbox v-model="lnswitch" switch class="mr-n2"></b-form-checkbox>
                    </b-input-group-prepend>
                    <b-form-input type="text" :disabled="!lnswitch" v-model="ln" :placeholder="$root.content.pleaseEnter + 'Linkedin'"></b-form-input>
                </b-input-group>

                <b-input-group
                    label="Facebook"
                >
                    <b-input-group-prepend is-text>
                        <b-form-checkbox v-model="fbswitch" switch class="mr-n2"></b-form-checkbox>
                    </b-input-group-prepend>
                    <b-form-input type="text" :disabled="!fbswitch" v-model="fb" :placeholder="$root.content.pleaseEnter + 'Facebook'"></b-form-input>
                </b-input-group>
            </b-form-group>

            <b-form-group>
                <b-button :disabled="!inputsReady" v-on:click="login()" variant="primary">
                    {{$root.content.submit}}
                </b-button>
            </b-form-group>

            <div class="bottom">
                {{$root.content.contactSupport}} support@blockconf.digital
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { host } from '../env'

export default {
    data() {
        this.email = ''
        this.password = ''

        this.tg = ""
        this.fb = ""
        this.ln = ""
        this.tgswitch = false
        this.fbswitch = false
        this.lnswitch = false

        this.inputsReady = false

        return {
            email: this.email,
            password: this.password,
            inputsReady: this.inputsReady,

            tg: this.tg,
            fb: this.fb,
            ln: this.ln,
            tgswitch: this.tgswitch,
            fbswitch: this.fbswitch,
            lnswitch: this.lnswitch,
        }
    },
    methods: {
        login () {
            axios.post(`${host}/login`, {
                email: this.email,
                password: this.password
            })
            .then(res => {
                const data = res.data
                this.$root.usertype = data.type
                this.$root.token = data.accessLink
                
                localStorage.auth = res.headers.authorization
                
                return axios.post(`${host}/login/addsocials`, {
                    email: this.email,
                    password: this.password,
                    Telegram: this.tg,
                    Facebook: this.fb,
                    Linkedin: this.ln,
                })
            })
            .then(res => {
                const profile = res.data[0]
                this.$root.profile = profile
                this.$router.push(`${this.$root.token}/home`)
            })
            .catch(e => {
                this.$bvModal.msgBoxOk(this.$root.content.wrongPassTitle, {
                    title: this.$root.content.error,
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    headerClass: 'p-2 border-bottom-0',
                    footerClass: 'p-2 border-top-0',
                    centered: true
                })
                .then(() => {
                    this.email = ""
                    this.password = ""
                })
            })
        },

        checkInputs () {
            if (this.email && this.password) {
                if (!this.tgswitch && !this.fbswitch && !this.lnswitch)
                    return true
                    
                else {
                    let tg = "noneed"
                    let fb = "noneed"
                    let ln = "noneed"
    
                    if (this.tgswitch)
                        if (this.tg)
                            tg = true
                        else 
                            tg = false
    
                    if (this.lnswitch)
                        if (this.ln)
                            ln = true
                        else 
                            ln = false
    
                    if (this.fbswitch)
                        if (this.fb)
                            fb = true
                        else
                            fb = false
    
                    if (
                        (tg === true || tg == "noneed") &&
                        (fb === true || fb == "noneed") &&
                        (ln === true || ln == "noneed")
                    )
                        return true
                    else 
                        return false
                }
            }
            else
                return false
        },
    },
    watch: {
        email: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },

        password: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        tg: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        tgswitch: function () {
            if (!this.tgswitch) {
                this.tg = ""
                if (this.checkInputs())
                    this.inputsReady = true
                else
                    this.inputsReady = false
            }
            else if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        ln: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        lnswitch: function () {
            if (!this.lnswitch) {
                this.ln = ""
                if (this.checkInputs())
                    this.inputsReady = true
                else
                    this.inputsReady = false
            }
            else if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        fb: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        fbswitch: function () {
            if (!this.fbswitch) {
                this.fb = ""
                if (this.checkInputs())
                    this.inputsReady = true
                else
                    this.inputsReady = false
            }
            else if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
    },
}
</script>
<style lang="css">
    .center {
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 50%;
        height: 50%;
        display: block;
        position: absolute;
        padding: 50px;
        background: white;
        border-radius: 20px;
        overflow-y: auto;
    }
    .title {
        font-size:30px;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }
    .logo {
        width:50%;
        max-width: 300px;
        position: relative;
        margin: 50px auto 0px auto;
        display: block;
    }
    .bottom {
        margin-top: 50px;
        text-align: center;
    }
</style>