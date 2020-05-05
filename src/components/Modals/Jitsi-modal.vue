<template>
    <div class="container card webinar-modal">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    
                </div>
                <div v-if="speaker && speakingData" class="media-content">
                    <p class="title is-4">{{data.name}}</p>
                    <p class="subtitle is-6">{{speaker.name}}</p>
                </div>
            </div>

            <div v-if="speakingData" class="content">
                {{speakingData.theme}}
                <a></a>
                <br>
                <small>{{new Date(speakingData.time).toLocaleString()}}</small>
            </div>
        </div>
        <div id="jitsi-modal-target" class="card-image">
            
        </div>
    </div>
</template>
<script>
import jitsi from '@/api/jitsi'

export default {
    name: "Jitsimodal",
    props: {
        data: Object
    },
    data () {
        return {
            speakingData: this.speakingData,
            speaker: this.speaker,
            isCardModalActive: false,
        }
    },
    methods: {

    },
    mounted () {
        this.isCardModalActive = true

        let timer = setInterval(() => {
            if (document.querySelector("#jitsi-modal-target")) {
                clearInterval(timer)

                this.$root.check('Speakers').then(() => {
                    this.speakers = this.$root.Speakers.filter(el => el.webinarId == this.data.webinarId)
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