<template>
	<div class="box">
		<div class="columns">
			<div class="column investors-pic">
				<img v-if="data.photo" :src="host + data.photo">
                <img v-else :src="host + '/static/img/avatar-default.png'" alt="">
			</div>
			<div class="column investors-name">
				<h3 @click="$root.tryBusinessCard(data)" class="has-text-centered click">{{data.name}} <strong>{{data.role}}</strong></h3>
			</div>
			<div class="column investors-fundname is-uppercase">
				<h3 @click="openInvestorBooth(data.company)" class="has-text-centered has-text-grey-light click">{{data.company}}</h3>
			</div>
			<div @click="$root.tryBusinessCard(data)" class="click column investors-flag is-uppercase">
				<!-- <img class="has-text-centered" src="@/assets/icon-target.svg"> -->
				<h3 class="has-text-centered">{{content.rbc}}</h3>
			</div>
			<div @click="$root.privateCall(data)" class="click column investors-touch is-uppercase">
				<h3 class="has-text-centered">{{content.rem}}</h3>
			</div>
		</div>
	</div>
</template>

<script>
import {host} from '@/env'

export default {
	name: "Investorsrow",
	props: {
		data: Object
	},
	data () {
		return {
			content: this.$root.content.Investors,
			host: host
		}
	},
	methods: {
		openInvestorBooth (name) {
			let fund = this.$root.InvestFunds.filter(el => compare(el.name, name))[0]

			if (!fund) {
				fund = this.$root.Sponsors.filter(el => compare(el.name, name))[0]
				if (fund)
					this.$root.navToPage(name)

				else
					this.$buefy.dialog.alert(this.$root.content.ErrorMessages[7], 'oops')
			}
			else 
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