<template>
	<div class="member-custom-box">
		<h2>{{data.name}}<br> <small>{{data.role}}</small></h2>
		<a v-if="data.Linkedin" target="_blank" :href="data.Linkedin">LinkedIn</a>
	</div>
</template>

<script>
	import {api} from '@/env'

	export default {
		name: "MemberCustom",
		props: {
			data: Object
		},
		data () {
			return {
				api: api
			}
		}
	}
</script>
