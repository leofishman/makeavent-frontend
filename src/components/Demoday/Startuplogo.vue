<template>
	<div v-on:click="openStartupProfile(id)" class="tile is-child startup-logo box">
		<div class="has-text-centered">
			<img v-if="getStartupProfile(id)" :src="host + getStartupProfile(id).logo" alt="">
			<h3 v-else>{{content.startup}}</h3>
		</div>
	</div>
</template>

<script>
	import {host} from '@/env'

	export default {
		name: "Startuplogo",
		props: {
			id: String
		},
		data () {
			return {
				host: host,
				content: this.$root.content.StartupsDemoDay
			}
		},
		methods: {
			getStartupProfile (id) {
				return this.$root.Startups[id]
			},

			openStartupProfile (id) {
				const name = this.$root.Startups[id].name.toLowerCase()
				if (this.$root.cloo(this.$root.usertype, 'investor')) {
					this.$router.push({
						path: `/${this.$root.token}/sip/${name}`
					}).catch(e => {
						console.log(e)
					})
				}
				// only investor can see startup investment profile
				else {
					this.$router.push({
						path: `/${this.$root.token}/company?name=${name}`
					}).catch(e => {
						console.log(e)
					})
				}
			},
		}
	}
</script>

<style scoped>

</style>