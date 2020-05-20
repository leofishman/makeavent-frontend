<template>
	<div class="businesscardconected">
		<h3 class="click" v-on:click="$root.tryBusinessCard(data)">{{data.name}}</h3>
		<h3 class="click has-text-grey" v-on:click="openCompany()">{{data.role}} {{content.at}} {{data.company}}</h3>
		<ul>
			<li><img src="@/assets/icon/icon-call.svg"></li>
			<li><img src="@/assets/icon/icon-mail.svg"></li>
			<!-- <li><img src="@/assets/icon/right-arrow.svg"></li> -->
		</ul>
	</div>
</template>

<script>

export default {
	name: "Businesscardconected",
	props: {
		data: Object
	},
	data() {
        return {
			content: this.$root.content.common,
        }
    },
    methods: {
		openCompany () {
			this.$root.defineBoothType(this.data.company)
			.then(type => { this.$root.openPage(type, this.data.company) })
		}
	},
}
</script>

<style scoped>

</style>