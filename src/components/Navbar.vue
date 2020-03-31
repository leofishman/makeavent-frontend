<template>
    <b-navbar sticky toggleable="lg" type="dark" style="background:black">
        <b-navbar-brand :href="`/${$root.$router.currentRoute.params.id}/home`">
            <img src="../assets/logo.svg" alt="">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse v-if="nav" id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :href="`/${$root.$router.currentRoute.params.id}/home`">{{$root.content.home}}</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-navbar-nav v-on:click="openChat()" v-if="!chatIsOpened">
                    <b-nav-item>
                        {{$root.content.openChat}}
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-on:click="closeChat()" v-if="chatIsOpened">
                    <b-nav-item>
                        {{$root.content.closeChat}}
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

        openChat () {
            this.chatIsOpened = true
            window.EventBus.$emit("open_global_chat")
        },

        closeChat () {
            this.chatIsOpened = false
            window.EventBus.$emit("close_global_chat")
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