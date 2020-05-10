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
                                    <b-input v-model="telegram" type="url" :validation-message="content.urlValidation"></b-input>
                                </b-field>
                                <b-field :label="content.photo">
                                    <b-input v-model="photo" type="file" :validation-message="content.urlValidation"></b-input>
                                </b-field>

                            </section>
                            <b-button @click="save()" :disabled="!inputsReady" type="is-secondary" size="is-medium">
                                {{content.submit}}
                            </b-button>
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
        }
    },
}
</script>