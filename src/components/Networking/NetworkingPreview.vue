<template>
	<div @click="$root.joinRoom(room)" class="room-preview column is-narrow">
		<div class="box">
			<img class="logo" :src="$root.meetup.image" alt="">
			<h3 class="margin">
				{{content.networkingRoom}} {{roomId}}
			</h3>
			<div class="has-text-success">{{room.online}} {{content.peopleOnline}}</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {api} from '@/env'
	
	export default {
		name: "NetworkingPreview",
		props: {
			room: Object,
			roomId: Number
		},
		data () {
			return {
				api: api,
				content: this.$root.content.NetworkingRooms,
			}
		},
		methods: {

		}
	}
</script>
<style lang="scss">
	@import "./index.scss";
	.margin {
		margin-bottom: 1rem;
	}
</style>