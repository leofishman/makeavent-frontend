<template>
	<div class="member-custom-box">
		<h2>{{data.name}}<br> <small>{{data.role}}</small></h2>
		<a v-if="data.Linkedin" target="_blank" :href="data.Linkedin">LinkedIn</a>
	</div>
</template>

<script>
export default {
	name: "MemberCustom",
	props: {
		data: Object
	},
}
</script>
