<template>
	<div>
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="container is-fluid">
				<div class="navbar-brand">
					<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div id="navbar" class="navbar-menu">
					<div class="navbar-start">
						<div v-if="$root.actionsLord.SHOW_MEETUP_SETTINGS_BUTTON()" class="navbar-item settings-button">
							<div class="buttons" v-show="1===2">
								<a @click="toggleOpenMeetupSettings" :class="$root.openMeetupSettings ? 'setting-adminbar is-active' : 'setting-adminbar'">

									<!--<svg width="16" height="25" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M14 2L3 12.5L14 23" stroke="black" stroke-opacity="0.34" stroke-width="3"/>
									</svg-->

									<img src="@/assets/img/Navbar/settings.svg" alt="">

									<!-- {{content.settings}}
									<span class="tag is-info" v-if="$root.pendingCards.length" variant="light">{{$root.pendingCards.length}}</span> -->
								</a>
							</div>
						</div>
						
						<a class="navbar-item" v-on:click="openPage('/')">
							<img v-if="$root.project.logo" :src="api + $root.project.logo" height="28">
						</a>

						<!-- <a class="navbar-item" v-on:click="$root.joinStage('networkingbooth')">{{content.networkingBooth}}</a> -->
						<!-- <a class="navbar-item" v-on:click="openPage('/')">{{content.home}}</a>
						<a class="navbar-item" v-on:click="openPage('/agenda')">{{content.agenda}}</a> -->
					</div>

					<div class="navbar-end">
						<div class="navbar-item">
							<div class="buttons">
								<a v-on:click="openPage('profile')" class="button">
									<img src="@/assets/img/Navbar/profile.svg" alt="">
									{{content.profile}}
									<span class="tag is-info" v-if="$root.pendingCards.length" variant="light">{{$root.pendingCards.length}}</span>
								</a>
								<!-- <a v-on:click="$root.switchOpen()" class="button">
									<img src="@/assets/img/Navbar/chat.svg" alt="">
									{{content.openChat}}
								</a> -->
								<a v-on:click="logout()" class="button">{{content.logout}}</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<!-- <div v-if="true" id="under-nav-hint">
			Thank you for joining blockconf.digital as VIP. If you would like to schedule private meetings,
			<b-button v-on:click="setCalendly()" type="is-primary is-inverted">please set your calendly</b-button>
		</div> -->

		<div v-if="$root.actionsLord.SHOW_BACK_TO_MEETUP_HALL()" :class="getSubNavbarClass()">
			<div class="columns">
				<div class="column">
					<b-button
						v-on:click="$root.actionsLord.DO_BACK_MEETUP_ADDNEDER()"
						type="is-primary"
						outlined
					>{{content.backTo(content_rooms.MeetupHall)}}</b-button>
				</div>
				<div class="column"></div>
			</div>
		</div>
	</div>
</template>
<script>

import calendly from '@/components/Popups/setCalendly'

export default {
    name: "navbar",
    props: {
        nav: {
            default: true,
            type: Boolean
        }
    },
    methods: {
		setCalendly () {
			this.$buefy.modal.open({
				parent: this,
				component: calendly,
                props: {},
                hasModalCard: true,
                customClass: 'bcardpreview',
                trapFocus: true
			})
		},

		showCalendly () {
			if (this.$root.cloo(this.$root.usertype, 'vip|investor|startup|media')) {
				if (this.$root.profile.calendly) {
					return false
				}
				else
					return true
			}
			else
				return false
		},

        setLanguage (choice) {
            localStorage.selectedLanguage = choice
            window.location.reload()
        },

        openPage (name) {
            this.$router.push(name).catch(() => {
                window.location.reload()
            })
		},
		
		logout () {
			localStorage.setItem("auth", "")
			this.$root.openGlobalChat = false
			this.$router.go()
		},

		async toggleOpenMeetupSettings () {
			this.sideBarActive = !this.sideBarActive
			if (this.$root.openMeetupSettings){
				this.$root.openMeetupSettings = false
			}
			else
				this.$root.openMeetupSettings = true
		},

		getSubNavbarClass () {
			if ( this.$root.openMeetupSettings && this.$root.cloo(this.$router.currentRoute.name, 'Meetup|NetworkingRoom') )
				return 'absolute-sub-nav--squeezed-for-left-meetup-admin-sidebar'
			else
				return 'absolute-sub-nav'
		},
    },
    data() {
        return {
			content: this.$root.content.Navbar,
			content_rooms: this.$root.content.Rooms,

			chatIsOpened: false,
			sideBarActive: true
        }
    },
}
</script>
<style lang="scss">
@import "./index.scss"; 
</style>
