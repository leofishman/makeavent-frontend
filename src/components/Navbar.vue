<template>
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
					<a class="navbar-item" v-on:click="openPage('meetup')">{{$root.content.eMeetup}}</a>
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

							<div class="navbar-item has-dropdown is-hoverable">
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>
<script>
export default {
    name: "navbar",
    props: {
        nav: {
            default: true,
            type: Boolean
        }
    },
    methods: {
        setLanguage (choice) {
            localStorage.selectedLanguage = choice
            window.location.reload()
        },

        openPage (name) {
            this.$router.push(`/${this.$root.$router.currentRoute.params.id}/${name}`).catch(() => {
                window.location.reload()
            })
        }
    },
    data() {
        
        return {
            chatIsOpened: false
        }
    },
}
</script>