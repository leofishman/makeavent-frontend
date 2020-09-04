<template>
	<div class="modal-card demo-modal">
		<header class="modal-card-head">
			<p class="modal-card-title"><span class="is-capitalized"></span>{{name}} {{content.demos}}</p>
		</header>
		<section class="modal-card-body">
			<div class="columns is-multiline">
				<div class="column demo-video-card click" v-for="(demo, index) in demos" :key="index">
					{{demo.name}}
					<div @click="openVideoModal(demo.link)" v-bind:style="{
						backgroundImage: `url(${getThumbnail(demo.link)})`,
						'height': '150px',
						'background-repeat': 'no-repeat',
						'background-position': 'left',
						'margin-top': '10px'
					}"></div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	export default {
		name: "DemoModal",
		props: {
			name: String,
			demos: Array
		},
		data() {
			return {
				content: this.$root.content.Meetup,
				isDemoModalActive: false
			}
		},
		methods: {
			isWatchUrl (url) {
				return url.includes('watch?') ? true : false;
			},

			getThumbnail (url) {
				if ( this.isWatchUrl(url) )
					return `https://img.youtube.com/vi/${url.split("watch?v=")[1].split("&")[0]}/0.jpg`
				else if ( url.includes("embed/") )
					return `https://img.youtube.com/vi/${url.split("embed/")[1].split("?")[0]}/0.jpg`
			},
			openVideoModal (url) {
				url = this.isWatchUrl(url)
					? url.replace("watch?v=", 'embed/').split("&")[0] 
					: url;

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
		max-width: 100%;
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
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			position: absolute;
		}
	}
</style> 