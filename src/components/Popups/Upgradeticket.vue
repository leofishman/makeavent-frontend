<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title" v-html="title"></p>
		</header>
		<section class="modal-card-body">
			<p v-html="message"></p>
			<div class="columns">
				<div class="column">
					<b-field >
						<b-select v-if="types.length > 1" v-model="selected" placeholder="Choose ticket type" expanded>
							<option v-for="(el, index) in types" :key="index" :value="el">{{el}}</option>
						</b-select>
						<div v-else>
							<b-input disabled type="text" :value="type"></b-input>
						</div>
					</b-field>
				</div>
				<div class="column">
					<div v-if="showButtons" :id="`paypal-button-container-${ppType}`" class="buttons"></div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: "Upgradeticket",
		props: {
			title: String,
			message: String,
			type: String,
            types: Array
		},
		data () {
			let self = this
			this.showButtons = false
			this.ppType = ""
			this.selected = ""

			this.showPPButtons()

			return {
				content: this.$root.content.Upgradeticket,
				selected: this.selected,
				ppType: this.ppType,

				showButtons: this.showButtons,
			}
		},
		methods: {
			showPPButtons () {
				if (this.types.length > 1 && this.selected) {
					this.showButtons = true
					this.ppType = this.selected
				}
				else if (this.types.length == 1) {
					this.showButtons = true
					this.ppType = this.type
					setTimeout(() => {
						this.$root.renderPaypalButton(this.ppType, `paypal-button-container-${this.ppType}`)
					}, 500)
				}
				else 
					this.showButtons = false
			}
		},
		watch: {
			ppType: function () {
				setTimeout(() => {
					this.$root.renderPaypalButton(this.ppType, `paypal-button-container-${this.ppType}`)
				}, 500)
			},
			selected: function () {
				if (document.querySelector('div[id^="zoid-paypal-buttons"]'))
					document.querySelector('div[id^="zoid-paypal-buttons"]').remove()

				this.$root[`business_paypalButtonRendered`] = false
            	this.$root[`vip_paypalButtonRendered`] = false

				this.showPPButtons()
			}
		}
	}
</script>

<style scoped>

</style>