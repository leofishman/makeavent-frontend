<template>
    <div class="card-content">
        <div class="columns is-gapless">
            <div class="column is-one-fifth"></div>
            <div class="column is-three-fifths">
                <div class="media speaking-media">
                    <figure style="border-right:none" @click="navToPage()" class="media-left speaker-brand">
                        <img v-if="company" class="click" :src="host + companyLogo" title="View Company">
                    </figure>
                </div>
            </div>
            <div class="column is-one-fifth"></div>
        </div>
    </div>
</template>

<script>
    import {host} from '@/env'

    export default {
        name: "SpeakingTitleCompanySpeaker",
        props: {
            webinarName: String,
            company: Object,
            speakingData: Object
        },
        data () {
            this.type = ""
            this.haveBooth = ""
            let self = this
            this.companyLogo = ""

            let timer = setInterval(() => {
                if (self.company) {
                    self.$root.tryGetCompanyLogo(self.company.name).then(el => {
                        self.companyLogo = el
                    })
                    clearInterval(timer)
                    self.$root.defineBoothType(toUp(self.company.name))
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
                this.$root.openPage(this.type, toUp(this.company.name))
            }
        },
        watch: {
            company: function () {
                if (this.company) {
                    this.$root.tryGetCompanyLogo(this.company.name).then(el => {
                        this.companyLogo = el
                    })
                    this.$root.defineBoothType(toUp(this.company.name))
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
