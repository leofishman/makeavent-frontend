<template>
	<div v-on:click="$root.openStartupProfile(getStartupProfile(id)._id)" class="column is-one-third startup-logo">
		<div class="box has-text-centered">
			<img v-if="getStartupProfile(id)" :src="api + getStartupProfile(id).logo" alt="">
			<h3 v-else>{{content.startup}}</h3>
		</div>
	</div>
</template>

<script>
	import {api} from '@/env'

	export default {
		name: "Startuplogo",
		props: {
			id: String
		},
		data () {
			return {
				api: api,
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