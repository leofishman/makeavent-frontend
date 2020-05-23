<template>
	<div>
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="container">
				<div class="navbar-brand">
					<a class="navbar-item" v-on:click="openPage('home')">
						<img src="@/assets/logo_dark.svg" width="112" height="28">
					</a>

					<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div id="navbarBasicExample" class="navbar-menu">
					<div class="navbar-start">
						<!-- <a class="navbar-item" v-on:click="$root.joinStage('networkingbooth')">{{$root.content.networkingBooth}}</a> -->
						<a class="navbar-item" v-on:click="openPage('home')">{{$root.content.home}}</a>
						<a class="navbar-item" v-on:click="openPage('agenda')">{{$root.content.agenda}}</a>
						<a class="navbar-item" v-on:click="openPage('mediahall')">{{$root.content.mediahall}}</a>
						<a class="navbar-item" v-on:click="openPage('vip')">{{$root.content.toprow.vipMeetingRoom}}</a>
					</div>

					<div class="navbar-end">
						<div class="navbar-item">
							<div class="buttons">
								<a v-on:click="openPage('profile')" class="button is-outlined is-primary">
									{{$root.content.profile}}
									<span class="tag is-info" v-if="$root.pendingCards.length" variant="light">{{$root.pendingCards.length}}</span>
								</a>
								<a v-on:click="$root.switchOpen()" class="button is-outlined is-primary">
									{{$root.content.openChat}}
								</a>
								<a v-on:click="logout()" class="button is-outlined is-primary">{{$root.content.logout}}</a>

								<!-- <div class="navbar-item has-dropdown is-hoverable">
									<a class="navbar-link button is-primary">
										Language
									</a>

									<div class="navbar-dropdown">
										<a v-on:click="setLanguage('EN')" class="navbar-item">
											EN
										</a>
										<a v-on:click="setLanguage('ES')" class="navbar-item">
											ES
										</a>
										<a v-on:click="setLanguage('ZH')" class="navbar-item">
											ZH
										</a>
										<a v-on:click="setLanguage('KO')" class="navbar-item">
											KO
										</a>
									</div>
								</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<div v-if="showCalendly()" id="under-nav-hint">
			<img src="" alt="">
			Thank you for joining blockconf.digital as VIP. If you would like to schedule private meetings,
			<b-button v-on:click="setCalendly()" type="is-primary">please set your calendly</b-button>
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
            this.$router.push(`/${this.$root.$router.currentRoute.params.id}/${name}`).catch(() => {
                window.location.reload()
            })
		},
		
		logout () {
			localStorage.auth = ""
			this.$router.push('/login')
		}
    },
    data() {
        
        return {
            chatIsOpened: false
        }
    },
}
</script>