<template>
	<div class="tile is-ancestor">
		<!-- Inoformation Desk -->
		<div v-on:click="$root.navToPage('info')" class="tile is-parent">
			<div class="tile is-child box shadow-1 stage click">
				<div class="has-text-centered">
					<figure class="image is-100x100">
            			<img src="@/assets/info-desk.png" alt="">
					</figure>
					<h3>
						{{content.infDesk}}
					</h3>
				</div>
			</div>
		</div>
		<!-- Stage A -->
		<div v-on:click="$root.joinStage('stage1')" class="tile is-parent">
			<div class="tile is-child box shadow-1 stage click">
				<div class="has-text-centered">
					<h1>
						{{content.stage1}}
					</h1>
					<h3>
						{{content.sponsored}}
					</h3>
					<img width="70%" v-if="$root.getSponsorSlot('2').logo" :src="host + $root.getSponsorSlot('2').logo" alt="">
				</div>
			</div>
		</div>

		<!-- Main logo -->
		<div class="tile is-parent logo help-420">
			<div class="tile is-child">
				<figure class="image logo">
					<img src="@/assets/logo_dark.svg">
				</figure>
			</div>
		</div>

		<!-- Stage B -->
		<div v-on:click="$root.joinStage('stage2')" class="tile is-parent">
			<div class="tile is-child box shadow-1 stage click">
				<div class="has-text-centered">
					<h1>
						{{content.stage2}}
					</h1>
					<h3>
						{{content.sponsored}}
					</h3>
					<img width="70%" v-if="$root.getSponsorSlot('3').logo" :src="host + $root.getSponsorSlot('2').logo" alt="">
				</div>
			</div>
		</div>
		<!-- Vip e-Meeting Room -->
		<div v-on:click="$root.navToPage('vip')" class="tile is-parent">
			<div class="tile is-child box shadow-1 stage click">
				<div class="has-text-centered">
					<figure class="image is-100x100">
						<!-- <img src="@/assets/viproom-icon.svg"> -->
						<img v-if="$root.getSponsorSlot('4').logo" :src="host + $root.getSponsorSlot('4').logo" alt="">
            			<img v-else src="@/assets/viproom-icon.png" alt="">
					</figure>
					<h3>
						{{content.vipMeetingRoom}}
					</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {host} from '@/env'

export default {
	name: "Toprow",
	props: {
		data: String
	},
	data () {
		return {
			content: this.$root.content.toprow,
			host: host
		}
	},
	methods: {
		
	},
}
</script>

<style <style lang="scss">
</style>