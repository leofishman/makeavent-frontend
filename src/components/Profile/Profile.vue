<template>
	<div id="profile">
		<navbar></navbar>

		<div class="container" v-if="ready">

			<section class="section section-profile">
				<div class="columns is-variable is-8">
					<div class="column is-two-fifths profile-main">
						
						<!-- Profile top-->
						<div class="profile-top">
							<aside class="profile-left">
								<div class="profile-avatar">
									<figure class="figure-avatar">
										<img :src="api + profile.photo">
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
									<h2 class="user-name">{{profile.name}}</h2>
									<p class="user-email">{{profile.email}}</p>
								</div>
								<ul class="list-network">
									<li v-if="profile.Facebook">
										<span v-on:click="$root.openExternalInBlank(profile.Facebook)">
											<img :src="require(`../../assets/icon/icon-facebook.svg`)">
										</span>
										<p v-if="!showEditFacebook" v-on:click="$root.openExternalInBlank(profile.Facebook)">
											Facebook
										</p>
										<img v-if="!showAcceptFacebook" v-on:click="showAcceptFacebook = true; showEditFacebook = true" class="click icon-action" src="@/assets/img/pencil.svg">
										<b-field v-if="showEditFacebook">
											<b-input type="url" class="edit-socials" v-model="newFacebook"></b-input>
										</b-field>
										<img v-on:click="update('newFacebook', 'showAcceptFacebook')" v-if="showAcceptFacebook && newFacebook" class="click icon-action" src="@/assets/icon/icon-check.svg">
										<img v-on:click="showAcceptFacebook = false; showEditFacebook = false" v-if="showAcceptFacebook" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
									</li>
									<li v-else>
										<span v-on:click="$root.openExternalInBlank(profile.Facebook)">
											<img :src="require(`../../assets/icon/icon-facebook.svg`)">
										</span>
										<p v-if="!showEditFacebook">
											Facebook not set
										</p>
										<img v-if="!showAcceptFacebook" v-on:click="showAcceptFacebook = true; showEditFacebook = true" class="click icon-action" src="@/assets/img/pencil.svg">
										<b-field v-if="showEditFacebook">
											<b-input type="url" class="edit-socials" v-model="newFacebook"></b-input>
										</b-field>
										<img v-on:click="update('newFacebook', 'showAcceptFacebook')" v-if="showAcceptFacebook && newFacebook" class="click icon-action" src="@/assets/icon/icon-check.svg">
										<img v-on:click="showAcceptFacebook = false; showEditFacebook = false" v-if="showAcceptFacebook" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
									</li>
									<li v-if="profile.Linkedin">
										<span v-on:click="$root.openExternalInBlank(profile.Linkedin)">
											<img :src="require(`../../assets/icon/icon-linkedin.svg`)">
										</span>
										<p v-if="!showEditLinkedin" v-on:click="$root.openExternalInBlank(profile.Linkedin)">
											Linkedin
										</p>
										<img v-if="!showAcceptLinkedin" v-on:click="showAcceptLinkedin = true; showEditLinkedin = true" class="click icon-action" src="@/assets/img/pencil.svg">
										<b-field v-if="showEditLinkedin">
											<b-input type="url" class="edit-socials" v-model="newLinkedin"></b-input>
										</b-field>
										<img v-on:click="update('newLinkedin', 'showAcceptLinkedin')" v-if="showAcceptLinkedin && newLinkedin" class="click icon-action icon-close" src="@/assets/icon/icon-check.svg">
										<img v-on:click="showAcceptLinkedin = false; showEditLinkedin = false" v-if="showAcceptLinkedin" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
									</li>
									<li v-else>
										<span v-on:click="$root.openExternalInBlank(profile.Linkedin)">
											<img :src="require(`../../assets/icon/icon-linkedin.svg`)">
										</span>
										<p v-if="!showEditLinkedin">
											Linkedin not set
										</p>
										<img v-if="!showAcceptLinkedin" v-on:click="showAcceptLinkedin = true; showEditLinkedin = true" class="click icon-action" src="@/assets/img/pencil.svg">
										<b-field v-if="showEditLinkedin">
											<b-input type="url" class="edit-socials" v-model="newLinkedin"></b-input>
										</b-field>
										<img v-on:click="update('newLinkedin', 'showAcceptLinkedin')" v-if="showAcceptLinkedin && newLinkedin" class="click icon-action" src="@/assets/icon/icon-check.svg">
										<img v-on:click="showAcceptLinkedin = false; showEditLinkedin = false" v-if="showAcceptLinkedin" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
									</li>
									<li v-if="profile.Telegram">
										<span v-on:click="$root.openExternalInBlank(profile.Telegram)">
											<img :src="require(`../../assets/icon/icon-telegram.svg`)">
										</span>
										<p v-if="!showEditTelegram" v-on:click="$root.openExternalInBlank(profile.Telegram)">
											Telegram
										</p>
										<img v-if="!showAcceptTelegram" v-on:click="showAcceptTelegram = true; showEditTelegram = true" class="click icon-action" src="@/assets/img/pencil.svg">
										<b-field v-if="showEditTelegram">
											<b-input type="url" class="edit-socials" v-model="newTelegram"></b-input>
										</b-field>
										<img v-on:click="update('newTelegram', 'showAcceptTelegram')" v-if="showAcceptTelegram && newTelegram" class="click icon-action" src="@/assets/icon/icon-check.svg">
										<img v-on:click="showAcceptTelegram = false; showEditTelegram = false" v-if="showAcceptTelegram" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
									</li>
									<li v-else>
										<span >
											<img :src="require(`../../assets/icon/icon-telegram.svg`)">
										</span>
										<p v-if="!showEditTelegram">
											Telegram not set
										</p>
										<img v-if="!showAcceptTelegram" v-on:click="showAcceptTelegram = true; showEditTelegram = true" class="click icon-action" src="@/assets/img/pencil.svg">
										<b-field v-if="showEditTelegram">
											<b-input type="url" class="edit-socials" v-model="newTelegram"></b-input>
										</b-field>
										<img v-on:click="update('newTelegram', 'showAcceptTelegram')" v-if="showAcceptTelegram && newTelegram" class="click icon-action" src="@/assets/icon/icon-check.svg">
										<img v-on:click="showAcceptTelegram = false; showEditTelegram = false" v-if="showAcceptTelegram" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
									</li>
									<li v-if="isCalendly() === true">
										<span v-on:click="$root.openExternalInBlank(profile.calendly)">
											<img :src="require(`../../assets/icon/icon-call-dark.svg`)">
										</span>
										<p v-if="!showEditcalendly" v-on:click="$root.openExternalInBlank(profile.calendly)">
											Calendly
										</p>
										<img v-if="!showAcceptcalendly" v-on:click="showAcceptcalendly = true; showEditcalendly = true" class="click icon-action" src="@/assets/img/pencil.svg">
										<b-field v-if="showEditcalendly">
											<b-input type="url" class="edit-socials" v-model="newcalendly"></b-input>
										</b-field>
										<img v-on:click="update('newcalendly', 'showAcceptcalendly')" v-if="showAcceptcalendly && newcalendly" class="click icon-action icon-close" src="@/assets/icon/icon-check.svg">
										<img v-on:click="showAcceptcalendly = false; showEditcalendly = false" v-if="showAcceptcalendly" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
									</li>
									<li v-else-if="isCalendly() == 'no-calendly'">
										<span v-on:click="$root.openExternalInBlank(profile.calendly)">
											<img :src="require(`../../assets/icon/icon-call-dark.svg`)">
										</span>
										<p v-if="!showEditcalendly" v-on:click="$root.openExternalInBlank(profile.calendly)">
											Calendly not set
										</p>
										<img v-if="!showAcceptcalendly" v-on:click="showAcceptcalendly = true; showEditcalendly = true" class="click icon-action" src="@/assets/img/pencil.svg">
										<b-field v-if="showEditcalendly">
											<b-input type="url" class="edit-socials" v-model="newcalendly"></b-input>
										</b-field>
										<img v-on:click="update('newcalendly', 'showAcceptcalendly')" v-if="showAcceptcalendly && newcalendly" class="click icon-action icon-close" src="@/assets/icon/icon-check.svg">
										<img v-on:click="showAcceptcalendly = false; showEditcalendly = false" v-if="showAcceptcalendly" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
									</li>
								</ul>
							</aside>
						</div>

						<!-- Profile bottom-->
						<div class="profile-bottom box">
							<div class="profile-brand">
								<img v-if="!profile.company" class="level-left" :src="`${api}/static/img/brand-default.png`">
								<img v-else class="level-left" :src="`${api}/static/img/sponsors/${profile.company.toUpperCase()}/${profile.company.toUpperCase()}.png`">
							</div>
							<div class="profile-rol">
								<h3>{{profile.role}}</h3>
								<img v-if="!showAcceptRole" v-on:click="showAcceptRole = true; showEditRole = true" class="click icon-action" src="@/assets/img/pencil.svg">				
							</div>
							<b-field v-if="showEditRole">
								<b-input v-model="newrole"></b-input>
								<img v-on:click="update('newrole', 'showAcceptRole')" v-if="showAcceptRole && newrole" class="click icon-action icon-ok" src="@/assets/icon/icon-check.svg">
								<img v-on:click="showAcceptRole = false; showEditRole = false" v-if="showAcceptRole" class="click icon-action icon-close" src="@/assets/icon/icon-close.svg">
							</b-field>

						</div>
					</div>
					<div class="column profile-data">
						<div class="business-card">
							<h3 class="business-card-title">{{content.mbc}}</h3>
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
	import Pagetitle from '@/components/Pagetitle.vue';
	import Businesscardconected from '@/components/Profile/Businesscardconected.vue';
	import Businesscardpending from '@/components/Profile/Businesscardpending.vue';
	import Interviewsupcoming from '@/components/Profile/Interviewsupcoming.vue';
	import Interviewspast from '@/components/Profile/Interviewspast.vue';
	import Interviewsfailed from '@/components/Profile/Interviewsfailed.vue';

	export default {
		name: "Profile",
		components: {
			Pagetitle,
			Businesscardconected,
			Businesscardpending,
			Interviewsupcoming,
			Interviewspast,
			Interviewsfailed,
		},
		props: {
			data: String
		},
		data() {
			this.profile = undefined
			this.ready = false
			this.profileParamsFocus = {
				name: false
			}

			let self = this
			setInterval(() => {
				self.profile = self.$root.profile
				self.ready = true
			}, 5000)

			this.$root.check('profile').then(() => {
				this.profile = this.$root.profile
				this.ready = true
			}).catch(e => console.log(`${e} inaccessible`))

			return {
				profileParamsFocus: this.profileParamsFocus,
				content: this.$root.content.Profile,
				api: api,
				ready: this.ready,
				profile: this.profile,
				activeTab: 0,
				activeTabInterview: 0,
				
				showEditRole: false,
				showEditLinkedin: false,
				showEditFacebook: false,
				showEditTelegram: false,
				showEditPhoto: false,
				showEditcalendly: false,

				showAcceptRole: false,
				showAcceptLinkedin: false,
				showAcceptFacebook: false,
				showAcceptTelegram: false,
				showAcceptPhoto: false,
				showAcceptcalendly: false,

				isCardModalActive: false,

				newrole: "",
				newLinkedin: "",
				newFacebook: "",
				newTelegram: "",
				newcalendly: "",
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

			update (el, param) {
				axios.post(api + '/login/socials_reg', {
					[el.replace('new', '')]: this[el],
				}, {
					headers: {
						authorization: localStorage.auth
					}
				})
				.then(res => {
					this[param] = false
					this[param.replace('Accept', 'Edit')] = false
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

</style>
