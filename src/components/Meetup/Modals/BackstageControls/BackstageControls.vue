<template>
	<div class="modal-card demo-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">
                <span class="is-capitalized" v-html="content.title"></span>
            </p>
		</header>
		<section class="modal-card-body">
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>

            <h1>
                {{content.speakers}}
            </h1>
			<div class="search-container">
				<b-input :placeholder="content.searchPlaceholder" v-model="speakerSearch" type="text"></b-input>
			</div>

			<div v-if="speakerListReadyness" class="speakers-container attendees-list">
				<SpeakersListEm v-for="(el, index) in speakersToShow"
					:key="index"
					:user="el"
					:backstage="backstage"
					:frontstage="frontstage"
					/>
			</div>

		</section>
	</div>
</template>
<script>
import Axios from 'axios'
import {MEETUP} from '@/api/endpoints'
import SpeakersListEm from './components/SpeakersListEm.vue'
export default {
	name: "BackstageControls",
	components: {
		SpeakersListEm
	},
	props: {
		Speakers: Array
	},
	data() {
		this.filterSpeakerSearch()
		this.getBackstage()
		this.getFrontstage()

		return {
			content: this.$root.content.BackstageControlsModal,
			isLoading: true,
			speakersToShow: this.$store.state.meetupForm.speakers,
			speakerSearch: "",
			backstage: false,
			frontstage: false,
			speakerListReadyness: false,
		}
	},
	methods: {
		speakersListReady () {
			if ( (typeof this.backstage == 'object' && typeof this.frontstage == 'object') && this.speakersToShow.length)
				this.speakerListReadyness = true
					
			else
				this.speakerListReadyness = false
		},
		getBackstage () {
			Axios.create({
				baseURL: MEETUP.getMeetupBackstage + '?id=' + this.$root.meetup._id,
				headers: {
					authorization: localStorage.auth
				}
			})()
			.then(res => {
				this.backstage = res.data
				this.isLoading = false
			})
		},
		getFrontstage () {
			Axios.create({
				baseURL: MEETUP.getMeetupFrontstage + '?id=' + this.$root.meetup._id,
				headers: {
					authorization: localStorage.auth
				}
			})()
			.then(res => {
				this.frontstage = res.data
				this.isLoading = false
			})
		},
		filterSpeakerSearch () {
			if (this.speakerSearch)
				this.speakersToShow = this.$store.state.meetupForm.speakers.filter(el => {
					let up = toUp(el.name)
					let up2 = toUp(el.company)

					return up.includes(toUp(this.speakerSearch)) ? el : up2.includes(toUp(this.speakerSearch)) ? el : undefined;
				})
			else
				this.speakersToShow = this.$store.state.meetupForm.speakers
		}
	},
	watch: {
		'speakerSearch': function () {
			this.filterSpeakerSearch()
		},
		'frontstage': function () {
			this.speakersListReady()
		},
		'backstage': function () {
			this.speakersListReady()
		}
	},
}
</script>
<style lang="scss">
	@import "@/assets/css/variables.scss";
	.backstage-controls {
        h1 {
            font-size: 24px;
        }
	}
	.search-container {
		position: relative;
		display: block;
		margin: 20px 0px 10px 0px;
	}
	.speakers-container {
	}
</style> 