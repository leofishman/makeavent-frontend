<template>
    <b-navbar sticky toggleable="lg" type="dark" style="background:#272727">
        <b-navbar-brand>
            <img src="../../assets/logo.svg" alt="" style="opacity:0">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-on:click="openPage('profile')" class="light">{{$root.combineContent('my page')}}</b-nav-item>
                <b-nav-item v-on:click="openPage('businesscards')" class="light">
                    {{$root.combineContent('my business cards')}}
                    <b-badge v-if="$root.pendingCards.length" variant="light">{{$root.pendingCards.length}}</b-badge>
                </b-nav-item>
                <b-nav-item v-on:click="openPage('myinterviews')" v-if="media" class="light">{{$root.combineContent('my interviews')}}</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
export default {
    name: "navbar-profile",
    data() {

        return {
            vip: this.isVip(),
            media: this.isMedia(),
        }
    },
    methods: {
        async isVip () {
            await this.$root.tokenCheck()
            return this.$root.usertype == "vip"
        },

        async isMedia () {
            await this.$root.tokenCheck()
            return this.$root.usertype == "media"
        },

        openPage (name) {
            if (name != 'profile')
                this.$router.push(`/${this.$root.token}/profile/${name}`)
            else
                this.$router.push(`/${this.$root.token}/profile`)
        }
    },
}
</script>
<style lang="css">
    .light a {
        color: #cecece !important;
        font-size:16px !important;
    }
    .light a:hover {
        color: white !important;
        font-size:16px !important;
    }
</style>