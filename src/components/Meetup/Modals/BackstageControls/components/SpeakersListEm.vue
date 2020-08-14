<template>
	<div class="attendee-profile">
		<div class="attendee-info">
			<figure class="attendee-avatar">
				<img v-if="user.photo" :src="api + user.photo">
				<img v-else :src="`${api}/static/img/avatar-default.png`">
			</figure>
			<div class="attendee-text">
				<div class="attendee-name" v-html="user.name"></div>
				<div class="attendee-company" v-html="user.role + ' ' + user.company"></div>
			</div>
		</div>

		<div v-if="backstage.participants" class="attendee-request">
			<b-button @click="sendToBackstage" v-if="isInFrontstage()" type="is-primary" class="is-rounded is-fullwidth attendee-bizcard">
				{{content.inviteToBackstage}}
			</b-button>
			<b-button @click="sendToMainstage" v-if="isInBackstage()" type="is-primary" class="is-rounded is-fullwidth attendee-bizcard">
				{{content.sendToMain}}
			</b-button>

			<div v-if="!isInBackstage() && !isInFrontstage()">
				<b-button @click="sendToBackstage" type="is-primary" class="is-rounded is-fullwidth attendee-bizcard">
					{{content.inviteToBackstage}}
				</b-button>
				<b-button @click="sendToMainstage" type="is-primary" class="is-rounded is-fullwidth attendee-bizcard">
					{{content.sendToMain}}
				</b-button>
			</div>
		</div>
	</div>
</template>

<script>
import Axios from 'axios'
import {api} from '@/env'
import {MEETUP} from '@/api/endpoints'

export default {
	name: "SpeakersListEm",
	props: {
		user: Object,
		backstage: Object,
		frontstage: Object
	},
	data () {
		return {
			api: api,
			content: this.$root.content.BackstageControlsModal,
		}
	},
	methods: {
		isInBackstage () {			
			if (this.backstage.participants.includes(this.user._id))
				return true
			else
				return false
		},

		isInFrontstage () {
			if (this.frontstage.participants.includes(this.user._id))
				return true
			else
				return false
		},

		sendToBackstage () {
			this.$parent.isLoading = true
			Axios.post(MEETUP.sendToBackstage, {
				id: this.$root.meetup._id,
				speaker: this.user._id
            },
            {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
				this.$parent.backstage = res.data.backstage
				this.$parent.frontstage = res.data.frontstage
				this.$parent.isLoading = false
			})
			.catch(err => {
				console.log(err)
				this.$parent.isLoading = false
			})
		},

		sendToMainstage () {
			this.$parent.isLoading = true
			Axios.post(MEETUP.sendToMainstage, {
				id: this.$root.meetup._id,
				speaker: this.user._id
            },
            {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                this.$parent.backstage = res.data.backstage
				this.$parent.frontstage = res.data.frontstage
				this.$parent.isLoading = false
			})
			.catch(err => {
				console.log(err)
				this.$parent.isLoading = false
			})
		}
	},
}
</script>
<style lang="scss">
@import "@/assets/css/attendee-profile.scss";
.attendee-profile {
    margin: 10px 0px;
    position: relative;
    display: block;
    .attendee-info {
        .attendee-avatar {
            max-width: 64px;
        }
    }	
}
</style>