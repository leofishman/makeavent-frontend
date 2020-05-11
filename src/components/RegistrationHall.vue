<template>
    <div id="registrationhall">
        <div class="container">
            <section class="section section-registrationhall">
                <div class="columns is-variable is-8">
                    <div class="column data-login">
                        <figure class="image">
                            <img src="@/assets/logo_dark.svg">
                        </figure>
                        
                        <div class="box">
                            <h1 class="is-size-3">{{content.title}}</h1>
                            <p>{{content.intro}}</p>
                            <section>
                                <b-field :label="content.email">
                                    <b-input v-model="email" type="email" :validation-message="content.emailValidation"></b-input>
                                </b-field>
                                <b-field :label="content.linkedin">
                                    <b-input v-model="linkedin" type="url" :validation-message="content.urlValidation"></b-input>
                                </b-field>
                                <b-field :label="content.facebook">
                                    <b-input v-model="facebook" type="url" :validation-message="content.urlValidation"></b-input>
                                </b-field>
                                <b-field :label="content.telegram">
                                    <b-input v-model="telegram" type="text" :validation-message="content.urlValidation"></b-input>
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

                            </section>

                            <div class="columns is-centred">
                                <div class="column has-text-centered">
                                    <b-button class="is-child" @click="save()" :disabled="!inputsReady" type="is-secondary" size="is-medium">
                                        {{content.submit}}
                                    </b-button>
                                </div>
                                <div class="column has-text-centered">
                                    <b-button class="is-child" @click="skip()" :disabled="!inputsReady" type="is-secondary" size="is-medium">
                                        {{content.skip}}
                                    </b-button>
                                </div>
                            </div>

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
import {host} from '@/env'
import SponsorsCol from '@/components/SponsorsCol'

export default {
    name: "RegistrationHall",
    components: {
        SponsorsCol
    },
    data () {
        this.email = ""
        this.linkedin = ""
        this.facebook = ""
        this.telegram = ""
        this.photo = ""

        console.log(this.$refs)

        return {
            email: this.email,
            linkedin: this.linkedin,
            facebook: this.facebook,
            telegram: this.telegram,
            photo: this.photo,

            inputsReady: true,

            content: this.$root.content.RegistrationHall,
        }
    },
    methods: {
        handleFileUpload () {
            this.photo = this.$refs.file.files[0];
        },

        save () {
            Axios.post(host + `/login/socials_reg`, {
                businessemail: this.email,
                Linkedin: this.linkedin,
                Facebook: this.facebook,
                Telegram: this.telegram,
            }, {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                if (this.photo) {
                    let formData = new FormData();
                    formData.append('userProfilePhoto', this.photo);

                    console.log(formData)
    
                    return Axios.post(`${host}/login/profilephoto`, formData, {
                        headers: { authorization: localStorage.auth }
                    })
                }
                else {
                    return true
                }
            })
            .then(() => {
                this.$router.push('/')
            })
        },

        skip () {
            this.$router.push('/')
        }
    },
}
</script>