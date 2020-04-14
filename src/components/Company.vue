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
                                    <img width="100%" src="../assets/img/reply.png" alt="">
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
import env from '../env'
import socialLogos from '../assets/img/socials'
import io from 'socket.io-client'

export default {
    props: {
        name: {
            type: String,
            default: ""
        }
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

            this.$root.checkComponentAccess("companychat").then((res) => {
                this.chatAvailable = res
            })

            this.chat = io(env.socket, {
                query: {
                    token: this.token,
                    company: this.name
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
        chatMessageClass (message) {
            let admins = []
            Object.values(this.contacts).map(el => {
                admins.push(el.email)
            })

            if (this.$root.isThatMe(message.from.email))
                return 'chat-message me'

            else if (admins.includes(message.from.email))
                return 'chat-message admin'

            else
                return 'chat-message'
        },

        sendMessage (e) {
            const id = () => {
                return Math.random().toString().split(".")[1]
            }
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                
                this.userTextMessage = this.userTextMessage.replace(/\n/g, '<br>')

                if (this.quotedMessage) {
                    this.chat.emit('new_message', {
                        quoteId: this.quoteId,
                        html: `
                            <div class="quoted-answer">
                                ${this.quotedMessage}
                            </div>
                            ${this.userTextMessage}
                        `,
                        id: id(),
                        message: this.userTextMessage
                    })
                }
                else {
                    this.chat.emit('new_message', { message:this.userTextMessage, id: id(), html:this.userTextMessage })
                }
                this.userTextMessage = ""
                this.showQuote = ''
                this.quotedMessage = ''
                this.quotedName = ''
            }
        },

        showReplyButton (el, index) {
            
            this.showQuote = false
            this.quotedMessage = ''
            this.quotedName = ''

            if (el.from.email != this.$root.profile.email) {
                if (this.showMessageModal === index)
                    this.showMessageModal = false
    
                else 
                    this.showMessageModal = index
            }
        },

        closeReply () {
            this.showQuote = false
            this.quotedMessage = ''
            this.quotedName = ''
            this.quoteId = ''
            this.showMessageModal = false
        },

        doReply (el, index) {
            this.showMessageModal = false
            this.showQuote = true
            this.quotedMessage = el.message
            this.quotedName = el.from.name.split(" ")[0]
            this.quoteId = el.id
        },

        // this shit doesn't work
        scrollBehaviour () {
            let chatlist = document.getElementById('messages-box')
            if (chatlist)
                chatlist.scrollTo(0, chatlist.scrollHeight)
        },

        fireNotification (chatname, data) {
            let low_chatname = chatname.toLowerCase()
            
            if (this.$root.notificationAllowed || Notification.permission == "granted") {
                window.notification = new Notification(`${data.from.name.split(" ")[0]} from ${data.from.company} replied to you.`, {
                    icon: `${env.self}/img/sponsors/${chatname}/${chatname}.png`,
                    body: data.message,
                })
                let self = this
                notification.onclick = function(event) {
                    event.preventDefault()
                    // window.open(`${env.self}/${self.$root.token}/company?name=${low_chatname}&reply=${data.id}`)
                }
            }
        },

        focusToReply (id) {
            let message = this.chatHistory.filter(el => el.id == id)

            if (message.length) {
                this.doReply(message[0])
            }
        },

        startMeeting () {
            this.$root.getWebinar(this.sponsor._id).then(webinar => {
                this.$root.joinWebinar(webinar.zoomWebinarId, "")
            })
        }
    },
}
</script>
<style lang="css">
    .demo-frame {
        text-align:center
    }
    .top40 {
        margin-top:40px
    }
    .top20 {
        margin-top: 20px
    }
    .block-display {
        display: block;
    }
    .block-display:hover {
        text-decoration: none;
    }
    .block-display div {
        font-size:20px;
        color: black;
    }
    .block-display div:hover {
        font-size:20px;
        color: #6f6f6f;
        text-decoration: none;
    }
    .a,a.white {
        text-decoration: none !important;
        color:white !important;
    }
    .social-icon {
        height: 40px;
        width: 40px;
        font-size:20px;
    }
    .social-icon.getInTouch {
        vertical-align: super;
    }
    .contacts {
        text-align: center;
        box-shadow: 0px 0px 10px 10px #e2e2e2;
        border-radius: 20px;
        background: #343a40;
        padding: 15px 10px 0px 10px;
    }
    .contact-email {
        font-size: 14px;
        margin: 15px 0px 10px 0px;
        color: #bcbcbc;
    }
    .contact-name {
        font-size: 25px;
        color: #d9d9d9;
        font-weight: 600;
        margin-bottom: 15px;
    }
    .join-button {
        width:200px;
        margin: 20px auto 0px auto;
        display: block;
    }
    .chat-field {
        background: white;
        width: 100%;
        height: auto;
        position: relative;
        display: block;
        border-radius: 5px;
        /* padding: 10px; */
    }
    .chat-message {
        padding: 5px 10px;
        display: flex;
        color: black;
        font-size: 15px;
        background: #c8c8ff;
        margin: 5px;
        width: fit-content;
        max-width: 75%;
        border-radius: 8px;
        margin-right: auto;
    }
    .chat-message:hover {
        cursor: pointer;
    }
    .chat-message.me {
        background: #c0ffc9;
        text-align: left;
        margin-left: auto;
        margin-right: 0px;
    }
    .chat-message.me:hover {
        cursor: default;
    }
    .chat-message.admin {
        background: #ffdbdb;
        text-align: left;
        margin-right: auto;
        margin-left: 0px;
    }

    .chat-message.me .message-title {
        color: #1b6325;
    }
    .chat-message.admin .message-title {
        color: #a90d0d;
    }
    .chat-message .message-title {
        color: #2f2f6f;
    }
    .chat-message .message-title:hover {
        cursor: pointer;
        font-weight: 600;
    }
    .chat-message.me .message-title:hover {
        cursor: default;
        font-weight: 100;
    }

    .enter-message {
        position: relative;
        width: 100%;
        margin: -3px 0px;
        z-index: 3;
        border: none;
        border-top: 1px solid darkgrey;
        display: block;
    }
    .enter-message textarea {
        width: 100%;
        resize: none;
        border: none;
        padding: 10px 10px 10px 10px;
        border-top: 1px solid darkgrey;
        border-radius: 0px 0px 10px 10px;
    }
    .enter-message textarea:focus {
        outline: none;
    }
    .hint {
        padding: 0px 10px;
        font-size: 12px;
        color: #a0a0a0;
    }
    .messages-box {
        overflow-y: auto;
        height: 100%;
        z-index: 1;
        position: relative;
        pointer-events: all;
    }
    .reply-button {
        display: block;
        position: relative;
        margin: auto;
        padding: 0px 10px;
        opacity: 0.5;
        max-width:40px;
        width:fit-content;
    }
    .quote-enter {
        background: #d8d8d8;
        width: 100%;
        padding: 0px 10px;
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .quoted-answer {
        display: block;
        width: 100%;
        padding: 0px 5px;
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: grey;
        font-style: italic;
        position: relative;
    }
    .close-reply {
        text-align:right;
    }
    .close-reply:hover {
        cursor: pointer;
    }

</style>
