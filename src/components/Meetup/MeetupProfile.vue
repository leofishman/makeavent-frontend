<template>
	<div v-if="ready" class="meetup-profile is-light-changeable--bg" :style="isBgImage()">
		<div v-if="util.isImage($root.meetup.preview)" class="scr-saver-fileld__bg" :style="isBgImageBackdrop()"></div>

		<video v-if="util.isVideo($root.meetup.preview)" :poster="$root.meetup.screensaverColor" class="bg-video" autoplay muted loop>
			<source :src="$root.meetup.preview" type="video/mp4">
		</video>

		<navbar></navbar>

		<div 
		:class="!$root.openMeetupSettings
			? 'default-meetup-container'
			: 'default-meetup-container--squeezed-for-left-meetup-admin-sidebar'">

			<!-- NOT RELEASED -->
			<!-- <Storycreate v-if="$root.isAdmin(contacts)"/> -->

			<div class="container container-edit">
				<section class="section section-profile-company">
					<div class="columns is-desktop">
						<aside v-if="!$root.openMeetupSettings" class="column is-full-mobile is-half-widescreen is-one-third-fullhd">
							<div class="profile-top">
								<figure class="company-logo">
									<img :src="$root.meetup.image">
								</figure>

								<ul class="list-network">
									<li v-if="$root.meetup.website" v-on:click="openAndTrack($root.meetup.website)">
										<span>
											<img src="@/assets/img/socials/website.svg" :alt="commonContent.Website">
										</span>
									</li>
									<li v-for="(el, index) in $root.meetup.socials" :key="index" v-on:click="openAndTrack(el.link)">
										<span v-if="el">
											<img :src="`@/assets/icon/icon-${el.name.toLowerCase()}.svg`">
										</span>
									</li>
								</ul>
								<div class="company-demo">
									<button v-if="$root.meetup.demo.length"
										class="play-demo button is-primary-changeable--bg is-dark-changeable--color"
										@click="demoModalActive = true"
									>{{content.viewDemo}}</button>
								</div>
							</div>

							<div class="profile-bottom">
								<div class="speakers-title--top is-dark-changeable--color">
									{{$root.meetup.company_name}}
								</div>

								<div v-if="expanded && $root.meetup.stuff" class="profile-bio">
									<button v-if="$root.meetup.stuff.length"
										class="button is-primary is-primary-changeable--bg is-fullwidth invert-color"
										@click="materialsModalActive = true"
									>{{content.viewMaterials}}</button>
								</div>

								<div class="profile-bio">
									<p v-html="$root.meetup.company_description"
										v-bind:class="classes"
										class="bio-content is-dark-changeable--color"></p>

									<button v-if="!expanded"
										class="button is-small is-fullwidth is-dark-changeable--color"
										@click="bioExpand"
									>{{content.readMore}}</button>
									<button v-else
										class="button is-small is-fullwidth is-dark-changeable--color"
										@click="bioCollapse"
									>{{content.showLess}}</button>
								</div>

								<div v-if="!expanded && $root.meetup.stuff"
									class="company-materials">
									<button v-if="$root.meetup.stuff.length"
										class="button is-primary is-primary-changeable--bg is-fullwidth invert-color"
										@click="materialsModalActive = true"
									>{{content.viewMaterials}}</button>
								</div>
							</div>
						</aside>

						<div class="column">
							<div v-if="$root.isUserAdmin" class="columns">
								<div class="column">
									<h2 class="is-dark-changeable--color">{{content.mainRoom}}</h2>
									<JitsiStream
										v-if="$root.meetup.service == 'jitsi'"
										:meetup="$root.meetup"
										_id="mainroom"
									/>
								</div>
								<div v-if="$root.showBackstage" class="column">
									<h2 class="is-dark-changeable--color">{{content.backstage}}</h2>
									<JitsiStream
										v-if="$root.meetup.service == 'jitsi'"
										:meetup="$root.meetup"
										_id="backstage"
									/>
								</div>
							</div>

							<div v-else>
								<JitsiStream
									v-if="$root.meetup.service == 'jitsi' && defineHowToRender() == 'speaker'"
									:meetup="$root.meetup"
									_id="mainroom"
								/>
								<video v-else id="videoElement" autoplay="true" muted="muted"></video>
							</div>

							<h1 class="meetup-title is-dark-changeable--color" v-html="$root.meetup.meetup_name"></h1>
							<div class="meetup-description is-dark-changeable--color" v-html="$root.meetup.meetup_topic"></div>

							<div class="speakers-container columns is-multiline member-clasic">
								<div class="speakers-title is-dark-changeable--color">
									{{content.speakers}}
								</div>
								<div class="column" v-for="(el, index) in $root.meetup.speakers" :key="index">
									<Member :data="el"/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<!-- Profile Chat -->
			<div class="chat-company-profile is-light-changeable--bg">
				<div class="chat-top">
					<article class="is-light-changeable--bg">
						<h3 class="is-dark-changeable--color">{{content.networkingRoom}}</h3>
						<img src="@/assets/img/join-chat.png" />
						<button
							class="button is-primary is-primary-changeable--bg is-medium invert-color"
							v-on:click="goNetworking()">{{content.join}}</button>
						<!-- <p class="has-text-success">{{content.currentlyOnline}}: ##</p> -->
					</article>
				</div>
				<Chat
					v-bind:key="id"
					v-if="ready"
					:checkAccess="'companychat'"
					type="company"
					:contacts="$root.meetup.speakers"
					:name="$root.meetup.company_name"
					:_id="id" />
			</div>

		</div>

		<b-modal
		:active.sync="materialsModalActive"
		has-modal-card
		trap-focus
		:destroy-on-hide="false"
		aria-role="dialog"
		aria-modal>
			<div class="modal-card demo-modal">
				<header class="modal-card-head">
					<p class="modal-card-title ">{{content.materials}}</p>
				</header>
				<section class="modal-card-body">
					<PitchDeck v-for="(el, index) in $root.meetup.stuff" :key="index" :data="el"/>
				</section>
			</div>
		</b-modal>

		<b-modal
			:active.sync="demoModalActive"
			has-modal-card
			trap-focus
			:destroy-on-hide="false"
			aria-role="dialog"
			aria-modal
		>
			<DemoModal :demos="$root.meetup.demo" :name="$root.meetup.company_name"/>
		</b-modal>

		<AdminSidebar v-if="$root.isUserAdmin" />

	</div>
</template>

<script>
	import VueSocketIO from 'socket.io-client'
	import Axios from 'axios'
	import {api, socket} from '@/env'
	import {MEETUP} from '@/api/endpoints'
	import Storycreate from '@/components/Stories/StoryCreate.vue'
	import socialLogos from '@/assets/img/socials'
	import Pagetitle from '@/components/Pagetitle.vue'
	import Member from '@/components/Member/Member.vue'
	import MemberCustom from '@/components/Member/MemberCustom.vue'
	import DemoModal from './Modals/DemoModal.vue'
	import Chat from '@/components/Chats/Chat.vue'
	import PitchDeck from '@/components/CompanyComponents/Pitchdeck'
	import JitsiStream from '@/components/VideoStreams/Jitsi'
	import AdminSidebar from '@/components/Meetup/AdminSidebar/index'
	import tinycolor from 'tinycolor2'
	
	export default {
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components: {
			Storycreate,
			Pagetitle,
			Member,
			MemberCustom,
			DemoModal,
			Chat,
			PitchDeck,
			JitsiStream,
			AdminSidebar
		},
		data () {			
			/* wait until token and sponsors ready*/
			this.$root.check('usertype')
			.then(this.isMeetupParticipant)
			.then(this.getMeetup)
			.then(() => {
				this.ready = true

				if(this.$root.meetup.custom_colors){
					this.light = this.$root.meetup.color_schema.isLight
					this.updateColorLight(this.$root.meetup.color_schema.light)
					this.updateColorDark(this.$root.meetup.color_schema.dark)
					this.updateColorPrimary(this.$root.meetup.color_schema.primary)
				}
			
				if ( this.$root.cronMeetupSchema )
					clearInterval(this.$root.cronMeetupSchema)

				this.$root.cronMeetupSchema = setInterval(() => {
					if ( this.$root.actionsLord.SHOULD_GET_MEETUP() )
						this.getMeetup()
				}, 5000)
			})
			.catch(e => {
				if ( e == 'NOT_ATTENDEE' ) {
					window.EventBus.$on('MeetupProfile:unauthorized:close', () => {
						this.$router.push({
							name: "Profile"
						})
					})
					this.$root.createError(this.$root.content.ErrorMessages[10], 'oops', 'MeetupProfile:unauthorized:close')
				}
				else
					this.$root.createError(e, 'oops')
			})

			return {
				content: this.$root.content.Meetup,

				expanded: false,
				classes: "bio-content-collapsed",
				demoModalActive: false,
				materialsModalActive: false,
				self: this,
				commonContent: this.$root.content.common,
				ready: false,
				getInTouch: ["Facebook", "Linkedin", "Telegram"],
				userTextMessage: this.userTextMessage,
				chatHeight: this.chatHeight,
				chatHistory: this.chatHistory,
				showMessageModal: this.showMessageModal,
				name: this.name,
				showQuote: false,
				quotedMessage: '',
				quotedName: '',
				quoteId: '',
				api: api,
				chat: "",
				chatAvailable: this.chatAvailable,
				speakers: [],

				videoReady: false,
				light: false,
			}
		},
		methods: {
			defineHowToRender () {
				if ( this.$root.meetup.speakers.filter(el => el._id == this.$root.profile._id).length )
					return 'speaker'
				
				else
					return 'basic'
				
				if (this.$root.isUserAdmin)
					return 'admin'
			},

			openAndTrack (link) {
				this.$root.track(name, link)
				this.$root.openExternalInBlank(link)
			},

			goNetworking () {
				if (this.$root.meetup.networkingRoomOpened)
					this.$router.push({
						name: "NetworkingRoom",
						query: {
							id: this.id
						}
					}).catch(() => {
						window.location.reload()
					})
				else
					this.$root.createError(this.$root.content.ErrorMessages[9], 'oops')
			},

			bioExpand: function() {
				this.classes="bio-content-expand";
				this.expanded=true;
			},

			bioCollapse: function() {
				this.classes="bio-content-collapsed";
				this.expanded=false;
			},

			getExternalCss () {
				if (this.$root.meetup.cssClass) {
					let css = document.createElement('link')
					css.href = MEETUP.getCustomCss + '?id=' + this.$root.meetup.cssClass
					css.rel = 'stylesheet'
	
					document.head
					.insertAdjacentElement(
						'afterbegin', css)
				}
			},

			renderRtmpVideo () {
				let timer = setInterval(() => {
					if ( document.getElementById('videoElement') ) try {
						clearInterval(timer)
						if (!this.videoReady && flvjs.isSupported() && this.defineHowToRender() == 'basic') {
							this.videoReady = true
							var videoElement = document.getElementById('videoElement');
							var flvPlayer = flvjs.createPlayer({
								type: 'flv',
								url: `https://rtmp.makeavent.com/live/${this.id}.flv`
							});
							flvPlayer.attachMediaElement(videoElement);
							flvPlayer.load();
							flvPlayer.play();
						}
					}
					catch (e) {
						console.log(e);
					}
				})
			},

			getMeetup () {
				return new Promise((resolve, rejects) => {
					Axios.create({
						baseURL: MEETUP.getById + '?id=' + this.id,
						headers:{
							authorization: localStorage.auth
						}
					})()
					.then(res => {
						this.$root.meetup = res.data.meetup

						this.renderRtmpVideo()

						if (!window.io.query.project) {
							window.io = VueSocketIO(socket, {
								query: {
									token: localStorage.auth,
									project: this.$root.meetup._id
								}
							})
							this.$root.reloadSocketListeners()
						}

						this.getExternalCss()

						if ( this.$root.isAdmin(this.$root.meetup.admins) ) {
							this.$root.isUserAdmin = true
							if (!this.$root.openMeetupSettings)
								this.$root.openMeetupSettings = false
							else
								this.$root.openMeetupSettings = true
						}
						else {
							this.$root.openMeetupSettings = false
							this.$root.isUserAdmin = false
						}
						resolve(true)
					})
				})
			},

			isBgImage () {
				if (this.util.isImage(this.$root.meetup.preview))
					return { backgroundImage: `url('${this.$root.meetup.preview}')` }
				else
					return {}
			},

			isBgImageBackdrop () {
				if (this.util.isImage(this.$root.meetup.preview))
					return { background:'white', opacity:0.6, zIndex:1, position: 'fixed'}
				else
					return {}
			},
			
			updateColorDark(val){
				let query = `#app .is-dark-changeable--bg, #app .is-dark-changeable--color, #app .is-dark-changeable--border-top`

				if(!this.light) {
					query = `#app .is-light-changeable, #app .is-light-changeable--color, #app .is-light-changeable--bg, #app .is-light-changeable--border-top`
					Array.from(document.querySelectorAll(query)).map(el => {
						el.style.backgroundColor = val
					})
				} else {
					Array.from(document.querySelectorAll(query)).map(el => {
						const classList = Array.from(el.classList)
				
						if ( classList.includes('is-dark-changeable--border-top') ) {
							if ( classList.includes('distinct-color') )
								el.style.borderTop = `solid 4rem ${pSBC(0.2, val, invertColor(val))}`
							else
								el.style.borderTop = `solid 4rem ${val}`
						}
						
						if ( classList.includes('is-dark-changeable--bg') ) {
							if ( classList.includes('distinct-color') )
								el.style.backgroundColor = pSBC(0.2, val, invertColor(val))
							else
								el.style.backgroundColor = val
						}
						
						if ( classList.includes('is-dark-changeable--color') ) {
							if ( classList.includes('distinct-color') )
								el.style.color = pSBC(0.2, val, invertColor(val))
							else
								el.style.color = val
						}

						if ( classList.includes('invert-color') )
							if ( isRGB(el.style.backgroundColor) ) 
								el.style.color = pSBC(
									0.4,
									invertColor(rgbToHex(el.style.backgroundColor)),
									tinycolor(invertColor(rgbToHex(el.style.backgroundColor))).isLight()
										? "#FFFFFF"
										: "#000000")
							
							else if ( isHEX(el.style.backgroundColor) )
								el.style.color = pSBC(
									0.4,
									invertColor(el.style.backgroundColor),
									tinycolor(invertColor(el.style.backgroundColor)).isLight()
										? "#FFFFFF"
										: "#000000")
					})
				}				
			},

			updateColorLight(val){
				let query = `#app .is-light-changeable, #app .is-light-changeable--color, #app .is-light-changeable--bg, #app .is-light-changeable--border-top`

				if(!this.light) {
					query = `#app .is-dark-changeable--bg, #app .is-dark-changeable--color, #app .is-dark-changeable--border-top`
					Array.from(document.querySelectorAll(query)).map(el => {
						el.style.color = val
					})
				} else {
					Array.from(document.querySelectorAll(query)).map(el => {
						const classList = Array.from(el.classList)
				
						if ( classList.includes('is-light-changeable--border-top') ) {
							if ( classList.includes('distinct-color') )
								el.style.borderTop = `solid 4rem ${pSBC(0.2, val, invertColor(val))}`
							else
								el.style.borderTop = `solid 4rem ${val}`
						}
						
						if ( classList.includes('is-light-changeable--bg') ) {
							if ( classList.includes('distinct-color') )
								el.style.backgroundColor = pSBC(0.2, val, invertColor(val))
							else
								el.style.backgroundColor = val
						}
						
						if ( classList.includes('is-light-changeable--color') ) {
							if ( classList.includes('distinct-color') )
								el.style.color = pSBC(0.2, val, invertColor(val))
							else
								el.style.color = val
						}
						if ( classList.includes('invert-color') )
							if ( isRGB(el.style.backgroundColor) ) 
								el.style.color = pSBC(
									0.4,
									invertColor(rgbToHex(el.style.backgroundColor)),
									tinycolor(invertColor(rgbToHex(el.style.backgroundColor))).isLight()
										? "#FFFFFF"
										: "#000000")
							
							else if ( isHEX(el.style.backgroundColor) )
								el.style.color = pSBC(
									0.4,
									invertColor(el.style.backgroundColor),
									tinycolor(invertColor(el.style.backgroundColor)).isLight()
										? "#FFFFFF"
										: "#000000")
					})
				}
			},

			updateColorPrimary(val){
				let query = `#app .is-primary-changeable--bg, #app .is-primary-changeable--color, #app .is-primary-changeable--border-top`

				Array.from(document.querySelectorAll(query)).map(el => {
				const classList = Array.from(el.classList)
				
				if ( classList.includes('is-primary-changeable--border-top') ) {
					if ( classList.includes('distinct-color') )
					el.style.borderTop = `solid 4rem ${pSBC(0.2, val, invertColor(val))}`
					else
					el.style.borderTop = `solid 4rem ${val}`
				}
				
				if ( classList.includes('is-primary-changeable--bg') ) {
					if ( classList.includes('distinct-color') )
					el.style.backgroundColor = pSBC(0.2, val, invertColor(val))
					else
					el.style.backgroundColor = val
				}
				
				if ( classList.includes('is-primary-changeable--color') ) {
					if ( classList.includes('distinct-color') )
					el.style.color = pSBC(0.2, val, invertColor(val))
					else
					el.style.color = val
				}

				if ( classList.includes('invert-color') )
					if ( isRGB(el.style.backgroundColor) ) 
					el.style.color = pSBC(
						0.4,
						invertColor(rgbToHex(el.style.backgroundColor)),
						tinycolor(invertColor(rgbToHex(el.style.backgroundColor))).isLight()
						? "#FFFFFF"
						: "#000000")
					
					else if ( isHEX(el.style.backgroundColor) )
					el.style.color = pSBC(
						0.4,
						invertColor(el.style.backgroundColor),
						tinycolor(invertColor(el.style.backgroundColor)).isLight()
						? "#FFFFFF"
						: "#000000")
				})
			},

			isMeetupParticipant () {
				return new Promise(async (resolve, reject) => {
					Axios.get(MEETUP.isParticipant + "?id=" + this.id, {
						headers: {
							authorization: localStorage.auth
						}
					})
					.then(res => {
						resolve(true)
					})
					.catch(e => {
						if ( e.response.status == 401 && e.response.data == "Unauthorized" )
							reject('NOT_ATTENDEE')
					})
				})
			}
		},
	}
</script>
<style lang="scss">
@import "./index.scss";
</style>