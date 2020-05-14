<template>
    <div id="profile-booth" class="bg-light-mode">
        <!-- [YD] this img should be the BG of the company -->
        <!-- <div class="bg-img"><img src="@/assets/bg/bg-02.jpg"></div> -->
        <!-- [YD] Should be dynamic $root.Sponsor.backgroundImage -->

        <navbar></navbar>

        <div class="container">
            <Pagetitle :data="name"/>
            <section class="section section-profile-company">
                <div class="columns">
                    <!-- Profile main -->
                    <div class="column is-one-third profile-main">
                        <!-- Profile top-->
                        <div class="profile-top">

                            <!-- Company logo -->
                            <div>
                                <img :src="this.logo">
                            </div>

                            <div class="join-button-parent">
                                <b-button @click="$root.joinStage('meetup'+name)" type="is-danger" outlined class="is-uppercase">{{content.joinNowTitle}}</b-button>
                            </div>

                            <!-- Company contacts -->
                            <ul class="list-network">
                                <li v-if="website" v-on:click="openAndTrack(website)">
                                    <span>
                                        <img src="@/assets/icon/icon-email.svg">
                                    </span>
                                    <a>{{commonContent.Website}}</a>
                                </li>
                                <li v-for="(el, key, index) in socials" :key="index" v-on:click="openAndTrack(el)">
                                    <span v-if="el">
                                        <img :src="require(`../../assets/icon/icon-${key.toLowerCase()}.svg`)">
                                    </span>
                                    <a v-if="el">{{key}}</a>
                                </li>
                            </ul>
                        </div>

                        <!-- Profile bottom-->
                        <div class="profile-bottom" v-html="demo"></div>
                    </div>

                    <!-- Profile bio -->
                    <div class="column is-two-third profile-bio">
                        <div class="columns is-multiline">
                            <div class="column" v-for="(el, index) in contacts" :key="index">
                                <Member :data="el"/>
                            </div>
                        </div>
                        <div class="tile is-ancestor">
                            <div class="tile is-horizontal">

                                <!-- Bio text -->
                                <div class="tile is-parent">
                                    <article>
                                        <p v-html="description"></p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import env from '@/env'
import socialLogos from '@/assets/img/socials'
import Pagetitle from '@/components/Pagetitle.vue';
import Member from '@/components/CompanyProfile/Member.vue';

export default {
    name: "Booth",
    props: {
        name: String,
    },
    components: {
        Member,
    },
    data () {
        this.chatHeight;
        this.chatHistory = [];
        this.userTextMessage = ""
        this.token = this.$root.token
        this.showMessageModal = false
        this.chatAvailable = false
        this.sponsor = ''
        this.description = ""
        this.demo = ""
        this.website = ""
        this.socials = ""
        this.contacts = ""
        this.logo = ""

        // wait until token and sponsors ready
        this.$root.check('token Sponsors').then(() => {
            const name = this.name.toUpperCase()
            this.sponsor = this.$root.Sponsors.filter(el => el.name.toUpperCase() == name.toUpperCase())[0]

            this.description = this.sponsor.description
            this.demo = this.sponsor.demo
            this.website = this.sponsor.website
            this.socials = this.sponsor.socials
            this.contacts = this.sponsor.contacts
            this.logo = env.host + this.sponsor.logo

            this.ready = true
        }).catch(e => console.log(`${e} inaccessible`))

        return {
            self: this,
            content: this.$root.content.Booth,
            commonContent: this.$root.content.common,

            ready: false,
            getInTouch: ["Facebook", "Linkedin", "Telegram"],

            userTextMessage: this.userTextMessage,
            chatHeight: this.chatHeight,
            chatHistory: this.chatHistory,
            showMessageModal: this.showMessageModal,

            showQuote: false,
            quotedMessage: '',
            quotedName: '',
            quoteId: '',

            logo: this.logo,
            description: this.description,
            demo: this.demo,
            website: this.website,
            socials: this.socials,
            socialLogos: socialLogos,
            contacts: this.contacts,

            chat: "",

            chatAvailable: this.chatAvailable
        }
    },
    methods: {
        openAndTrack (link) {
            this.$root.track(this.name, link)
            this.$root.openExternalInBlank(link)
        },

        startMeeting () {
            this.$root.getWebinar(this.sponsor._id).then(webinar => {
                this.$root.joinWebinar(webinar.zoomWebinarId, "")
            })
        }
    }
}
</script>

<style lang="scss">
.join-button-parent {
    width:100%;
    display:block;
    position: relative;
    height: auto !important;
    padding: 10px;
    margin: 20px 0px;
    background:transparent !important;
    box-shadow: none !important;
}
</style>