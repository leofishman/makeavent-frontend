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
                        <img class="big-social-icons" src="../assets/img/socials/linkedin.svg">
                    </b-link>

                    <b-link target="_blank" class="col" href="https://twitter.com/BlockconfD">
                        <img class="big-social-icons" src="../assets/img/socials/twitter.svg">
                    </b-link>

                    <b-link target="_blank" class="col" href="https://t.me/blockconf">
                        <img class="big-social-icons" src="../assets/img/socials/telegram.svg">
                    </b-link>

                    <b-link target="_blank" class="col" href="https://t.me/joinchat/KEgr4EZFEGXXusLTSyM96g">
                        <img class="big-social-icons" src="../assets/img/socials/telegram.svg">
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
<style lang="css">
    .centerBigTitle {
        text-align: center;
        font-size: 50px;
        color: #dadada;
        display: block;
        width: 50%;
        margin: auto;
        top: 50%;
        position: absolute;
        left: 0%;
        transform: translate(50%, -50%);
    }
    .social-media-title {
        font-size: 25px;
        color: white;
    }
    .big-social-icons {
        display: block;
        max-width: 100px;
        position: relative;
        margin: auto;
        width: 100%;
    }
    .social-icon-label {
        color: white;
        font-size: 25px;
    }
</style>