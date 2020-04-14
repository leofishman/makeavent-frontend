<template>
    <div>
        <navbar></navbar>
        <div v-if="ready" class="container" style="margin-top:80px;">
            <h1 class="agenda-title">
                {{$root.content.conferenceAgenda}}
            </h1>
            <b-list-group>
                
                <b-list-group-item
                    v-for="(el, index) in $root.Speakingagenda"
                    :key="index"
                    href="#"
                    :class="
                        `flex-column align-items-start`
                        + ' ' + eventType(el)
                    "
                    style="margin-top:20px;"
                    >
                    <b-row>
                        <b-col md="2">
                            <img :src="host + el.contact.photo" class="contact-photo">
                        </b-col>
                        <b-col md="8">
                            <h4 class="mb-1">{{el.contact.name + " " + el.contact.role + " " + el.contact.company}}</h4>
                            <h5 style="margin-top:20px">{{el.theme}}</h5>
                        </b-col>
                        <b-col md="2">
                            <div class="pitch-time-start">{{new Date(el.time).toLocaleString()}}</div>
                            <div style="margin-top:20px; text-align:center;">
                                <b-button
                                    v-if="eventType(el) == 'finished'"
                                    variant="outline-primary"
                                    v-on:click="requestOfflineCopy(el.contact.name)"
                                >
                                    {{$root.content.requestOfflineCopy}}
                                </b-button>

                                <b-button
                                    v-else
                                    variant="outline-primary"
                                    v-on:click="$root.joinWebinar(
                                        el.webinarId,
                                        ``
                                    )"
                                >
                                    {{$root.content.common.join}}
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>
<script>
import {host} from '../env'
import Axios from 'axios'
export default {
    data() {
        this.ready = false
        this.$root.check('Speakingagenda').then(_ => {
            this.ready = true
        })

        return {
            host: host,
            ready: this.ready,
        }
    },
    methods: {
        eventType (el) {
            if (new Date().getTime() > el.time && new Date().getTime() < el.time + 2700000)
                return 'ongoing'
            else if (new Date().getTime() > el.time && new Date().getTime() > el.time + 2700000)
                return 'finished'
        },

        requestOfflineCopy (name, id) {
            if (this.$root.cloo(this.$root.usertype, 'vip|startup|investor|media'))
                this.$root.showMessageToUpgradeStrict('access to offline materials', 'VIP')
            else {
                Axios.post(`${host}/offlinecopy`, {
                    id: id
                },
                {
                    headers: {
                        authorization: localStorage.auth
                    }
                })
                .then(res => {
                    this.$bvModal.msgBoxOk(this.$root.content.offlineMaterialSent(el.name), {
                        title: this.$root.content.success,
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                    })
                })
                .catch(e => console.log)
            }
        }
    },
}
</script>
<style lang="css">
    .pitch-time-start {
        color: black;
        font-weight: 600;
        text-align: right;
        font-size:16px;
    }
    .agenda-title {
        font-weight: 800;
        text-align: center;
        color: #676767;
        font-size: 50px;
    }
    .ongoing {
        -webkit-animation-name: ongoingpulse;
        animation-name: ongoingpulse;
        -webkit-animation-duration: 2.0s;
        animation-duration: 2.0s;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
    }

    @keyframes ongoingpulse {
        0%{
            box-shadow: inset 0px 0px 10px 0px #ff00003d;
        }
        65%{
            box-shadow: inset 0px 0px 10px 3px #ff00007d;
        }
        100%{
            box-shadow: inset 0px 0px 0px 0px #ff00007d;
        }
    }
    .finished {
        opacity: 0.8;
    }
</style>