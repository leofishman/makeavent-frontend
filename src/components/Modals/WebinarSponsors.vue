<template>
    <div class="sponsor-padding">
        <figure class="logo">
            <img src="@/assets/logo_dark.svg">
        </figure>
        <figure v-if="showSponsor" class="box">
            <img :src="`${host}/static/img/sponsors/KASPERSKY/KASPERSKY.png`">
        </figure>
        <div class="powered">
            <h3>{{content.powered}}</h3>
            <img :src="`${host}/static/img/sponsors/MAKEAVENT/MAKEAVENT.png`">
        </div>
    </div>
</template>

<script>
    import {host} from '@/env'
    export default {
        name: "WebinarSponsors",
        
        props: {
            data: Object,
            showSponsor: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                host: host,
                content: this.$root.content.WebinarSponsors
            }
        }
    }
</script>