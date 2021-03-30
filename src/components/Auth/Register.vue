<template>
    <div id="register">
        <b-loading :is-full-page="true" :active.sync="isGlobalLoaderOpen" :can-cancel="false"></b-loading>

        <div class="container">
            <section class="section section-registrationhall">
                <div class="columns">
                    <div class="column is-half is-offset-one-quarter data-login">
                        <figure class="image title-logo">
                            <img v-if="$root.project.logo" :src="api + $root.project.logo">
                        </figure>

                        <div class="box">
                            <p style="margin:10px 0px;">{{$root.content.googleHint}}</p>
                            <p v-html="content.title"></p>
                            <section>
                                <b-field :label="$root.content.name"> 
                                    <b-input v-model="name" :placeholder="content.name_place"></b-input>
                                </b-field>

                                <b-field :label="$root.content.email">
                                    <b-input autocomplete="on" id="register-email" type="email" :placeholder="content.email_place" v-model="email" ></b-input>
                                </b-field>

                                <div class="columns only-bot-margin">
                                    <div class="column" style="padding-left:0px;">
                                        <b-field :label="$root.content.password">
                                            <b-input id="register-pwd" type="password" :placeholder="content.pwd_place" v-model="password"></b-input>
                                        </b-field>
                                    </div>
                                    <div class="column" style="padding-left:0px;">
                                        <b-field :label="$root.content.passwordConfirmation">
                                            <b-input id="register-pwd-conf" type="password" :placeholder="content.pwd_place" v-model="passwordConfirmation"></b-input>
                                        </b-field>
                                    </div>
                                </div>

                                <div class="danger-text" v-if="(password && passwordConfirmation) && (password != passwordConfirmation)">
                                    {{$root.content.passwordNotSame}}
                                </div>
                                <div class="danger-text" v-if="(password && passwordConfirmation) && (password == passwordConfirmation) && password.length < 6">
                                    {{$root.content.minLength}}
                                </div>

                                <div class="tile">
                                    <div class="tile is-child">
                                        <b-button :disabled="!buttonready" v-on:click="register()" type="is-primary" size="is-medium">
                                            {{$root.content.common.submit}}
                                        </b-button>
                                    </div>
                                    <div @click="navToLogin()" style="padding: 30px 0px;" class="click tile is-child">
                                        {{$root.content.common.haveAccount}}
                                    </div>
                                </div>

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
    props: {
        data: String
    },
    data() {
        this.forwardPath = this.data

        this.buttonready = false

        this.email = ""
        // only during meetup
        this.type = "basic"
        this.companyName = ""
        this.role = ""
        this.name = ""
        this.photo = ""
        this.linkedin = ""
        this.facebook = ""
        this.telegram = ""
        this.password = ""
        this.passwordConfirmation = ""

        this.price = ''
        
        return {
            buttonready: this.buttonready,
            isGlobalLoaderOpen: false,

            type: this.type,

            email: this.email,
            companyName: this.companyName,
            role: this.role,
            name: this.name,
            photo: this.photo,
            linkedin: this.linkedin,
            facebook: this.facebook,
            telegram: this.telegram,
            price: this.price,

            content: this.$root.content.Register,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation,
        }
    },
    mounted () {
        const self = this
        const onEnter = function (event) {
            if (self.buttonready) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    self.register()
                }
            }
        }

        let timer = setInterval(() => {
            let input = document.getElementById("register-pwd")
            let input1 = document.getElementById("register-pwd-conf")
            if ( input && input1 ) {
                clearInterval(timer)
                input.addEventListener('keyup', onEnter)
                input1.addEventListener('keyup', onEnter)
            }
        })

    },
    methods: {
        navToLogin () {
            if ( this.forwardPath )
               this.$router.push(`/login?f=${this.forwardPath}`).catch(e => {})
            else
                this.$router.push('/login')
        },

        handleFileUpload () {
            this.photo = this.$refs.file.files[0];
        },

        async register () {
            this.isGlobalLoaderOpen = true
            
            Axios.post(`${this.api}/register?r=authorization`, {
                email: this.email,
                name: this.name,
                password: this.password,
                shouldPay: 0,
                tickets: 1,
                shouldResetPwd: false,
            })
            .then(async res => {
                const response = res.data
                this.$root.usertype = response.type
                this.$root.profile = response.profile
                localStorage.setItem("auth", res.headers.authorization)

                if (this.forwardPath)
                    if (this.forwardPath.includes('confirm_invitation')) {
                        this.$root.usertype = response.type
                        this.$root.profile = response.profile
                        localStorage.auth = res.headers.authorization
                        
                        this.$router.push(this.forwardPath)
                    }
                    else
                        this.$router.push('/').catch(e => {})
                else
                    this.$router.push('/').catch(e => {})

            })
            .catch(e => {
                this.isGlobalLoaderOpen = false
                
                console.log(e)
                if (compare(e.response.data.error, 'Already exists'))
                    this.$root.createError('User with such email already exists, please login.', 'oops')
                else
                    this.$root.createError(e.toString(), 'oops')
            })
        },

        GetTicketPrice () {
            return new Promise(async (resolve, reject) => {
                Axios.get(this.api + '/ticket/pricetable').then(res => resolve(res.data[this.type]))
            })
        },

        checkInputReadyness () {
            if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.email) &&
            this.type &&
            (this.password && this.passwordConfirmation) && (this.password == this.passwordConfirmation) &&
            this.password.length >= 6 &&
            this.name) {
                return true
            }
            else 
                return false
        },

        updateSocials () {
            if (this.linkedin || this.telegram || this.facebook) {
                Axios.post(this.api + `/login/socials_reg`, {
                    Linkedin: this.linkedin,
                    Facebook: this.facebook,
                    Telegram: this.telegram,
                }, {
                    headers: {
                        authorization: localStorage.getItem("auth")
                    }
                })
            }
        },

        updateProfilePhoto () {
            if (this.photo) {
                let formData = new FormData();
                formData.append('userProfilePhoto', this.photo);

                return Axios.post(`${this.api}/login/profilephoto`, formData, {
                    headers: { authorization: localStorage.getItem("auth") }
                })
            }
            else {
                return true
            }
        }
    },
    watch: {
        email: function () {
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
        passwordConfirmation: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        },
        password: function () {
            if (this.checkInputReadyness())
                this.buttonready = true
            else
                this.buttonready = false
        }
    },
}
</script>
<style lang="scss">
    #register {
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
