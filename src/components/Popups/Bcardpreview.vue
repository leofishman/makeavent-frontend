<template>
	<div class="card bcardpreview">
		<div class="card-content">
			<Member />
			<b-button type="is-primary" @click="$parent.close()">Ok</b-button>
		</div>
	</div>
</template>

<script>
	import Member from '@/components/Profilecompany/Member.vue';
	export default {
		name: "Bcardpreview",
		components: {
			Member
		},
		props: {
			data: String
		}
	}
</script>

<style scoped>

</style>