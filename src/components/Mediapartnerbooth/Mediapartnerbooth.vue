<template>
	<div id="media-partner-booth" v-if="ready">
		<navbar></navbar>
		<div class="container">
			<Pagetitle data="Crypto Notias"/>

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
						<div
							@click="$root.joinStage('interview'+name)"
							class="profile-bottom"
						>
							<img src="@/assets/watch-interview.jpg">
						</div>
					</div>

					<div class="column profile-data">
						
						<!-- Bio Members -->
						<div>
							<Mediapartnerrow
								v-for="(el, index) in contacts"
								:key="index"
								:data="el"
							/>
						</div>

						<!-- Bio text -->
						<article>
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

	import {host} from '@/env'
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

			this.token = this.$root.token
			this.description = ""
			this.website = ""
			this.socials = ""
			this.contacts = ""
			this.logo = ""
			this.watchButtonClass = ""

			this.$root.check('MediaPartners MediaPartners.length').then(async () => {
				this.mediaCompany = this.$root.MediaPartners.filter(el => compare(el.name, this.name))[0]
				
				this.description = this.mediaCompany.description
				this.website = this.mediaCompany.website
				this.socials = this.mediaCompany.socials
				this.contacts = this.mediaCompany.contacts
				this.logo = host + this.mediaCompany.logo

				this.ready = true

				await this.getInterviewByMedia()
				this.loadWatchButtonClass()
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
				watchButtonClass: this.watchButtonClass
			}
		},
		methods: {
			getInterviewByMedia () {
				return new Promise((resolve, reject) => {
					Axios.get(`${host}/interviews?id=${this.mediaCompany._id}`)
					.then(res => {
						const decrypted = this.$root.decrypt(res.data.encryptedData)

						this.interview = decrypted
						resolve(true)
					})
					.catch(e => {})
				})
			},

			loadWatchButtonClass () {
				if (new Date().getTime() > this.interview.time && compare(this.interview.status, 'ongoing')) 
					this.watchButtonClass = 'watch-interview-button active watch-interview'
				else
					this.watchButtonClass = 'watch-interview-button'
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