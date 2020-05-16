<template>
	<!-- Profile chat -->
	<div style="padding:0px">
		<div v-if="chatAvailable" style="padding:0px;">
			<div :id="`${type}-${name}-messages-box`" class="chat-bubble">
				<div
					@click="isUpgradable()"
					v-if="$root.compare($root.usertype, 'basic')"
					class="click"
					style="
						top: 50%;
						-webkit-transform: translate(0%, -50%);
						transform: translate(0, -50%);
						position: relative;
						right: 10% !important;
						width: 300px;
						position: fixed !important;
					"
				>
					This chat won't be available 25 of May unless you upgrade to business or vip
				</div>
				<Message
					v-for="(el, index) in chatHistory"
					:key="index"
					:data="el"
					:index="index"
					:contacts="parent.contacts"
				/>
			</div>
			<div class="reply-block" v-if="showQuote">
				<div class="tile is-ancestor">
					<div class="whitespaces tile is-10">
						{{$root.content.reply}}&nbsp;<strong>@{{quotedName}}</strong>&nbsp;{{quotedMessage}}
					</div>
					<div v-on:click="closeReply()" class="click tile is-2">
						<img style="width:16%; opacity:50%" src="@/assets/img/cross.svg" alt="">
					</div>
				</div>
			</div>
			
			<div class="textarea-message">
				<textarea 
					@keydown="sendMessage($event)"
					v-model="userTextMessage"
					class="chat-question"
					type="text"
					:placeholder="content.chatPlaceholder">
				</textarea>
			</div>
			<div class="chat-helper has-text-grey-light">
				<p>Shift + Enter for line break, Enter to send message</p>
			</div>
		</div>
		<div
			v-else
			class="chat-bubble click"
		>	
			<div class="centrify-content" v-html="$root.content.ErrorMessages[0]">
				<!-- v-on:click="isUpgradable()" -->
				<!-- {{isUpdagradable}} -->
			</div>
		</div>
	</div>
</template>

<script>
	import Message from '../Chats/Message'
	import {socket} from '@/env'
	import io from 'socket.io-client'
	import AccessLevels from '@/api/accessLevels'

	export default {
		name: "Chat",
		components: {
			Message
		},
		props: {
			parent: Object,
			name: String,
			type: String,
			checkAccess: String
		},
		data () {
			this.showMessageModal = ''
			this.showQuote = false
			this.quotedMessage = ''
			this.quotedName = ''
			this.quoteId = ''

			if (this.$router.currentRoute.path != '/login' &&
				this.$router.currentRoute.path != '/loginrtp' &&
				this.$router.currentRoute.path != '/reghall' &&
				this.$router.currentRoute.path != '/noaccess'
			) {
				this.$root.checkComponentAccess(this.checkAccess).then((res) => {
					this.$root.tokenCheck().then(() => {
						this.getElseContent()
	
						if (compare(this.type, "globalchat") || compare(this.type, "vipchat")) {
							this.chat = io(socket, {
								query: {
									token: this.$root.token,
									[this.type]: this.name
								}
							})
		
							// this.chatAvailable = res
							this.chatAvailable = res
		
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
								
								let reply = this.chatHistory.filter(el => compare(this.$root.profile.email, el.from.email) && compare(data.quoteId, el.id))
								
								if (reply.length) {
									this.fireNotification(name, data)   
								}
		
								this.chatHistory.push(data)
								
								this.scrollBehaviour()
							})
						}
	
					})
				})
				
				window.EventBus.$on('reply-to-message', (e) => {
					this.showMessageModal = e.showMessageModal
					this.showQuote = e.showQuote
					this.quotedMessage = e.quotedMessage
					this.quotedName = e.quotedName
					this.quoteId = e.quoteId
				})
			}

			
			return {
				userTextMessage: "",
				chatHistory: [],
				chatAvailable: false,
				content: this.$root.content.Chat,
				
				showQuote: this.showQuote,
				showMessageModal:this.showMessageModal,
				quotedMessage: this.quotedMessage,
				quotedName: this.quotedName,
				quoteId: this.quoteId,

				isUpdagradable: ""
			}
		},
		methods: {

			getElseContent () {
				if (AccessLevels[this.checkAccess].includes('business') || AccessLevels[this.checkAccess].includes('vip')) {
					this.isUpdagradable = this.$root.content.upgradeToAccess(
						this.$root.content.business + this.$root.content.or + this.$root.content.vip,
						this.$root.content.chatWith.toLowerCase() + this.$root.capitalizeFirstLetter(name)
					)
				}
				else
					this.isUpdagradable = this.$root.content.noAccessTitle(this.$root.content.StartupsDemoDay.ddChat)
			},

			isUpgradable () {
				if (AccessLevels[this.checkAccess].includes('business') || AccessLevels[this.checkAccess].includes('vip')) {
					let msg = this.$root.content.onlyForUsertype(this.$root.content.chatWith.toLowerCase() + this.$root.capitalizeFirstLetter(this.name), this.$root.content.business + this.$root.content.or + this.$root.content.vip)
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

			scrollBehaviour () {
				let chatlist = document.getElementById(`${this.type}-${this.name}-messages-box`)
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
		}
	}
</script>

<style scoped>
.whitespaces {
	white-space: break-spaces;
    word-break: break-all;
}
</style>