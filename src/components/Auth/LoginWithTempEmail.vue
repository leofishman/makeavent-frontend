<template>
    <div id="logintempemail">
        <div class="container">
            <section class="section section-registrationhall">
                <div class="columns">
                    <div class="column is-half is-offset-one-quarter data-login">
                        <figure class="image">
                            <img v-if="$root.project.logo" :src="api + $root.project.logo">
                        </figure>

                        <div class="box">
                            <p style="margin:10px 0px;">{{$root.content.googleHint}}</p>
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
                                    <div v-if="email.includes('@makeavent.com')" class="column nopadding" style="padding-right:5px !important;">
                                        <b-field :label="$root.content.systemGenerated + $root.content.email">
                                            <b-input disabled type="password" :placeholder="common.pwd_place" v-model="email" ></b-input>
                                        </b-field>
                                    </div>
                                    <div v-else class="column nopadding" style="padding-right:5px !important;">
                                        <b-field :label="$root.content.email">
                                            <b-input disabled type="text" v-model="email" ></b-input>
                                        </b-field>
                                    </div>
                                    <div v-if="email.includes('@makeavent.com')" class="column nopadding" style="padding-left:5px !important">
                                        <b-field
                                            :label="$root.content.new + $root.content.email"
                                            >
                                            <b-input type="text" autocomplete="on" v-model="newemail" :placeholder="$root.content.pleaseEnter + $root.content.new.toLowerCase() + $root.content.email"></b-input>
                                        </b-field>
                                    </div>
                                </div>

                                <div class="columns only-bot-margin">
                                    <div class="column nopadding" style="padding-right:5px !important">
                                        <b-field
                                        :label="$root.content.systemGenerated + $root.content.password"
                                        >
                                        <b-input
                                            id="loginwithtemp1-password-input"
                                            :placeholder="common.pwd_place"
                                            disabled type="password" v-model="password" ></b-input>
                                    </b-field>
                                    </div>
                                    <div class="column nopadding" style="padding-left:5px !important">
                                        <b-field
                                        :label="$root.content.new + $root.content.password"
                                        >
                                        <b-input
                                            id="loginwithtemp2-password-input"
                                            :placeholder="$root.content.pleaseEnter + $root.content.new.toLowerCase() + $root.content.password"
                                            type="password" v-model="newpassword"></b-input>
                                        </b-field>
                                    </div>
                                </div>
                                <b-field
                                    :label="common.companyName"
                                    >
                                    <b-input
                                    type="text"
                                    :disabled="disable_companyName"
                                    v-model="companyName"
                                    :placeholder="$root.content.pleaseEnter + common.companyName"
                                    ></b-input>
                                </b-field>

                                <b-field :label="common.role">
                                    <b-input type="text" :disabled="disable_role" v-model="role" :placeholder="$root.content.pleaseEnter + common.role"></b-input>
                                </b-field>


                                <b-button :disabled="!buttonready" v-on:click="login()" type="is-primary" size="is-medium">
                                    {{common.submit}}
                                </b-button>

                                <div class="bottom">
                                    {{$root.content.contactSupport}} support@makeavent.com
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
import './index.scss'

    export default {
        data() {
            this.buttonready = false
            this.password = ""
            this.email = ""
            this.newemail = ""
            this.newpassword = ""
            this.type = ""
            this.companyName = ""
            this.role = ""
            this.name = ""
            this.disable_companyName = false
            this.disable_role = false
            this.disable_name = false

            if (!this.$root.profile) {
                this.$router.push('/login').catch(e => {})
            }
            else {
                this.email = this.$root.profile.email
                this.newemail = this.email ? this.email : ""
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
                common: this.$root.content.common,

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
                if (self.buttonready) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        self.login()
                    }
                }
            })
            input2.addEventListener('keyup', function (event) {
                if (self.buttonready) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        self.login()
                    }
                }
            })
        },
        methods: {
            fetchPasswordFromDb () {
                Axios.post(`${this.api}/login/passwordForTempAccount`, {
                    access: this.$router.currentRoute.query.access
                })
                .then(res => {
                    this.password = res.data.pwd
                    this.type = res.data.type
                    this.email = res.data.email
                })
                .catch(e => {
                    this.$router.push('/login').catch(e => {})
                })
            },

            login () {
                Axios.post(`${this.api}/login`, {
                    email: this.email,
                    newemail: this.newemail,
                    password: this.password,
                    newpassword: this.newpassword,
                    companyName: this.companyName,
                    role: this.role,
                    name: this.name,
                })
                .then(res => {
                    this.$root.profile = res.data.profile[0]
                    this.$root.usertype = res.data.type

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
#logintempemail {
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
