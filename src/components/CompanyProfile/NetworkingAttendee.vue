<template>
	<div class="attendee-profile">
		<div class="attendee-info">
			<figure class="attendee-avatar">
				<!-- if user has avatar img here -->
				<!-- else -->
				<img :src="`${host}/static/img/avatar-default.png`">
			</figure>
			<div class="attendee-text">
				<div class="attendee-name">Elena Obukhova</div>
				<div class="attendee-company">position at company</div>
				
				<!-- if is in a room -->
				<small class="attendee-room has-text-success">{{content.atRoom}} 1</small>
				<!-- else -->
				<small class="attendee-room has-text-success">{{notInRoom}}</small>
			</div>
		</div>

		<div class="attendee-request">
			<button class="button is-primary is-rounded is-fullwidth attendee-bizcard">
				<img src="@/assets/icon/icon-user.svg" width="15" />
				<span class="is-hidden-touch">{{content.requestBizcard}}</span>
			</button>
			<button class="button is-primary is-rounded is-fullwidth attendee-startchat">
				<img src="@/assets/icon/icon-call.svg" width="15" />
				<span class="is-hidden-touch">{{content.startChat}}</span>
			</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {host} from '@/env'
	
	export default {
		name: "NetworkingAttendee",
		data () {
			return {
				host: host,
				content: this.$root.content.NetworkingRooms,
			}
		},
	}
</script>