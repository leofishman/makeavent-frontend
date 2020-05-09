<template>
	<div v-on:click="$root.openStartupProfile(getStartupProfile(id)._id)" class="tile is-child startup-logo box">
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
		}
	}
</script>

<style scoped>

</style>