<template>
	<div class="card mediahallmodal">
		<div class="card-content">
			<h1 class="title">{{content.oi}}</h1>
			<div v-if="!interviews || !ready">
				{{content.noupi}}
			</div>
			<div v-else>
				<Agendarow
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
import Agendarow from '@/components/Mediahall/Agendarow.vue'
import Axios from 'axios'

export default {
	name: "OngoinInterviews",
	components: {
		Agendarow
	},
	props: {
		data: String
	},
	data () {
		this.interviews = false
        this.ready = false
        
        this.getOngoinInterviews()

		return {
			ready: this.ready,
			content: this.$root.content.Mediahall,
			interviews: this.interviews
		}
	},
	methods: {
		getOngoinInterviews () {
			Axios.get(`${this.api}/interviews/getByType?type=interview&status=ongoing`).then(res => {
				const decrypted = res.data
				if (decrypted.length) {
					this.interviews = decrypted
					this.ready = true
				}
            })
            .catch(err => {
                if (compare(err.response.data, "NO UPCOMMING INTERVIEWS")) {
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