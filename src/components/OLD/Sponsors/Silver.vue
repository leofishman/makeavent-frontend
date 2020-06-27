<template>
	<div v-on:click="$root.navToPage($root.getSponsorSlot(data).name)" class="tile is-parent silver">
		<div class="tile box has-background-light click sponsor">
			<div class="has-text-centered">
				<img v-if="$root.getSponsorSlot(data).name" :src="api + $root.getSponsorSlot(data).logo" alt="">
				<h3 v-else>Silver Sponsor {{data}}</h3>
			</div>
		</div>
	</div>
</template>

<script>
import {api} from '@/env'

export default {
	name: "Silver",
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