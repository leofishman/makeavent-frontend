<template>
    <div>
        <navbar></navbar>
        <div v-if="ready" class="container" style="margin-top:80px;">
            <h1 class="agenda-title">
                {{content.title}}
            </h1>

            <b-list-group>
                <b-list-group-item
                    v-for="(el, index) in list"
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
                                v-if="$root.compare(eventType(el), 'finished')"
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
import Axios from 'axios'
import {host} from '@/env'
export default {
    data() {
        this.list = []

        this.$root.check('WorkshopAgenda').then(() => {
            this.list = this.$root.WorkshopAgenda

            this.ready = true
        }).catch(e => console.log(`${e} inaccessible`))
        
        return {
            host: host,
            content: this.$root.content.OngoingWorkshops,
            ready: this.ready,
            list: this.list
        }
    },
    methods: {
        eventType (el) {
            if (new Date().getTime() > el.time && new Date().getTime() < el.time + 2700000)
                return 'ongoing'
            else if (new Date().getTime() > el.time && new Date().getTime() > el.time + 2700000)
                return 'finished'
        },
    },
}
</script>