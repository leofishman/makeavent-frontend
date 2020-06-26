<template>
	<div id="media-partner-booth" v-if="ready">
		<navbar></navbar>
		<div class="container">
			<!--<Pagetitle :data="$router.currentRoute.params.name"/>-->

			<section class="section section-media-partner-booth">
				<div class="columns is-variable is-8">

					<!-- Profile main -->
					<div class="column is-two-fifths profile-main">
						<!-- Profile top-->
						<div class="profile-top">
							
							<!-- Company logo -->
							<div>
								<img :src="logo">
							</div>
							
							<!-- Company logo -->
							<ul class="list-network">
								<li v-if="website" v-on:click="openAndTrack(website)">
									<span>
										<img src="@/assets/icon/icon-email.svg">
									</span>
									<a>{{commonContent.Website}}</a>
								</li>
								<li 
									v-for="(el, key, index) in socials"
									:key="index"
									v-on:click="openAndTrack(el)"
								>
									<span v-if="el">
										<img :src="require(`../../assets/icon/icon-${key.toLowerCase()}.svg`)">
									</span>
									<a v-if="el">{{key}}</a>
								</li>
							</ul>
						</div>

						<!-- Profile bottom-->
						<div @click="haveInterview ? $root.joinStage('interviewbooth'+name.toLowerCase()) : ''" class="profile-bottom">
							<!-- [YD] add watch-interview-banner-inactive class -->
							<div :class="haveInterview ? 'watch-interview-banner' : 'watch-interview-banner--inactive'">
							<!-- <div class="watch-interview-banner--inactive"> -->
								<h3>Watch<br> Live<br> Interview</h3>
							</div>
						</div>
					</div>

					<div class="column profile-data">
						
						<!-- Bio Members -->
						<!-- @Bogdan Sizov: we won't show media contacts -->
						<!-- <div>
							<Mediapartnerrow
								v-for="(el, index) in contacts"
								:key="index"
								:data="el"
							/>
						</div> -->

						<!-- Bio text -->
                        <article class="bio-description box">
                            <p v-html="description"></p>
                        </article>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import Pagetitle from '@/components/Pagetitle.vue';
	import Mediapartnerrow from '@/components/Mediapartnerbooth/Mediapartnerrow.vue'

	import {api} from '@/env'
	import Axios from 'axios'

	export default {
		name: "Mediapartnerbooth",
		components: {
			Pagetitle,
			Mediapartnerrow
		},
		props: {
			data: String
		},
		data () {
			this.ready = false
			this.name = this.$router.currentRoute.params.name

			this.description = ""
			this.website = ""
			this.socials = ""
			this.contacts = ""
			this.logo = ""
			this.watchButtonClass = ""
			this.haveInterview = false

			this.$root.check('MediaPartners MediaPartners.length').then(async () => {
				this.mediaCompany = this.$root.MediaPartners.filter(el => compare(el.name, this.name))[0]
				
				this.description = this.mediaCompany.description
				this.website = this.mediaCompany.website
				this.socials = this.mediaCompany.socials
				this.contacts = this.mediaCompany.contacts
				this.logo = api + this.mediaCompany.logo

				this.ready = true

				await this.getInterviewByMedia()

				let self = this
				setInterval(() => {
					self.getInterviewByMedia()
				}, 15000)

			}).catch(e => console.log(`${e} inaccessible`))
			return {
				ready: this.ready,
				name: this.name.toUpperCase(),
				content: this.$root.content.Mediapartnerbooth,
				commonContent: this.$root.content.common,

				description: this.description,
				website: this.website,
				socials: this.socials,
				contacts: this.contacts,
				logo: this.logo,
				// socialLogos: socialLogos,

				interview: this.interview,
				watchButtonClass: this.watchButtonClass,
				haveInterview: this.haveInterview
			}
		},
		methods: {
			getInterviewByMedia () {
				return new Promise((resolve, reject) => {
					Axios.get(`${api}/webinars?name=interviewbooth${this.name.toLowerCase()}`)
					.then(res => {
						const decrypted = res.data
						this.interview = decrypted

						if (this.interview.status == 'ongoing') {
							this.haveInterview = true
						}

						resolve(true)
					})
					.catch(e => {})
				})
			},

			openAndTrack (link) {
				this.$root.track(name, link)
				this.$root.openExternalInBlank(link)
			}
		}
	}
</script>

<style scoped>

</style>
