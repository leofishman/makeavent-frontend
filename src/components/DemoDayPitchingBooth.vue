<template>
    <div>
        <navbar></navbar>

        <b-container v-if="ready" style="margin-top: 80px;">
            <h1 class="agenda-title">
                Demo Day Pitching Agenda
            </h1>

            <b-list-group>
                <b-list-group-item
                    v-for="(el, index) in agenda"
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
                            <img :src="host + el.logo" style="width:100%">
                        </b-col>
                        <b-col md="8">
                            <h4 class="mb-1">{{el.name}}</h4>
                            <div>
                                <b-row>
                                    <b-col v-for="(_el, _index) in el.contacts" :key="_index">
                                        
                                    </b-col>
                                </b-row>
                            </div>
                        </b-col>
                        <b-col md="2">
                            <div class="pitch-time-start">{{new Date(Number(el.time)).toLocaleString()}}</div>
                            <div style="margin-top:20px; text-align:center;">
                                <b-button
                                    variant="outline-primary"
                                    v-on:click="$root.joinWebinar(
                                        el.webinarId,
                                        `${host}/${$root.token}/ddpb`
                                    )"
                                >
                                    {{$root.content.common.join}}
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                </b-list-group-item>
            </b-list-group>
        </b-container>
    </div>
</template>
<script>
import {host} from '../env'
export default {
    data() {
        this.ready = false

        this.$root.check('DemoDayAgenda').then(_ => {
            this.ready = true
            this.agenda = this.$root.DemoDayAgenda
        })

        return {
            host: host,
            ready: this.ready,
            agenda: this.agenda
        }
    },
    methods: {
        eventType (el) {
            if (new Date().getTime() > Number(el.time )&& new Date().getTime() < Number(el.time )+ 2700000)
                return 'ongoing'
            else if (new Date().getTime() > Number(el.time )&& new Date().getTime() > Number(el.time )+ 2700000)
                return 'finished'
        },
    },
}
</script>
<style lang="css">
    
</style>