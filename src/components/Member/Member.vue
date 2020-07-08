<template>
	<div class="box member">		
		<figure class="member-avatar">
			<img v-if="!data.photo" :src="`${host}/static/img/avatar-default.png`">
			<img v-else :src="host + data.photo">
		</figure>
		
		<h2 class="click member-name" @click="$root.tryBusinessCard(data)">{{data.name}}</h2>
		<h3 class="member-rol">{{data.role}}</h3>
		<div class="member-action buttons">
			<button v-on:click="$root.tryBusinessCard(data)" class="button is-fullwidth">
				<img src="@/assets/icon/icon-user.svg" width="15" /> Request BIZCARD
			</button>
			<button v-if="canCall" v-on:click="$root.privateCall(data)" class="button is-fullwidth">
				<img src="@/assets/icon/icon-call.svg" width="15" />
				Schedule e-meeting
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

	export default {
		name: "Member",
		props: {
			data: Object
		},
		data () {
			this.$root.canCall(this.data)
			.then(res => {
				this.canCall = res
			})

			return {
				api: api,
				canCall: this.canCall
			}
		}
	}
</script>

<style scoped>

</style>