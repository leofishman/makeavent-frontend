<template>
    <b-navbar sticky toggleable="lg" type="dark" style="background:black">
        <b-navbar-brand v-on:click="openPage('home')">
            <img src="../assets/logo.svg" alt="">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse v-if="nav" id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-on:click="openPage('home')">{{$root.content.home}}</b-nav-item>
                <b-nav-item v-on:click="openPage('agenda')">{{$root.content.agenda}}</b-nav-item>
                <b-nav-item v-on:click="openPage('mediahall')">{{$root.content.mediahall}}</b-nav-item>
                <b-nav-item v-on:click="openPage('vip')">{{$root.content.vipMeetingRoom}}</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item style="color:white" v-on:click="openPage('profile')">
                    {{$root.content.profile}}
                    <b-badge v-if="$root.pendingCards.length" variant="light">{{$root.pendingCards.length}}</b-badge>
                </b-nav-item>
                
                <b-navbar-nav v-b-toggle.sidebar-chat>
                    <b-nav-item>
                        {{$root.content.openChat}}
                    </b-nav-item>
                </b-navbar-nav>

                <b-nav-item-dropdown text="Language" right>
                    <b-dropdown-item v-on:click="setLanguage('EN')">EN</b-dropdown-item>
                    <!-- <b-dropdown-item v-on:click="setLanguage('ES')">ES</b-dropdown-item> -->
                    <b-dropdown-item v-on:click="setLanguage('ZH')">ZH</b-dropdown-item>
                    <!-- <b-dropdown-item v-on:click="setLanguage('KO')">KO</b-dropdown-item> -->
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
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
<style lang="css">
    .navbar-dark .navbar-nav .nav-link {
        font-size: 20px;
        color: rgb(217, 151, 0);
    }
    .navbar-dark .navbar-nav .nav-link:hover {
        font-size: 20px;
        color: #ffc43d;
    }
    .navbar-dark .navbar-nav .nav-link:focus {
        font-size: 20px;
        color: rgb(217, 151, 0);
    }
    .navbar-dark .navbar-nav .show > .nav-link, .navbar-dark .navbar-nav .active > .nav-link, .navbar-dark .navbar-nav .nav-link.show, .navbar-dark .navbar-nav .nav-link.active {
        font-size: 20px;
        color: rgb(217, 151, 0);
    }
</style>