<template>
    <div>
        <b-modal class="nopadding" v-model="opened" size="xl" id="open-interview-agenda" centered :title="$root.content.upcommingInterviews">
            <iframe id="zoom-iframe" :height="frameHeight" class="zoom-frame" frameborder="0">
            </iframe>
        </b-modal>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '../../env'
export default {
    data() {
        this.opened = false
        this.interviewsInRow = true
        this.html = ""

        window.EventBus.$on('open-webinar-window', (data) => {
            this.opened = true

            const params = {
                leaveUrl: data.leaveUrl,
                meetingNumber: data.meetingNumber
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

        })

        return {
            frameHeight: window.innerHeight - 200,
            opened: this.opened,
            interviewsInRow: this.interviewsInRow,
            html: this.html
        }
    },
    methods: {
        
    },
}
</script>
<style lang="css">
    .modal-body.nopadding {
        padding:0px;
    }
    .zoom-frame {
        width: 100%;
    }
</style>