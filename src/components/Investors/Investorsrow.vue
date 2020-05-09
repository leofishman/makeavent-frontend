<template>
	<div class="box">
		<div class="columns">
			<div class="column investors-pic">
				<img :src="data.photo">
			</div>
			<div class="column investors-name">
				<h3 @click="$root.tryBusinessCard(data)" class="has-text-centered click">{{data.name}} <strong>{{data.role}}</strong></h3>
			</div>
			<div class="column investors-fundname is-uppercase">
				<h3 @click="openInvestorBooth(data.company)" class="has-text-centered has-text-grey-light click">{{data.company}}</h3>
			</div>
			<div class="column investors-flag">
				<img class="has-text-centered" src="@/assets/icon-target.svg">
			</div>
			<div class="column investors-touch is-uppercase">
				<h3 class="has-text-centered">{{content.rem}}</h3>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Investorsrow",
		props: {
			data: Object
		},
		data () {
			return {
				content: this.$root.content.Investors
			}
		},
		methods: {
			openInvestorBooth (name) {
				this.$router.push({
					name: "InvestFundProfile",
					query: {
						name: name.toLowerCase()
					}
				})
			},
		}
	}
</script>

<style scoped>

</style>