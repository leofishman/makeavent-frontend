<template>
    <div class="admin-bar__streaming-source-card">
        <b-loading
            class="loading-overlay--dark" style="margin:15px"
            slot="switched-header" 
            :is-full-page="false" 
            :active.sync="isLoading" 
            :can-cancel="false">
            </b-loading>
        <div class="admin-bar__streaming-source-image">
            <inline-svg :src="require(`@/assets/img/socials/${this.source.name.toLowerCase()}.svg`)" />
        </div>
        <div class="admin-bar__streaming-source-col">
            <div class="admin-bar__streaming-source-name"><span>{{source.name}}</span></div>
            <b-collapse
                aria-id="contentIdForA11y2"
                class="panel"
                animation="slide"
                v-model="isOpen"
                :open="false"
                >
                <div
                    @click="isOpen = !isOpen"
                    slot="trigger"
                    role="button"
                    aria-controls="contentIdForA11y2">
                    <p v-if="!isOpen" class="source-hint">{{content.hint}}</p>
                    <p v-else class="source-hint">{{content.closeHint}}</p>
                </div>
                <div> {{source.url}} </div>
            </b-collapse>
            <div class="admin-bar__streaming-source-position"><span></span></div>
        </div>
        <span v-if="showDeleteButton" class="close-icon" @click="removeItem">
            <span class="inner-icon">x</span>                
        </span>
    </div>
</template>
<script>
import Axios from 'axios'
import { mapActions } from 'vuex'

import router from '@/store/routes/meetup-form'

export default {
    name: "SourceCard",
    props: {
        source: Object,
        showDeleteButton: Boolean
    },
    mounted() {
        // try {
        //     this.img = 
        // }
        // catch (e) {
        //     console.log('no such icon: ' + this.source.name.toLowerCase());
        // }
    },
    data() {
        return {
            isLoading: false,
            isOpen: false,
            img: ''
        }
    },
    computed: {
        content () {
            return this.$root.content.adminSidebar.items.streaming
        }
    },
    methods: {
        ...mapActions(['getStreamingSources']),
        removeItem () {
            this.isLoading = true
            router.deleteStreamingSource({
                id: this.$root.meetup._id,
                sourceName: this.source.name
            })
            .then(async res => {
                this.isLoading = false
                window.EventBus.$emit('reload-streaming-sources')
            })
            .catch(res => {
                this.isLoading = false
            })
        }
    },
}
</script>