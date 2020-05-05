<template>
	<div id="Newstory" class="card">
		<div class="card-content">
			<h1 class="title">New Story</h1>
			<div>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
				proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios'
	import {host} from '@/env'

	export default {
		name: "Newstory",
		components: {},
		props: {
			data: String
		}
	}
</script>

<style scoped>
</style>