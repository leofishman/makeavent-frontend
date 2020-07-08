<template>
	<div>
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="container is-fluid">
				<div class="navbar-brand">
					<a class="navbar-item" v-on:click="openPage('/')">
						<img v-if="$root.project.logo" :src="$root.api + $root.project.logo" height="28">
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
						<!-- <a class="navbar-item" v-on:click="openPage('/')">{{$root.content.home}}</a>
						<a class="navbar-item" v-on:click="openPage('/agenda')">{{$root.content.agenda}}</a> -->
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>
<script>
import calendly from '@/components/Popups/setCalendly'
import {api} from '@/env'

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
			localStorage.auth = ""
			this.$router.push('/login')
		}
    },
    data() {
        return {
			api: api,
            chatIsOpened: false
        }
    },
}
</script>