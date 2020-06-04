<template>
    <div class="card webinar-modal">
        <img class="click webinar-close-icon" src="@/assets/icon/icon-close-black.svg" v-on:click="$parent.close()" />
        <SpeakingTitleCompanySpeaker
        :webinarName.sync="data.name"
        :company.sync="startups"
        :speakingData.sync="speakingData"
        />
        <div class="columns is-gapless">
            <div class="column is-one-fifth webinar-sponsors">
                <WebinarSponsors :showSponsor="false"/>
            </div>
            <div class="column is-three-fifths">
                <div id="jitsi-modal-target" class="card-image">
                </div>
            </div>
            <div class="column is-one-fifth webinar-sponsors">
                <WebinarSponsors :showSponsor="false"/>
            </div>
        </div>
    </div>
</template>
<script>
import jitsi from '@/api/jitsi'
import SpeakingTitleCompanySpeaker from '@/components/Modals/SpeakingTitleCompanySpeaker'
import WebinarSponsors from '@/components/Modals/WebinarSponsors'

export default {
    name: "Jitsimodal",
    components: {
        SpeakingTitleCompanySpeaker,
        WebinarSponsors
    },
    props: {
        data: Object
    },
    data () {
        return {
            speakingData: this.speakingData,
            startups: this.startups,
        }
    },
    methods: {
        
    },
    mounted () {
        let self = this

        let timer = setInterval(() => {
            if (document.querySelector("#jitsi-modal-target")) {
                clearInterval(timer)

                self.$root.check('Sponsors Startups').then(() => {
                    if (self.data.name.includes('sponsorbooth')) {
                        self.startups = self.$root.Sponsors.filter(el => {
                            self.name = self.data.name.split('sponsorbooth')[1]
                            return compare(self.name, el.name)
                        })

                        if (self.startups.length) {
                            self.startups = self.startups[0]
                        }
                    }
                    else if (self.data.name.includes('interview')) {
                        self.startups = self.$root.MediaPartners.filter(el => {
                            self.name = self.data.name.split('interviewbooth')[1]
                            return compare(self.name, el.name)
                        })

                        if (self.startups.length) {
                            self.startups = self.startups[0]
                        }
                    }
                    else {
                        self.startups = self.$root.Startups.filter(el => {
                            if (el.time < new Date().getTime()) {
                                return el
                            }
                        })
            
                        if (self.startups.length) {
                            self.startups = self.startups[self.startups.length -1]
                        }
            
                        setInterval(() => {
                            self.startups = self.$root.Startups.filter(el => {
                                if (new Date(el.time).toTimeString() < new Date().toLocaleString()) {
                                    return el
                                }
                            })
            
                            if (self.startups.length) {
                                self.startups = self.startups[self.startups.length -1]
                            }
                        }, 15000)
                    }

                    if (self.startups) {
                        new jitsi({
                            vueapp: self,
                            data: {
                                host: self.data.host,
                                name: self.data.name,
                                webinarId: self.data.webinarId,
                                guest: self.data.guest,
                                token: self.$root.token,
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
