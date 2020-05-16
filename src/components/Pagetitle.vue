<template>
	<section class="section title-page">
		<h1 style="text-transform: uppercase;" class="title has-text-centered" v-html="data"></h1>
	</section>
</template>

<script>
	export default {
		name: "Pagetitle",
		props: {
			data: String
		}
	}
</script>

<style scoped>

</style>