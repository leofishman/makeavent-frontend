<template>
    <div :style="`height:${chatHeight}px`">
        <b-tabs v-if="ready" class="mt-3 width-50">
            <b-tab class="width-50" :title="`Blockconf ` + $root.content.coffeeChat" active>
                <div id="chat-field" :style="`height:${chatHeight}px`" class="chat-field">
                    <div v-if="chatAvailable" class="centrify chat-bg-container">
                        <img class="" src="@/assets/logo_dark.svg" alt="">
                    </div>
                    <div v-if="chatAvailable" id="messages-box-global" class="messages-box">
                        <div
                            v-for="(el, index) in chatHistory"
                            :class="chatMessageClass(el)"
                            :key="index"
                        >
                            <div style="display: inline-block; position: relative; width: 100%;">
                                <div v-on:click="$bvToast.show(`req-contact-toast-${el.from._id}-${index}`)" class="message-title">
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
                    <div v-on:click="$root.showMessageToUpgradeBusOrVip(
                        $root.content.coffeeChat
                    )" v-else class="centrify section-faded-text">
                        <div class="red hover">
                            {{$root.content.upgradeToAccess(
                                $root.content.business + $root.content.or + $root.content.vip,
                                $root.content.globalChat
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
                    <div class="textarea-message">
                        <textarea 
                        @keydown="sendMessage($event)"
                        v-model="userTextMessage"
                        type="text"
                        :placeholder="$root.content.chatPlaceholder">
                        </textarea>
                    </div>
                </div>
                <div class="hint">
                    {{$root.content.chatHint}}
                </div>
                <div class="hint">
                    {{$root.content.replyHint}}
                </div>                
            </b-tab>
            <b-tab class="width-50" :title="`Blockconf ` + $root.content.vipChat">
                <vipchat></vipchat>
            </b-tab>
        </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import env from '@/env'
import socialLogos from '@/assets/img/socials'
import io from 'socket.io-client'

export default {
    name: 'globalchat',
    data() {
        this.userTextMessage = ""
        this.showQuote = ''
        this.quotedMessage = ''
        this.quotedName = ''
        this.showMessageModal = false
        this.chatHeight = window.innerHeight - 250
        this.chatHistory = []
        this.chatAvailable = false
        this.ready = false

        this.$root.check('profile').then(_ => {
            this.ready = true
        })

        this.$root.globalchat = io(env.socket, {
            query: {
                token: this.$root.token,
                globalchat: true
            }
        })

        this.$root.globalchat.on('reponse_chat_history', (data) => {
            // write to variable and render messages from it
            this.chatHistory = data

            // check if page opened as reply to message
            if (window.location.href.split("&reply=")[1]) {
                this.focusToReply(window.location.href.split("&reply=")[1])
            }
        })

        this.$root.globalchat.emit('fetch_chat_history')

        this.$root.globalchat.on('new_message_3rdparty', (data) => {
            this.chatHistory.push(data)
        })

        this.$root.checkComponentAccess("globalchat").then(res => {
            this.chatAvailable = res
        })

        return {
            ready: this.ready,

            chatHistory: this.chatHistory,
            userTextMessage: this.userTextMessage,
            showQuote: this.showQuote,
            quotedMessage: this.quotedMessage,
            quotedName: this.quotedName,
            showMessageModal: this.showMessageModal,
            chatHeight: this.chatHeight,

            chatAvailable: this.chatAvailable
        }
    },
    methods: {
        sendMessage (e) {
            const id = () => {
                return Math.random().toString().split(".")[1]
            }
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                
                this.userTextMessage = this.userTextMessage.replace(/\n/g, '<br>')

                if (this.quotedMessage) {
                    this.$root.globalchat.emit('new_message', {
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
                    this.$root.globalchat.emit('new_message', { message:this.userTextMessage, id: id(), html:this.userTextMessage })
                }
                this.userTextMessage = ""
                this.showQuote = ''
                this.quotedMessage = ''
                this.quotedName = ''
            }
        },

        chatMessageClass (message) {
            let admins = []

            if (message.from)
                if (this.$root.isThatMe(message.from.email))
                    return 'chat-message me'

                else
                    return 'chat-message'
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
            let chatlist = document.getElementById('messages-box-global')
            if (chatlist)
                chatlist.scrollTo(0, chatlist.scrollHeight)
        },
    },
    mounted() {
        // scroll chat to bottom
        this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
            if (collapseId == "sidebar-chat" && isJustShown === true)
                setTimeout(() => {
                    this.scrollBehaviour()
                }, 500)
        })
    },
}
</script>