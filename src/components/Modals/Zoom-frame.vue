<template>
    <div class="card webinar-modal">
        <img class="click webinar-close-icon" src="@/assets/icon/icon-close-black.svg" v-on:click="$parent.close()" />
        <SpeakingTitle
        :webinarName.sync="data.name"
        :speaker.sync="speaker"
        :speakingData.sync="speakingData"
        />
        <div class="columns is-gapless">
            <div class="column is-one-fifth webinar-sponsors">
                <WebinarSponsors />
            </div>
            <div class="column is-three-fifths">
                <iframe id="zoom-iframe" class="webinar-modal-target" width="100%" :style="{ height:`${frameHeight}px` }" frameborder="0">
                </iframe>
            </div>
            <div class="column is-one-fifth webinar-sponsors">
                <WebinarSponsors />
            </div>
        </div>
    </div>
    <!-- <div class="card container webinar-modal">
        <SpeakingTitle
            :webinarName="data.name"
            :speaker="speaker"
            :speakingData="speakingData"
        />
        
    </div> -->
</template>
<script>
import Axios from 'axios'
import {api} from '@/env'
import WebinarSponsors from '@/components/Modals/WebinarSponsors'
import SpeakingTitle from '@/components/Modals/SpeakingTitle'

export default {
    components: {
        WebinarSponsors,
        SpeakingTitle
    },
    props: {
        data: Object
    },
    data() {
        this.html = ""
        let self = this
        this.$root.check('Speakers Speakingagenda').then(() => {
            setInterval(() => {
                self.speakers = self.$root.Speakingagenda.filter(el => {
                    if (compare(el.stage, self.data.name)) {
                        if (el.time < new Date().getTime()) {
                            return el
                        }
                    }
                })

                if (self.speakers.length) {
                    self.speaker = self.speakers[self.speakers.length -1].contact
                    self.speakingData = self.speakers[self.speakers.length -1]
                }
            }, 15000)
            this.speakers = this.$root.Speakingagenda.filter(el => compare(el.stage, this.data.name))
            if (this.speakers.length) {
                this.speaker = this.speakers[0].contact
                this.speakingData = this.speakers[0]

                const params = {
                    leaveUrl: this.data.leaveUrl,
                    meetingNumber: this.data.webinarId,
                    password: this.data.password
                }

                Axios.get(`${api}/webinars/connectionjs`, {
                    params,
                    headers: {
                        authorization: localStorage.auth
                    },
                })
                .then(res => {
                    const decrypted = res.data
                    this.html = decrypted
                    document.getElementById('zoom-iframe').contentWindow.document.write(this.html)
                })
            }
        }).catch(e => console.log(`${e} inaccessible`))

        return {
            speakingData: this.speakingData,
            speaker: this.speaker,
            html: this.html,
            frameHeight: window.innerHeight - 144
        }
    },
    methods: {
        
    },
}
</script>
