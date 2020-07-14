<template>
	<div class="room-preview column is-narrow">
		<iframe src="" class="box"></iframe>
		<div class="has-text-success"># {{content.peopleOnline}}</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {api} from '@/env'
	
	export default {
		name: "NetworkingPreview",
		data () {
			return {
				api: api,
				content: this.$root.content.NetworkingRooms,
			}
		},
	}
</script>