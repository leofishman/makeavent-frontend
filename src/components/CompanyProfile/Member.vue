<template>
	<div class="box member">
		<img v-on:click="$root.tryBusinessCard(data)" src="@/assets/icon/icon-user.svg" class="member-action click left" title="Request business card">
		<!-- NOT RELEASED -->
		<img v-on:click="$root.privateCall(data)" src="@/assets/icon/icon-call.svg" class="member-action click right" title="Schedule e-meeting">

		<figure>
			<img v-if="!data.photo" :src="`${host}/static/img/avatar-default.png`">
			<img v-else :src="host + data.photo">
		</figure>

		<h1 class="click" @click="$root.tryBusinessCard(data)">{{data.name}}</h1>
		<h2>{{data.role}}</h2>
		<a class="memeber-email">{{data.email}}</a>
		<nav>
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
import {host} from '@/env'

export default {
	name: "Member",
	props: {
		data: Object
	},
	data () {
		return {
			host: host
		}
	}
}
</script>

<style scoped>

</style>