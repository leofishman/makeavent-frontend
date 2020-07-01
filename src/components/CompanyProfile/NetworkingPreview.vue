<template>
	<div class="room-preview column is-narrow">
		<iframe src="" class="box"></iframe>
		<div class="has-text-success">2 people online</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {host} from '@/env'
	
	export default {
		name: "NetworkingPreview",
		data () {
			return {
				host: host,
			}
		},
	}
</script>