<template>
    <div class="networking-rooms">
        <navbar></navbar>

        <div class="container is-fluid">
            <section class="section section-networking-rooms">
                <Pagetitle :data="content.title"/>

                <div class="speakers-container">
                    <b-loading class="fixed-position-loader loading-overlay--dark" :is-full-page="false" :active.sync="loading" :can-cancel="false"></b-loading>

                    <div v-if="!loading && recordings.length">
                        <div class="speakers-title">
                            {{content.available}}
                        </div>
                        <div class="columns is-multiline">
                            <div class="column" v-for="(el, index) in recordings" :key="index">
                                <div class="box member recording-card">
                                    <div class="title">
                                        {{el[0].date}} {{el[0].time}}
                                    </div>

                                    <b-carousel
                                        :data="imageLinks(index)"
                                        :arrow="false"
                                        :arrow-hover="false"
                                        :items-to-show="1"
                                        :items-to-list="1"
                                        :repeat="true"
                                        :has-drag="false"
                                        :has-grayscale="false"
                                        :has-opacity="false"
                                        :autoplay="true"
                                        :interval="2000"
                                        animated="fade"
                                        :indicator="false"
                                        :pause-hover="false"
                                        :pause-info="false"
                                    >
                                        <b-carousel-item v-for="(carousel, i) in imageLinks(index)" :key="i">
                                            <section :class="`hero is-medium is-${carousel.color} is-bold`">
                                                <div class="hero-body has-text-centered">
                                                    <img :src="carousel.image" alt="">
                                                </div>
                                            </section>
                                        </b-carousel-item>
                                    </b-carousel>

                                    <b-button @click="downloadItem(el[0].file)" type="is-primary">
                                        {{content.download}}
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="!loading && !recordings.length">
                        <div class="speakers-title">
                            {{content.noRecordings}}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import Pagetitle from '@/components/Pagetitle'
import { mapActions, mapGetters } from 'vuex'
import Axios from 'axios'

export default {
    name: "Recordings",
    components: {
        Pagetitle
    },
    async mounted() {
        this.id = this.$router.currentRoute.query.id
        await this.getRecordings({
            id: this.id
        })
    },
    methods: {
        ...mapActions(['getRecordings']),
        imageLinks(index) {
            let res = []
            this.recordings[index].map(el => {
                res.push({
                    title: el.time,
                    image: el.image
                })
            })
            return res
        },
        downloadItem (url) {
            Axios.get(url + `&id=${this.id}`, {
                headers: {
                    authorization: localStorage.auth
                },
                responseType: 'blob',
            })
            .then(response => {
                const blob = new Blob([response.data], { type: 'video/mp4' })
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = 'recording'
                link.click()
                URL.revokeObjectURL(link.href)
            }).catch(console.error)
        }
    },
    computed: {
        content () {
            return this.$root.content.Recordings
        },
        recordings () {
            return this.$store.state.recordings.recordings
        },
        loading () {
            return this.$store.state.recordings.recordingsLoading
        },
    },
}
</script>
<style lang="scss">
.fixed-position-loader {
    position: relative !important;
    z-index: 20 !important;
    width: 100% !important;
    height: 150px !important;
}
.recording-card {
    .title {
        font-size: 18px;
    }
    .hero-body {
        padding:0.5rem !important;
    }
}
</style>