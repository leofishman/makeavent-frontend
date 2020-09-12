<template>
	<div v-if="ready" v-on:click="openMediaPartnerBooth(data)" class="column is-half-mobile is-one-quarter-tablet is-2-desktop mediahall-logo">
		<div class="box">
		<img
			v-if="getMediaPartnerSlot(data)"
			:src="api + getMediaPartnerSlot(data).logo" 
			:alt="`${getMediaPartnerSlot(data).name} - Media partner of ${$root.project.name}`">
		<div v-else>{{content.mp}}</div>
		</div>
	</div>
</template>

<script>
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
			
			content: this.$root.content.Mediahall
		}
	},
	methods: {
		openMediaPartnerBooth (id) {
            const name = this.getMediaPartnerSlot(id).name.toLowerCase()
            this.$router.push({
                path: `/mediahall/${name}`,
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