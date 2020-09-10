<template>
	<div class="attendee-profile">
		<div class="attendee-info">
			<figure class="attendee-avatar">
				<img v-if="user.photo" :src="api + user.photo">
				<img v-else :src="`${api}/static/img/avatar-default.png`">
			</figure>
			<div class="attendee-text">
				<div class="attendee-name" v-html="user.name"></div>
				<div class="attendee-company" v-html="user.role + ' ' + user.company"></div>
				
				<small v-if="roomIdUserIn" class="attendee-room has-text-success">{{content.atRoom}} {{roomIdUserIn}}</small>
				<small v-else class="attendee-room has-text-danger">{{content.notInRoom}}</small>
			</div>
		</div>

		<div class="attendee-request">
			<button @click="$root.tryBusinessCard(user)" class="button is-primary is-rounded is-fullwidth attendee-bizcard">
				<img src="@/assets/icon/icon-user.svg" width="15" />
				<span v-if="!$root.checkIfAlreadyAFriend(user)" class="is-hidden-touch">{{content.requestBizcard}}</span>
				<span v-else class="is-hidden-touch">{{content.viewBusinessCard}}</span>
			</button>
			<button  v-if="roomIdUserIn" @click="$root.joinRoom(roomObjectUserIn)" class="button is-primary is-rounded is-fullwidth attendee-startchat">
				<img src="@/assets/icon/icon-call.svg" width="15" />
				<span class="is-hidden-touch">{{content.joinRoom}}</span>
			</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {api} from '@/env'
	
	export default {
		name: "NetworkingAttendee",
		props: {
			user: Object,
			activeRooms: Array
		},
		data () {
			return {
				api: api,
				content: this.$root.content.NetworkingRooms,

				roomIdUserIn: 0,
				roomObjectUserIn: {}
			}
		},
		methods: {
			isInRoom () {
				let includesCheck = false
				this.activeRooms.map((el, index) => {
					if (el.participants.includes(this.user._id)) {
						includesCheck = true
						this.roomIdUserIn = index+1
						this.roomObjectUserIn = el
					}
				})
				if (!includesCheck) {
					this.roomIdUserIn = 0
					this.roomObjectUserIn = {}
				}
			}
		},
		watch: {
			activeRooms: function () {
				if (this.activeRooms.length && typeof this.activeRooms === 'object')
					this.isInRoom()
				else
					this.roomIdUserIn = false
			}
		}
	}
</script>
<style lang="scss">
	@import "./index.scss";
</style>