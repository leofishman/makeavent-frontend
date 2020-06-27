<template>
    <div v-if="ready" id="startups">
        <navbar></navbar>

        <div class="container">

            <Pagetitle :data="content.sddb"/>

            <section class="section section-starttop">
                <div class="startup-brand">
                    <div class="columns">
                        <Fundbrand fundName="COINSILLIUM" />
                        <Fundbrand fundName="BLOCKCHAIN VALLEY VENTURES"/>
                        <Fundbrand fundName="CVVC" />
                        <Fundbrand fundName="ANGEL VEST" />
                        <Fundbrand fundName="IBC MEDIA"/>
                        <Fundbrand fundName="VU VENTURE PARTNERS"/>
                    </div>

                    <div class="columns">
                        <Fundbrand fundName="DRAPER CYGNUS" />
                        <Fundbrand fundName="MASTER VENTURES" />
                        <Fundbrand fundName="SANCTUM"/>
                        <Fundbrand fundName="M31"/>
                        <Fundbrand fundName="WOODSTOCK"/>
                        <Fundbrand fundName="FAS"/>
                    </div>

                </div>
            </section>

            <section class="section section-startbottom">
                <div class="tile is-ancestor level">
                    <div class="tile is-vertical is-5 startup-brand level-left">
                        <div v-if="$root.Startups" class="tile">

                            <div class="columns is-multiline"> 
                                <Startuplogo id="9"/><!-- decrypto -->
                                <Startuplogo id="0"/><!-- money on change -->
                                <Startuplogo id="10"/><!-- crypttp-->
                                <Startuplogo id="1"/><!-- sensitrust -->
                                <Startuplogo id="2"/><!-- altvesto -->
                                <Startuplogo id="3"/><!-- block sdk -->
                                <Startuplogo id="4"/><!-- fuse -->
                                <Startuplogo id="5"/><!-- ebakus -->
                                <Startuplogo id="6"/><!-- copyrage -->
                                <Startuplogo id="7"/><!-- algo trader -->
                                <Startuplogo id="8"/><!-- makeavent -->
                                
                                
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
                            v-on:click="$router.push(`/investors`)"
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
    import {api} from '@/env'
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

                api: api,
                show: true,
                content: this.content
            }
        },
        methods: {
            goToPitchingBooth () {
                this.$root.checkComponentAccess('startupdemodaypitchingbooth')
                .then(res => {
                    if (res)
                        this.$router.push(`/ddpb`)
                    else
                        this.$root.createError(this.$root.content.ErrorMessages[5], 'oops')
                })
            }
        },
    }
</script>