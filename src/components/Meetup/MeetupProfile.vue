<template>
	<div v-if="ready" id="meetup-profile" class="meetup-profile is-light-changeable--bg" :style="isBgImage()" @click="hover=false; ChangeLogo=false;">
		<div v-if="util.isImage(preview)" class="scr-saver-fileld__bg" :style="isBgImageBackdrop()"></div>

		<video v-if="util.isVideo(preview)" :poster="$root.meetup.screensaverColor" class="bg-video" autoplay muted loop>
			<source :src="preview" type="video/mp4">
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
						<!-- v-if="!$root.openMeetupSettings"  -->
						<aside class="column is-full-mobile is-half-widescreen is-one-third-fullhd">
							<div class="profile-top">
								<span 
									@click.stop="ChangeLogo=true;"
									@mouseover="hover = true"
									@mouseleave="hover = false; " 
									class="company-logo-base"
								>
									<figure v-if="!ChangeLogo" class="company-logo">
										<img v-if="ChangeLogo" :src="`${api}/static/img/trans.png`">
									</figure>
									<figure class="company-logo">
										<span  v-if="!ChangeLogo && !fileUplodated">
											<img v-if="util.isImage(image)" :src="image">
											<img v-else :src="`${api}/static/img/brand-default.png`">
										</span>
										<span  v-if="!ChangeLogo && fileUplodated">											
											<img :src="fileUplodated">
										</span>
										<span v-if="ChangeLogo">
											<img :src="`${api}/static/img/trans.png`">
											<!-- upload section -->
											<b-field class="company-logo-upload">
												<b-upload v-model="file"
													drag-drop
													@input="updateLogo"
													required
												>
													<div>
														<div class="$root.content has-text-centered">
															<p>
																<b-icon
																	icon="upload"
																	size="is-large">
																</b-icon>
															</p>
															<p>{{$root.content.groupPopupForm.validation.dropFile}}</p>
														</div>
													</div>
												</b-upload>
												<div></div>
													<div class="tags">
														<div v-if="fileUplodated" class="column">
															<div class="confirm-data__col-value confirm-data__col-value--img">
																<img style="object-fit:contain" :src="fileUplodated" alt="">
															</div>
														</div>				

														<span v-if="!fileValid && fileUplodated" class="help is-danger">
															{{$root.content.groupPopupForm.validation.invalidFileType}}
														</span>
													</div>
											</b-field>

											<!--UploadLogo v-if="ChangeLogo && $root.isUserAdmin" class="company-logo-upload" @click="hover=false"  :value="value" @update="onChildUpdate"/-->
										</span>
										<i v-show="hover && $root.isUserAdmin" @click="ChangeLogo = true" class="far fa-edit edit-file-icon"></i>
									</figure>
									
									
							
								</span>
								

								<div class="company-demo">
									<b-button v-if="$root.meetup.demo.length"
										class="play-demo is-primary is-primary-changeable--bg invert-color"
										@click="demoModalActive = true"
									>{{content.viewDemo}}</b-button>
								</div>
							</div>

							<div class="profile-bottom">
								<span
									@mouseover="hover = true"
									@mouseleave="hover = false"
									>
								<div class="company-name-base">
									<div contenteditable class="company-name is-dark-changeable--color editable editme"
										v-if="$root.isUserAdmin"
									   id="company_name"
									   v-html="company_name"
										@blur="onEdit"
										@keydown.enter="endEdit" 
									>
										{{company_name}}
									</div>
									<div v-else class="company-name is-dark-changeable--color editme">{{company_name}}</div>
									<i v-show="hover && $root.isUserAdmin" class="far fa-edit edit-icon"></i>
								</div>
								</span>
								<!-- Company contacts -->
								<ul class="list-network">
									<li v-if="website" v-on:click="openAndTrack(website)">
										<span>
											<inline-svg :src="require('@/assets/img/socials/website.svg')"></inline-svg>
										</span>
									</li>
									<li v-for="(el, index) in socials" :key="index" v-on:click="openAndTrack(el.link)">
										<span v-if="el">
											<inline-svg :src="require(`@/assets/img/socials/${el.name.toLowerCase()}.svg`)"></inline-svg>
										</span>
									</li>
								</ul>

								<!-- expanded &&  -->
								<div v-if="stuff" class="profile-bio">
									<b-button v-if="stuff.length"
										class="is-primary is-primary-changeable--bg is-fullwidth invert-color"
										@click="materialsModalActive = true"
									>{{content.viewMaterials}}</b-button>
								</div>

								<div class="profile-bio">

								<span
                    @mouseover="hover = true"
                    @mouseleave="hover = false"
                >
								<div class="company-description-base">
									<div contenteditable class="company_description is-dark-changeable--color editable editme"
                       v-if="$root.isUserAdmin"
                       id="company_description"
                       v-html="company_description"
                       @blur="onEdit"
                       @keydown.enter="endEdit"
                  >
										{{company_description}}
									</div>
									<div v-else class="company_description is-dark-changeable--color editme">{{company_description}}</div>
                  <i v-show="hover && $root.isUserAdmin" class="far fa-edit edit-icon"></i>
								</div>
								</span>

									<!--p v-html="company_description"
										v-bind:class="classes"
										class="bio-content is-dark-changeable--color"></p-->

									<!-- <b-button v-if="!expanded"
										class="is-small is-fullwidth is-dark-changeable--color is-light-changeable--bg invert-color"
										@click="bioExpand"
									>{{content.readMore}}</b-button>
									<b-button v-else
										class="is-small is-fullwidth is-dark-changeable--color is-light-changeable--bg invert-color"
										@click="bioCollapse"
									>{{content.showLess}}</b-button> -->
								</div>

								<!-- <div v-if="!expanded && stuff"
									class="company-materials">
									<b-button v-if="stuff.length"
										class="is-primary is-primary-changeable--bg is-fullwidth invert-color"
										@click="materialsModalActive = true"
									>{{content.viewMaterials}}</b-button>
								</div> -->
							</div>
						</aside>

						<div class="column">
							<div v-if="$root.isUserAdmin" class="columns">
								<div class="column">
									<div class="columns is-gapless" style="margin-bottom:0px">
										<div class="column">
											<h2 class="is-dark-changeable--color">{{content.mainRoom}}</h2>
										</div>
										<div class="column">
											<h5 v-bind:class="statsClass">{{content.currentlyOnline}} {{streamStats}}</h5>
										</div>
									</div>
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
								<div v-if="$root.meetup.status != 'finished'">
									<JitsiStream
										v-if="$root.meetup.service == 'jitsi' && defineHowToRender() == 'speaker'"
										:meetup="$root.meetup"
										_id="backstage"
									/>
									<div v-else class="video-stream">
										<div v-if="!videoReady" class="box">
											<div class="content-box">
												<div class="content">
													<span>{{content.willStartIn}}</span> {{clock}}
												</div>
												
												<div :style="{
													backgroundColor: $root.meetup.screensaverColor,
													opacity: $root.meetup.screensaverColor ? 0.6 : 1
												}" class="scr-saver-fileld__bg"></div>
												
												<video class="scr-saver-video" autoplay loop v-if="util.isVideo($root.meetup.screensaver)">
													<source :src="$root.meetup.screensaver">
												</video>
												<img class="scr-saver-image" v-if="util.isImage($root.meetup.screensaver)" :src="$root.meetup.screensaver" alt="">
												
												<!-- <iframe v-if="" class="screensaver" :id="`${id}_screensaver_video`" :src="$root.meetup.screensaver + '?enablejsapi=1&autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&loop=1'" frameborder="0"></iframe> -->
											</div>
										</div>
										<!-- play button -->
										<div @click="renderRtmpVideo" class="play-overlay click" v-if="videoReady && showOverlay">
											<img src="@/assets/play.svg" alt="">
											<p>{{content.pressToStart}}</p>
										</div>
										<!-- loading when video ready -->
										<div class="play-overlay click" v-if="videoReady && videoLoader">
											<b-loading class="loading-overlay--dark" style="margin:15px" :is-full-page="false" :active.sync="videoLoader" :can-cancel="false"></b-loading>
										</div>
										<!-- video player -->
										<video v-if="!isFullScreenStream" preload="none" id="videoElement" style="height:0px" allowfullscreen></video>
										
										<!-- full screen mode button -->
										<div class="toggleFullScreenStream" @click="toggleFullScreenVideoStream">
											{{content.toggleFullScr}}
										</div>
									</div>
								</div>
								<div v-else class="meetup-finished" v-html="content.meetupFinished">
								</div>
							</div>
							<span
								@mouseover="hover = true"
								@mouseleave="hover = false"
							>
								<div class="meetup-name-base">
									<div contenteditable class="meetup-title is-dark-changeable--color editable editme"
										v-if="$root.isUserAdmin"
										id="meetup_name"
										v-html="meetup_name"
										@blur="onEdit"
										@keydown.enter="endEdit"
									>
										{{meetup_name}}
									</div>
									<h1 v-else class="meetup-title is-dark-changeable--color" v-html="meetup_name"></h1>
									<i v-show="hover && $root.isUserAdmin"   class="far fa-edit edit-icon"></i>
								</div>
							</span>

							<!-- <div class="meetup-description is-dark-changeable--color" v-html="meetup_topic"> -->
							<!-- <div v-if="id=='5f53a682c810aa9f7a8150bc'" class="meetup-description is-dark-changeable--color">
								<div class="columns">
									<div class="column">
										<div class="fas-meetup-img-wrapper--fas">
											<img src="@/assets/FAS_MEETUP/fas.png" alt="" class="fas-meetup-img--fas">
										</div>
										<ul class="list-network">
											<li v-on:click="openAndTrack(fas_website)">
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
											<li v-on:click="openAndTrack(future_website)">
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
							</div> -->
							<!--div class="meetup-description is-dark-changeable--color" v-html="meetup_topic"></div-->
              <span
                  @mouseover="hover = true"
                  @mouseleave="hover = false"
              >
								<div class="meetup-description">
									<div contenteditable class="meetup-description is-dark-changeable--color editable editme"
                       v-if="$root.isUserAdmin"
                       id="meetup_topic"
                       v-html="meetup_topic"
                       @blur="onEdit"
                       @keydown.enter="endEdit"
                  >
										{{meetup_topic}}
									</div>
                  <h1 v-else class="meetup-title is-dark-changeable--color" v-html="meetup_topic"></h1>
                  <i v-show="hover && $root.isUserAdmin"   class="far fa-edit edit-icon"></i>
								</div>
              </span>

							<div class="speakers-container columns is-multiline member-clasic">
								<div class="speakers-title is-dark-changeable--color">
									{{content.speakers}}
								</div>
								<div class="column" v-for="(el, index) in speakers" :key="index">
									<Member :data="el"/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<!-- Profile Chat -->
			<div class="chat-company-profile is-light-changeable--bg">
				<div v-if="showNetworkingRoom" class="chat-top">
					<article class="is-light-changeable--bg">
						<h3 class="is-dark-changeable--color">{{content.networkingRoom}}</h3>
						<img src="@/assets/img/join-chat.png" />
						<button
							class="button is-primary is-primary-changeable--bg is-medium invert-color"
							v-on:click="goNetworking()">{{content.join}}</button>
						<!-- <p class="has-text-success">{{content.currentlyOnline}}: ##</p> -->
					</article>
				</div>
				<div v-if="showShareOptions" class="chat-top">
					<Share />
				
				</div>

				<Chat
					v-bind:key="id"
					v-if="ready"
					:checkAccess="'companychat'"
					type="company"
					:contacts="$root.meetup.speakers"
					:name="company_name"
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

		<b-modal
		:active.sync="isFullScreenStream"
		has-modal-card
		trap-focus
		:destroy-on-hide="false"
		aria-role="dialog"
		aria-modal
		:full-screen="true"
		:on-cancel="toggleFullScreenVideoStream"
		custom-class="fullScreen-modal"
		>
			<div class="modal-background" style="display:none"></div>

			<div class="fullScreenMode">
				<div @click="renderRtmpVideo" class="play-overlay click" v-if="videoReady && showOverlay">
					<img src="@/assets/play.svg" alt="">
					<p>{{content.pressToStart}}</p>
				</div>
				<!-- loading when video ready -->
				<div class="play-overlay click" v-if="videoReady && videoLoader">
					<b-loading class="loading-overlay--dark" style="margin:15px" :is-full-page="false" :active.sync="videoLoader" :can-cancel="false"></b-loading>
				</div>
				<!-- video player -->
				<video preload="none" id="videoElement" style="height:0px" allowfullscreen></video>
			</div>

			<div class="chat-company-profile is-light-changeable--bg">
				<Chat
					v-bind:key="id"
					v-if="ready"
					:checkAccess="'companychat'"
					type="company"
					:contacts="$root.meetup.speakers"
					:name="$root.meetup.company_name"
					:_id="id" />
			</div>			
		</b-modal>
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
//	import UploadLogo from '@/components/Meetup/UploadLogo'
	import Share from './Share/'
	import tinycolor from 'tinycolor2'
	import {mapActions} from 'vuex'
	import MeetupFormRoutes from '@/store/routes/meetup-form'
	import MeetupRoom from './AdminSidebar/Transmition/MeetupRoom'
	
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
			AdminSidebar,
//			UploadLogo,
			Share,
			MeetupRoom
		},
		async mounted() {
			await this.getMeetupById({ id: this.id })
			
			setInterval(async () => {
				await this.getStreamStats({ id: this.id })
			}, 5000)
		},
		data () {			
			/* wait until token and sponsors ready*/
			value: 10
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
				classes: "bio-content-expand",
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

				videoReady: false,
				renderVideoOnce: false,
				light: false,
				clock: this.clock,
				dotsGoingUp: true,

				ln: require('../../assets/icon/icon-linkedin.svg'),
				showOverlay: true,
				videoLoader: false,

				isFullScreenStream: false,
				showNetworkingRoom: false,
				showShareOptions: true,
				hover: false,
				ChangeLogo: false,
				file: {}, 
				fileUplodated: false,
				previewFile: {},  
				previewUplodated: false,
				fileValid: true,  				
			}
		},
		methods: {
			...mapActions(['getMeetupById', 'getStreamStats', 'setLogo']),
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
				if (this.$root.meetup.networkingRoomOpened || this.$root.isUserAdmin)
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

			// bioExpand: function() {
			// 	this.classes="bio-content-expand";
			// 	this.expanded=true;
			// },

			// bioCollapse: function() {
			// 	this.classes="bio-content-collapsed";
			// 	this.expanded=false;
			// },

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
				this.showOverlay = false
				this.videoLoader = true

				try {
					this.flvPlayer.destroy()
				}
				catch (e) { }

				let rtmpTimer = setInterval(() => {
					const videoElement = document.getElementById('videoElement');
					if ( videoElement && flvjs) try {
						clearInterval(rtmpTimer)
						if (flvjs.isSupported() && this.defineHowToRender() == 'basic') {
							this.flvPlayer = flvjs.createPlayer({
								type: 'flv',
								url: `https://rtmp.makeavent.com/live/${this.$root.meetup.webinarRoom}.flv`
							});

							this.flvPlayer.attachMediaElement(videoElement)
							this.flvPlayer.load()
							this.flvPlayer.play().then(() => {
								this.videoLoader = false
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
						}
						
						const updateSocket = () => {
							window.io = VueSocketIO(socket, {
								query: {
									token: localStorage.auth,
									project: this.$root.meetup._id
								}
							})
							this.$root.reloadSocketListeners()
						}
						
						try {
							if (!window.io)
								updateSocket()
							else {
								if (!window.io.query) 
									updateSocket()
	
								else {
									if (!window.io.query.project)
										updateSocket()
								}
							}
							
						}
						catch (e) { }

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
							authorization: localStorage.getItem("auth")
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
			},

			toggleFullScreenVideoStream () {
				this.isFullScreenStream = !this.isFullScreenStream
				this.renderRtmpVideo()

				this.updateColorLight(this.$root.meetup.color_schema.light)
				this.updateColorDark(this.$root.meetup.color_schema.dark)
				this.updateColorPrimary(this.$root.meetup.color_schema.primary)
			},
			onEdit(evt) {
				var src = evt.target.innerHTML
				switch (evt.srcElement.id) {
				case 'name':
					this.name = src
					break;
				case 'company_name':
					this.$store.state.meetupForm.company_name = src;
				// this.company_name = src
					break;
				case 'meetup_name':
					this.$store.state.meetupForm.name = src;
					//this.meetup_name = src;
					//console.log(src);
					break
				case 'meetup_topic':
					this.$store.state.meetupForm.message = src;
					//this.meetup_name = src;
					//console.log(867,this.$store.state.meetupForm, src);
					break
				case 'company_description':
					this.$store.state.meetupForm.company_description = src;
					break;
				case 'message':
					this.message = src;
					}
				this.updateVentInfo();
			},
			endEdit(evt){
				this.$el.querySelector('#' + evt.path[0].id).blur()
			},
			updateLogo(e){
					try {
						if ( this.file.size > 1000000 ) {
							this.$root.createError(this.$root.content.ErrorMessages[12], 'oops')
						}
						else {
							if ( this.file ) {
								const image = this.file
				
								const reader = new FileReader()
								reader.readAsDataURL(image)
								reader.onload = e => {
									this.fileUplodated = e.target.result
									//this.image = e.target.result
									this.updateVentInfo('image')
									
								}
								this.fileValid = true
								this.saveDisabled = false
								
							}
							else {
								this.fileValid = false
								this.saveDisabled = true
							}
							
						}
					}
					catch (e) {}
			},
				
			async updateVentInfo(updated) {

    			const name                = this.name
				const description         = this.meetup_topic
				const company_name        = this.company_name
				const company_description = this.company_description
				const date                = this.date
				const website             = this.website

				let file = this.log ? '' : 'no_update', 
					fileName =  '',
					format =  '',
					filePreview =  this.bgDeleted ? '' : 'no_update',
					formatPreview =  '',
					fileNamePreview = ''

				if ( this.file )
					if(this.file.name) {
						file = this.fileUplodated
						fileName = this.file.name
						format = fileName.slice(fileName.lastIndexOf('.'), fileName.length)
					}

				if ( this.previewFile )
					if(this.previewFile.name) {
						filePreview = this.previewToup
						fileNamePreview = this.previewFile.name
						formatPreview = fileNamePreview.slice(fileNamePreview.lastIndexOf('.'), fileNamePreview.length)
					}

				const data = {    
					id: this.id,
					meetup_name: company_name,
					description: description,
					company_name: company_name,
					company_description: company_description,
					website: website,
					date: date,
					image: file,
					preview: filePreview,
					ext: format,                      
					previewExt: formatPreview,
					custom_colors: 'no_update',
					color_schema: 'no_update',
					meetupRoomOpened: true
					}

					if (updated === 'image') {
						data.image = this.fileUplodated
						await this.setLogo(this.fileUploadated)
					}

					const res = await MeetupFormRoutes.postUpdate(data)
					
				},

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
			},
			"$root.meetup": function () {
				if ( this.$root.meetup.status == 'ongoing' )
					this.videoReady = true
				else
					this.videoReady = false
			}
		},
		computed: {
			socials () {
				return this.$root.meetup.socials
			},
			website () {
				return this.$root.meetup.website
			},
			company_description () {
				return this.$store.state.meetupForm.company_description
			},
			company_name () {
				return this.$store.state.meetupForm.company_name
			},
			preview () {
				return this.$store.state.meetupForm.preview
			},
			image () {
				if (this.fileUplodated) {
					return this.fileUplodated
				} else {
					return this.$store.state.meetupForm.logo
				}
				
			},
			stuff () {
				return this.$store.state.meetupForm.stuff
			},
			meetup_name () {
				return this.$store.state.meetupForm.name
			},
			meetup_topic () {
				return this.$store.state.meetupForm.message
			},
			speakers () {
				return this.$store.state.meetupForm.speakers
			},
			streamStats () {
				try {
					return this.$store.state.meetupForm.streamStats.live[this.$root.meetup.webinarRoom].subscribers.length - 1
				}
				catch (e) {
					return 0
				}
			},
			statsClass () {
				if (this.streamStats)
					return 'online-stats--active'
				else
					return 'online-stats'
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
