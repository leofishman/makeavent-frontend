<template>
    <div class="card-content">
        <div class="columns is-gapless">
            <div class="column is-one-fifth"></div>
            <div class="column is-three-fifths">
                <div class="media speaking-media">
                    <figure class="media-left speaker-brand">
                        <img  v-if="speaker" class="click" :src="host + companyLogo" title="View Company">
                    </figure>
                    <figure class="media-left">
                        <p class="image is-96x96">
                            <img v-if="speaker" :src="host + speaker.photo">
                        </p>
                    </figure>
                    <div class="media-content" v-if="speaker && speakingData">
                        <p>
                            <strong class="click" @click="$root.tryBusinessCard(speaker)" title="View Speaker">{{speaker.name}}</strong>
                            <small v-if="speakingData">{{new Date(speakingData.time).toLocaleString()}}</small><br>
                            <i class="click" @click="navToPage()">{{speaker.role + " " + speaker.company}}</i>
                        </p>
                        <p>
                            <small>{{speakingData.theme}}</small>
                        </p>
                    </div>
                </div>
            </div>
            <div class="column is-one-fifth"></div>
        </div>
    </div>
</template>

<script>
    import {host} from '@/env'

    export default {
        name: "SpeakingTitle",
        props: {
            webinarName: String,
            speaker: Object,
            speakingData: Object
        },
        data () {
            this.type = ""
            this.haveBooth = ""
            let self = this
            this.companyLogo = ""

            let timer = setInterval(() => {
                if (self.speaker) {
                    self.$root.tryGetCompanyLogo(self.speaker.company).then(el => {
                        self.companyLogo = el
                    })
                    clearInterval(timer)
                    self.$root.defineBoothType(toUp(self.speaker.company))
                    .then(type => {
                        if (type) {
                            self.haveBooth = true
                            self.type = type
                        }
                    })
                }
            }, 100)

            return {
                companyLogo: this.companyLogo,
                host: host
            }
        },
        methods: {
            navToPage () {
                this.$root.openPage(this.type, toUp(this.speaker.company))
            }
        },
        watch: {
            speaker: function () {
                if (this.speaker) {
                    this.$root.tryGetCompanyLogo(this.speaker.company).then(el => {
                        this.companyLogo = el
                    })

                    this.$root.defineBoothType(toUp(this.speaker.company))
                    .then(type => {
                        if (type) {
                            this.haveBooth = true
                            this.type = type
                        }
                    })
                }
            }
        },
    }
</script>
<style lang="scss">

</style>
