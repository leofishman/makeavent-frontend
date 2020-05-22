<template>
    <div class="card webinar-modal">
        <img class="click webinar-close-icon" src="@/assets/icon/icon-close-black.svg" v-on:click="$parent.close()" />
        <SpeakingTitleCompanySpeaker
        :webinarName.sync="data.name"
        :company.sync="speaker"
        :speakingData.sync="speakingData"
        />
        <div class="columns is-gapless">
            <div class="column is-one-fifth webinar-sponsors">
                <WebinarSponsors :showSponsor="false"/>
            </div>
            <div class="column is-three-fifths">
                <iframe id="zoom-iframe" class="webinar-modal-target" width="100%" :style="{ height:`${frameHeight}px` }" frameborder="0">
                </iframe>
            </div>
            <div class="column is-one-fifth webinar-sponsors">
                <WebinarSponsors :showSponsor="false"/>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '@/env'
import WebinarSponsors from '@/components/Modals/WebinarSponsors'
import SpeakingTitleCompanySpeaker from '@/components/Modals/SpeakingTitleCompanySpeaker'

export default {
    components: {
        WebinarSponsors,
        SpeakingTitleCompanySpeaker
    },
    props: {
        data: Object
    },
    data() {
        this.html = ""

        this.$root.check('Sponsors').then(() => {
            this.sponsors = this.$root.Sponsors.filter(el => {
                if (el.name.includes('sponsorbooth')) {
                    this.name = el.name.split('sponsorbooth')[1]
                    return compare(el.name, this.data.host)
                }
                else
                    return compare(el.name, this.data.host)
            })

            if (this.sponsors.length) {
                this.speaker = this.sponsors[0]

                const params = {
                    leaveUrl: this.data.leaveUrl,
                    meetingNumber: this.data.webinarId,
                    password: this.data.password
                }

                Axios.get(`${host}/webinars/connectionjs`, {
                    params,
                    headers: {
                        authorization: localStorage.auth
                    },
                })
                .then(res => {
                    const decrypted = this.$root.decrypt(res.data.encryptedData)
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