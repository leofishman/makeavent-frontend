<template>
	<div id="demoday" class="has-background-white-ter">
		<navbar></navbar>

		<div class="container">

			<Pagetitle :data="content.ddpb"/>

			<section class="section section-demo">
				<div class="columns is-variable is-8">

					<div class="column is-7">
						<Agenda/>
					</div>

					<div class="column is-4 demoaction">
						<div class="box shadow-2 click demoday-join">
							<h3>{{content.joinPitching}}</h3>
							<img src="@/assets/icon/icon-join.png">
						</div>
						<div class="box shadow-2 click demoday-chat">
							<h3>{{content.ddChat}}</h3>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import Pagetitle from '@/components/Pagetitle.vue';
import Agenda from './Agenda.vue'

export default {
    name: "Demoday",
    components: {
        Pagetitle,
        Agenda
    },
    props: {
        data: String
    },
    data () {
        return {
            content: this.$root.content.StartupsDemoDay
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>

</style>