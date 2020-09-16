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

								<div class="company-demo">
									<b-button v-if="$root.meetup.demo.length"
										class="play-demo is-primary is-primary-changeable--bg invert-color"
										@click="demoModalActive = true"
									>{{content.viewDemo}}</b-button>
								</div>
							</div>

							<div class="profile-bottom">
								<div class="speakers-title--top is-dark-changeable--color">
									{{$root.meetup.company_name}}
								</div>

								<div v-if="expanded && $root.meetup.stuff" class="profile-bio">
									<b-button v-if="$root.meetup.stuff.length"
										class="is-primary is-primary-changeable--bg is-fullwidth invert-color"
										@click="materialsModalActive = true"
									>{{content.viewMaterials}}</b-button>
								</div>

								<div class="profile-bio">
									<p v-html="$root.meetup.company_description"
										v-bind:class="classes"
										class="bio-content is-dark-changeable--color"></p>

									<b-button v-if="!expanded"
										class="is-small is-fullwidth is-dark-changeable--color is-light-changeable--bg invert-color"
										@click="bioExpand"
									>{{content.readMore}}</b-button>
									<b-button v-else
										class="is-small is-fullwidth is-dark-changeable--color is-light-changeable--bg invert-color"
										@click="bioCollapse"
									>{{content.showLess}}</b-button>
								</div>

								<div v-if="!expanded && $root.meetup.stuff"
									class="company-materials">
									<b-button v-if="$root.meetup.stuff.length"
										class="is-primary is-primary-changeable--bg is-fullwidth invert-color"
										@click="materialsModalActive = true"
									>{{content.viewMaterials}}</b-button>
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
								<div v-else class="video-stream ">
									<div v-if="!videoReady" class="box">
										<div class="content-box">
											<div class="content">
												<span>{{content.willStartIn}}</span> {{clock}}
											</div>
											
											<div :style="{
												backgroundColor: $root.meetup.screensaverColor,
												opacity: $root.meetup.screensaverColor ? 0.6 : 1
											}" class="scr-saver-fileld__bg"></div>
											
											<iframe v-if="$root.meetup.screensaver" class="screensaver" :id="`${id}_screensaver_video`" :src="$root.meetup.screensaver + '?enablejsapi=1&autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&loop=1'" frameborder="0"></iframe>
										</div>
									</div>
									<video preload="none" id="videoElement" style="height:0px" allowfullscreen></video>
								</div>
							</div>

							<h1 class="meetup-title is-dark-changeable--color" v-html="$root.meetup.meetup_name"></h1>
							<!-- <div class="meetup-description is-dark-changeable--color" v-html="$root.meetup.meetup_topic"> -->
							<div v-if="id=='5f53a682c810aa9f7a8150bc'" class="meetup-description is-dark-changeable--color">
								<div class="columns">
									<div class="column">
										<div class="fas-meetup-img-wrapper--fas">
											<img src="@/assets/FAS_MEETUP/fas.png" alt="" class="fas-meetup-img--fas">
										</div>
										<ul class="list-network">
											<li v-on:click="openAndTrack($root.meetup.website)">
												<span>
													<img src="@/assets/img/socials/website.svg" :alt="commonContent.Website">
												</span>
											</li>
											<li v-for="(el, index) in fas_socials" :key="index" v-on:click="openAndTrack(el.link)">
												<span v-if="el">
													<img :src="ln">
												</span>
											</li>
										</ul>
										<div style="margin-top:20px">
											FAS offers a full scale of advisory and venture building services for SMBs with in-depth knowledge of Asian, European, and North American markets and understanding of Blockchain and Fintech technologies.<br>
											FAS also bridges the gap in the VC field by helping promising tech startups to find a product-market fit, access investments and required resources. 
										</div>
									</div>
									<div class="column">
										<div class="fas-meetup-img-wrapper--futureblock">
											<img src="@/assets/FAS_MEETUP/futureblock.png" class="fas-meetup-img" alt="">
										</div>
										<ul class="list-network">
											<li v-on:click="openAndTrack($root.meetup.website)">
												<span>
													<img src="@/assets/img/socials/website.svg" :alt="commonContent.Website">
												</span>
											</li>
											<li v-for="(el, index) in future_socials" :key="index" v-on:click="openAndTrack(el.link)">
												<span v-if="el">
													<img :src="ln">
												</span>
											</li>
										</ul>
										<div style="margin-top:20px">
											FutureBlock incubates and invests in Blockchain startups with proven business models. <br>
											FutureBlock provides deep operational support to its startups and helps them build market-leading Blockchain companies.<br>
											The company builds Blockchain companies by making early-stage investments, running unique acceleration programs for each startup, and ensuring startups’ growth strategy.
										</div>
									</div>
								</div>
							</div>
							<div v-else class="meetup-description is-dark-changeable--color" v-html="$root.meetup.meetup_topic"></div>

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
	import {socket} from '@/env'
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

        		this.countdown(this.$root.meetup.startDate)
			
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
				chat: "",
				chatAvailable: this.chatAvailable,
				speakers: [],

				videoReady: false,
				renderVideoOnce: false,
				light: false,
				clock: this.clock,
				dotsGoingUp: true,

				fas_socials: [{
					name: "instagram",
					link: "https://www.linkedin.com/company/fintech-advisory/"
				}],
				future_socials: [{
					name: "Linkedin",
					link: "https://www.linkedin.com/company/futureblock/"
				}],

				ln: require('../../assets/icon/icon-linkedin.svg')
			}
		},
		methods: {
			countdown (time) {
				const self = this
				const countDownDate = new Date(time).getTime();

				const x = setInterval(function() {
					const now = new Date().getTime();
					const distance = countDownDate - now;

					const days = Math.floor(distance / (1000 * 60 * 60 * 24));
					const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					const seconds = Math.floor((distance % (1000 * 60)) / 1000);

					self.clock = days + "D " + hours + "H "
					+ minutes + "M " + seconds + "S ";

					// If the count down is finished, write some text
					if (distance < 0) {
						clearInterval(x);
						self.content.willStartIn = 'Starting'
						self.clock = ''
						self.dotdot()
					}
				}, 1000);
			},

			dotdot () {
				const self = this
				var dots = window.setInterval( function() {
					if ( self.dotsGoingUp ) 
						self.clock += ".";
					else {
						self.clock = ""
						if ( self.clock === "")
							self.dotsGoingUp = true;
					}
					if ( self.clock.length > 2 )
						self.dotsGoingUp = false;

				}, 1000);
			},
			
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
				let rtmpTimer = setInterval(() => {
					const videoElement = document.getElementById('videoElement');
					if ( videoElement && flvjs) try {
						clearInterval(rtmpTimer)
						if (!this.videoReady && flvjs.isSupported() && this.defineHowToRender() == 'basic') {
							var flvPlayer = flvjs.createPlayer({
								type: 'flv',
								url: `https://rtmp.makeavent.com/live/${this.$root.meetup.webinarRoom}.flv`
							});

							flvPlayer.attachMediaElement(videoElement)
							flvPlayer.load()
							flvPlayer.play().then(() => {
								this.videoReady = true
								videoElement.style.height = 'auto'
							})
						}
					}
					catch (e) {
						console.log(e);
					}
				}, 100)
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

						if ( !this.renderVideoOnce ) {
							this.renderVideoOnce = true
							this.renderRtmpVideo()
						}

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
						this.updateColors(el, val, 'light')
					})
				} else {
					Array.from(document.querySelectorAll(query)).map(el => {
						this.updateColors(el, val, 'dark')
					})
				}
			},

			updateColors (el, val, type) {
				const classList = Array.from(el.classList)
		
				if ( classList.includes(`is-${type}-changeable--border-top`) ) {
					if ( classList.includes('distinct-color') )
						el.style.borderTop = `solid 4rem ${pSBC(0.2, val, invertColor(val))}`
					else
						el.style.borderTop = `solid 4rem ${val}`
				}
				
				if ( classList.includes(`is-${type}-changeable--bg`) ) {
					if ( classList.includes('distinct-color') )
						el.style.backgroundColor = pSBC(0.2, val, invertColor(val))
					else
						el.style.backgroundColor = val
				}
				
				if ( classList.includes(`is-${type}-changeable--color`) ) {
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
			},

			updateColorLight(val){
				let query = `#app .is-light-changeable, #app .is-light-changeable--color, #app .is-light-changeable--bg, #app .is-light-changeable--border-top`

				if(!this.light) {
					Array.from(document.querySelectorAll(query)).map(el => {
						this.updateColors(el, val, 'dark')
					})
				} else {
					Array.from(document.querySelectorAll(query)).map(el => {
						this.updateColors(el, val, 'light')
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
		watch: {
			ready: function () {
				setTimeout(() => {
					if ( this.$root.meetup.custom_colors ) {
						this.light = this.$root.meetup.color_schema.isLight
						this.updateColorLight(this.$root.meetup.color_schema.light)
						this.updateColorDark(this.$root.meetup.color_schema.dark)
						this.updateColorPrimary(this.$root.meetup.color_schema.primary)
					}
				}, 1000)
			}
		},
	}
</script>
<style lang="scss">
@import "./index.scss";
.fas-meetup-img-wrapper {
	display: block;
	margin: auto;
	margin-bottom: auto;
	margin-bottom: 20px;
	padding: 30px;
	border-radius: 50%;
	height: 150px;
	width: 150px;

	&--futureblock {
		@extend .fas-meetup-img-wrapper;
		background: #353535;
	}

	&--fas {
		@extend .fas-meetup-img-wrapper;
		padding: 0px;
	}

	.fas-meetup-img {
		position: relative;
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;

		&--fas {
			@extend .fas-meetup-img;
			object-fit: cover;
			border-radius: 50%;
			width: 150px;
			height: 150px;
		}
	}
}
</style>