<template>
    <div>
        <navbar></navbar>
        <b-container v-if="ready">
            <b-jumbotron style="height:100%;">
                <template v-slot:header>
                    <b-row>
                        <b-col md="5">
                            <b-row style="position:relative">
                                <b-col>
                                    <img class="centrify" style="position:relative" width="90%" :src="logo" alt="">
                                </b-col>
                                <b-col >
                                    <b-link v-on:click="$root.track(name, website)" :href="website" target="_blank" class="block-display">
                                        <div>
                                            <img class="social-icon" :src="socialLogos['Website']" alt="">
                                            Website
                                        </div>
                                    </b-link>
                                    <b-link v-for="(el, key, index) in socials" :key="index" v-on:click="track(el)" :href="el" target="_blank" class="block-display">
                                        <div v-if="el">
                                            <img class="social-icon" :src="socialLogos[key]" alt="">
                                            {{key}}
                                        </div>
                                    </b-link>
                                </b-col>
                            </b-row>
                            <div class="wath-button-block">
                                <b-button
                                    v-bind:class="[watchButtonClass]"
                                    :disabled="!watchButtonClass.includes('active')"
                                    v-on:click="joinWebinar()"
                                >
                                    {{content.watchLiveInterview}}
                                </b-button>
                            </div>
                        </b-col>
                        <b-col md="7">
                            <b-row>
                                <b-col style="padding:0px 5%;" v-for="(el, key, index) in contacts" :key="index">
                                    <div class="contacts">
                                        <div class="contact-name">
                                            {{el.name}}
                                        </div>
                                        <img class="contact-photo" :src="$root.tryGetProfilePhoto(el.email)" alt="">
                                        <div class="contact-name" style="font-size:18px; margin-top:20px">
                                            {{el.role}}
                                        </div>
                                        <div class="contact-email">
                                            {{el.email}}
                                        </div>
                                        <!-- <b-row> -->
                                            <div style="display:inline-block" class="hover" v-for="(_el, key, _index) in socialLogos" :key="_index">
                                                <b-link v-if="el[key]" :href="el[key]" target="_blank">
                                                    <img class="social-icon getInTouch" :src="socialLogos[key]" alt="">
                                                </b-link>
                                            </div>
                                        <!-- </b-row> -->
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </template>

                <template v-slot:lead>
                    <hr class="my-4">
                    <div class="top40" v-html="description"></div>
                </template>

                <hr class="my-4">
            </b-jumbotron>
        </b-container>
    </div>
</template>
<script>
import socialLogos from '@/assets/img/socials'
import {host} from '@/env'

export default {
    props: {
        name: {
            default:"",
            type: String
        }
    },
    data() {
        this.ready = false
        this.description = ""
        this.website = ""
        this.socials = ""
        this.contacts = ""
        this.logo = ""
        this.watchButtonClass = ""

        this.$root.check('InvestFunds').then(() => {
            this.ifp = this.$root.InvestFunds.filter(el => el.name == this.name.toUpperCase())[0]

            this.description = this.ifp.description
            this.website = this.ifp.website
            this.socials = this.ifp.socials
            this.contacts = this.ifp.contacts
            this.logo = host + this.ifp.logo

            this.ready = true
        })

        return {
            ready: this.ready,
            content: this.$root.content.InvestFundProfile,

            description: this.description,
            website: this.website,
            socials: this.socials,
            contacts: this.contacts,
            logo: this.logo,
            socialLogos: socialLogos,

            watchButtonClass: this.watchButtonClass
        }
    },
    methods: {
        
    },
}
</script>