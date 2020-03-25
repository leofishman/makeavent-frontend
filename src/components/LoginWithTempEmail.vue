<template>
    <div>
        <img class="logo" src="../assets/logo.svg" alt="">
        <div class="center" style="overflow-y: auto; max-height: 50%;">
            <div class="title-2" v-html="$root.content.titleForLoginWithTempEmail"></div>
            <b-form-group
                :label="$root.content.name"
            >
                <b-form-input v-model="name" :placeholder="$root.content.pleaseEnter + $root.content.name"></b-form-input>
            </b-form-group>

            <b-row>
                <b-col>
                    <b-form-group
                        :label="$root.content.systemGenerated + $root.content.email"
                    >
                        <b-form-input disabled type="password" v-model="email" ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group
                        :label="$root.content.new + $root.content.email"
                    >
                        <b-form-input type="text" v-model="newemail" :placeholder="$root.content.pleaseEnter + $root.content.new.toLowerCase() + $root.content.email"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group
                        :label="$root.content.systemGenerated + $root.content.password"
                    >
                        <b-form-input disabled type="password" v-model="password" ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group
                        :label="$root.content.new + $root.content.password"
                    >
                        <b-form-input type="password" v-model="newpassword" :placeholder="$root.content.pleaseEnter + $root.content.new.toLowerCase() + $root.content.password"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-group
                :label="$root.content.companyName"
            >
                <b-form-input type="text" v-model="companyName" :placeholder="$root.content.pleaseEnter + $root.content.companyName"></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$root.content.role"
            >
                <b-form-input type="text" v-model="role" :placeholder="$root.content.pleaseEnter + $root.content.role"></b-form-input>
            </b-form-group>

            <b-form-group
                v-if="type == 'vip'"
                label="Calendly"
            >
                <b-form-input type="text" v-model="calendly" :placeholder="$root.content.pleaseEnter + 'Calendly'"></b-form-input>
                <b-link class="xxx" href="https://calendly.com/signup" target="_blank">
                    {{$root.content.dontHave('Calendly')}}
                </b-link>
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
                    <b-form-input type="text" :disabled="!tgswitch" v-model="tg" :placeholder="$root.content.pleaseEnter + 'TelegramID' + $root.content.example + 'blockconf'"></b-form-input>
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
                <b-button :disabled="!buttonready" v-on:click="login()" variant="primary">
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
import Axios from 'axios'
import {self, host} from '../env'

export default {
    data() {
        this.buttonready = false

        this.type = ""
        this.password = ""
        this.email = ""
        this.newemail = ""
        this.newpassword = ""
        this.companyName = ""
        this.role = ""
        this.name = ""
        this.calendly = ""

        this.tg = ""
        this.ln = ""
        this.fb = ""
        this.tgswitch = false
        this.fbswitch = false
        this.lnswitch = false

        this.fetchPasswordFromDb()
        
        return {
            buttonready: this.buttonready,

            type: this.type,
            password: this.password,

            email: this.email,
            newemail: this.newemail,
            newpassword: this.newpassword,
            companyName: this.companyName,
            role: this.role,
            name: this.name,
            calendly: this.calendly,

            tg: this.tg,
            tgswitch: this.tgswitch,
            ln: this.ln,
            fb: this.fb,
            fbswitch: this.fbswitch,
            lnswitch: this.lnswitch,
        }
    },
    methods: {
        fetchPasswordFromDb () {
            Axios.post(`${host}/login/passwordForTempAccount`, {
                access: this.$router.currentRoute.query.access
            })
            .then(res => {
                this.password = res.data.pwd
                this.type = res.data.type
                this.email = res.data.email
            })
            .catch(e => {
                this.$router.push('/login')
            })
        },

        login () {
            Axios.post(`${host}/login`, {
                email: this.email,
                newemail: this.newemail,
                password: this.password,
                newpassword: this.newpassword,
                companyName: this.companyName,
                role: this.role,
                name: this.name,
                calendly: this.calendly,
                Telegram: this.tg,
                Linkedin: this.ln,
                Facebook: this.fb,
            })
            .then(res => {
                const data = res.data

                this.$root.profile = data.profile[0]
                this.$root.usertype = data.type
                this.$root.token = data.accessLink
                
                localStorage.auth = res.headers.authorization

                this.$router.push(`${data.accessLink}/home?auth=true`)
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
                    this.newemail = ""
                    this.newpassword = ""
                })
            })
        },

        checkSocials () {
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
        },

        checkInputReadyness () {
            if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.newemail) &&
            this.newpassword &&
            this.companyName &&
            this.role &&
            this.name) {
                if (this.type == "vip") {
                    if (this.calendly) {
                        if (this.checkSocials())
                            return true
                        else
                            return false
                    }
                    else 
                        return false
                }
                else if (this.checkSocials())
                    return true
                else
                    return false
                    
            }
            else 
                return false
        }
    },
    watch: {
        email: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        newpassword: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        companyName: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        role: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        name: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        calendly: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        tg: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        tgswitch: function () {
            if (!this.tgswitch) {
                this.tg = ""
                if (this.checkInputReadyness())
                    this.buttonready = true
                else
                    this.buttonready = false
            }
            else if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        ln: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        lnswitch: function () {
            if (!this.lnswitch) {
                this.ln = ""
                if (this.checkInputReadyness())
                    this.buttonready = true
                else
                    this.buttonready = false
            }
            else if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        fb: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        fbswitch: function () {
            if (!this.fbswitch) {
                this.fb = ""
                if (this.checkInputReadyness())
                    this.buttonready = true
                else
                    this.buttonready = false
            }
            else if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
    },
}
</script>
<style lang="css">
    .title-2 {
        font-size: 20px;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }
    a.xxx {
        color: blue;
        font-size: 14px;
    }
</style>