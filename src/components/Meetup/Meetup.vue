<template>
	<div v-if="ready" id="meetup">
		<navbar></navbar>
		<div class="container">
			<Pagetitle :data="content.title"/>

			<section class="section section-meetup">
				<p class="has-text-centered">{{content.intro}}</p>

				<div class="meetup-sponsors">
					<div>
						<div class="col">
							<!-- Main sponsor -->
							<article class="click box ms-main" v-on:click="openPage('kaspersky')">
								<img :src="host + $root.getSponsorByName('kaspersky').logo">
							</article>
						</div>
						<div class="col">
							<!-- Platinum sponsor -->
							<article class="click box ms-platinum" v-on:click="openPage('rsk')">
								<img :src="host + $root.getSponsorByName('rsk').logo">
							</article>
						</div>
					</div>
					<div>
						<div class="col">
							<!-- Gold sponsor -->
							<article class="click box ms-gold" v-on:click="openPage('decred')">
								<img :src="host + $root.getSponsorByName('decred').logo">
							</article>
						</div>
						<div class="col">
							<!-- Gold sponsor -->
							<article class="click box ms-gold" v-on:click="openPage('dash')">
								<img :src="host + $root.getSponsorByName('dash').logo">
							</article>
						</div>
					</div>
				</div>

			</section>
		</div>

	</div>
</template>
<script>
import Pagetitle from '@/components/Pagetitle.vue';
import {host} from '@/env'

export default {
	name: "Meetup",
	components: {
		Pagetitle,
	},
	props: {
		data: String
	},
	methods: {
		openPage (name) {
			this.$router.push(`/${this.$root.$router.currentRoute.params.id}/booth?name=${name}`).catch(() => {
				window.location.reload()
			})
		},
	},
	data () {
		this.ready = false

		this.$root.check('Sponsors').then(() => {
			this.ready = true
		}).catch(e => console.log(`${e} inaccessible`))
		return {
			ready: this.ready,

			host: host,
			content: this.$root.content.Meetup
		}
	}
}
</script>

<style lang="scss">


</style>