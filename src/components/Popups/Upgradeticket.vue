<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Oops</p>
		</header>
		<section class="modal-card-body">
			<p>We are appologizing, but Coffee-break Chat is available only for Business or VIP attenders.</p>
			<div class="columns">
				<div class="column">
					<p>Would you like to upgrade your ticket?</p>
				</div>
				<div class="column">
					<b-field >
						<b-select placeholder="Choose ticket type" expanded>
							<option>Option A</option>
							<option>Option B</option>
							<option>Option C</option>
						</b-select>
					</b-field>

					<!--YD Paypal script here -->
					<div class="buttons">
						<b-button type="is-primary" expanded>Paypal</b-button>
						<b-button type="is-primary" expanded>Debit or Credit Card</b-button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: "Upgradeticket",
		props: {
			data: String
		}
	}
</script>

<style scoped>

</style>