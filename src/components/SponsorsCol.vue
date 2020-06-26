<template>
    <div v-if="ready" class="tile is-ancestor has-text-centered">
        <div class="tile is-vertical">
            <div @click="$root.openExternalInBlank(getSponsor('kaspersky').website)" class="click tile is-parent ls-main">
                <!-- Main -->
                <div class="tile is-child box">
                    <img style="object-fit:contain;" :src="api + getSponsor('kaspersky').logo">
                </div>
            </div>
            <div class="tile ls-platinum">
                <!-- Platinum A -->
                <div @click="$root.openExternalInBlank(getSponsor('rsk').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="api + getSponsor('rsk').logo">
                    </div>
                </div>
                <!-- Platinum B -->
                <!-- <div @click="$root.openExternalInBlank(getSponsor('crypttp').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="api + getSponsor('crypttp').logo">
                    </div>
                </div> -->
            </div>
            <div class="tile ls-gold">
                <div @click="$root.openExternalInBlank(getSponsor('crypttp').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="api + getSponsor('crypttp').logo">
                    </div>
                </div>
                <!-- Gold A -->
                <div @click="$root.openExternalInBlank(getSponsor('fas').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="api + getSponsor('fas').logo">
                    </div>
                </div>
                <!-- Gold B -->
                <div @click="$root.openExternalInBlank(getSponsor('sto managers').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="api + getSponsor('sto managers').logo">
                    </div>
                </div>
            </div>
            <div class="tile ls-silver">
                <div @click="$root.openExternalInBlank(getSponsor('dash').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="api + getSponsor('dash').logo">
                    </div>
                </div>
                
                <div @click="$root.openExternalInBlank(getSponsor('decred').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="api + getSponsor('decred').logo">
                    </div>
                </div>

                <div @click="$root.openExternalInBlank(getSponsor('quantia capital').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="api + getSponsor('quantia capital').logo">
                    </div>
                </div>

                <div @click="$root.openExternalInBlank(getSponsor('money on chain').website)" class="click tile is-parent">
                    <div class="tile is-child box">
                        <img style="object-fit:contain;" :src="api + getSponsor('money on chain').logo">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import Axios from 'axios'
    import {api} from '@/env'

    export default {
        name: "SponsorsCol",
        data () {
            this.sponsors = []

            Axios.get(api + `/resources?names=sponsors`)
            .then(res => {
                const decrypted = res.data
                this.ready = true
                this.sponsors = decrypted.sponsors
            })

            return {
                ready: false,
                api: api
            }
        },
        methods: {
            getSponsor (name) {
                let res = this.sponsors.filter(el => compare(el.name, name))
                if (!res.length)
                    res = [{}]
                return res[0]
            }
        }
    }
</script>