<template>
    <div class="container card webinar-modal">
        <img class="click webinar-close-icon" src="@/assets/icon/icon-close-black.svg" v-on:click="$parent.close()" />
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