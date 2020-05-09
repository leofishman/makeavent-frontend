<template>
	<div id="meetup">
		<navbar></navbar>
		<div class="container">
			<Pagetitle :data="content.title"/>

			<section class="section section-meetup">
				<p class="has-text-centered">{{content.intro}}</p>

				<div class="meetup-sponsors">
					<div>
						<div class="col">
							<!-- Main sponsor -->
							<article class="box ms-main" v-on:click="openPage('booth')">
								<img src="@/assets/logo-FAS.png">
							</article>
						</div>
						<div class="col">
							<!-- Gold sponsor -->
							<article class="box ms-platinum" v-on:click="openPage('booth')">
								<img src="@/assets/logo-FAS.png">
							</article>
						</div>
					</div>
					<div>
						<div class="col">
							<!-- Platinum sponsor -->
							<article class="box ms-gold" v-on:click="openPage('booth')">
								<img src="@/assets/logo-test2.png">
							</article>
						</div>
						<div class="col">
							<!-- Platinum sponsor -->
							<article class="box ms-gold" v-on:click="openPage('booth')">
								<img src="@/assets/logo-FAS.png">
							</article>
						</div>
					</div>
				</div>

			</section>
		</div>

	</div>
</template>
<script>
	import Pagetitle from '@/components/Pagetitle.vue';

	export default {
		name: "Meetup",
		components: {
			Pagetitle,
		},
		props: {
			data: String
		},
		methods: {

        openPage (name) {
            this.$router.push(`/${this.$root.$router.currentRoute.params.id}/${name}`).catch(() => {
                window.location.reload()
            })
        }
    },
		data () {
			return {
				content: this.$root.content.Meetup
			}
		}
	}
</script>

<style lang="scss">


</style>