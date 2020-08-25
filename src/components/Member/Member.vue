<template>
	<div class="box member is-primary-changeable--border-top is-light-changeable--bg">		
		<figure class="member-avatar">
			<img v-if="!data.photo" :src="`${api}/static/img/avatar-default.png`">
			<img v-else :src="api + data.photo">
		</figure>
		
		<h2 class="click member-name is-dark-changeable--color is-light-changeable--bg" @click="$root.tryBusinessCard(data)">{{data.name}}</h2>
		<h3 class="member-rol is-dark-changeable--color is-light-changeable--bg">{{data.company}}</h3>
		<h3 class="member-rol is-dark-changeable--color is-light-changeable--bg">{{data.role}}</h3>
		<div class="member-action buttons">
			<button
				v-if="!$root.checkIfAlreadyAFriend(data)"
				v-on:click="$root.tryBusinessCard(data)"
				class="button is-fullwidth is-dark-changeable--color is-light-changeable--bg">
					<img src="@/assets/icon/icon-user.svg" width="15" />
					{{content.request}}
			</button>
			<button
				v-if="canCall"
				v-on:click="$root.privateCall(data)"
				class="button is-fullwidth is-dark-changeable--color is-light-changeable--bg">
					<img src="@/assets/icon/icon-call.svg" width="15" />
					{{content.scheduleMeeting}}
			</button>
		</div>
		
		<nav>
			<a v-if="data.email" :href="'mailto:' + data.email">
				<img src="@/assets/icon/icon-email.svg">
			</a>
			<a v-if="data.Facebook" target="_blank" :href="data.Facebook">
				<img src="@/assets/icon/icon-facebook.svg">
			</a>
			<a v-if="data.Linkedin" target="_blank" :href="data.Linkedin">
				<img src="@/assets/icon/icon-linkedin.svg">
			</a>
			<a v-if="data.Telegram" target="_blank" :href="data.Telegram">
				<img src="@/assets/icon/icon-telegram.svg">
			</a>
		</nav>
	</div>
</template>

<script>
	import {api} from '@/env'
	import Axios from 'axios'
	import {MEETUP} from '@/api/endpoints'

	export default {
		name: "Member",
		props: {
			data: [String, Object]
		},
		data () {
			this.canCall = false

			this.$root.canCall(this.data)
			.then(res => {
				this.canCall = res
			})

			return {
				api: api,
				canCall: this.canCall,
				content: this.$root.content.Member
			}
		}
	}
</script>

<style scoped>

</style>