<template>
    <div v-if="ready" id="startups">
        <navbar></navbar>

        <div class="container">

            <Pagetitle :data="content.sddb"/>

            <section class="section section-starttop">
                <div class="startup-brand">
                    <div class="columns is-multiline">
                        <div class="column">
                            <Fundbrand fundName="COINSILLIUM" />
                        </div>
                        <div class="column">
                            <Fundbrand fundName="ANGEL VEST" />
                        </div>
                        <div class="column">
                            <Fundbrand fundName="CVVC" />
                        </div>
                        <div class="column">
                            <Fundbrand fundName="MASTER VENTURES" />
                        </div>
                        <div class="column">
                            <Fundbrand fundName="BLOCKCHAIN VALLEY VENTURES"/>
                        </div>
                        <div class="column">
                            <Fundbrand fundName="IBC MEDIA"/>
                        </div>
                        <div class="column">
                            <Fundbrand fundName="DRAPER CYGNUS" />
                        </div>
                        <div class="column">
                            <Fundbrand fundName="UVECON"/>
                        </div>
                        <div class="column">
                            <Fundbrand fundName="SANCTUM"/>
                        </div>
                        <div class="column">
                            <Fundbrand fundName="VU VENTURE PARTNERS"/>
                        </div>
                        <div class="column">
                            <Fundbrand fundName="FAS"/>
                        </div>
                    </div>

                </div>
            </section>

            <section class="section section-startbottom">
                <div class="tile is-ancestor level">
                    <div class="tile is-vertical is-5 startup-brand level-left">
                        <div v-if="$root.Startups" class="tile">

                            <div class="tile is-vertical is-parent">
                                <Startuplogo id="0"/>
                                <Startuplogo id="1"/>
                                <Startuplogo id="2"/>
                            </div>

                            <div class="tile is-parent is-vertical">
                                <Startuplogo id="3"/>
                                <Startuplogo id="4"/>
                                <Startuplogo id="5"/>
                            </div>

                            <div class="tile is-parent is-vertical">
                                <Startuplogo id="6"/>
                                <Startuplogo id="7"/>
                                <Startuplogo id="8"/>
                            </div>

                        </div>
                    </div>

                    <div class="tile is-parent is-6 level-right">
                        <div class="tile is-vertical">
                            <div v-on:click="goToPitchingBooth()" class="tile is-child box click has-background-light demo-day">
                                <div class="has-text-centered">
                                    <h3>{{content.ddpb}}</h3>
                                </div>
                            </div>
                            <div
                                v-on:click="$router.push(`/${$root.token}/investors`)"
                                class="tile is-child box click has-background-light investors"
                            >
                                <div class="has-text-centered">
                                    <h3>{{content.investors}}</h3>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import {host} from '@/env'
import Fundbrand from './Fundbrand'
import Startuplogo from './Startuplogo'

export default {
    components: {
        Fundbrand,
        Startuplogo
    },
    data() {
        this.content = this.$root.content.StartupsDemoDay

        this.$root.checkComponentAccess('startupdemoday')
        .then(res => {
            if (res)
                this.ready = true
            else
                this.$root.createError(this.$root.content.ErrorMessages[3], 'oops')
        })

        return {
            ready: false,

            host: host,
            show: true,
            content: this.content
        }
    },
    methods: {
        goToPitchingBooth () {
            this.$root.checkComponentAccess('startupdemodaypitchingbooth')
            .then(res => {
                if (res)
                    this.$router.push(`/${this.$root.token}/ddpb`)
                else
                    this.$root.createError(this.$root.content.ErrorMessages[5], 'oops')
            })
        }
    },
}
</script>