<template>
	<div id="upcomming-interviews" class="card mediahallmodal">
		<div class="card-content">
			<h1 class="title">{{content.ui}}</h1>
			<div v-if="!interviews || !ready">
				{{content.nois}}
			</div>
			<div v-else>
				<Interviewrow
					v-for="(el, index) in interviews"
					:data="el"
					:key="index"
					v-on:click="launchInterviewModal(el)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Interviewrow from '@/components/Mediahall/Interviewrow.vue'
import Axios from 'axios'
import {host} from '@/env'

export default {
	name: "UpcommingInterviews",
	components: {
		Interviewrow
	},
	props: {
		data: String
	},
	data () {
		this.interviews = false
		this.ready = false
		
		this.getUpcommingInterviews()

		return {
			ready: this.ready,
			content: this.$root.content.Mediahall,
			interviews: this.interviews
		}
	},
	methods: {
		getUpcommingInterviews () {
			Axios.get(`${host}/interviews/getByType?type=webinar&status=upcomming`).then(res => {
				if (res.data.length) {
					this.interviews = res.data
					this.ready = true
				}
            })
            .catch(err => {
                if (err.response.data.error == "NO UPCOMMING INTERVIEWS") {
                    this.interviews = false
                }
            })
		},

		launchInterviewModal (interview) {
			
		}
	},
}
</script>

<style scoped>
</style>