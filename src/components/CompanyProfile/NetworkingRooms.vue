<template>   
	<div v-if="ready" id="networking-rooms">
		<navbar></navbar>

		<div class="container is-fluid">
			<section class="section section-networking-rooms">
				<div class="columns">
					<div class="column">
						<Pagetitle data="Networking Rooms"/>
						<p>{{content.intro}}</p>
						
						<button class="new-room is-rounded button is-primary is-medium">{{content.newRoom}}</button>
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
								{{content.attendeesList}}
								<button class="button is-light is-pulled-right" @click="helpModal = true">
									<span class="is-hidden-touch">{{content.needTips}}</span>
									<span class="is-hidden-desktop">{{content.needTipsShort}}</span>
								</button>
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
				content: this.$root.content.NetworkingRooms,
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