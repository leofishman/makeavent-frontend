<template>
	<div v-on:click="$root.navToPage($root.getSponsorSlot(data).name)" class="tile is-child box shadow-2 gold click sponsor">
		<div class="has-text-centered">
			<img v-if="$root.getSponsorSlot(data).name" :src="api + $root.getSponsorSlot(data).logo" alt="">
			<h3 v-else>Gold Sponsor {{data}}</h3>
		</div>
	</div>
</template>

<script>
import {api} from '@/env'

export default {
	name: "Gold",
	props: {
		data: String
	},
	data () {
		return {
			api: api
		}
	}
}
</script>

<style scoped>

</style>