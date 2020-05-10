<template>
	<div class="box member">
		<img src="@/assets/icon/icon-search.svg" alt="">
		<img src="@/assets/icon/icon-user.svg" alt="">


		<figure>
			<img :src="$root.tryGetProfilePhoto(data.email)">
		</figure>

		<h1 class="click" @click="$root.tryBusinessCard(data)">{{data.name}}</h1>
		<h2>{{data.role}}</h2>
		<h3>{{data.email}}</h3>
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
	export default {
		name: "Member",
		props: {
			data: Object
		}
	}
</script>

<style scoped>

</style>