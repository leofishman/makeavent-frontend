<template>
	<div class="card bcardpreview">
		<div class="card-content">
			<Member :data="data"/>
			<b-button type="is-primary" @click="$parent.close()">{{$root.content.common.ok}}</b-button>
		</div>
	</div>
</template>

<script>
	import Member from '@/components/CompanyProfile/Member.vue';
	export default {
		name: "Bcardpreview",
		components: {
			Member
		},
		props: {
			data: Object
		}
	}
</script>

<style scoped>

</style>