<template>
    <div>
        <navbar></navbar>

        <b-container>
            <b-row style="margin-top:100px;">
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('name')">
                        Media Partner
                    </div>
                </b-col>
                <b-col></b-col>
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('name')">
                        Media Partner
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('name')">
                        Media Partner
                    </div>
                </b-col>
                <b-col>
                    <div class="watch-interview">
                        <div>
                            {{watchMessage[0]}}
                            <br>
                            {{watchMessage[1]}}
                            <br>
                            {{watchMessage[2]}}
                        </div>
                    </div>
                </b-col>
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('name')">
                        Media Partner
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('name')">
                        Media Partner
                    </div>
                </b-col>
                <b-col></b-col>
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('name')">
                        Media Partner
                    </div>
                </b-col>
            </b-row>

            <b-row>
                <b-col></b-col>
                <b-col>
                    <div class="hall-block green" v-on:click="showInterviewAgenda()">
                        {{$root.content.upcommingInterviews}}
                    </div>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
    data () {
        return {
            watchMessage: this.$root.content.watchLiveInterview.split("<br>")
        }
    },
    methods: {
        openMediaPartnerBooth (name) {
            this.$router.push({
                path: `/${this.$root.token}/mediahall/${name}`,
            })
        },

        showInterviewAgenda () {
            window.EventBus.$emit('open-interview-agenda')
        }
    },
}
</script>
<style lang="css">
    .green {
        background: #70ffa4
    }
    .watch-interview {
        text-align: center;
        display: block;
        width: 200px;
        height: 200px;
        background: red;
        font-size: 20px;
        color: white;
        border: 0;
        border-radius: 100%;
        outline: none;
        -webkit-animation-name: pulse;
        animation-name: pulse;
        -webkit-animation-duration: 1.5s;
        animation-duration: 1.5s;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        margin: auto;
        line-height: 30px;
        position: relative;
    }
    .watch-interview div {
        display: block;
        top: 50%;
        transform: translate(0, -50%);
        position: relative;
    }
    .watch-interview:hover {
        cursor: pointer;
        background: #ff0000cf;
    }
    @keyframes pulse{
        0%{
            box-shadow: 0px 0px 5px 0px rgba(173,0,0,.3);
        }
        65%{
            box-shadow: 0px 0px 5px 13px rgba(173,0,0,.3);
        }
        90%{
            box-shadow: 0px 0px 5px 13px rgba(173,0,0,0);
        }
    }
    @keyframes scale {
        0%{
            width: 210px;
            height: 210px;
        }
        65%{
            width: 220px;
            height: 220px;
        }
        90%{
            width: 230px;
            height: 230px;
        }
    }
</style>