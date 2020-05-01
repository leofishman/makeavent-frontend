<template>
    <div id="login">
        <div class="container">
            <section class="section section-login">
                <div class="columns is-centered">
                    <div class="column is-half-desktop is-one-third-fullhd">
                        <figure class="image">
                            <img src="@/assets/logo_dark.svg">
                        </figure>
                        
                        <div class="box">
                            <p v-html="$root.content.titleForLoginWithTempEmail"></p>
                            <section>
                                <b-field :label="$root.content.name"> 
                                    <b-input
                                        v-model="name"
                                        :disabled="disable_name"
                                        :placeholder="$root.content.pleaseEnter + $root.content.name"
                                    ></b-input>
                                </b-field>

                                <div class="columns">
                                    <div v-if="email.includes('@blockconf.digital')" class="column">
                                        <b-field :label="$root.content.systemGenerated + $root.content.email">
                                            <b-input disabled type="password" v-model="email" ></b-input>
                                        </b-field>
                                    </div>
                                    <div v-else class="column">
                                        <b-field :label="$root.content.email">
                                            <b-input disabled type="text" v-model="email" ></b-input>
                                        </b-field>
                                    </div>
                                    <div v-if="email.includes('@blockconf.digital')" class="column">
                                        <b-field
                                            :label="$root.content.new + $root.content.email"
                                        >
                                            <b-input type="text" v-model="newemail" :placeholder="$root.content.pleaseEnter + $root.content.new.toLowerCase() + $root.content.email"></b-input>
                                        </b-field>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <b-field
                                            :label="$root.content.systemGenerated + $root.content.password"
                                        >
                                            <b-input disabled type="password" v-model="password" ></b-input>
                                        </b-field>
                                    </div>
                                    <div class="column">
                                        <b-field
                                            :label="$root.content.new + $root.content.password"
                                        >
                                            <b-input type="password" v-model="newpassword" :placeholder="$root.content.pleaseEnter + $root.content.new.toLowerCase() + $root.content.password"></b-input>
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

                                <b-field
                                    v-if="type == 'vip'"
                                    label="Calendly"
                                >
                                    <b-input
                                        type="text"
                                        :disable="disable_calendly"
                                        v-model="calendly"
                                        :placeholder="$root.content.pleaseEnter + 'Calendly'"
                                    ></b-input>
                                    <b-link class="xxx" href="https://calendly.com/signup" target="_blank">
                                        {{$root.content.dontHave('Calendly')}}
                                    </b-link>
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
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {self, host} from '@/env'

export default {
    data() {
        this.buttonready = false

        this.password = ""
        this.email = this.$root.profile.email
        this.newemail = this.email ? this.email : ""
        this.newpassword = ""
        this.type = this.$root.profile.type
        this.companyName = this.$root.profile.company
        this.role = this.$root.profile.role
        this.name = this.$root.profile.name
        this.calendly = this.$root.profile.calendly

        this.disable_companyName = this.companyName ? true : false
        this.disable_role = this.role ? true : false
        this.disable_name = this.name ? true : false
        this.disable_calendly = this.calendly ? true : false

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

            disable_companyName: this.disable_companyName,
            disable_role: this.disable_role,
            disable_name: this.disable_name,
            disable_calendly: this.disable_calendly,
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
                if (this.type == "vip") {
                    if (this.calendly) 
                        return true
                    else 
                        return false
                }
                else
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
        calendly: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        }
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
        .label {
            font-weight: 400;
        }
    }
</style>