<template>
	<div class="businesscardconected">
		<h3>{{data.name}}</h3>
		<h3 class="has-text-grey-light">{{data.role}} {{content.at}} {{data.company}}</h3>
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
    methods: {},
}
</script>

<style scoped>

</style>