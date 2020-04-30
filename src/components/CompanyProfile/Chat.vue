<template>
	<!-- Profile chat -->
	<div style="padding:0px">
		<div v-if="chatAvailable" style="padding:0px">
			<div id="messages-box" class="chat-bubble is-clearfix">
				<Message
					v-for="(el, index) in chatHistory"
					:key="index"
					:data="el"
					:index="index"
					:contacts="parent.contacts"
				/>
			</div>
			<div v-if="showQuote">
				<div class="columns" style="padding:0px;">
					<div class="column is-four-fifths" style="padding:10px;">
						{{$root.content.reply}} <strong>@{{quotedName}}</strong> {{quotedMessage}}
					</div>
					<div v-on:click="closeReply()" class="column close-reply" style="padding:10px;">
						<img style="width:40%; " src="@/assets/img/cross.svg" alt="">
					</div>
				</div>
			</div>
			<textarea 
				@keydown="sendMessage($event)"
				v-model="userTextMessage"
				class="chat-question has-text-grey-light"
				type="text"
				:placeholder="content.chatPlaceholder">
			</textarea>
			<div class="chat-helper has-text-grey-light">
				<p>Shift + Enter for line break, Enter to send message</p>
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
</template>

<script>
	import Message from '../Chats/Message'
	import {socket} from '@/env'
	import io from 'socket.io-client'

	export default {
		name: "Chat",
		components: {
			Message
		},
		props: {
			parent: Object,
			name: String
		},
		data () {
			this.showMessageModal = ''
			this.showQuote = false
			this.quotedMessage = ''
			this.quotedName = ''
			this.quoteId = ''

			this.$root.checkComponentAccess("companychat").then((res) => {
                this.chatAvailable = res
			})
			
			window.EventBus.$on('reply-to-message', (e) => {
				this.showMessageModal = e.showMessageModal
				this.showQuote = e.showQuote
				this.quotedMessage = e.quotedMessage
				this.quotedName = e.quotedName
				this.quoteId = e.quoteId
			})

            this.chat = io(socket, {
                query: {
                    token: this.$root.token,
                    company: this.name
                }
            })

            this.chat.on('reponse_chat_history', (data) => {
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

            this.chat.emit('fetch_chat_history')

            this.chat.on('new_message_3rdparty', (data) => {
                
                let reply = this.chatHistory.filter(el => this.$root.profile.email == el.from.email && data.quoteId == el.id)
                
                if (reply.length) {
                    this.fireNotification(name, data)   
                }

                this.chatHistory.push(data)
                
                this.scrollBehaviour()
			})
			
			return {
				userTextMessage: "",
				chatHistory: [],
				chatAvailable: false,
				content: this.$root.content.Chat,
				
				showQuote: this.showQuote,
				showMessageModal:this.showMessageModal,
				quotedMessage: this.quotedMessage,
				quotedName: this.quotedName,
				quoteId: this.quoteId
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
		}
	}
</script>

<style scoped>
	textarea {
        width: 100%;
        resize: none;
        border: none;
        padding: 10px 10px 10px 10px;
        border-top: 1px solid darkgrey;
        border-radius: 0px 0px 10px 10px;
    }
    textarea:focus {
        outline: none;
    }
</style>