<template>
    <div>
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
                        <b-button class="join-button" variant="primary" v-on:click="/*startMeeting()*/">
                            Join
                        </b-button>
                    </div>

                    <div style="margin-top:50px; padding:0px 2rem;">
                        <hr class="my-4">
                        <h2>
                            {{
                                $root.content.chatWith
                            }} {{
                                name
                                .toUpperCase()
                            }} {{
                                $root.content.team
                            }}
                        </h2>
                    </div>

                    <div id="chat-field" :style="`height:${chatHeight}px`" class="chat-field">
                        <div v-if="chatAvailable" id="messages-box-startup" class="messages-box">
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
                                    <img width="100%" src="../assets/img/reply.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div
                            class="centrify section-faded-text"
                        >
                            <div class="red hover" v-html="
                                $root.content.onlyForXWithoutUpgrade(
                                    $root.content.chatWith.toLowerCase() + $root.capitalizeFirstLetter(name),
                                    $root.content.investor
                                )
                            "></div>
                        </div>
                    </div>
                    <div v-if="chatAvailable" class="enter-message">
                        <div class="quote-enter" v-if="showQuote">
                            <b-row>
                                <b-col md="10">
                                    {{$root.content.reply}} <strong>@{{quotedName}}</strong> {{quotedMessage}}
                                </b-col>
                                <b-col v-on:click="closeReply()" class="close-reply" md="2">
                                    <img style="width:40%; " src="../assets/img/cross.svg" alt="">
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
    </div>
</template>
<script>
import axios from 'axios'
import {host, socket} from '../env'
import socialLogos from '../assets/img/socials'
import io from 'socket.io-client'

export default {
    data() {
        this.chatHeight;
        this.chatHistory      = [];
        this.userTextMessage  = ""
        this.showMessageModal = false
        this.chatAvailable    = false
        this.startup          = ""
        this.description      = ""
        this.demo             = ""
        this.website          = ""
        this.socials          = ""
        this.contacts         = ""
        this.logo             = ""
        this.name             = ""

        // wait until token and startups ready
        this.$root.check('token Startups').then(() => {
            this.token = this.$root.token

            this.name = this.$router.currentRoute.params.name
            this.startup = this.$root.Startups.filter(el => el.name.toLowerCase() == this.name)[0]
            this.logo = host + this.startup.logo

            this.description = this.startup.description
            this.demo = this.startup.demo
            this.website = this.startup.website
            this.socials = this.startup.socials
            this.contacts = this.startup.contacts
            this.time = this.startup.time

            this.ready = true

            this.$root.isChatAvailable("startup").then((res) => {
                this.chatAvailable = res
            })

            this.chat = io(socket, {
                query: {
                    token: this.token,
                    startup: this.name
                }
            })

            this.chat.on('reponse_chat_history', (data) => {
                // write to variable and render messages from it
                this.chatHistory = data

                this.chatHeight = window.innerHeight - document.getElementById('chat-field').offsetTop - 180

                // check if page opened as reply to message
                if (window.location.href.split("&reply=")[1]) {
                    this.focusToReply(window.location.href.split("&reply=")[1])
                }

                // scroll chat to bottom
                setTimeout(() => {
                    this.scrollBehaviour()
                }, 500)
            })

            this.chat.emit('fetch_chat_history')

            this.chat.on('new_message_3rdparty', (data) => {
                
                let reply = this.chatHistory.filter(el => this.$root.profile.email == el.from.email && data.quoteId == el.id)
                
                if (reply.length) {
                    this.fireNotification(name, data)   
                }

                this.chatHistory.push(data)
                
                this.scrollBehaviour()
            })
        })

        return {
            ready: false,
            getInTouch: [],
            name: this.name,

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
        scrollBehaviour () {
            let chatlist = document.getElementById('messages-box-startup')
            if (chatlist)
                chatlist.scrollTo(0, chatlist.scrollHeight)
        },
    },
}
</script>
<style lang="css">
    
</style>