<template>
	<div v-if="ready" v-on:click="openMediaPartnerBooth(data)" class="column is-half-mobile is-one-quarter-tablet is-2-desktop mediahall-logo">
		<div class="box">
		<img
			v-if="getMediaPartnerSlot(data)"
			:src="host + getMediaPartnerSlot(data).logo" 
			:alt="`${getMediaPartnerSlot(data).name} - Media partner of blockconf.digital`">
		<div v-else>{{content.mp}}</div>
		</div>
	</div>
</template>

<script>
import {host} from '@/env'

export default {
	name: "Mediahalllogo",
	props: {
		data: String
	},
	data () {
		this.ready = false

        this.$root.check('MediaPartners').then(_ => {
            this.ready = true
		}).catch(e => console.log(`${e} inaccessible`))
		
		return {
			ready: this.ready,
			host: host,
			
			content: this.$root.content.Mediahall
		}
	},
	methods: {
		openMediaPartnerBooth (id) {
            const name = this.getMediaPartnerSlot(id).name.toLowerCase()
            this.$router.push({
                path: `/${this.$root.token}/mediahall/${name}`,
            })
		},

        getMediaPartnerSlot (id) {
            return this.$root.MediaPartners[id]
		},
	},
}
</script>

<style scoped>

</style>