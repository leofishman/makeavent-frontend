<template>
	<div class="attendee-profile">
		<div class="attendee-info">
			<figure class="attendee-avatar">
				<img :src="`${host}/static/img/avatar-default.png`">
			</figure>
			<div class="attendee-text">
				<div class="attendee-name">Elena Obukhova</div>
				<div class="attendee-company">position at company</div>
				<small class="attendee-room has-text-success">At room 1</small>
			</div>
		</div>

		<div class="attendee-request">
			<button class="button is-primary is-rounded is-fullwidth attendee-bizcard">
				<img src="@/assets/icon/icon-user.svg" width="15" />
				<span class="is-hidden-touch">Request BIZCARD</span>
			</button>
			<button class="button is-primary is-rounded is-fullwidth attendee-startchat">
				<img src="@/assets/icon/icon-call.svg" width="15" />
				<span class="is-hidden-touch">Start a Chat</span>
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
			}
		},
	}
</script>