<template>
	<section class="section">
		<div class="container">
			<div class="buttons">
				<button class="button is-medium is-dark" @click="success">
					Success message
				</button>

				<button class="button is-medium is-dark" @click="sorry">
					Sorry message
				</button>

				<button class="button is-medium is-dark" @click="bcardrequest">
					Requesting business card
				</button>

				<button class="button is-medium is-dark" @click="bcardincomming">
					Incomming business card
				</button>

				<button class="button is-primary is-medium" @click="showBCardpreview">
					Preview business card
				</button>

				<button class="button is-primary is-medium" @click="showUpgradeticket">
					Upgrade ticket type popup
				</button>

			</div>
		</div>
	</section>
</template>

<script>
	import Bcardpreview from '@/components/Popups/Bcardpreview.vue';
	import Upgradeticket from '@/components/Popups/Upgradeticket.vue'

	export default {
		name: 'Success',
		methods: {
			success() {
				this.$buefy.dialog.confirm({
					title: 'Success',
					message: 'Anonymous will receive notification that you requesting contact information',
					cancelText: 'Cancel',
					confirmText: 'Ok',
					type: 'is-primary',
					onConfirm: () => this.$buefy.toast.open('User agreed')
				})
			},
			sorry() {
				this.$buefy.dialog.confirm({
					title: 'Preparing webinar...',
					message: 'We updating webinar host, sorry for the inconvinience',
					cancelText: 'Cancel',
					confirmText: 'Ok',
					type: 'is-primary',
					onConfirm: () => this.$buefy.toast.open('User agreed')
				})
			},
			bcardrequest() {
				this.$buefy.dialog.confirm({
					message: 'Do you want to request business card?',
					cancelText: 'No',
					confirmText: 'Yes',
					type: 'is-primary',

					// confirm message
					onConfirm: () => this.$buefy.toast.open('User agreed')
				})
			},
			bcardincomming() {
				this.$buefy.snackbar.open({
					duration: 5000,
					message: `
					Elena Obukhova at FAS is requesting your business card.<br>
					<strong>You can accept it later in <a href="#link_to_pending_business_cards">profile.</a></strong>
					`,
					position: 'is-bottom-right',
					type: 'is-primary',
					actionText: 'Accept',
					queue: false,
					onAction: () => {
						this.$buefy.toast.open({
							message: 'Action pressed',
							queue: false
						})
					}
				})
				// this.$buefy.dialog.alert({
				// 	message: '',
				// 	confirmText: 'Ok',
				// 	type: 'is-primary',

				// 	// confirm message
				// 	onConfirm: () => this.$buefy.toast.open('User agreed')
				// })
			},
			showBCardpreview() {
				this.$buefy.modal.open({
					parent: this,
					component: Bcardpreview,
					hasModalCard: true,
					customClass: 'bcardpreview',
					trapFocus: true
				})
			},
			showUpgradeticket() {
				this.$buefy.modal.open({
					parent: this,
					component: Upgradeticket,
					hasModalCard: true,
					customClass: 'upgradeticket',
					trapFocus: true
				})
			}
		}
	}
</script>

<style scoped>

</style>