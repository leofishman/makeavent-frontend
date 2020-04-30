<template>
    <div>
        <navbar :nav="false"></navbar>
        <div class="centerBigTitle">
            {{$root.content.willBeAtMay}}
            <div style="margin-top: 50px;">
                <div class="social-media-title">
                    {{$root.content.followUsOnSocial}}
                </div>
                <b-row style="margin-top: 20px;">
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
                </b-row>
            </div>
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