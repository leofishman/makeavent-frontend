<template>
    <div>
        <navbar></navbar>
        <b-row>
            <b-col md="9">
                <b-jumbotron style="height:100%">
                    <template v-slot:header>
                        <b-row>
                            <b-col md="5">
                                <b-row class="centrify" style="position:relative">
                                    <b-col >
                                        <img width="90%" :src="logo" alt="">
                                    </b-col>
                                    <b-col >
                                        <b-link v-on:click="track(website)" :href="website" target="_blank" class="block-display">
                                            <img class="social-icon" :src="socialLogos['Website']" alt="">
                                            Website
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
                                            <img class="contact-photo" :src="el.photo" alt="">
                                            <div class="contact-email">
                                                {{el.email}}
                                            </div>
                                            <b-row>
                                                <b-col class="hover" v-for="(_el, _key, _index) in el.getInTouch" :key="_index">
                                                    <b-link :href="_el" target="_blank">
                                                        <img class="social-icon getInTouch" :src="socialLogos[_key]" alt="">
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
            <b-col md="3">
                <b-jumbotron style="height:100%">
                    <template v-slot:header>{{$root.content.joinNowTitle}}</template>

                    <div>
                        <b-button class="join-button" variant="primary" v-on:click="startMeeting()">
                            Join
                        </b-button>
                    </div>

                    <div style="margin-top:50px">
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

                </b-jumbotron>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Sponsors from '../sponsors'
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
        
        const name = this.name.toUpperCase()
        const sponsor = Sponsors[this.name.toUpperCase()]
        const logo = require(`../assets/img/sponsors/${name}/${name}.png`)

        Object.keys(sponsor.contacts).map(el => {
            try {
                sponsor.contacts[el].photo = require(`../assets/img/sponsors/${name}/contact${el}.png`)
            }
            catch (e) {
                
            }
        })

        let self = this
        // wait until token defined
        this.$root.tokenCheck().then(() => {
            self.chat = io(env.socket, {
                query: {
                    token: self.token,
                    company: self.name
                }
            })

            self.chat.on('reponse_chat_history', (data) => {
                // write to variable and render messages from it
                self.chatHistory = data

                // check if page opened as reply to message
                if (window.location.href.split("&reply=")[1]) {
                    self.focusToReply(window.location.href.split("&reply=")[1])
                }

                // scroll chat to bottom
                setTimeout(() => {
                    self.scrollBehaviour()
                }, 500)
            })

            self.chat.emit('fetch_chat_history')

            self.chat.on('new_message_3rdparty', (data) => {
                
                let reply = self.chatHistory.filter(el => self.$root.profile.email == el.from.email && data.quoteId == el.id)
                
                if (reply.length) {
                    self.fireNotification(name, data)   
                }

                self.chatHistory.push(data)
                
                self.scrollBehaviour()
            })
        })

        return {
            userTextMessage: this.userTextMessage,
            chatHeight: this.chatHeight,
            chatHistory: this.chatHistory,
            showMessageModal: this.showMessageModal,

            showQuote: false,
            quotedMessage: '',
            quotedName: '',
            quoteId: '',

            logo: logo,
            description: sponsor.description,
            demo: sponsor.demo,
            website: sponsor.website,
            socials: sponsor.socials,
            socialLogos: socialLogos,
            contacts: sponsor.contacts,

            chat: ""
        }
    },
    methods: {
        track (url) {            
            axios.post(`${env.host}/track`, {
                url: url,
                profile: this.name
            })
            
            return url
        },

        startMeeting () {
            document.body.insertAdjacentHTML('afterbegin',`<div id="zmmtg-root"></div><div id="aria-notify-area"></div>`)
            const { ZoomMtg } = require('@zoomus/websdk')
            (function(){

                ZoomMtg.preLoadWasm();
                ZoomMtg.prepareJssdk();
                
                var API_KEY = 'bhifkV7cTCmAPzOvg3pZoA';
                var API_SECRET = 'MdyMRCCvbiZYMi69hoXBrYI2oOoNsnSr7skm';

                document.getElementById('join_meeting').addEventListener('click', function(e){
                    e.preventDefault();

                    if(!this.form.checkValidity()){
                        alert("Enter Name and Meeting Number");
                        return false;
                    }

                    var meetConfig = {
                        apiKey: API_KEY,
                        apiSecret: API_SECRET,
                        meetingNumber: parseInt(document.getElementById('meeting_number').value),
                        userName: document.getElementById('display_name').value,
                        passWord: "329806",
                        leaveUrl: "http://localhost:8081/1qcHN0Ql3lYamix4JK7BQZrk/company?name=Crypttp",
                        role: 0
                    };


                    var signature = ZoomMtg.generateSignature({
                        meetingNumber: meetConfig.meetingNumber,
                        apiKey: meetConfig.apiKey,
                        apiSecret: meetConfig.apiSecret,
                        role: meetConfig.role,
                        success: function(res){
                            console.log(res.result);
                        }
                    });

                    ZoomMtg.init({
                        leaveUrl: 'http://www.zoom.us',
                        isSupportAV: true,
                        success: function () {
                            ZoomMtg.join(
                                {
                                    meetingNumber: meetConfig.meetingNumber,
                                    userName: meetConfig.userName,
                                    signature: signature,
                                    apiKey: meetConfig.apiKey,
                                    userEmail: 'email@gmail.com',
                                    passWord: meetConfig.passWord,
                                    success: function (res) {
                                        $('#nav-tool').hide();
                                        console.log('join meeting success');
                                    },
                                    error: function(res) {
                                        console.log(res);
                                    }
                                }
                            );
                        },
                        error: function(res) {
                            console.log(res);
                        }
                    });

                });

            })();
        },

        chatMessageClass (message) {
            let admins = []
            Object.values(Sponsors[this.name.toUpperCase()].contacts).map(el => {
                admins.push(el.email)
            })

            if (message.from.email == this.$root.profile.email)
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

                    let note = content.requestContact(el.from.name.split(' ')[0])
                    note = this.$root.convertContentWithLineBreaks(note)
                    
                    this.$bvModal.msgBoxConfirm([note], {
                        title: question,
                        size: 'md',
                        buttonSize: 'md',
                        okVariant: 'primary',
                        okTitle: content.yes,
                        cancelTitle: content.no,
                        footerClass: 'p-2',
                        hideHeaderClose: false,
                        noCloseOnBackdrop: true,
                        noCloseOnEsc: true,
                        centered: true
                    })
                    .then(value => {
                        if (value)
                            this.chat.emit('request_contact_information', {
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
        }
    },
    mounted() {
        this.chatHeight = window.innerHeight - document.getElementById('chat-field').offsetTop - 180
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
    a {
        font-size:20px;
    }
    a:hover {
        font-size:20px;
    }
    .block-display {
        display: block;
    }
    .a,a.white {
        text-decoration: none !important;
        color:white !important;
    }
    .social-icon {
        height: 40px
    }
    .social-icon.getInTouch {
        vertical-align: super;
    }
    .contact-photo {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid white;
    }
    .contacts {
        text-align: center;
        box-shadow: 0px 0px 10px 10px #e2e2e2;
        border-radius: 20px;
        background: #343a40;
        padding: 15px 10px 0px 10px;
    }
    .hover:hover {
        cursor: pointer;
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
        padding: 10px;
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
