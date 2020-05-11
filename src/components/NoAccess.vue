<template>
    <div id="noaccess">
        <div class="container">
            <navbar :nav="false"></navbar>
            <section class="section has-text-centered">
                <div>
                <h2>{{$root.content.willBeAtMay}}</h2>
                <div class="social-list">
                    <h3>{{$root.content.followUsOnSocial}}</h3>
                    <div class="columns">
                        <div class="column">
                            <a href="https://www.linkedin.com/company/blockconf/about/" target="_blank">
                                <img class="big-social-icons" src="@/assets/img/socials/linkedin.svg">
                            </a>
                        </div>
                        <div class="column">
                            <a href="https://twitter.com/BlockconfD" target="_blank">
                                <img class="big-social-icons" src="@/assets/img/socials/twitter.svg">
                            </a>
                        </div>
                        <div class="column">
                            <a href="https://t.me/blockconf" target="_blank">
                                <img class="big-social-icons" src="@/assets/img/socials/telegram.svg">
                            </a>
                        </div>
                        <div class="column">
                            <a href="https://t.me/joinchat/KEgr4EZFEGXXusLTSyM96g" target="_blank">
                                <img class="big-social-icons" src="@/assets/img/socials/telegram.svg">
                                <p>{{$root.content.chat}}</p>
                            </a>
                        </div>
                    </div>
                    </div>
                    <!--<b-row>
                        <b-link target="_blank" class="col" href="https://www.linkedin.com/company/blockconf/about/">
                            <img class="big-social-icons" src="@/assets/img/socials/linkedin.svg">
                        </b-link>

                        <b-link target="_blank" class="col" href="https://twitter.com/BlockconfD">
                            <img class="big-social-icons" src="@/assets/img/socials/twitter.svg">
                        </b-link>

                        <b-link target="_blank" class="col" href="https://t.me/blockconf">
                            <img class="big-social-icons" src="@/assets/img/socials/telegram.svg">
                        </b-link>

                        <b-link target="_blank" class="col" href="https://t.me/joinchat/KEgr4EZFEGXXusLTSyM96g">
                            <img class="big-social-icons" src="@/assets/img/socials/telegram.svg">
                            <div class="social-icon-label">{{$root.content.chat}}</div>
                        </b-link>
                    </b-row>-->
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Noaccess",
        data() {
            return {

            }
        },
    }
</script>