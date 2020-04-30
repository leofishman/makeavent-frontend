<template>
	<article class="media feed feed-facebook"><!-- YD Use the class feed-facebook or feed-twitter here -->
		<figure class="media-left">
			<img src="">
		</figure>
		<div class="media-content">
			<div class="content">
				<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
			</div>
		</div>
	</article>
</template>

<script>
	export default {
		name: 'Feed',
		props: {
			data: String
		}
	}
</script>

<style scoped>

</style>