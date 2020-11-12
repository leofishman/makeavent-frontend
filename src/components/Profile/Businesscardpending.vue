<template>
	<div class="businesscardpending">
		<!-- <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading> -->
		<p>
			<strong>{{data.name}}</strong>
			<span class="has-text-grey">{{data.role}} {{common.at}} {{data.company}}</span>
		</p>
		<ul>
			<li v-on:click="showLoaderAndSendPost()"><img src="@/assets/icon/icon-check.svg"></li>
			<li v-on:click="showLoaderAndDeny()"><img src="@/assets/icon/icon-close.svg"></li>
			<!-- <li><img src="@/assets/icon/right-arrow.svg"></li> -->
		</ul>
	</div>
</template>

<script>

	export default {
		name: "Businesscardpending",

		props: {
			data: Object
		},
		data () {
			window.EventBus.$on('close-overlay-by-id', (id) => {
				console.log(this.data._id, id);
				if (compare(this.data._id, id))
					this.isLoading = false
			})

			return {
				isLoading: false,
				loadingComponents: [],
				common: this.$root.content.common
			}
		},
		methods: {
			showLoaderAndSendPost () {
				this.isLoading = true
				this.$root.acceptBusinessCard(this.data)
			},

			showLoaderAndDeny () {
				this.isLoading = true
				this.$root.denyBusinessCardRequest(this.data)
			}
		},
	}
</script>

<style scoped>

</style>