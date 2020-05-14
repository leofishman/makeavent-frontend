<template>
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                
            </div>
            <div v-if="speaker && speakingData" class="media-content">
                <div class="columns">
                    <div class="column is-two-third">
                        <div class="columns">
                            <div class="column is-one-fifth">
                                <img class="speaker-logo" :src="host + speaker.photo" alt="">
                            </div>
                            <div class="column is-four-fifth">
                                <p class="title is-4">
                                    <span
                                        class="click"
                                        @click="$root.tryBusinessCard(speaker)"
                                    >{{speaker.name}} </span>
                                    <span
                                        class="click"
                                        @click="$root.navToPage(speaker.company)"
                                    >{{speaker.role + " " + speaker.company}}</span>
                                </p>
                                <p class="speaking-theme is-6">{{speakingData.theme}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-one-third">
                        <div v-if="speakingData" class="content">
                            <div>{{new Date(speakingData.time).toLocaleString()}}</div>
                        </div>
                    </div>
                </div>
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
