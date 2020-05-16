<template>
    <div class="card-content">
        <div class="media speaking-media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img class="speaker-logo" :src="host + speaker.photo">
                </p>
            </figure>
            <div class="media-content" v-if="speaker && speakingData">
                <p>
                    <strong class="click" @click="$root.tryBusinessCard(speaker)" >{{speaker.name}}</strong>
                    <small v-if="speakingData">{{new Date(speakingData.time).toLocaleString()}}</small><br>
                    <i class="click" @click="$root.navToPage(speaker.company)" >{{speaker.role + " " + speaker.company}}</i>
                </p>
                <p>
                    <small>{{speakingData.theme}}</small>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {host} from '@/env'

export default {
    name: "SpeakingTitle",
    props: {
        webinarName: String,
        speaker: Object,
        speakingData: Object
    },
    data () {
        return {
            host: host
        }
    }
}
</script>
<style lang="scss">
    .speaker-logo {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
</style>
