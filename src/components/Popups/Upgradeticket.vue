<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title" v-html="title"></p>
		</header>
		<section class="modal-card-body">
			<p v-html="message"></p>
			<div class="columns">
				<div class="column">
					<b-field :label="types.length > 1 ? content.chooseTicketType : content.ticketType">
						<b-select v-if="types.length > 1" v-model="selected" placeholder="Choose ticket type" expanded>
							<option v-for="(el, index) in types" :key="index" :value="el">{{el}}</option>
						</b-select>
						<div v-else>
							<b-input disabled type="text" :value="type"></b-input>
						</div>
					</b-field>
					<div class="price" v-if="price">
						${{price}}
					</div>
					<div v-if="$root.compare(selected, 'business')" class="content column nopadding">
						<ol type='1'>
							<li>All in Basic +</li>
							<li>Participation and networking at e-booths</li>
							<li>Access to e-booths chats</li>
							<li>Ability to request business cards</li>
							<li>E-Coffee break with networking</li>
							<li>E-Workshops</li>
						</ol>
					</div>
					<div v-if="$root.compare(selected, 'vip')" class="content column nopadding">
						<ol type='1'>
							<li>All in Business +</li>
							<li>Asking questions to guest speakers</li>
							<li>VIP e-meeting room</li>
							<li>Private meeting scheduling</li>
							<li>VIP events</li>
							<li>Access to offline materials</li>
						</ol>
					</div>
				</div>
				<div class="column">
					<div v-if="showButtons" :id="`paypal-button-container-${ppType}`" class="buttons"></div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import Axios from 'axios'
import {host} from '@/env'

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
		this.price = ''

		this.showPPButtons()

		return {
			content: this.$root.content.Upgradeticket,
			selected: this.selected,
			ppType: this.ppType,
			price: this.price,
			host: host,

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
		},

		GetTicketPrice () {
			return new Promise(async (resolve, reject) => {
				Axios.get(host + '/ticket/pricetable').then(res => resolve(res.data[this.selected]))
			})
		},
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

			this.GetTicketPrice().then(res => {this.price = res})
		}
	}
}
</script>

<style scoped>

</style>