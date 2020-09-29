<template>
    <div class="modal-card demo-modal">
		<header class="modal-card-head">
			<p class="modal-card-title"><span class="is-capitalized">{{content.title}}</span></p>
		</header>
		
		<section class="modal-card-body">
			<b-loading
				class="loading-overlay--dark" style="margin:15px"
				slot="switched-header" 
                :is-full-page="false" 
                :active="isLoading" 
                :can-cancel="false">
			</b-loading>
            <div v-for="(el, index) in sources" :key="index" class="admin-bar__streaming-source-cards">
                <SourceCard :source="el" :showDeleteButton="true" />
            </div>
		</section>

        <footer class="modal-card-foot">
            <b-button
                class="is-daner submit-button"
                v-on:click="closePopup"
            >{{$root.content.common.cancel}}</b-button>
        </footer>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

import router from '@/store/routes/meetup-form'

import SourceCard from '@/components/Meetup/AdminSidebar/Streaming/Sources/SourceCard'

export default {
	name: "EditStreams",
	components: {
		SourceCard
	},
    computed: {
        content () {
            return this.$root.content.adminSidebar.items.streaming.editModal
		},
    },
    data () {
		window.EventBus.$on('reload-streaming-sources', () => {
			this.isLoading = true
		})
		window.EventBus.$on('reload-streaming-sources-finished', () => {
			this.sources = this.$store.state.meetupForm.streamingSources
			this.isLoading = false
		})

        return {
			isLoading: false,
			sources: this.$store.state.meetupForm.streamingSources
        }
    },
    methods: {
        closePopup () {
            this.$parent.close()
        }
    }
}
</script>