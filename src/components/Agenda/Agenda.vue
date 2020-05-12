<template>
    <div id="agenda">
        <navbar></navbar>

        <div  class="container">

            <Pagetitle :data="content.conferenceAgenda"/>

            <section class="section section-agenda">
                <div class="columns is-multiline">
                    <div v-if="ready" class="column is-full">
                        <Agendarow
                            v-for="(el, index) in $root.Speakingagenda"
                            :key="index"
                            :data="el"
                        />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import {host} from '@/env'
import Axios from 'axios'
import Agendarow from './Agendarow'

export default {
    components: {
        Agendarow
    },
    data() {
        this.ready = false

        this.$root.check('Speakingagenda.length').then(_ => {
            this.ready = true
        }).catch(e => console.log(`${e} inaccessible`))

        return {
            content: this.$root.content.Agenda,
            host: host,
            ready: this.ready,
        }
    },
    methods: {},
}
</script>