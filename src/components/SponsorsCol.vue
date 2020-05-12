<template>
    <div v-if="ready" class="tile is-ancestor has-text-centered">
        <div class="tile is-vertical">
            <div @click="$root.openExternalInBlank(getSponsor('kaspersky').website)" class="click tile is-parent ls-main">
                <!-- Main -->
                <div class="tile is-child box">
                    <img style="object-fit:contain;" :src="host + getSponsor('kaspersky').logo">
                </div>
            </div>
            <div class="tile ls-platinum">
                <!-- Platinum A -->
                <div @click="$root.openExternalInBlank(getSponsor('rsk').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="host + getSponsor('rsk').logo">
                    </div>
                </div>
                <!-- Platinum B -->
                <!-- <div @click="$root.openExternalInBlank(getSponsor('crypttp').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="host + getSponsor('crypttp').logo">
                    </div>
                </div> -->
            </div>
            <div class="tile ls-gold">
                <div @click="$root.openExternalInBlank(getSponsor('crypttp').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="host + getSponsor('crypttp').logo">
                    </div>
                </div>
                <!-- Gold A -->
                <div @click="$root.openExternalInBlank(getSponsor('fas').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="host + getSponsor('fas').logo">
                    </div>
                </div>
                <!-- Gold B -->
                <div @click="$root.openExternalInBlank(getSponsor('sto managers').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="host + getSponsor('sto managers').logo">
                    </div>
                </div>
            </div>
            <div class="tile ls-silver">
                <div @click="$root.openExternalInBlank(getSponsor('dash').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="host + getSponsor('dash').logo">
                    </div>
                </div>
                <!-- Gold C -->
                <div @click="$root.openExternalInBlank(getSponsor('decred').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="host + getSponsor('decred').logo">
                    </div>
                </div>
                <!-- Gold D -->
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '@/env'

export default {
    name: "SponsorsCol",
    data () {
        this.sponsors = []

        Axios.get(host + `/resources?names=sponsors`)
        .then(res => {
            this.ready = true
            this.sponsors = res.data.sponsors
        })

        return {
            ready: false,
            host: host
        }
    },
    methods: {
        getSponsor (name) {
            let res = this.sponsors.filter(el => el.name.toUpperCase() == name.toUpperCase())
            if (!res.length)
                res = [{}]
            return res[0]
        }
    }
}
</script>