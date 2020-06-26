<template>
    <div class="sponsor-padding">
        <figure class="logo">
            <img :src="`${api}/static/img/sponsors/MAKEAVENT/MAKEAVENT.png`">
        </figure>
        <!-- <figure v-if="showSponsor" class="box">
            <img :src="`${api}/static/img/sponsors/KASPERSKY/KASPERSKY.png`">
        </figure> -->
        <!-- <div class="powered">
            <h3>{{content.powered}}</h3>
            <img :src="`${api}/static/img/sponsors/MAKEAVENT/MAKEAVENT.png`">
        </div> -->
    </div>
</template>

<script>
    import {api} from '@/env'
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
                api: api,
                content: this.$root.content.WebinarSponsors
            }
        }
    }
</script>