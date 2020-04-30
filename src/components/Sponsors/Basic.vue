<template>
	<b-tooltip
		:active="showEditMenu"
		label="Tooltip right"
		position="is-right"
		always
	>
		<div
			@contextmenu="handler($event)"
			v-on:click="$root.navToPage($root.getSponsorSlot(data).name)"
			class="basic box shadow-2 click sponsor"
		>
			<div class="has-text-centered">
				<img v-if="$root.getSponsorSlot(data).name" :src="host + $root.getSponsorSlot(data).logo" alt="">
				<div v-else>Basic {{data}}</div>
			</div>
		</div>
	</b-tooltip>
</template>

<script>

import {host} from '@/env'

export default {
	name: "Basic",
	props: {
		data: String
	},
	data () {
		return {
			showEditMenu: false,
			host: host
		}
	},
	methods: {
		handler (event) {
			event.preventDefault();
			this.showEditMenu = true
		}
	}
}
</script>

<style scoped>

</style>