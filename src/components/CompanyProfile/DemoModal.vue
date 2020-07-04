<template>
	<div class="modal-card demo-modal">
		<header class="modal-card-head">
			<p class="modal-card-title"><span class="is-capitalized">{{name}}</span> {{content.demos}}</p>
		</header>
		<section class="modal-card-body">
			<ul class="columns is-multiline">
				<li v-for="demo in demos" class="column">
					<button class="button is-primary is-fullwidth" @click="isDemoModalActive = true">Play demo {{demo.name}}</button>
					<b-modal :active.sync="isDemoModalActive">
						<iframe :src="demo.url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</b-modal>
				</li>
			</ul>
		</section>
	</div>
</template>
<script>
	export default {
		name: "DemoModal",
		data() {
			return {
				content: this.$root.content.Company,
				
				isDemoModalActive: false,

				demos: [
				{ name: 'Future mix', url: 'https://www.youtube.com/embed/CCecdVTTTh4' },
				{ name: 'This is another mix', url: 'https://www.youtube.com/embed/6Hj6hPqKiS4' },
				{ name: 'And another', url: 'https://www.youtube.com/embed/CCecdVTTTh4' },
				{ name: 'The last one', url: 'https://www.youtube.com/embed/6Hj6hPqKiS4' }
				
				]
			}
		}
	}
</script>