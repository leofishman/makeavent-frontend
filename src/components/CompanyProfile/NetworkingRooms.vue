<template>   
	<div v-if="ready" id="networking-rooms">
		<navbar></navbar>

		<div class="container is-fluid">
			<section class="section section-networking-rooms">
				<div class="columns">
					<div class="column">
						<Pagetitle data="Networking Rooms"/>
						<p>You can create a new chat by clicking on a “Start Chat” button next to the person you want to talk to in the Attendees Section ( at the right side of the screen) or get in the mix by joining existing networking room.</p>
						
						<div class="room-previews columns is-mobile is-multiline is-centered">
							<NetworkingPreview />
							<NetworkingPreview />
							<NetworkingPreview />
							<NetworkingPreview />
							<NetworkingPreview />
						</div>
					</div>
					<div id="networking-attendees" class="column is-half-tablet is-one-third-fullhd">
						<aside class="box">
							<h3 class="box-title">
								Attendees List
								<button class="button is-light is-pulled-right" @click="helpModal = true"><span class="is-hidden-touch">Need some</span> Tips?</button>
							</h3>
							<b-modal :active.sync="helpModal" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog" aria-modal>
								<HelpModal />
							</b-modal>

							<input type="search" name="search-attendees" placeholder="Search attendee" class="input search-attendees">

							<div class="attendees-list">
								<NetworkingAttendee />
								<NetworkingAttendee />
								<NetworkingAttendee />
								<NetworkingAttendee />
								<NetworkingAttendee />
								<NetworkingAttendee />
								<NetworkingAttendee />
								<NetworkingAttendee />
							</div>
						</aside>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {host} from '@/env'
	import Pagetitle from '@/components/Pagetitle.vue'
	import NetworkingAttendee from '@/components/CompanyProfile/NetworkingAttendee.vue'
	import NetworkingPreview from '@/components/CompanyProfile/NetworkingPreview.vue'
	import HelpModal from '@/components/CompanyProfile/HelpModal.vue'

	export default {
		name: "NetworkingRooms",
		props: {
			name: {
				type: String,
				default: ""
			}
		},
		components: {
			Pagetitle,
			NetworkingAttendee,
			NetworkingPreview,
			HelpModal
		},
		data () {
			/* wait until token and sponsors ready*/
			this.$root.check('token Sponsors').then(() => {
				const name = this.name.toUpperCase()
				this.ready = true
			}).catch(e => console.log(`${e} inaccessible`))

			return {

				self: this,
				content: this.$root.content.Company,
				commonContent: this.$root.content.common,

				helpModal: false,

				ready: false,

				host: host,
			}
		},
		methods: {
		},
	}
</script>