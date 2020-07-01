<template>
	<h1 class="title-page title" v-html="data"></h1>
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