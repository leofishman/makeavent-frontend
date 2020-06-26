<template>
	<!--<b-tooltip :active="showEditMenu" label="Tooltip right" position="is-right" always></b-tooltip>-->
	<div @contextmenu="handler($event)" v-on:click="$root.navToPage($root.getSponsorSlot(data).name)" class="basic box shadow-2 click sponsor">
		<div class="has-text-centered">
			<img v-if="$root.getSponsorSlot(data).name" :src="api + $root.getSponsorSlot(data).logo" alt="">
			<div v-else>Basic {{data}}</div>
		</div>
	</div>
</template>

<script>
	import {api} from '@/env'

	export default {
		name: "Basic",
		props: {
			data: String
		},
		data () {
			return {
				showEditMenu: false,
				api: api
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
