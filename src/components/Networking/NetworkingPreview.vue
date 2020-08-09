<template>
	<div @click="joinRoom"  class="room-preview column is-narrow">
		<b-loading :is-full-page="false" :active.sync="networkingPreviewLoading" :can-cancel="false"></b-loading>
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

				networkingPreviewLoading: false
			}
		},
		methods: {
			joinRoom () {
				if (!this.networkingPreviewLoading) {
					this.networkingPreviewLoading = true
					this.$root.joinRoom(this.room)
					setTimeout(() => {
						this.networkingPreviewLoading = false
					}, 4000)
				}
			}
		}
	}
</script>
<style lang="scss">
	@import "./index.scss";
	.margin {
		margin-bottom: 1rem;
	}
</style>