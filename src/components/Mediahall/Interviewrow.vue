<template>
	<div class="box interviewrow">
		<div class="columns">
			<div class="column agenda-time">
				<div class="has-text-centered">
					<h3>{{new Date(Number(data.time)).toLocaleString()}}</h3>
				</div>
			</div>
			<Agendaperson :data="data.interviewer"/>
			<Agendaperson :data="data.guest"/>
			<div v-on:click="notify()" class="column click">
				{{content.notify}}
			</div>
		</div>
	</div>
</template>

<script>
	import Agendaperson from '@/components/Mediahall/Agendaperson.vue'
	export default {
		name: "Interviewrow",
		components: {
			Agendaperson
		},
		props: {
			data: Object
		},
		data () {
			return {
				content: this.$root.content.common
			}
		}
	}
</script>

<style scoped>

</style>