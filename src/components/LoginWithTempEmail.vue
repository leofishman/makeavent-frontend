<template>
    <div id="logintempemail">
        <div class="container">
            <section class="section section-registrationhall">
                <div class="columns is-variable is-8">
                    <div class="column data-login">
                        <figure class="image">
                            <img src="@/assets/logo_dark.svg">
                        </figure>

                        <div class="box">
                            <p style="margin:10px 0px;">For the better experience our team recommends to use Google Chrome</p>
                            <p v-html="$root.content.titleForLoginWithTempEmail"></p>
                            <section>
                                <b-field :label="$root.content.name"> 
                                    <b-input
                                        v-model="name"
                                        :disabled="disable_name"
                                        :placeholder="$root.content.pleaseEnter + $root.content.name"
                                    ></b-input>
                                </b-field>

                                <div class="columns only-bot-margin">
                                    <div v-if="email.includes('@blockconf.digital')" class="column nopadding" style="padding-right:5px !important;">
                                        <b-field :label="$root.content.systemGenerated + $root.content.email">
                                            <b-input disabled type="password" v-model="email" ></b-input>
                                        </b-field>
                                    </div>
                                    <div v-else class="column nopadding" style="padding-right:5px !important;">
                                        <b-field :label="$root.content.email">
                                            <b-input disabled type="text" v-model="email" ></b-input>
                                        </b-field>
                                    </div>
                                    <div v-if="email.includes('@blockconf.digital')" class="column nopadding" style="padding-left:5px !important">
                                        <b-field
                                            :label="$root.content.new + $root.content.email"
                                        >
                                            <b-input type="text" v-model="newemail" :placeholder="$root.content.pleaseEnter + $root.content.new.toLowerCase() + $root.content.email"></b-input>
                                        </b-field>
                                    </div>
                                </div>

                                <div class="columns only-bot-margin">
                                    <div class="column nopadding" style="padding-right:5px !important">
                                        <b-field
                                            :label="$root.content.systemGenerated + $root.content.password"
                                        >
                                            <b-input id="loginwithtemp1-password-input" disabled type="password" v-model="password" ></b-input>
                                        </b-field>
                                    </div>
                                    <div class="column nopadding" style="padding-left:5px !important">
                                        <b-field
                                            :label="$root.content.new + $root.content.password"
                                        >
                                            <b-input id="loginwithtemp2-password-input" type="password" v-model="newpassword" :placeholder="$root.content.pleaseEnter + $root.content.new.toLowerCase() + $root.content.password"></b-input>
                                        </b-field>
                                    </div>
                                </div>
                                
                                <b-field
                                    :label="$root.content.companyName"
                                >
                                    <b-input
                                        type="text"
                                        :disabled="disable_companyName"
                                        v-model="companyName"
                                        :placeholder="$root.content.pleaseEnter + $root.content.companyName"
                                    ></b-input>
                                </b-field>

                                <b-field
                                    :label="$root.content.role"
                                >
                                    <b-input
                                        type="text"
                                        :disabled="disable_role"
                                        v-model="role"
                                        :placeholder="$root.content.pleaseEnter + $root.content.role"
                                    ></b-input>
                                </b-field>


                                <b-button :disabled="!buttonready" v-on:click="login()" type="is-primary" size="is-medium">
                                    {{$root.content.submit}}
                                </b-button>

                                <div class="bottom">
                                    {{$root.content.contactSupport}} support@blockconf.digital
                                </div>
                            </section>
                        </div>
                    </div>

                    <div class="column sponsors-login">
                        <SponsorsCol />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {self, host} from '@/env'
import SponsorsCol from '@/components/SponsorsCol'

export default {
    components: {
        SponsorsCol
    },
    data() {
        this.buttonready = false

        if (!this.$root.profile) {
            this.$router.push('/login')
        }
        else {
            this.password = ""
            this.email = this.$root.profile.email
            this.newemail = this.email ? this.email : ""
            this.newpassword = ""
            this.type = this.$root.profile.type
            this.companyName = this.$root.profile.company
            this.role = this.$root.profile.role
            this.name = this.$root.profile.name
    
            this.disable_companyName = this.companyName ? true : false
            this.disable_role = this.role ? true : false
            this.disable_name = this.name ? true : false
    
            this.fetchPasswordFromDb()
        }

        
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

            disable_companyName: this.disable_companyName,
            disable_role: this.disable_role,
            disable_name: this.disable_name,
        }
    },
    mounted () {
        let input1 = document.getElementById("loginwithtemp1-password-input")
        let input2 = document.getElementById("loginwithtemp2-password-input")
        let self = this
        input1.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.login()
            }
        })
        input2.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.login()
            }
        })
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
            })
            .then(res => {
                const data = res.data

                this.$root.profile = data.profile[0]
                this.$root.usertype = data.type
                this.$root.token = data.accessLink
                
                localStorage.auth = res.headers.authorization

                this.$router.push(`/`)
            })
            .catch(e => {
                this.$buefy.dialog.alert({
                    title: this.$root.content.error,
                    message: this.$root.content.wrongPassTitle,
                    type: 'is-danger',
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true,
                    canCancel: true,
                    onCancel: () => {
                        this.email = ""
                        this.password = ""    
                    },
                    onConfirm: () => {
                        this.email = ""
                        this.password = ""    
                    }
                })
            })
        },

        checkInputReadyness () {
            if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.newemail) &&
            this.newpassword &&
            this.companyName &&
            this.role &&
            this.name) {
                return true
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
    },
}
</script>
<style lang="scss">
    #login {
        .bottom {
            margin-top:30px;
            font-size:14px;
            text-align: center;
            color: grey;
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
