<template>

	<div class="column agenda-person">
		<!-- Hide on hover-->
		<figure class="data">
			<img :src="host + data.photo">
			<figcaption>{{data.name}} <br> {{data.company}} {{data.role}}</figcaption>
		</figure>
		<!-- Show on hover-->
		<figure v-on:click="$root.navToPage(data.company)" class="logo-hover">
			<img v-if="companyLogo" :src="host + companyLogo">
			<div v-else>{{data.company}}</div>
		</figure>
	</div>
</template>

<script>
import {host} from '@/env'
export default {
	name: "Agendaperson",
	props: {
		data: Object
	},
	data () {
		this.companyLogo = ""

		this.companyImage()

		return {
			host: host,
			companyLogo: this.companyLogo
		}
	},
	methods: {
		companyImage () {
			this.$root.tryGetCompanyLogo(this.data.company).then(res => {
				this.companyLogo = res
			})
		}
	},
}
</script>

<style scoped>

</style>