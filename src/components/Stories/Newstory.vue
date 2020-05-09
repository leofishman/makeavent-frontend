<template>
	<div id="Newstory" class="card">
		<div class="card-content">
			<h1 class="title">{{content.modalTitle}}</h1>
			<div>
				<p>{{content.promotional}}</p>
			</div>
			<form>
				<b-field :label="content.title">
					<b-input v-model="name" type="text" :placeholder="content.title"></b-input>
				</b-field>
				<b-field :label="content.promotionalContent">
					<b-input v-model="email" type="text" :placeholder="content.promotionalContent"></b-input>
				</b-field>

				<b-button :disabled="!inputsReady" type="is-secondary" size="is-medium">
					{{content.submit}}
				</b-button>
			</form>
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
		},
		data () {

			return {
				content: this.$root.content.Newstory
			}
		}
	}
</script>

<style lang="scss">
label.label {
	display: none;
}
</style>