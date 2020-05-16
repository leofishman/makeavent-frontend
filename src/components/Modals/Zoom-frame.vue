<template>
    <div class="card container webinar-modal">
        <SpeakingTitle
            :webinarName="data.name"
            :speaker="speaker"
            :speakingData="speakingData"
        />
        <iframe id="zoom-iframe" class="zoom-frame" frameborder="0">
        </iframe>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '@/env'
import SpeakingTitle from '@/components/Modals/SpeakingTitle'

export default {
    components: {
        SpeakingTitle
    },
    props: {
        data: Object
    },
    data() {
        this.html = ""

        this.$root.check('Speakers Speakingagenda').then(() => {
            this.speakers = this.$root.Speakingagenda.filter(el => compare(el.stage, this.data.name))
            if (this.speakers.length) {
                this.speaker = this.speakers[0].contact
                this.speakingData = this.speakers[0]
                const params = {
                    leaveUrl: this.data.leaveUrl,
                    meetingNumber: this.data.webinarId
                }

                Axios.get(`${host}/webinars/connectionjs`, {
                    params,
                    headers: {
                        authorization: localStorage.auth
                    },
                })
                .then(res => {
                    this.html = res.data
                    document.getElementById('zoom-iframe').contentWindow.document.write(this.html)
                })
            }
        }).catch(e => console.log(`${e} inaccessible`))

        return {
            speakingData: this.speakingData,
            speaker: this.speaker,
            html: this.html
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss">
    .zoom-frame {
        height: 80%;
        width: 100%;
    }
</style>