<template>
    <div class="card container webinar-modal">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    
                </div>
                <div class="media-content">
                    <p class="title is-4">John Smith</p>
                    <p class="subtitle is-6">@johnsmith</p>
                </div>
            </div>

            <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a>#css</a> <a>#responsive</a>
                <br>
                <small>11:09 PM - 1 Jan 2016</small>
            </div>
        </div>
        <iframe id="zoom-iframe" :width="960" :height="frameHeight" class="zoom-frame" frameborder="0">
        </iframe>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '@/env'
export default {
    props: {
        data: Object
    },
    data() {
        this.isCardModalActive = false
        this.interviewsInRow = true
        this.html = ""

        this.isCardModalActive = true

        const params = {
            leaveUrl: this.data.leaveUrl,
            meetingNumber: this.data.meetingNumber
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


        return {
            frameHeight: window.innerHeight - 200,
            isCardModalActive: this.isCardModalActive,
            interviewsInRow: this.interviewsInRow,
            html: this.html
        }
    },
    methods: {
        
    },
}
</script>