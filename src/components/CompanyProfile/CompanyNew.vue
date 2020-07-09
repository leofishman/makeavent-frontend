<template>   
	<div v-if="ready" id="profile-company-new" :class="sponsorClass" :style="{ backgroundImage: `url('${host + bg}')` }">
		<video v-if="video" class="bg-video" autoplay muted loop>
			<source :src="host + video" type="video/mp4">
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
									<img :src="this.logo">
								</figure>

								<ul class="list-network">
									<li v-if="website" v-on:click="openAndTrack(website)">
										<span>
											<img src="@/assets/icon/icon-email.svg" :alt="commonContent.Website">
										</span>
									</li>
									<li v-for="(el, key, index) in socials" :key="index" v-on:click="openAndTrack(el)">
										<span v-if="el">
											<img :src="require(`../../assets/icon/icon-${key.toLowerCase()}.svg`)" :alt="key">
										</span>
									</li>
								</ul>
								<div class="company-demo">
									<button v-if="demo" class="play-demo button is-primary" @click="demoModalActive = true">{{content.viewDemo}}</button>

									<b-modal
									:active.sync="demoModalActive"
									has-modal-card
									trap-focus
									:destroy-on-hide="false"
									aria-role="dialog"
									aria-modal>
									<DemoModal/></b-modal>
								</div>
							</div>

							<div class="profile-bottom">
								<div class="profile-bio">
									<p v-html="description" v-bind:class="classes" class="bio-content"></p>

									<button v-if="!expanded" class="button is-small is-fullwidth" @click="bioExpand">Read more</button>
									<button v-else class="button is-small is-fullwidth" @click="bioCollapse">Show less</button>
								</div>

								<div class="company-materials">
									<button v-if="materials.length" class="button is-primary is-fullwidth" @click="materialsModalActive = true">{{content.viewMaterials}}</button>
									<b-modal
									:active.sync="materialsModalActive"
									has-modal-card
									trap-focus
									:destroy-on-hide="false"
									aria-role="dialog"
									aria-modal>

									<div class="modal-card demo-modal">
										<header class="modal-card-head">
											<p class="modal-card-title">{{name}} {{content.materials}}</p>
										</header>
										<section class="modal-card-body">
											<PitchDeck v-for="(el, index) in materials" :key="index" :data="el"/>
										</section>
									</div></b-modal>
								</div>
							</div>
						</aside>

						<div class="column">
							<div class="profile-stream box">
								<!-- [YD] stream here -->
							</div>

							<div class="columns is-multiline member-clasic">
								<div class="column" v-for="(el, index) in contacts" :key="index">
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
						<button class="button is-primary is-medium" v-on:click="openPage('NetworkingRooms')">{{content.join}}</button>
						<p class="has-text-success">{{content.currentlyOnline}}: ##</p>
					</article>
				</div>
				<Chat :checkAccess="'companychat'" type="company" :parent="self" :name="name" />
			</div>
		</div>
	</template>

	<script>
		import axios from 'axios'
		import {host} from '@/env'
		import Storycreate from '@/components/Stories/StoryCreate.vue';
		import socialLogos from '@/assets/img/socials'
		import Pagetitle from '@/components/Pagetitle.vue';
		import Member from './Member.vue';
		import MemberCustom from './MemberCustom.vue';
		import DemoModal from './DemoModal.vue';
		//import MaterialsModal from './MaterialsModal.vue';
		import Chat from './Chat.vue';
		import PitchDeck from '@/components/Demoday/Pitchdeck';

		export default {
			props: {
				name: {
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
				//MaterialsModal,
				Chat,
				PitchDeck
			},
			data () {
				this.chatHeight;
				this.chatHistory = [];
				this.userTextMessage = ""
				this.token = this.$root.token
				this.showMessageModal = false
				this.chatAvailable = false
				this.sponsor = ''
				this.description = ""
				this.demo = ""
				this.website = ""
				this.socials = ""
				this.contacts = ""
				this.logo = ""
				this.bg = ""
				this.video = ""
				this.sponsorClass = ""
				this.materials = []

				/* wait until token and sponsors ready*/
				this.$root.check('token Sponsors').then(() => {
					const name = this.name.toUpperCase()
					this.sponsor = this.$root.Sponsors.filter(el => compare(el.name, name))[0]

					this.description = this.sponsor.description
					this.demo = this.sponsor.demo
					this.website = this.sponsor.website
					this.socials = this.sponsor.socials
					this.contacts = this.sponsor.contacts
					this.bg = this.sponsor.backgroundImage
					this.video = this.sponsor.backgroundVideo
					this.sponsorClass = this.sponsor.sponsorClass
					this.logo = host + this.sponsor.logo
					this.materials = this.sponsor.materials

					this.ready = true
				}).catch(e => console.log(`${e} inaccessible`))

				return {
					expanded: false,
					classes: "bio-content-collapsed",
					demoModalActive: false,
					materialsModalActive: false,
					self: this,
					content: this.$root.content.Company,
					commonContent: this.$root.content.common,

					ready: false,
					getInTouch: ["Facebook", "Linkedin", "Telegram"],

					userTextMessage: this.userTextMessage,
					chatHeight: this.chatHeight,
					chatHistory: this.chatHistory,
					showMessageModal: this.showMessageModal,

					showQuote: false,
					quotedMessage: '',
					quotedName: '',
					quoteId: '',

					logo: this.logo,
					description: this.description,
					demo: this.demo,
					website: this.website,
					socials: this.socials,
					socialLogos: socialLogos,
					contacts: this.contacts,

					host: host,
					bg: this.bg,
					video: this.video,
					sponsorClass: this.sponsorClass,

					chat: "",

					chatAvailable: this.chatAvailable,
					materials: this.materials
				}
			},
			methods: {
				openAndTrack (link) {
					this.$root.track(name, link)
					this.$root.openExternalInBlank(link)
				},
				openPage (name) {
					this.$router.push(`/${this.$root.$router.currentRoute.params.id}/${name}`).catch(() => {
						window.location.reload()
					})
				},
				bioExpand: function() {
					this.classes="bio-content-expand";
					this.expanded=true;
				},
				bioCollapse: function() {
					this.classes="bio-content-collapsed";
					this.expanded=false;
				}
			},
		}
	</script>
