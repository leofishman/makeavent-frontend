<template>
    <div class="card webinar-modal">
        <img class="click webinar-close-icon" src="@/assets/icon/icon-close-black.svg" v-on:click="$parent.close()" />
        <SpeakingTitle
        :webinarName="data.name"
        :speaker="speaker"
        :speakingData="speakingData"
        />
        <div class="columns is-gapless">
            <div class="column is-four-fifths">
                <div id="jitsi-modal-target" class="card-image">
                </div>
            </div>
            <div class="column is-one-fifth webinar-sponsors">
                <figure class="image logo">
                    <img src="@/assets/logo_dark.svg">
                </figure>
                <div class="tile is-vertical">
                    <div class="tile is-parent ls-main">
                        <!-- Main -->
                        <div class="tile is-child">
                            <img style="object-fit:contain;" :src="host + getSponsor('kaspersky').logo">
                        </div>
                    </div>
                    <div class="tile ls-platinum">
                        <!-- Platinum A -->
                        <div class="tile is-parent">
                            <div class="tile is-child">
                                <img style="object-fit:contain;" :src="host + getSponsor('rsk').logo">
                            </div>
                        </div>
                    </div>
                    <div class="tile ls-gold">
                        <div class="click tile is-parent">
                            <div class="tile is-child">
                                <img style="object-fit:contain;" :src="host + getSponsor('crypttp').logo">
                            </div>
                        </div>
                        <!-- Gold A -->
                        <div class="tile is-parent">
                            <div class="tile is-child">
                                <img style="object-fit:contain;" :src="host + getSponsor('fas').logo">
                            </div>
                        </div>
                        <!-- Gold B -->
                        <div class="tile is-parent">
                            <div class="tile is-child">
                                <img style="object-fit:contain;" :src="host + getSponsor('sto managers').logo">
                            </div>
                        </div>
                    </div>
                    <div class="tile ls-silver">
                        <!-- Silver -->
                        <div class="click tile is-parent">
                            <div class="tile is-child">
                                <img style="object-fit:contain;" :src="host + getSponsor('sto managers').logo">
                                <!--<img style="object-fit:contain;" :src="host + getSponsor('dash').logo">-->
                            </div>
                        </div>
                        <!-- Gold C -->
                        <div class="tile is-parent">
                            <div class="tile is-child">
                                <img style="object-fit:contain;" :src="host + getSponsor('sto managers').logo">
                                <!--<img style="object-fit:contain;" :src="host + getSponsor('decred').logo">-->
                            </div>
                        </div>
                        <!-- Gold D -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {host} from '@/env'
    import Axios from 'axios'
    import jitsi from '@/api/jitsi'
    import SpeakingTitle from '@/components/Modals/SpeakingTitle'

    export default {
        name: "Jitsimodal",
        components: {
            SpeakingTitle
        },
        props: {
            data: Object
        },
        data () {
            this.sponsors = []

            Axios.get(host + `/resources?names=sponsors`)
            .then(res => {
                const decrypted = this.$root.decrypt(res.data.encryptedData)
                this.ready = true
                this.sponsors = decrypted.sponsors
            })

            return {
                ready: false,
                host: host,
                speakingData: this.speakingData,
                speaker: this.speaker
            }
        },
        methods: {
            getSponsor (name) {
                let res = this.sponsors.filter(el => compare(el.name, name))
                if (!res.length)
                    res = [{}]
                return res[0]
            }
        },
        mounted () {

            let timer = setInterval(() => {
                if (document.querySelector("#jitsi-modal-target")) {
                    clearInterval(timer)

                    this.$root.check('Speakers Speakingagenda').then(() => {
                        this.speakers = this.$root.Speakingagenda.filter(el => compare(el.stage, this.data.name))
                        if (this.speakers.length) {
                            this.speaker = this.speakers[0].contact

                            this.speakingData = this.speakers[0]
                            new jitsi({
                                vueapp: this,
                                data: {
                                    speakerId: this.speaker._id,
                                    host: this.data.host,
                                    name: this.data.name,
                                    webinarId: this.data.webinarId,
                                    token: this.$root.token,
                                    parentNode: document.querySelector("#jitsi-modal-target")
                                }
                            })
                        }
                    })
                }
            })
        }
    }
</script>
<style lang="scss">
.webinar-close-icon {
    position: absolute;
    right: 20px;
    width: 20px;
    top: 20px;
}
</style>