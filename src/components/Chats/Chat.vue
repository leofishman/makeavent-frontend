<template>
	<!-- Profile chat -->
	<div class="chat-wrapper" style="padding:0px">
		<p class="chat-with-title">
			<span class="is-dark-changeable--color">
				{{content.chatWith}}
				<strong class="is-capitalized is-dark-changeable--color">{{name}}</strong>
				 {{common_content.team}}</span>

			<span
				@mouseover="showHint=true"
				@mouseleave="closeHintWithTimeout"
				class="help">?</span>

			<div v-if="showHint"
				class="chat-hint"
				v-html="content.chatHint"></div>
		</p>
		<div v-if="chatAvailable" style="padding:0px;">
			<div :id="`${type}-${_id}-messages-box`" class="chat-bubble">
				<Message
					v-for="(el, index) in chatHistory"
					:key="index"
					:data="el"
					:index="index"
					:contacts="contacts"
					:parentChat="_id"
				/>
			</div>
			<div :key="_id" class="reply-block tile" v-if="showQuote">
				<div class="whitespaces reply-messege tile is-child">
					{{$root.content.reply}}&nbsp;<strong>@{{quotedName}}</strong>&nbsp;{{quotedMessage}}
				</div>
				<div class="tile is-child reply-close-container">
					<img v-on:click="closeReply()" class="reply-close-button" src="@/assets/img/cross.svg" alt="">
				</div>
			</div>
			
			<div class="textarea-message is-light-changeable--bg distinct-color">
				<textarea 
					@keydown="sendMessage($event)"
					v-model="userTextMessage"
					class="chat-question is-light-changeable--bg distinct-color invert-color"
					type="text"
					:placeholder="content.chatPlaceholder">
				</textarea>
			</div>
		</div>
		<div
			v-else
			class="chat-bubble click"
		>	
			<div v-on:click="isUpgradable()" class="centrify-content">
				{{isUpdagradable}}
			</div>
		</div>
	</div>
</template>

<script>
	import Message from './Message'
	import {socket, self} from '@/env.js'
	import io from 'socket.io-client'
	import AccessLevels from '@/middleware/accessLevels'

	export default {
		name: "Chat",
		components: {
			Message
		},
		props: {
			_id: String,
			contacts: Array,
			name: String,
			type: String,
			checkAccess: String
		},
		data () {
			let self = this

			if (this.$root.shouldCheckResources()) {
				this.$root.checkComponentAccess(this.checkAccess).then((res) => {
					this.getElseContent()
					this.chat = io(socket, {
						query: {
							token: localStorage.auth,
							[this.type]: this._id
						}
					})

					this.chatAvailable = res

					this.chat.on('reponse_chat_history', (data) => {
						// write to variable and render messages from it
						this.chatHistory = data

						// check if page opened as reply to message
						if (window.location.href.split("&reply=")[1]) {
							this.focusToReply(window.location.href.split("&reply=")[1])
						}

						// scroll chat to bottom
						let self = this
						let scrollTimer = setInterval(() => {
							if (self.$root.childsEqualsToData(`${self.type}-${self._id}-messages-box`, self.chatHistory)) {
								clearInterval(scrollTimer)
								self.scrollBehaviour()
							}
						}, 50)
					})

					this.chat.emit('fetch_chat_history')

					this.chat.on('new_message_3rdparty', (data) => {
						
						let reply = this.chatHistory.filter(el => compare(this.$root.profile.email, el.from.email) && compare(data.quoteId, el.id))
						
						if (reply.length) {
							this.fireNotification(this._id, data)   
						}

						this.chatHistory.push(data)
						
						this.scrollBehaviour()
					})
				})
				
				window.EventBus.$on('reply-to-message', (e) => {
					if (e.chat == this._id) {
						this.showMessageModal = e.data.showMessageModal
						this.showQuote = e.data.showQuote
						this.quotedMessage = e.data.quotedMessage
						this.quotedName = e.data.quotedName
						this.quoteId = e.data.quoteId
					}
				})
			}
			
			return {
				content: this.$root.content.Chat,
				common_content: this.$root.content.common,

				userTextMessage: "",
				chatHistory: [],
				chatAvailable: false,
				
				showQuote: false,
				showMessageModal: '',
				quotedMessage: '',
				quotedName: '',
				quoteId: '',

                showHint: false,

				isUpdagradable: ""
			}
		},
		methods: {

			closeHintWithTimeout () {
				let self = this
				setTimeout(() => { self.showHint=false }, 1000)
			},

			getElseContent () {
				if (AccessLevels[this.checkAccess].includes('business') || AccessLevels[this.checkAccess].includes('vip')) {
					this.isUpdagradable = this.$root.content.upgradeToAccess(
						this.$root.content.business + this.common_content.or + this.$root.content.vip,
						this.content.chatWith.toLowerCase() + this.$root.capitalizeFirstLetter(name)
					)
				}
				else
					this.isUpdagradable = this.$root.content.noAccessTitle(this.$root.content.StartupsDemoDay.ddChat)
			},

			isUpgradable () {
				if (AccessLevels[this.checkAccess].includes('business') || AccessLevels[this.checkAccess].includes('vip')) {
					let msg = this.$root.content.onlyForUsertype(this.content.chatWith.toLowerCase() + this.$root.capitalizeFirstLetter(this.name), this.$root.content.business + this.$root.content.or + this.$root.content.vip)
					this.$root.showMessageToUpgradeBusOrVip(msg)
				}
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
							message: this.userTextMessage,
							time: new Date()
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

			scrollBehaviour () {
				let chatlist = document.getElementById(`${this.type}-${this._id}-messages-box`)
				if (chatlist)
					chatlist.scrollTo(0, 123456789)
			},

			fireNotification (chatname, data) {
				let low_chatname = chatname.toLowerCase()
				
				if (this.$root.notificationAllowed || Notification.permission == "granted") {
					window.notification = new Notification(`${data.from.name.split(" ")[0]} from ${data.from.company} replied to you.`, {
						icon: `${self}/img/sponsors/${chatname}/${chatname}.png`,
						body: data.message,
					})
					let self = this
					notification.onclick = function(event) {
						event.preventDefault()
						// just answer
					}
				}
			},

			focusToReply (id) {
				let message = this.chatHistory.filter(el => compare(el.id, id))

				if (message.length) {
					this.doReply(message[0])
				}
			},

			closeReply () {
				this.showQuote = false
                this.quotedMessage = ''
                this.quotedName = ''
                this.quoteId = ''
                this.showMessageModal = false
				window.EventBus.$emit('close-reply')
			}
		},
		watch: {
			"$root.openGlobalChat": function () {
				this.closeReply()
			}
		},
	}
</script>
