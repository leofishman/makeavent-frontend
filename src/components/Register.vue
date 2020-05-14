<template>
    <div id="register">
        <div class="container">
            <section class="section section-registrationhall">
                <div class="columns is-variable is-8">
                    <div class="column data-login">
                        <figure class="image">
                            <img src="@/assets/logo_dark.svg">
                        </figure>

                        <div class="box">
                            <p style="margin:10px 0px;">For the better experience our team recommends to use Google Chrome</p>
                            <p v-html="content.title"></p>
                            <section>
                                <b-field :label="$root.content.email">
                                    <b-input type="email" v-model="email" ></b-input>
                                </b-field>

                                <b-field :label="$root.content.name"> 
                                    <b-input v-model="name" ></b-input>
                                </b-field>
                                
                                <b-field
                                    :label="$root.content.companyName"
                                >
                                    <b-input type="text" v-model="companyName"></b-input>
                                </b-field>

                                <b-field
                                    :label="$root.content.role"
                                >
                                    <b-input type="text" v-model="role" ></b-input>
                                </b-field>

                                <!-- <div class="columns only-bot-margin">
                                    <div class="column nopadding">
                                        <b-field :label="content.chooseTicketType">
                                            <b-select v-model="type">
                                                <option value="basic">{{$root.content.basic}}</option>
                                                <option value="business">{{$root.content.business}}</option>
                                                <option value="vip">{{$root.content.vip}}</option>
                                            </b-select>
                                        </b-field>
                                        <div class="price" v-if="type == 'basic'">
                                            {{content.free}}
                                        </div>
                                        <div class="price" v-else-if="type == 'business' || type == 'vip'">
                                            ${{price}}
                                        </div>
                                    </div>
                                    <div v-if="type == 'basic'" class="content column nopadding">
                                        <ol type='1'>
                                            <li>Access to the conference hall with e-booths</li>
                                            <li>Access to e-stages with lectures and panel discussions</li>
                                        </ol>
                                    </div>
                                    <div v-if="type == 'business'" class="content column nopadding">
                                        <ol type='1'>
                                            <li>All in Basic +</li>
                                            <li>Participation and networking at e-booths</li>
                                            <li>Access to e-booths chats</li>
                                            <li>Ability to request business cards</li>
                                            <li>E-Coffee break with networking</li>
                                            <li>E-Workshops</li>
                                        </ol>
                                    </div>
                                    <div v-if="type == 'vip'" class="content column nopadding">
                                        <ol type='1'>
                                            <li>All in Business +</li>
                                            <li>Asking questions to guest speakers</li>
                                            <li>VIP e-meeting room</li>
                                            <li>Private meeting scheduling</li>
                                            <li>VIP events</li>
                                            <li>Access to offline materials</li>
                                        </ol>
                                    </div>
                                </div>

                                <b-field v-if="type == 'vip'">
                                    <template slot="label">
                                        <div>
                                            Calendly
                                            <a class="xxx" href="https://calendly.com/signup" target="_blank">
                                                {{$root.content.dontHave('Calendly')}}
                                            </a>
                                        </div>
                                    </template>
                                    <b-input type="text" pattern="^https://calendly.com/" v-model="calendly"></b-input>
                                </b-field> -->

                                <p style="margin:20px 0px;">{{$root.content.ErrorMessages[4]}}</p>
                                <div>
                                    <b-field :label="content.linkedin">
                                        <b-input type="url" v-model="linkedin"></b-input>
                                    </b-field>
                                    <b-field :label="content.facebook">
                                        <b-input type="url" v-model="facebook"></b-input>
                                    </b-field>
                                    <b-field :label="content.telegram">
                                        <b-input type="url" v-model="telegram"></b-input>
                                    </b-field>
                                    <b-field :label="content.photo">
                                        <input
                                            enctype="multipart/form-data"
                                            type="file"
                                            id="file"
                                            ref="file"
                                            name="userProfilePhoto"
                                            v-on:change="handleFileUpload()"
                                        >
                                    </b-field>
                                </div>

                                <div class="tile">
                                    <div class="tile is-child">
                                        <b-button :disabled="!buttonready" v-on:click="register()" type="is-primary" size="is-medium">
                                            {{$root.content.submit}}
                                        </b-button>
                                    </div>
                                    <div @click="navToLogin()" style="padding: 30px 0px;" class="click tile is-child">
                                        {{$root.content.common.haveAccount}}
                                    </div>
                                </div>

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

        this.email = ""
        // only during meetup
        this.type = "basic"
        this.companyName = ""
        this.role = ""
        this.name = ""
        this.calendly = ""
        this.photo = ""
        this.linkedin = ""
        this.facebook = ""
        this.telegram = ""

        this.price = ''
        
        return {
            buttonready: this.buttonready,

            type: this.type,

            email: this.email,
            companyName: this.companyName,
            role: this.role,
            name: this.name,
            calendly: this.calendly,
            photo: this.photo,
            linkedin: this.linkedin,
            facebook: this.facebook,
            telegram: this.telegram,
            price: this.price,

            content: this.$root.content.Register
        }
    },
    methods: {
        navToLogin () {
            this.$router.push('/login')
        },

        handleFileUpload () {
            this.photo = this.$refs.file.files[0];
        },

        async register () {
            if (this.type == 'basic') {
                if (!this.linkedin && !this.facebook && !this.telegram && !this.photo) {
                    this.$root.createError(this.$root.content.ErrorMessages[4], 'oops')
                }
                else {
                    Axios.post(`${host}/register?r=authorization`, {
                        email: this.email,
                        companyName: this.companyName,
                        role: this.role,
                        name: this.name,
                        calendly: this.calendly,
                        // shouldPay: await this.GetTicketPrice(),
                        shouldPay: 0,
                        tickets: 1,
                        shouldResetPwd: false,
                    })
                    .then(async res => {
                        const data = res.data
                        this.$root.usertype = data.type
                        this.$root.token = data.accessLink
                        this.$root.profile = data.profile
                        localStorage.auth = res.headers.authorization
    
                        this.updateSocials()
                        this.updateProfilePhoto()
    
                        this.$router.push('/')
                    })
                    .catch(e => {
                        this.$root.createError(e.toString(), 'oops')
                    })
                }
            }            
        },

        GetTicketPrice () {
            return new Promise(async (resolve, reject) => {
                Axios.get(host + '/ticket/pricetable').then(res => resolve(res.data[this.type]))
            })
        },

        checkInputReadyness () {
            if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.email) &&
            this.companyName &&
            this.role &&
            this.type &&
            this.name) {
                if (this.type == "vip") {
                    if (/(^https:\/\/calendly.com\/)/.test(this.calendly))
                        return true
                    else 
                        return false
                }
                else
                    return true
            }
            else 
                return false
        },

        updateSocials () {
            if (this.linkedin || this.telegram || this.facebook) {
                Axios.post(host + `/login/socials_reg`, {
                    Linkedin: this.linkedin,
                    Facebook: this.facebook,
                    Telegram: this.telegram,
                }, {
                    headers: {
                        authorization: localStorage.auth
                    }
                })
            }
        },

        updateProfilePhoto () {
            if (this.photo) {
                let formData = new FormData();
                formData.append('userProfilePhoto', this.photo);

                return Axios.post(`${host}/login/profilephoto`, formData, {
                    headers: { authorization: localStorage.auth }
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
        type: function () {
            this.GetTicketPrice().then(res => {
                this.price = res
            })
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