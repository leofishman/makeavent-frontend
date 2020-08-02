<template>   
	<div id="networking-rooms">
		<navbar></navbar>

		<div class="container is-fluid">
			<section class="section section-networking-rooms">
				<div class="columns">
					<div class="column">
						<Pagetitle data="Networking Rooms"/>
						<p v-html="content.intro"></p>
						
						<button @click="createNewRoom" class="new-room is-rounded button is-primary is-medium">{{content.newRoom}}</button>
						<div class="room-previews columns is-mobile is-multiline is-centered">
							<NetworkingPreview
								v-for="(el, index) in $root.activeRooms"
								:key="index"
								:room="el"
								:roomId="index+1"
							/>
						</div>
					</div>
					<div id="networking-attendees" class="column is-half-tablet is-one-third-fullhd">
						<aside class="box">
							<div class="has-text-centered">
								<h3>
									<img src="@/assets/icon/icon-idea.svg" width="25">
									<p v-html="content.tips"></p>
								</h3>
								<p v-html="content.tip1"></p>
								<p v-html="content.tip2"></p>
							</div>
							<h3 class="box-title">
								{{content.attendeesList}}
							</h3>

							<input v-model="searchQuery" type="search" name="search-attendees" :placeholder="content.searchAttendee" class="input search-attendees">

							<div class="attendees-list">
								<NetworkingAttendee
									v-for="(el, index) in meetupAttendeesToShow"
									:key="index"
									:user="el"
									:activeRooms="$root.activeRooms"
								/>
							</div>
						</aside>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Axios from 'axios'
	import { api, communitySrv } from '@/env'
	import { MEETUP } from '@/api/endpoints'
	import Pagetitle from '@/components/Pagetitle'
	import NetworkingAttendee from '@/components/Networking/NetworkingAttendee'
	import NetworkingPreview from '@/components/Networking/NetworkingPreview'

	export default {
		name: "NetworkingRooms",
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components: {
			Pagetitle,
			NetworkingAttendee,
			NetworkingPreview
		},
		data () {
			this.ready = true

			this.getAttendees()
			this.getRooms()

			setInterval(() => {
				this.getAttendees()
				this.getRooms()
			}, 5000)

			return {
				self: this,
				ready: false,
				api: api,

				content: this.$root.content.NetworkingRooms,
				searchQuery: "",
				commonContent: this.$root.content.common,
				meetupAttendees: [],
				meetupAttendeesToShow: [],

				showRoom: false,
				room: {}
			}
		},
		methods: {
			getAttendees () {
				Axios.create({
					baseURL: MEETUP.getMeetupAttendees + '?id=' + this.id,
					headers: {
						authorization: localStorage.auth
					}
				})()
				.then(res => {
					this.meetupAttendees       = res.data
					this.meetupAttendeesToShow = res.data
				})
			},

			getRooms () {
				Axios.create({
					baseURL: MEETUP.getMeetupRooms + '?id=' + this.id,
					headers: {
						authorization: localStorage.auth
					}
				})()
				.then(res => {
					this.$root.activeRooms = res.data
				})
			},

			createNewRoom () {
				Axios.post(MEETUP.addMeetupRoom, {		
					id: this.id
				},
				{
					headers: {
						authorization: localStorage.auth
					}
				}).then(res => {
					this.$root.activeRooms = res.data.rooms
					this.$root.roomForDragableConference = res.data.created
					this.$root.showDragableConference = true	
				})
			}
		},
		watch: {
			searchQuery: function () {
				if (this.searchQuery)
					this.meetupAttendeesToShow = this.meetupAttendees.filter(el => {
						let up = toUp(el.name)
						let up2 = toUp(el.company)
						
						return up.includes(toUp(this.searchQuery)) ? el : up2.includes(toUp(this.searchQuery)) ? el : undefined;
					})
				else
					this.meetupAttendeesToShow = this.meetupAttendees
			}
		},
	}
</script>
<style lang="scss">
	@import "./index.scss";
</style>