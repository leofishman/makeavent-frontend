<template>
    <!-- [YD] The class of this div may vary, depends if the BG is dark or light mode -->
    <div v-if="ready" id="profile-company" class="bg-light-mode">

        <!-- NOT RELEASED -->
        {{bg}}
        <div v-if="bg" class="bg-img"><img :src="host + bg"></div>

        <navbar></navbar>
        
        <!-- NOT RELEASED -->
        <Storycreate v-if="$root.isAdmin(contacts)"/>

        <div class="container">
            <Pagetitle :data="name"/>
            <section class="section section-profile-company">
                <div class="columns is-variable is-8">
                    <!-- Profile main -->
                    <div class="column is-one-third profile-main">
                        <!-- Profile top-->
                        <div class="profile-top">

                            <!-- Company logo -->
                            <div>
                                <img :src="this.logo">
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
                    <div class="column is-two-fifths profile-bio">
                        <div class="columns is-multiline">
                            <div class="column is-half padding-top-20" v-for="(el, index) in contacts" :key="index">
                                <Member :data="el"/>
                            </div>
                        </div>
                        <div class="tile is-ancestor">
                            <div class="tile is-vertical">

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

        <!-- Profile Chat -->
        <div id="chat">
            <div class="chat-top">
                <h3 @click="$root.joinStage('sponsorbooth'+name)" class="is-uppercase">{{content.joinNowTitle}}</h3>
            </div>
		    <Chat :checkAccess="'companychat'" type="company" :parent="self" :name="name" />
        </div>
	</div>
</template>

<script>
import axios from 'axios'
import {host} from '@/env'
import Storycreate from '@/components/Stories/StoryCreate.vue';
import socialLogos from '@/assets/img/socials'
import Pagetitle from '@/components/Pagetitle.vue';
import Member from './Member.vue';
import Chat from './Chat.vue';

export default {
    props: {
        name: {
            type: String,
            default: ""
        }
    },
    components: {
        Storycreate,
        Pagetitle,
        Member,
        Chat
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
        this.bg = ""

        // wait until token and sponsors ready
        this.$root.check('token Sponsors').then(() => {
            const name = this.name.toUpperCase()
            this.sponsor = this.$root.Sponsors.filter(el => compare(el.name, name))[0]

            this.description = this.sponsor.description
            this.demo = this.sponsor.demo
            this.website = this.sponsor.website
            this.socials = this.sponsor.socials
            this.contacts = this.sponsor.contacts
            this.bg = this.sponsor.backgroundImage
            this.logo = host + this.sponsor.logo

            this.ready = true
        }).catch(e => console.log(`${e} inaccessible`))

        return {
            self: this,
            content: this.$root.content.Company,
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

            host: host,
            bg: this.bg,

            chat: "",

            chatAvailable: this.chatAvailable
        }
    },
    methods: {
        openAndTrack (link) {
            this.$root.track(name, link)
            this.$root.openExternalInBlank(link)
        }
    },
}
</script>
