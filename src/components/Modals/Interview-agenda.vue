<template>
    <div>
        <b-modal v-model="opened" size="lg" id="open-interview-agenda" centered :title="$root.content.upcommingInterviews">
            <div v-if="!interviewsInRow">
                {{$root.content.nointerviewsScheduled}}
            </div>
            <div v-else>
                <div slot="title">
                    <img src="@/assets/img/online-interview.png" alt="">
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '@/env'
export default {
    data() {
        this.opened = false
        this.interviewsInRow = true

        window.EventBus.$on('open-interview-agenda', () => {
            this.opened = true
        })

        return {
            opened: this.opened,
            interviewsInRow: this.interviewsInRow
        }
    },
    methods: {
        
    },
    watch: {
        opened: function () {
            Axios.get(`${host}/interviews/getByType?type=upcomming`).then(res => {
                console.log(res)
            })
            .catch(err => {
                if (err.response.data.error == "NO UPCOMMING INTERVIEWS") {
                    this.interviewsInRow = false
                }
            })
        }
    },
}
</script>