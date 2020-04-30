<template>
	<section class="section title-page">
		<h1 class="title has-text-centered has-text-grey">{{data}}</h1>
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