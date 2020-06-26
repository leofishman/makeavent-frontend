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
import {api} from '@/env'
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
        let self = this

        this.$root.check('Sponsors Startups').then(() => {
            if (this.data.name.includes('sponsorbooth')) {
                this.startups = this.$root.Sponsors.filter(el => {
                    this.name = this.data.name.split('sponsorbooth')[1]
                    return compare(this.name, el.name)
                })

                if (this.startups.length) {
                    this.startups = this.startups[0]
                }
            }
            else {
                this.startups = this.$root.Startups.filter(el => {
                    if (el.time < new Date().getTime()) {
                        return el
                    }
                })
    
                if (this.startups.length) {
                    this.startups = this.startups[this.startups.length -1]
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

            if (this.startups) {

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
        })
        // .catch(e => console.log(`${e} inaccessible`))

        return {
            speakingData: this.speakingData,
            startups: this.startups,
            html: this.html,
            frameHeight: window.innerHeight - 144
        }
    },
    methods: {
        
    },
}
</script>
