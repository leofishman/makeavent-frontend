<template>
    <div>
        <navbar></navbar>
        <navbar-profile></navbar-profile>

        <b-container fluid="md" class="container-white nopadding">
            <b-tabs card content-class="mt-3">
                <b-tab :title="$root.content.connected" active>
                    <b-card-text>
                        <b-card-text>
                            <b-list-group>
                                <b-list-group-item
                                    v-for="(el, index) in $root.activeBusinessCards"
                                    :key="index"
                                    href="#"
                                    class="flex-column align-items-start"
                                    style="margin-top:5px;"
                                    v-on:click="$root.tryBusinessCard(el)"
                                >
                                    <b-row>
                                        <b-col md="2">
                                            <img :src="el.photo" class="small-centred-image contact-photo">
                                        </b-col>
                                        <b-col md="10">
                                            <h4 class="mb-1">{{el.name + " " + el.role + " " + el.company}}</h4>
                                        </b-col>
                                    </b-row>
                                </b-list-group-item>
                            </b-list-group>
                        </b-card-text>
                    </b-card-text>
                </b-tab>
                <b-tab>
                    <div slot="title">
                        {{$root.content.pending}}
                        <b-badge v-if="$root.pendingCards.length" variant="light">{{$root.pendingCards.length}}</b-badge>
                    </div>
                    <b-card-text>
                        <b-list-group>
                            <b-list-group-item
                                v-for="(el, index) in $root.pendingCards"
                                :key="index"
                                href="#"
                                class="flex-column align-items-start"
                                style="margin-top:5px;"
                            >
                                <b-overlay :show="showOverlay(el._id)" rounded="sm">
                                    <b-row>
                                        <b-col md="2">
                                            <img :src="el.photo" class="small-centred-image contact-photo">
                                        </b-col>
                                        <b-col md="9">
                                            <h4 class="mb-1">{{el.name + " " + el.role + " " + el.company}}</h4>
                                            <div style="margin-top:10px;">
                                                <b-button v-on:click="showLoaderAndSendPost(el)" variant="primary">
                                                    {{$root.content.accept}}
                                                </b-button>
                                            </div>
                                        </b-col>
                                        <b-col md="1" style="text-align:right">
                                            <img v-on:click="$root.denyBusinessCardRequest(el)" src="@/assets/img/cross.svg">
                                        </b-col>
                                    </b-row>
                                </b-overlay>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-container>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '@/env'
export default {
    data() {
        window.EventBus.$on('close-overlay-by-id', (id) => {
            this.overlays.splice( this.overlays.indexOf(id), 1 );
        })

        return {
            overlays: []
        }
    },
    methods: {
        showLoaderAndSendPost (el) {
            this.overlays.push(el._id) 
            this.$root.acceptBusinessCard(el)
        },

        showOverlay (id) {
            return this.overlays.includes(id)
        }
    },
}
</script>