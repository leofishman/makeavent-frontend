<template>
    <b-navbar sticky toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :href="`/#/${$root.$router.currentRoute.params.id}/home`">Blockconf DIGITAL</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :href="`/#/${$root.$router.currentRoute.params.id}/home`">{{$root.content.home}}</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
                <b-nav-item :href="`/#/${$root.$router.currentRoute.params.id}/home`">{{$root.content.agenda}}</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <!-- <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form> -->

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

                <!-- <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown> -->
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
export default {
    name: "navbar",
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