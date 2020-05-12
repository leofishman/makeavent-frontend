<template>
    <div id="noaccess">
        <div class="container">
            <navbar :nav="false"></navbar>
            <section class="section has-text-centered">
                <div>
                    <a target="_blank" href="https://www.kaspersky.com/">
                        <img class="noaccess-logo" :src="host + '/static/img/sponsors/KASPERSKY/KASPERSKY.png'" alt="">
                    </a>

                    <h2 v-html="$root.content.willBeAtMay"></h2>

                    <div class="social-list">
                        <h3>{{$root.content.followUsOnSocial}}</h3>
                        <div class="columns">
                            <div class="column is-one-quarter">
                                <a href="https://www.linkedin.com/company/blockconf/about/" target="_blank">
                                    <img class="big-social-icons" src="@/assets/img/socials/linkedin.svg">
                                </a>
                            </div>
                            <div class="column is-one-quarter">
                                <a href="https://twitter.com/BlockconfD" target="_blank">
                                    <img class="big-social-icons" src="@/assets/img/socials/twitter.svg">
                                </a>
                            </div>
                            <div class="column is-one-quarter">
                                <a href="https://t.me/BlockConfDigital" target="_blank">
                                    <img class="big-social-icons" src="@/assets/img/socials/telegram.svg">
                                </a>
                            </div>
                            <div class="column is-one-quarter">
                                <a href="https://www.facebook.com/BlockConfDigital/" target="_blank">
                                    <img class="big-social-icons" src="@/assets/img/socials/facebook.svg">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import {host} from '@/env'
export default {
    name: "Noaccess",
    data() {
        return {
            host: host
        }
    },
}
</script>
<style lang="scss">
    .noaccess-logo {
        margin: 0px 0px 40px 0px;
        width: 350px;
    }
</style>