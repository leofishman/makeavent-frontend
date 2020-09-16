<template>

	<div class="column agenda-person">
		<!-- Hide on hover-->
		<figure class="data">
			<img :src="api + data.photo">
			<figcaption>{{data.name}} <br> {{data.company}} {{data.role}}</figcaption>
		</figure>
		<!-- Show on hover-->
		<figure v-on:click="openBooth(data.company)" class="logo-hover">
			<img v-if="companyLogo" :src="api + companyLogo">
			<div v-else>{{data.company}}</div>
		</figure>
	</div>
</template>

<script>
export default {
	name: "Agendaperson",
	props: {
		data: Object
	},
	data () {
		this.companyLogo = ""

		this.companyImage()

		this.type = ""
        this.haveBooth = ""
        
        this.$root.defineBoothType(toUp(this.data.company))
        .then(type => {
            if (type) {
                this.haveBooth = true
                this.type = type
            }
        })

		return {
			companyLogo: this.companyLogo
		}
	},
	methods: {
		companyImage () {
			this.$root.tryGetCompanyLogo(this.data.company).then(res => {
				this.companyLogo = res
			})
		},
		openBooth () {
			this.$root.openPage(this.type, toUp(this.data.company))
		}
	},
}
</script>

<style scoped>

</style>