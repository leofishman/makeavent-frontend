<template>
    <div id="register">
        <div class="container">
            <section class="section section-registrationhall">
                <div class="columns">
                    <div class="column is-half is-offset-one-quarter data-login">
                        <figure class="image">
                            <img v-if="$root.project.logo" :src="api + $root.project.logo">
                        </figure>

                        <div class="box">
                            <p style="margin:10px 0px;">{{content.hint}}</p>
                            <p v-html="content.title"></p>
                            <section>
                                <b-field :label="$root.content.name"> 
                                    <b-input v-model="name" ></b-input>
                                </b-field>

                                <b-field :label="$root.content.email">
                                    <b-input id="register-email" type="email" v-model="email" ></b-input>
                                </b-field>

                                <div class="columns only-bot-margin">
                                    <div class="column" style="padding-left:0px;">
                                        <b-field :label="$root.content.password">
                                            <b-input type="password" v-model="password"></b-input>
                                        </b-field>
                                    </div>
                                    <div class="column" style="padding-left:0px;">
                                        <b-field :label="$root.content.passwordConfirmation">
                                            <b-input type="password" v-model="passwordConfirmation"></b-input>
                                        </b-field>
                                    </div>
                                </div>

                                <div class="danger-text" v-if="(password && passwordConfirmation) && (password != passwordConfirmation)">
                                    {{$root.content.passwordNotSame}}
                                </div>
                                <div class="danger-text" v-if="(password && passwordConfirmation) && (password == passwordConfirmation) && password.length < 6">
                                    {{$root.content.minLength}}
                                </div>
                                
                                <!-- <b-field
                                    :label="$root.content.companyName"
                                >
                                    <b-input type="text" v-model="companyName"></b-input>
                                </b-field> -->

                                <!-- <b-field
                                    :label="$root.content.role"
                                >
                                    <b-input type="text" v-model="role" ></b-input>
                                </b-field> -->

                                <!-- <div class="columns only-bot-margin">
                                    <div class="column nopadding">
                                        <b-field :label="content.chooseTicketType">
                                            <b-select v-model="type">
                                                <option value="basic">{{$root.content.basic}}</option>
                                                <option value="business">{{$root.content.business}}</option>
                                                <option value="vip">{{$root.content.vip}}</option>
                                            </b-select>
                                        </b-field>
                                        <div class="price" v-if="$root.compare(type, 'basic')">
                                            {{content.free}}
                                        </div>
                                        <div class="price" v-else-if="$root.compare(type, 'business') || $root.compare(type, 'vip')">
                                            ${{price}}
                                        </div>
                                    </div>
                                    <div v-if="$root.compare(type, 'basic')" class="content column nopadding">
                                        <ol type='1'>
                                            <li>Access to the conference hall with e-booths</li>
                                            <li>Access to e-stages with lectures and panel discussions</li>
                                        </ol>
                                    </div>
                                    <div v-if="$root.compare(type, 'business')" class="content column nopadding">
                                        <ol type='1'>
                                            <li>All in Basic +</li>
                                            <li>Participation and networking at e-booths</li>
                                            <li>Access to e-booths chats</li>
                                            <li>Ability to request business cards</li>
                                            <li>E-Coffee break with networking</li>
                                            <li>E-Workshops</li>
                                        </ol>
                                    </div>
                                    <div v-if="$root.compare(type, 'vip')" class="content column nopadding">
                                        <ol type='1'>
                                            <li>All in Business +</li>
                                            <li>Asking questions to guest speakers</li>
                                            <li>VIP e-meeting room</li>
                                            <li>Private meeting scheduling</li>
                                            <li>VIP events</li>
                                            <li>Access to offline materials</li>
                                        </ol>
                                    </div>
                                </div> -->

                                <!-- <p style="margin:20px 0px;">{{$root.content.ErrorMessages[4]}}</p>
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
                                </div> -->

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
        this.photo = ""
        this.linkedin = ""
        this.facebook = ""
        this.telegram = ""
        this.password = ""
        this.passwordConfirmation = ""

        this.price = ''
        
        return {
            buttonready: this.buttonready,

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
        let input = document.getElementById("register-email")
        let self = this
        input.addEventListener('keyup', function (event) {
            if (self.buttonready) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    self.register()
                }
            }
        })
    },
    methods: {
        navToLogin () {
            this.$router.push('/login').catch(e => {})
        },

        handleFileUpload () {
            this.photo = this.$refs.file.files[0];
        },

        async register () {
            if (compare(this.type, 'basic')) {
                /**
                 * @description #reghall we don't force to provide socials and photo for now
                 */
                // if (!this.linkedin && !this.facebook && !this.telegram && !this.photo) {
                //     this.$root.createError(this.$root.content.ErrorMessages[4], 'oops')
                // }
                // else {
                    Axios.post(`${this.api}/register?r=authorization`, {
                        email: this.email,
                        
                        // companyName: this.companyName,
                        // role: this.role,
                        name: this.name,
                        // shouldPay: await this.GetTicketPrice(),
                        password: this.password,
                        shouldPay: 0,
                        tickets: 1,
                        shouldResetPwd: false,
                    })
                    .then(async res => {
                        const data = res.data
                        this.$root.usertype = data.type
                        this.$root.profile = data.profile
                        localStorage.setItem("auth", res.headers.authorization)
    
                        /**
                         * @description #reghall we don't force to provide socials and photo for now
                         */
                        // this.updateSocials()
                        // this.updateProfilePhoto()
    
                        this.$router.push('/').catch(e => {})
                    })
                    .catch(e => {
                        console.log(e)
                        if (compare(e.response.data.error, 'Already exists'))
                            this.$root.createError('User with such email already exists, please login.', 'oops')
                        else
                            this.$root.createError(e.toString(), 'oops')
                    })
                // }
            }            
        },

        GetTicketPrice () {
            return new Promise(async (resolve, reject) => {
                Axios.get(this.api + '/ticket/pricetable').then(res => resolve(res.data[this.type]))
            })
        },

        checkInputReadyness () {
            if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.email) &&
            /**
             * @description #reghall we don't force to provide socials and photo for now
             */
            // this.companyName &&
            // this.role &&
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
                        authorization: localStorage.auth
                    }
                })
            }
        },

        updateProfilePhoto () {
            if (this.photo) {
                let formData = new FormData();
                formData.append('userProfilePhoto', this.photo);

                return Axios.post(`${this.api}/login/profilephoto`, formData, {
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
        // type: function () {
        //     this.GetTicketPrice().then(res => {
        //         this.price = res
        //     })
        //     if (this.checkInputReadyness())
        //         this.buttonready = true
        //     else
        //         this.buttonready = false
        // }
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
