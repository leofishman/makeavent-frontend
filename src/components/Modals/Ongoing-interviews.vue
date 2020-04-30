<template>
    <div>
        <b-modal v-model="opened" size="lg" id="open-interview-agenda" centered :title="content.goingInterviews">
            <b-row v-for="(el, index) in list" :key="index">
                <b-col md="5" class="nopadding">
                    <b-row>
                        <b-col md="2">
                            <img class="contact-photo micro-profile-photo" :src="host + el.interviewer.photo" alt="">
                        </b-col>
                        <b-col md="10">
                            <div style="line-height:50px">
                                {{
                                    el.interviewer.name+
                                    " " + el.interviewer.role+
                                    " at " + el.interviewer.company
                                }}
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col style="line-height:50px" class="nopadding">
                    {{content.with}}
                </b-col>
                <b-col md="5" class="nopadding">
                    <b-row>
                        <b-col md="2">
                            <img class="contact-photo micro-profile-photo" :src="host + el.guest.photo" alt="">
                        </b-col>
                        <b-col md="10">
                            <div style="line-height:50px">
                                {{
                                    el.guest.name+
                                    " " + el.guest.role+
                                    " at " + el.guest.company
                                }}
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col md="1" style="text-align:right" class="nopadding">
                    <b-button
                        class="centrify"
                        variant="outline-primary"
                        v-on:click="$root.joinWebinar(
                            el.webinarId,
                            ``
                        )"
                    >
                        {{$root.content.common.join}}
                    </b-button>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '@/env'
export default {
    data() {
        this.opened = false
        this.list = []
        
        window.EventBus.$on('open-live-interview-modal', () => { this.opened = true })

        Axios.get(`${host}/interviews/getByType?type=ongoing`).then(res => {
            this.list = res.data
            // .map(el => {
            //     el.guest = JSON.parse(el.guest)
            //     el.interviewer = JSON.parse(el.interviewer)
            // })
        })

        return {
            host: host,
            content: this.$root.content.OngoingInterviews,
            opened: this.opened,
            list: this.list
        }
    },
    methods: {
        
    },
}
</script>