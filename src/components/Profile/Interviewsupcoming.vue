<template>
	<article class="box click"> <!-- [YD] For the upcoming interview, alias the grey ones, use the class .interview-next here -->
		<img src="@/assets/myinterview.jpg">
		<time class="int-time">13:35 <span>AM</span></time>
	</article>
</template>

<script>

	export default {
		name: "Interviewsupcoming",

		props: {
			data: String
		}
	}
</script>

<style scoped>

</style>