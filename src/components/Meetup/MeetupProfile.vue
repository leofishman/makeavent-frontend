<template>
	<div id="meetup-profile" :style="isBgImage()">
		<video v-if="$root.meetup.preview" class="bg-video" autoplay muted loop>
			<source :src="$root.meetup.preview" type="video/mp4">
		</video>

		<navbar></navbar>

		<!-- NOT RELEASED -->
		<!-- <Storycreate v-if="$root.isAdmin(contacts)"/> -->

		<div class="container container-edit">
			<section class="section section-profile-company">
				<div class="columns is-desktop">
					<aside class="column is-full-mobile is-half-widescreen is-one-third-fullhd">
						<div class="profile-top">
							<figure class="company-logo">
								<img :src="$root.meetup.image">
							</figure>

							<ul class="list-network">
								<li v-if="$root.meetup.website" v-on:click="openAndTrack($root.meetup.website)">
									<span>
										<img src="@/assets/icon/icon-email.svg" :alt="commonContent.Website">
									</span>
								</li>
								<li v-for="(el, index) in $root.meetup.socials" :key="index" v-on:click="openAndTrack(el.link)">
									<span v-if="el">
										<img :src="require(`../../assets/icon/icon-${el.name.toLowerCase()}.svg`)">
									</span>
								</li>
							</ul>
							<div class="company-demo">
								<button v-if="$root.meetup.demo.length" class="play-demo button is-primary" @click="demoModalActive = true">{{content.viewDemo}}</button>
							</div>
						</div>

						<div class="profile-bottom">
							<div v-if="expanded && $root.meetup.stuff" class="profile-bio">
								<button v-if="$root.meetup.stuff.length" class="button is-primary is-fullwidth" @click="materialsModalActive = true">{{content.viewMaterials}}</button>
							</div>

							<div class="profile-bio">
								<p v-html="$root.meetup.description" v-bind:class="classes" class="bio-content"></p>

								<button v-if="!expanded" class="button is-small is-fullwidth" @click="bioExpand">{{content.readMore}}</button>
								<button v-else class="button is-small is-fullwidth" @click="bioCollapse">{{content.showLess}}</button>
							</div>

							<div v-if="!expanded && $root.meetup.stuff" class="company-materials">
								<button v-if="$root.meetup.stuff.length" class="button is-primary is-fullwidth" @click="materialsModalActive = true">{{content.viewMaterials}}</button>
							</div>
						</div>
					</aside>

					<div class="column">
						<JitsiStream
							v-if="$root.meetup.service == 'jitsi'"
							:meetup="$root.meetup"
						/>

						<div class="columns is-multiline member-clasic">
							<div class="column" v-for="(el, index) in speakers" :key="index">
								<Member :data="el"/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- Profile Chat -->
		<div id="chat" class="chat-company-profile">
			<div class="chat-top">
				<article>
					<h3>{{content.networkingRoom}}</h3>
					<img src="@/assets/img/join-chat.png" />
					<button class="button is-primary is-medium" v-on:click="goNetworking()">{{content.join}}</button>
					<!-- <p class="has-text-success">{{content.currentlyOnline}}: ##</p> -->
				</article>
			</div>
			<Chat v-if="ready" :checkAccess="'companychat'" type="company" :contacts="$root.meetup.speakers" :name="$root.meetup.name" :_id="id" />
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
				<p class="modal-card-title">{{content.materials}}</p>
			</header>
			<section class="modal-card-body">
				<PitchDeck v-for="(el, index) in $root.meetup.stuff" :key="index" :data="el"/>
			</section>
		</div></b-modal>

		<b-modal
		:active.sync="demoModalActive"
		has-modal-card
		trap-focus
		:destroy-on-hide="false"
		aria-role="dialog"
		aria-modal>
		<DemoModal :demos="$root.meetup.demo" :name="$root.meetup.name"/></b-modal>

		<AdminSidebar />
	</div>
</template>

<script>
	import Axios from 'axios'
	import {api} from '@/env'
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
	import AdminSidebar from '@/components/Meetup/AdminSidebar'

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
			.then(() => {
				this.getMeetup()
				this.getSpeakers()
			})
			.catch(e => console.log(`${e} inaccessible`))

			return {
				expanded: false,
				classes: "bio-content-collapsed",
				demoModalActive: false,
				materialsModalActive: false,
				self: this,
				content: this.$root.content.Meetup,
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

				speakers: []
			}
		},
		methods: {
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
				let css = document.createElement('link')
				css.href = MEETUP.getCustomCss + '?id=' + this.$root.meetup.cssClass
				css.rel = 'stylesheet'

				// document.getElementById('meetup-profile')
				document.head
				.insertAdjacentElement(
					'afterbegin', css)
			},
			getSpeakers () {
				Axios.create({
					baseURL: MEETUP.getSpeakers + '?id=' + this.id,
					headers: {
						authorization: localStorage.auth
					}
				})()
				.then(res => {
					this.speakers = res.data
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
						this.ready = true
						this.getExternalCss()

						if ( this.$root.isAdmin(this.$root.meetup.speakers) ) {
							this.$root.isUserAdmin = true
						}

						resolve(true)
					})
				})
			},
			isBgImage () {
				if (this.$root.meetup.backgroundImage)
					return { backgroundImage: `url('${api  + this.$root.meetup.backgroundImage}')` }
				else
					return {}
			}
		},
	}
</script>
<style lang="scss">
@import "./index.scss";
</style>