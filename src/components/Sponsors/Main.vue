<template>
	<div v-on:click="$root.navToPage($root.getSponsorSlot(data).name)" class="main box radius-rounded shadow-1 click sponsor">
		<div class="has-text-centered">
			<img v-if="$root.getSponsorSlot(data).name" :src="host + $root.getSponsorSlot(data).logo" alt="">
			<h3 v-else>Main Sponsor {{data}}</h3>
		</div>
	</div>
</template>

<script>

import {host} from '@/env'

export default {
	name: "Main",
	props: {
		data: String
	},
	data () {
		return {
			host: host
		}
	}
}
</script>

<style scoped>

</style>