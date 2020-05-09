<template>
	<div class="box">
		<div class="columns">
			<div class="column row-pic">
				<img :src="$root.tryGetProfilePhoto(data.email)">
			</div>
			<div class="column row-name">
				<div class="has-text-centered">
					<h3 class="click">{{data.name}}</h3>
				</div>
			</div>
			<div class="column row-touch is-uppercase">
				<div class="has-text-centered">
					<h3 @click="$root.tryBusinessCard(content)" class="click">{{content.reqbizcard}}</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Mediapartnerrow",
		props: {
			data: Object
		},
		data () {
			return {
				content: this.$root.content.common
			}
		}
	}
</script>

<style scoped>

</style>