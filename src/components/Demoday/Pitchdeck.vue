<template>
	<article @click="$root.openExternalInBlank(data.url)" class="pitchdeck-download box">
		<img src="@/assets/icon/icon-pitchdeck-download.png" alt="Download">
		<div>
			<p>{{data.name}}</p>
		</div>
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