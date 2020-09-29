<template>
  <section>
      <item class="admin-bar__streaming">
            <p class="admin-bar__list-item-header" slot="header">{{this.$root.content.adminSidebar.items.streaming.title}}</p>
            <template slot="inner">
                <div class="admin-bar__streaming-list" style="min-height:100px">
                    <b-loading
                        class="loading-overlay--dark" style="margin:15px"
                        slot="switched-header" 
                        :is-full-page="false" 
                        :active="!sourcesReady" 
                        :can-cancel="false">
                        </b-loading>
                    <div v-if="sourcesReady" >
                        <active-button
                            v-if="sources.length"
                            @clicked="openEdit"
                            :name="$root.content.adminSidebar.items.streaming.buttons.edit"
                            class="admin-bar__shortcuts-btn admin-bar__button">
                        </active-button>
                        <!-- <buttons/> -->
                        <sources/>

                        <active-button
                            @clicked="openAdd"
                            v-if="sources.length < 5"
                            :name="$root.content.adminSidebar.items.streaming.buttons.add"
                            class="admin-bar__shortcuts-btn admin-bar__button">
                        </active-button>
                        <active-button
                            v-else
                            disabled="true"
                            :name="$root.content.adminSidebar.items.streaming.buttons.limit"
                            class="admin-bar__shortcuts-btn admin-bar__button">
                        </active-button>
                    </div>
                </div>
            </template>
      </item>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import Item from '@/components/Global/admin-sidebar/Item/'
import AddStreamSources  from '@/components/PopupForms/meetup/streaming-popup-form/add-streaming-source'
import EditStreamSources from '@/components/PopupForms/meetup/streaming-popup-form/edit-streaming-source'
import {ActiveButton} from '@/components/Global/controll/'

import Buttons from './Buttons'
import Sources from './Sources'

export default {
    components: {
        Item,
        Buttons,
        Sources,
        ActiveButton
    },
    async mounted() {
        const obj = {
            id: this.$root.meetup._id
        }
        await this.getMeetupById(obj)
        await this.getStreamingSources(obj)
        this.sources = this.$store.state.meetupForm.streamingSources
        this.sourcesReady = true
    },
    data() {
        window.EventBus.$on('reload-streaming-sources', async () => {
            this.sourcesReady = false
            await this.getStreamingSources({id: this.$root.meetup._id})
            // some components listening for it
            window.EventBus.$emit('reload-streaming-sources-finished')
            // force reload because not really works with arrays
            this.sources = this.$store.state.meetupForm.streamingSources
            this.sourcesReady = true
        })

        return {
            sourcesReady: false,
            sources: this.$store.state.meetupForm.streamingSources
        }
    },
    methods: {
        ...mapActions(['getMeetupById', 'getStreamingSources']),
        openAdd () {
            this.$buefy.modal.open({
                hasModalCard: true,
                component: AddStreamSources,
                parent: this
            })
        },

        openEdit () {
            this.$buefy.modal.open({
                hasModalCard: true,
                component: EditStreamSources,
                parent: this
            })
        }
    },
}
</script>

<style>

</style>