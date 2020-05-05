<template>
    <!-- [YD] The class of this div may vary, depends if the BG is dark or light mode -->
    <div v-if="ready" id="profile-company" class="bg-light-mode">

        <!-- [YD] this img should be the BG of the company -->
        <div class="bg-img"><img src="@/assets/bg/bg-02.jpg"></div>
        <!-- [YD] Should be dynamic $root.Sponsor.backgroundImage -->

        <navbar></navbar>
        
        <!-- Live Feed -->
        <Storycreate />

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
                                    {{commonContent.Website}}
                                </li>
                                <li v-for="(el, key, index) in socials" :key="index" v-on:click="openAndTrack(el)">
                                    <span>
                                        <img :src="require(`../../assets/icon/icon-${key.toLowerCase()}.svg`)">
                                    </span> 
                                    {{key}}
                                </li>
                            </ul>
                        </div>

                        <!-- Profile bottom-->
                        <div class="profile-bottom" v-html="demo"></div>
                    </div>

                    <!-- Profile bio -->
                    <div class="column is-two-fifths profile-bio">
                        <div class="tile is-ancestor">
                            <div class="tile is-vertical">

                                <!-- Bio Members -->
                                <div class="tile">
                                    <div class="tile is-parent" v-for="(el, index) in contacts" :key="index">
                                        <div class="tile is-child">
                                            <Member :data="el"/>
                                        </div>
                                    </div>
                                </div>

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
                <h3 class="is-uppercase">{{content.joinNowTitle}}</h3>
            </div>
            <Chat :parent="self" :name="name" />
        </div>

    </div>
    <!-- <div>
        <navbar></navbar>
        <b-row>
            <b-col md="9">
                <b-jumbotron  v-if="ready" style="height:100%;">
                    <template v-slot:header>
                        <b-row>
                            <b-col md="5">
                                <b-row class="centrify" style="position:relative">
                                    <b-col >
                                        <img width="90%" :src="logo" alt="">
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
                                            <b-row>
                                                <b-col class="hover" v-for="(_el, _index) in getInTouch" :key="_index">
                                                    <b-link :href="el[_el]" target="_blank">
                                                        <img class="social-icon getInTouch" :src="socialLogos[_el]" alt="">
                                                    </b-link>
                                                </b-col>
                                            </b-row>
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

                    <div v-html="demo" class="demo-frame top20"></div>
                </b-jumbotron>
            </b-col>
            <b-col md="3" style="padding:0px 7px">
                <b-jumbotron style="height:100%; padding:4rem 0px;" >
                    <div style="padding:0px 2rem; font-size:1.5rem;">
                        {{$root.content.joinNowTitle}}
                    </div>

                    <div style="padding:0px 2rem;">
                        <b-button class="join-button" variant="primary" v-on:click="startMeeting()">
                            {{$root.content.common.join}}
                        </b-button>
                    </div>

                    <div style="margin-top:50px; padding:0px 2rem;">
                        <hr class="my-4">
                        <h2>
                            {{
                                $root.content.chatWith
                            }} {{
                                name
                                .slice(0, name.length)[0]
                                .toUpperCase()
                                + 
                                name.slice(1, name.length)
                            }} {{
                                $root.content.team
                            }}
                        </h2>
                    </div>

                    <div id="chat-field" :style="`height:${chatHeight}px`" class="chat-field">
                        <div v-if="chatAvailable" id="messages-box" class="messages-box">
                            <div
                                v-for="(el, index) in chatHistory"
                                :class="chatMessageClass(el)"
                                :key="index"
                            >
                                <div style="display: inline-block; position: relative; width: 100%;">
                                    <div v-on:click="$root.showBCrequesttoast(el.from, index)" class="message-title">
                                        {{el.from.name.split(" ")[0]}} ({{el.from.role}} {{el.from.company}})
                                    </div>
                                    <b-toast
                                        :id="`req-contact-toast-${el.from._id}-${index}`"
                                        :title="$root.content.reqBusCardConfirm"
                                        static
                                        no-auto-hide
                                    >
                                        <b-button
                                            style="
                                                line-height:normal;
                                                margin-left: auto;
                                                display: block;
                                            "
                                            v-on:click="$root.openRequestContactModal(`req-contact-toast-${el.from._id}-${index}`, el.from)"
                                            variant="primary"
                                        >{{$root.content.yes}}
                                        </b-button>
                                    </b-toast>
                                    <div v-on:click="showReplyButton(el, index)" v-html="el.html"></div>
                                </div>
                                
                                <div v-on:click="doReply(el, index)" v-if="showMessageModal === index" class="reply-button" >
                                    <img width="100%" src="@/assets/img/reply.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div
                            v-on:click="$root.showMessageToUpgradeBusOrVip($root.content.chatWith.toLowerCase() + $root.capitalizeFirstLetter(name))"
                            v-else
                            class="centrify section-faded-text"
                        >
                            <div class="red hover">
                                {{$root.content.upgradeToAccess(
                                    $root.content.business + $root.content.or + $root.content.vip,
                                    $root.content.chatWith.toLowerCase() + $root.capitalizeFirstLetter(name)
                                )}}
                            </div>
                        </div>
                    </div>
                    <div v-if="chatAvailable" class="enter-message">
                        <div class="quote-enter" v-if="showQuote">
                            <b-row>
                                <b-col md="10">
                                    {{$root.content.reply}} <strong>@{{quotedName}}</strong> {{quotedMessage}}
                                </b-col>
                                <b-col v-on:click="closeReply()" class="close-reply" md="2">
                                    <img style="width:40%; " src="@/assets/img/cross.svg" alt="">
                                </b-col>
                            </b-row>
                        </div>
                        <textarea 
                        @keydown="sendMessage($event)"
                        v-model="userTextMessage"
                        type="text"
                        :placeholder="$root.content.chatPlaceholder">
                        </textarea>
                    </div>
                    <div class="hint">
                        {{$root.content.chatHint}}
                    </div>
                    <div class="hint">
                        {{$root.content.replyHint}}
                    </div>

                </b-jumbotron>
            </b-col>
        </b-row>
    </div> -->
</template>

<script>
    import axios from 'axios'
    import env from '@/env'
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

        // wait until token and sponsors ready
        this.$root.check('token Sponsors').then(() => {
            const name = this.name.toUpperCase()
            this.sponsor = this.$root.Sponsors.filter(el => el.name == name)[0]

            this.description = this.sponsor.description
            this.demo = this.sponsor.demo
            this.website = this.sponsor.website
            this.socials = this.sponsor.socials
            this.contacts = this.sponsor.contacts
            this.logo = env.host + this.sponsor.logo

            this.ready = true
        })

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

            chat: "",

            chatAvailable: this.chatAvailable
        }
    },
    methods: {
        openAndTrack (link) {
            this.$root.track(name, link)
            this.$root.openExternalInBlank(link)
        },

        startMeeting () {
            this.$root.getWebinar(this.sponsor._id).then(webinar => {
                this.$root.joinWebinar(webinar.zoomWebinarId, "")
            })
        }
    },
}
</script>
