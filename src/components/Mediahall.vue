<template>
    <div>
        <navbar></navbar>

        <b-container v-if="ready">
            <b-row style="margin-top:100px;">
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('0')">
                        <img v-if="getMediaPartnerSlot('0')" class="absolute-bg-image" style="width:90%; opacity: 1" :src="host + getMediaPartnerSlot('0').logo" alt="">
                        <div v-else>Media Partner</div>
                    </div>
                </b-col>
                <b-col></b-col>
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('1')">
                        <img v-if="getMediaPartnerSlot('1')" class="absolute-bg-image" style="width:90%; opacity: 1" :src="host + getMediaPartnerSlot('1').logo" alt="">
                        <div v-else>Media Partner</div>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('2')">
                        <img v-if="getMediaPartnerSlot('2')" class="absolute-bg-image" style="width:90%; opacity: 1" :src="host + getMediaPartnerSlot('2').logo" alt="">
                        <div v-else>Media Partner</div>
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
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('3')">
                        <img v-if="getMediaPartnerSlot('3')" class="absolute-bg-image" style="width:90%; opacity: 1" :src="host + getMediaPartnerSlot('3').logo" alt="">
                        <div v-else>Media Partner</div>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('4')">
                        <img v-if="getMediaPartnerSlot('4')" class="absolute-bg-image" style="width:90%; opacity: 1" :src="host + getMediaPartnerSlot('4').logo" alt="">
                        <div v-else>Media Partner</div>
                    </div>
                </b-col>
                <b-col></b-col>
                <b-col>
                    <div class="hall-block" v-on:click="openMediaPartnerBooth('5')">
                        <img v-if="getMediaPartnerSlot('5')" class="absolute-bg-image" style="width:90%; opacity: 1" :src="host + getMediaPartnerSlot('5').logo" alt="">
                        <div v-else>Media Partner</div>
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
import {host} from '../env'

export default {
    data () {
        this.ready = false

        this.$root.check('MediaPartners').then(_ => {
            this.ready = true
        })

        return {
            ready: this.ready,
            host: host,
            watchMessage: this.$root.content.watchLiveInterview.split("<br>")
        }
    },
    methods: {
        openMediaPartnerBooth (id) {
            const name = this.getMediaPartnerSlot(id).name.toLowerCase()
            this.$router.push({
                path: `/${this.$root.token}/mediahall/${name}`,
            })
        },

        showInterviewAgenda () {
            window.EventBus.$emit('open-interview-agenda')
        },

        getMediaPartnerSlot (id) {
            return this.$root.MediaPartners[id]
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