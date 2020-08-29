<template>
	<div id="profile">
		<navbar></navbar>

		<div class="container is-fluid" v-if="ready">

			<section class="section section-profile">
				<div class="columns is-variable is-8">
					<div class="column is-one-third profile-main">
						
						<!-- Profile top-->
						<div class="profile-top">
							<aside class="profile-left">
								<div class="profile-avatar">
									<figure class="figure-avatar">
										<img :src="api + $root.profile.photo">
									</figure>

									<figure v-if="!showEditPhoto" v-on:click="showAcceptPhoto = true; showEditPhoto = true" class="edit-photo click">
										<img src="@/assets/img/photo.svg">
									</figure>
								</div>
								<div v-if="showEditPhoto">
									<div class="upload-avatar">
										<label for="file" class="custom-file-upload">
											<i class="fa fa-cloud-upload"></i> Select file
										</label>
										<img v-on:click="updatePhoto('showAcceptPhoto')" v-if="showAcceptPhoto && newPhoto" class="click icon-action icon-ok" src="@/assets/icon/icon-check.svg">
										<img v-on:click="showAcceptPhoto = false; showEditPhoto = false" v-if="showAcceptPhoto" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
									</div>

									<input
									enctype="multipart/form-data"
									type="file"
									id="file"
									ref="file"
									name="userProfilePhoto"
									v-on:change="saveFile()"
									>
								</div>
							</aside>
							<aside class="profile-right">
								<div class="user-data">
									<h2 class="user-name">{{$root.profile.name}}</h2>
									<p class="user-email">{{$root.profile.email}}</p>
								</div>
								<ul v-if="ready" class="list-network">
									<li v-if="$root.profile.Facebook">
										<span v-on:click="$root.openExternalInBlank($root.profile.Facebook)">
											<img :src="require(`../../assets/icon/icon-facebook.svg`)">
										</span>
									</li>
									<li v-if="$root.profile.Linkedin">
										<span v-on:click="$root.openExternalInBlank($root.profile.Linkedin)">
											<img :src="require(`../../assets/icon/icon-linkedin.svg`)">
										</span>
									</li>
									<li v-if="$root.profile.Telegram">
										<span v-on:click="$root.openExternalInBlank($root.profile.Telegram)">
											<img :src="require(`../../assets/icon/icon-telegram.svg`)">
										</span>
									</li>
									<li v-if="isCalendly() === true">
										<span v-on:click="$root.openExternalInBlank($root.profile.calendly)">
											<img :src="require(`../../assets/icon/icon-call-dark.svg`)">
										</span>
									</li>
								</ul>

								<button class="button is-light is-small is-fullwidth" @click="networksModalActive = true">
									{{content.editProfile}}
								</button>
								<b-modal
								:active.sync="networksModalActive"
								has-modal-card
								trap-focus
								:destroy-on-hide="false"
								aria-role="dialog"
								aria-modal>

								<div class="modal-card demo-modal">
									<header class="modal-card-head">
										<p class="modal-card-title">{{content.editProfile}}</p>
									</header>
									<section class="modal-card-body">

										<div class="network-field">
											<b-field :label="comm_content.role" grouped horizontal>
												<b-input type="text" v-model="newRole" expanded :placeholder="comm_content.yourRole"></b-input>
												<p class="control">
											</p>
											</b-field>
										</div>

										<div class="network-field">
											<b-field :label="comm_content.company" grouped horizontal>
												<b-input type="text" v-model="newCompany" expanded :placeholder="comm_content.companyName"></b-input>
												<p class="control">
											</p>
											</b-field>
										</div>
										
										<div class="network-field">
											<b-field label="Facebook" grouped horizontal>
												<b-input type="url" v-model="newFacebook" expanded  :placeholder="content.setUrl"></b-input>
												<p class="control">
											</p>
											</b-field>
										</div>

										<div class="network-field">
											<b-field label="Linkedin" grouped horizontal>
												<b-input type="url" v-model="newLinkedin" expanded :placeholder="content.setUrl"></b-input>
												<p class="control">
											</p>
											</b-field>
										</div>

										<div class="network-field">
											<b-field label="Telegram" grouped horizontal>
												<b-input type="url" v-model="newTelegram" expanded :placeholder="content.setUrl"></b-input>
												<p class="control">
											</p>
											</b-field>
										</div>

										<div class="network-field">
											<b-field label="Calendly" grouped horizontal>
												<b-input type="url" v-model="newCalendly" expanded :placeholder="content.setUrl"></b-input>
												<p class="control">
											</p>
											</b-field>
										</div>
									</section>
									<section class="modal-card-foot">
										<button @click="networksModalActive = false" class="button">{{comm_content.cancel}}</button>
										<button v-on:click="updateProfile()" class="button is-primary">{{comm_content.save}}</button>
									</section>
								</div></b-modal>
							</aside>
						</div>

						<!-- Profile bottom-->
						<div class="profile-bottom">
							<div class="columns" style="width:100%">
								<div class="column">
									<div class="profile-rol">
										<h2 class="user-company" style="text-align:right">{{comm_content.company}}</h2>
										<h2 class="user-rol" style="text-align:right; display:block">{{comm_content.role}}</h2>
									</div>
								</div>
								<div class="column">
									<div class="profile-rol">
										<h3 class="user-company" style="text-align:left">{{$root.profile.company}}</h3>
										<h3 class="user-rol">{{$root.profile.role}}</h3>
									</div>
								</div>
							</div>
							<!-- <figure class="profile-brand"> -->
								<!-- <img v-if="!$root.profile.company" :src="`${api}/static/img/brand-default.png`">
								<img v-else :src="`${api}/static/img/sponsors/${$root.profile.company.toUpperCase()}/${$root.profile.company.toUpperCase()}.png`"> -->
							<!-- </figure> -->
						</div>

						<MeetupsTabs />
					</div>
					<div class="column profile-data">
						<div class="business-card">
							<h3 class="title">{{content.mbc}}</h3>
							<b-tabs v-model="activeTab">
								<b-tab-item :label="$root.content.common.connected">
									<Businesscardconected
									v-for="(el, index) in $root.activeBusinessCards"
									:key="index"
									:data="el"
									/>
								</b-tab-item>

								<b-tab-item>
									<template slot="header">
										<b-icon icon="source-pull"></b-icon>
										<span> {{$root.content.common.pending}} 
											<b-tag type="is-info" v-if="$root.pendingCards.length" rounded> 
												{{$root.pendingCards.length}} 
											</b-tag> 
										</span>
									</template>
									<Businesscardpending
									v-for="(el, index) in $root.pendingCards"
									:key="index"
									:data="el"
									/>
								</b-tab-item>
							</b-tabs>
						</div>

						<!-- NOT RELEASED -->
						<!-- <div class="my-interviews">
							<h2>{{content.mi}}</h2>
							<b-tabs v-model="activeTabInterview">
								<b-tab-item label="Upcoming" class="interview-upcoming">
									<div class="interview-today">
										<h2 class="date-turn">{{$root.content.common.today}}</h2>
										<Interviewsupcoming />
									</div>

									<div class="interview-tomorrow">
										<h2 class="date-turn">23.04.19</h2>
										<Interviewsupcoming />
									</div>
								</b-tab-item>

								<b-tab-item label="Past" class="interview-past">
									<div class="interview-today">
										<h2 class="date-turn">13.03.19</h2>
										<Interviewspast />
									</div>
									<div class="interview-tomorrow">
										<h2 class="date-turn">23.01.19</h2>
										<Interviewspast />
									</div>
								</b-tab-item>

								<b-tab-item label="Failed" class="interview-failed">
									<div class="interview-today">
										<h2 class="date-turn">13.03.19</h2>
										<Interviewsfailed />
									</div>
								</b-tab-item>
							</b-tabs>
						</div> -->
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import {api} from '@/env'
	import axios from 'axios'
	import Pagetitle from '@/components/Pagetitle.vue'
	import Businesscardconected from '@/components/Profile/Businesscardconected.vue'
	import Businesscardpending from '@/components/Profile/Businesscardpending.vue'
	import Interviewsupcoming from '@/components/Profile/Interviewsupcoming.vue'
	import Interviewspast from '@/components/Profile/Interviewspast.vue'
	import Interviewsfailed from '@/components/Profile/Interviewsfailed.vue'
	import MeetupsTabs from './MeetupsTab'

	export default {
		name: "Profile",
		components: {
			Pagetitle,
			Businesscardconected,
			Businesscardpending,
			Interviewsupcoming,
			Interviewspast,
			Interviewsfailed,
			MeetupsTabs
		},
		props: {
			data: String
		},
		data() {
			this.ready = false
			this.profileParamsFocus = {
				name: false
			}

			this.$root.check('profile').then(() => {
				this.newRole = this.$root.profile.role
				this.newCompany = this.$root.profile.company
				this.newLinkedin = this.$root.profile.Linkedin
				this.newFacebook = this.$root.profile.Facebook
				this.newTelegram = this.$root.profile.Telegram
				this.newCalendly = this.$root.profile.calendly
				this.ready = true
			}).catch(e => console.log(`${e} inaccessible`))

			return {
				content: this.$root.content.Profile,
				comm_content: this.$root.content.common,

				profileParamsFocus: this.profileParamsFocus,
				api: api,
				ready: this.ready,
				activeTab: 0,
				activeTabInterview: 0,
				
				isCardModalActive: false,
				networksModalActive: false,

				showEditPhoto: false,

				newRole: "",
				newCompany: "",
				newLinkedin: "",
				newFacebook: "",
				newTelegram: "",
				newCalendly: "",
				newPhoto: ""
			}
		},
		methods: {
			isClicked (name) {
				return this.profileParamsFocus[name]
			},

			isCalendly () {
				if (this.$root.cloo(this.$root.usertype, "vip|media|startup|investor")) {
					if (this.$root.profile.calendly)
						return true

					else
						return 'no-calendly'
				}
				else 
					return false
				
			},

			changeClickedStatus (name) {
				if (this.profileParamsFocus[name])
					this.profileParamsFocus[name] = false
				else
					this.profileParamsFocus[name] = true
			},

			saveFile () {
				this.newPhoto = this.$refs.file.files[0];
			},

			updateProfile () {
				axios.post(api + '/login/socials_reg', {
					role: this.newRole,
					company: this.newCompany,
					Linkedin: this.newLinkedin,
					Facebook: this.newFacebook,
					Telegram: this.newTelegram,
					calendly: this.newCalendly,
				}, {
					headers: {
						authorization: localStorage.auth
					}
				})
				.then(res => {
					this.$root.getUser()
					this.networksModalActive = false
				})
				.catch(e => {
					this.$root.createError(e, 'oops')
				})
			},

			updatePhoto (param) {
				if (this.newPhoto) {
					let formData = new FormData();
					formData.append('userProfilePhoto', this.newPhoto);

					axios.post(`${api}/login/profilephoto`, formData, {
						headers: { authorization: localStorage.auth }
					})
					.then(res => {
						this[param] = false
						this[param.replace('Accept', 'Edit')] = false
						this.$root.getUser()
					})
					.catch(e => {
						this.$root.createError(e, 'oops')
					})
				}
				else {
					return true
				}
			}
		},
	}
</script>

<style lang="scss">
@import "./profile.scss";
</style>
