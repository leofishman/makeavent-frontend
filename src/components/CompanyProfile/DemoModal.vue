<template>
	<div class="modal-card demo-modal">
		<header class="modal-card-head">
			<p class="modal-card-title"><span class="is-capitalized"></span> {{content.demos}}</p>
		</header>
		<section class="modal-card-body">
			<div class="columns is-multiline">
				<div class="column demo-video-card click" v-for="(demo, index) in demos" :key="index">
					<div @click="openVideoModal(demo.url)">
						{{demo.name}}
						<img :src="getThumbnail(demo.url)" alt=""/>
					</div>
				</div>
			</div>
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
					{ name: 'Future mix', url: 'https://www.youtube.com/embed/nMcb7bS-I88?controls=0' },
					{ name: 'This is another mix', url: 'https://www.youtube.com/embed/nMcb7bS-I88?controls=0' },
					{ name: 'And another', url: 'https://www.youtube.com/embed/nMcb7bS-I88?controls=0' },
					{ name: 'The last one', url: 'https://www.youtube.com/embed/nMcb7bS-I88?controls=0' },
					{ name: 'This is another mix', url: 'https://www.youtube.com/embed/nMcb7bS-I88?controls=0' },
				]
			}
		},
		methods: {
			getThumbnail (url) {
				return `https://img.youtube.com/vi/${url.split("embed/")[1].split("?")[0]}/0.jpg`
			},

			openVideoModal (url) {
				this.$buefy.modal.open({
					fullScreen: true,
					hasModalCard: false,
					canCancel: true,
					trapFocus: true,
					customClass: 'modal-dark fullscreen-iframe',
					component: {
						template: `<iframe src="${url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
					}
				})
			}
		},
	}
</script>
<style lang="scss">
	@import "@/assets/css/variables.scss";

	.demo-video-card {
		min-width: 200px;
		max-width: 200px;

		&:hover {
			box-shadow: $navbar-box-shadow-size;
		}
	}

	.modal-dark .modal-content{
		background-color: $light-invert !important;
	}

	.fullscreen-iframe {
		iframe {
			display: block;
			width:95%;
			height:95%;
			margin:auto;
		}
	}
</style>