<template>
	<div id="profile">
		<navbar></navbar>
		<div class="container" v-if="ready">
			<Pagetitle :data="profile.name"/>

			<section class="section section-profile">
				<div class="columns is-variable is-8">
					<div class="column is-two-fifths profile-main">
						
						<!-- Profile top-->
						<div class="profile-top">
							<div>
								<img :src="host + profile.photo">
							</div>
							<ul class="list-network">
								<li>
									<span>
										<img src="@/assets/icon/icon-email.svg">
									</span> {{profile.email}}
								</li>
								<li
									v-if="profile.Facebook"
									v-on:click="$root.openExternalInBlank(profile.Facebook)"
								>
									<span>
										<img :src="require(`../../assets/icon/icon-facebook.svg`)" alt="">
									</span>
									Facebook
								</li>
								<li
									v-if="profile.Linkedin"
									v-on:click="$root.openExternalInBlank(profile.Linkedin)"
								>
									<span>
										<img :src="require(`../../assets/icon/icon-linkedin.svg`)" alt="">
									</span>
									Linkedin
								</li>
								<li
									v-if="profile.Telegram"
									v-on:click="$root.openExternalInBlank(profile.Telegram)"
								>
									<span>
										<img :src="require(`../../assets/icon/icon-telegram.svg`)" alt="">
									</span>
									Telegram
								</li>
							</ul>
						</div>

						<!-- Profile bottom-->
						<div class="profile-bottom box">
							<div class="profile-brand">
								<img class="level-left" :src="`${host}/static/img/sponsors/${profile.company.toUpperCase()}/${profile.company.toUpperCase()}.png`">
							</div>
							<h3>{{profile.role}}</h3>
						</div>
					</div>
					<div class="column profile-data">
						<div class="business-card">
							<h2>{{content.mbc}}</h2>
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
											<b-tag v-if="$root.pendingCards.length" rounded> 
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

						<div class="my-interviews">
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
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import {host} from '@/env'
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

			this.$root.check('profile').then(() => {
				this.profile = this.$root.profile
				this.ready = true
			})

			return {
				profileParamsFocus: this.profileParamsFocus,
				content: this.$root.content.Profile,
				host: host,
				ready: this.ready,
				profile: this.profile,
				activeTab: 0,
				activeTabInterview: 0
			}
		},
		methods: {
			isClicked (name) {
				return this.profileParamsFocus[name]
			},

			changeClickedStatus (name) {
				console.log(this.profileParamsFocus[name])
				if (this.profileParamsFocus[name])
					this.profileParamsFocus[name] = false
				else
					this.profileParamsFocus[name] = true
			}
		},
	}
</script>

<style scoped>

</style>