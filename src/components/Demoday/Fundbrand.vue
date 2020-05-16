<template>
	<div v-on:click="openInvestorBooth()" class="has-text-centered click">
		<img :src="getFundLogo()">
	</div>
</template>

<script>
import {host} from '@/env'

export default {
	name: "Fundbrand",
	props: {
		fundName: String
	},
	data () {
		return {

		}
	},
	methods: {
		openInvestorBooth () {
			let fund = this.$root.InvestFunds.filter(el => compare(el.name, this.fundName))[0]
			if (!fund) 
				this.$buefy.dialog.alert(this.$root.content.ErrorMessages[6], 'oops')
			
			else 
				this.$router.push({
					name: "InvestFundProfile",
					query: {
						name: this.fundName.toLowerCase()
					}
				})
		},

		getFundLogo () {
			return host + '/static/img/InvestmentFunds/' + this.fundName + ".png"
		}
	}
}
</script>

<style scoped>

</style>