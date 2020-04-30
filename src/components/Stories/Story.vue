<template>
	<div class="story">
		<div class="circle" v-on:click="open">
			<img :src="require('@/assets/' + company.logo)">
		</div>
		<article v-bind:class="{ 'is-active':show }">
			<figure>
				<img :src="require('@/assets/' + company.logo)">
			</figure>
			<p>
				<a href="#">{{company.name}} invites everyone to listen pitch</a>
				<a href="#">Take part in the lottery</a>
				<img src="@/assets/icon/icon-close.svg" v-on:click="close" />
			</p>
		</article>
	</div>
</template>

<script>
	export default {
		name: "Story",
		methods: {
			open: function() {
				this.$emit('onOpen');
			},
			close: function() {
				this.$emit('onClose');
			}
		},
		
		props: {
			company: Object,
			show: Boolean
		}
	}
</script>

<style scoped>

</style>