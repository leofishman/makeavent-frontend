<template>
    <div class="container card webinar-modal">
        <SpeakingTitle
            :webinarName="data.name"
            :speaker="speaker"
            :speakingData="speakingData"
        />
        <div id="jitsi-modal-target" class="card-image">
            
        </div>
    </div>
</template>
<script>
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
        return {
            speakingData: this.speakingData,
            speaker: this.speaker,
        }
    },
    methods: {

    },
    mounted () {

        let timer = setInterval(() => {
            if (document.querySelector("#jitsi-modal-target")) {
                clearInterval(timer)

                this.$root.check('Speakers Speakingagenda').then(() => {
                    this.speakers = this.$root.Speakingagenda.filter(el => el.stage == this.data.name)
                    if (this.speakers.length) {
                        this.speaker = this.speakers[0].contact
                        this.speakingData = this.speakers[0]
                        new jitsi({
                            vueapp: this,
                            data: {
                                speakerId: this.speaker._id,
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