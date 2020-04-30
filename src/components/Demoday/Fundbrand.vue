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