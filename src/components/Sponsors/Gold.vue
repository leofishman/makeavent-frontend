<template>
	<div v-on:click="$root.navToPage($root.getSponsorSlot(data).name)" class="tile is-child box shadow-2 gold click sponsor">
		<div class="has-text-centered">
			<img v-if="$root.getSponsorSlot(data).name" :src="host + $root.getSponsorSlot(data).logo" alt="">
			<h3 v-else>Gold Sponsor {{data}}</h3>
		</div>
	</div>
</template>

<script>
import {host} from '@/env'

export default {
	name: "Gold",
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