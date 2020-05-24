<template>   
    <div v-if="ready" id="profile-company" :class="sponsorClass" :style="{ backgroundImage: `url('${host + bg}')` }">
        <video v-if="video" class="bg-video" autoplay muted loop>
            <source :src="host + video" type="video/mp4">
        </video>

        <navbar></navbar>
        
        <!-- NOT RELEASED -->
        <!-- <Storycreate v-if="$root.isAdmin(contacts)"/> -->

        <div class="container">
            <!--<Pagetitle :data="name"/>-->
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
						<div class="profile-bottom">
                            <PitchDeck v-for="(el, index) in materials" :key="index" :data="el"/>
                            <div v-html="demo"></div>
                        </div>
                    </div>

                    <!-- Profile bio -->
                    <div class="column profile-bio">

                        <div class="columns is-multiline member-clasic">
                            <div class="column padding-top-20" v-for="(el, index) in contacts" :key="index">
                                <Member :data="el"/>
                            </div>
                        </div>

                        <!-- Bio text -->
                        <article class="bio-description box">
                            <img src="@/assets/img/helper/powered_by_iov.png" class="only-iovlabs">
                            
                            <!-- Custom bio for Decred -->
                            <div class="member-custom">
                                <div class="columns is-multiline">
                                    <div class="column is-one-third" v-for="(el, index) in contacts" :key="index">
                                        <MemberCustom :data="el"/>
                                    </div>
                                    
                                </div>
                                <p>{{content.requestBC}}</p>
                            </div><!-- END Custom bio for Decred -->

                            <p v-html="description"></p>
                        </article>
                    </div>
                </div>
            </section>
        </div>

        <!-- Profile Chat -->
        <div id="chat">
            <div class="chat-top">
                <h3 @click="$root.joinStage('sponsorbooth'+name)" class="enterebooth is-uppercase">{{content.joinNowTitle}}</h3>
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
    import MemberCustom from './MemberCustom.vue';
    import Chat from './Chat.vue';
    import PitchDeck from '@/components/Demoday/Pitchdeck'

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
            MemberCustom,
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
            this.video = ""
            this.sponsorClass = ""
            this.materials = ""

            /* wait until token and sponsors ready*/
            this.$root.check('token Sponsors').then(() => {
                const name = this.name.toUpperCase()
                this.sponsor = this.$root.Sponsors.filter(el => compare(el.name, name))[0]

                this.description = this.sponsor.description
                this.demo = this.sponsor.demo
                this.website = this.sponsor.website
                this.socials = this.sponsor.socials
                this.contacts = this.sponsor.contacts
                this.bg = this.sponsor.backgroundImage
                this.video = this.sponsor.backgroundVideo
                this.sponsorClass = this.sponsor.sponsorClass
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
                video: this.video,
                sponsorClass: this.sponsorClass,

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
