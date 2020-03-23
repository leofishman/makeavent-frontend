<template>
    <div :style="`height:${chatHeight}px`">
        <b-tabs v-if="$root.usertype == 'vip'" content-class="mt-3">
            <b-tab :title="`Sponsorname ` + $root.content.coffeeChat" active>
                <div id="chat-field" :style="`height:${chatHeight}px`" class="chat-field">
                    <div id="messages-box" class="messages-box">
                        <div
                            v-for="(el, index) in chatHistory"
                            :class="chatMessageClass(el)"
                            :key="index"
                        >
                            <div style="display: inline-block; position: relative; width: 100%;">
                                <div v-on:click="openRequestContactModal(el, index)" class="message-title">
                                    {{el.from.name.split(" ")[0]}} {{el.from.company}}
                                </div>
                                <div v-on:click="showReplyButton(el, index)" v-html="el.html"></div>
                            </div>
                            
                            <div v-on:click="doReply(el, index)" v-if="showMessageModal === index" class="reply-button" >
                                <img width="100%" src="../assets/img/reply.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="enter-message">
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
            </b-tab>
            <b-tab :title="`Sponsorname ` + $root.content.vipChat">
                <vipchat></vipchat>
            </b-tab>
        </b-tabs>
        <div v-else>
            <div id="chat-field" :style="`height:${chatHeight + 100}px`" class="chat-field">
                <div id="messages-box" class="messages-box">
                    <div
                        v-for="(el, index) in chatHistory"
                        :class="chatMessageClass(el)"
                        :key="index"
                    >
                        <div style="display: inline-block; position: relative; width: 100%;">
                            <div v-on:click="openRequestContactModal(el, index)" class="message-title">
                                {{el.from.name.split(" ")[0]}} {{el.from.company}}
                            </div>
                            <div v-on:click="showReplyButton(el, index)" v-html="el.html"></div>
                        </div>
                        
                        <div v-on:click="doReply(el, index)" v-if="showMessageModal === index" class="reply-button" >
                            <img width="100%" src="../assets/img/reply.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="enter-message">
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
        </div>
  </div>
</template>

<script>
import Sponsors from '../sponsors'
import axios from 'axios'
import env from '../env'
import socialLogos from '../assets/img/socials'
import io from 'socket.io-client'

export default {
    name: 'globalchat',
    data() {
        this.userTextMessage = ""
        this.showQuote = ''
        this.quotedMessage = ''
        this.quotedName = ''
        this.showMessageModal = false
        this.chatHeight = window.innerHeight - 300
        this.chatHistory = []

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

            // scroll chat to bottom
            setTimeout(() => {
                this.scrollBehaviour()
            }, 500)
        })

        this.$root.globalchat.emit('fetch_chat_history')

        this.$root.globalchat.on('new_message_3rdparty', (data) => {
            this.chatHistory.push(data)
        })

        return {
            chatHistory: this.chatHistory,
            userTextMessage: this.userTextMessage,
            showQuote: this.showQuote,
            quotedMessage: this.quotedMessage,
            quotedName: this.quotedName,
            showMessageModal: this.showMessageModal,
            chatHeight: this.chatHeight
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

            if (message.from.email == this.$root.profile.email)
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

        async openRequestContactModal (el, index) {
            if (el.from.email != this.$root.profile.email) {
                try {
                    const response = await axios.post(env.host + "/isSafeSharing", {
                        from: this.$root.profile,
                        to: el.from
                    })

                    window.EventBus.$emit('request_contact_confirmed', response.data)
                }
                catch (e) {
                    const content = this.$root.content
                    const question = content.areYouSure
                    + " " + content.request
                    + " " + el.from.name.split(' ')[0] + '`s'
                    + " " + content.businessCard

                    const note = content.requestContact(el.from.name.split(' ')[0])

                    this.$bvModal.msgBoxConfirm(note, {
                        title: question,
                        size: 'md',
                        buttonSize: 'md',
                        okVariant: 'primary',
                        okTitle: content.yes,
                        cancelTitle: content.no,
                        footerClass: 'p-2',
                        hideHeaderClose: false,
                        centered: true
                    })
                    .then(value => {
                        if (value)
                            this.$root.globalchat.emit('request_contact_information', {
                                from: this.$root.profile,
                                to: el.from
                            })
                    })
                    .catch(e => {
                        this.$bvModal.cancel()
                    })
                }
            }
        },

        // this shit doesn't work
        scrollBehaviour () {
            let chatlist = document.getElementById('messages-box')
            
            chatlist.scrollTo(0, chatlist.scrollHeight)
        },
    },
}
</script>
<style lang="css">
    .nav-tabs .nav-item { 
        max-width: 50%;
        text-align: center;
    }
    .nav-tabs .nav-item a {
        font-size: 16px;
        padding: 5px 0px;
        width: 100%;
        height: 100%;
        color: #bdbdc3;
    }
    
    .tabs .mt-3 {
        height: inherit;
    }
    .tabs .tab-pane {
        height: inherit;
    }
</style>