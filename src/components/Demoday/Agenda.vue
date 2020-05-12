<template>
    <div class="tile is-vertical agenda box">
        <h2>{{content.agenda}}</h2>

        <div v-if="ready">
            <Agendarow
                v-for="(data, index) in agenda"
                :key="index"
                :data="data"
            />
        </div>
    </div>
</template>

<script>
import {host} from '@/env'
import Agendarow from './Agendarow'

export default {
    name: "Agenda",
    components: {
        Agendarow
    },
    props: {
        data: Object
    },
    data () {
        this.ready = false

        this.$root.check('DemoDayAgenda').then(_ => {
            this.ready = true
            this.agenda = this.$root.DemoDayAgenda
        }).catch(e => console.log(`${e} inaccessible`))

        return {
            host: host,
            ready: this.ready,
            agenda: this.agenda,
            content: this.$root.content.StartupsDemoDay
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

<style scoped>

</style>