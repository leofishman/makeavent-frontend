<template>
	<article @click="$root.openExternalInBlank(data.link)" class="pitchdeck-download box">
		<img src="@/assets/icon/icon-pitchdeck-download.png" alt="Download">
		<p>{{data.name}}</p>
	</article>
</template>
<script>
	export default {
		name: "Pitchdeck",
		props: {
			data: Object
		}
	}
</script>