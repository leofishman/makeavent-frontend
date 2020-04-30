<template>
	<div class="box">
		<div class="columns is-1 is-variable">
			<div class="column">
				<h3 class="agenda-time">{{new Date(Number(data.time)).toLocaleString()}}</h3>
			</div>
			<div class="column">
				<h3 class="agenda-name">{{data.name}}</h3>
			</div>
			<div class="column is-one-quarter">
				<h3>
					<a href="#" class="agenda-link-1">{{content.veb}}</a>
				</h3>
			</div>
			<div class="column is-one-quarter agenda-touch click">
				<h3 v-on:click="$root.joinWebinar(
					data.webinarId,
					`${host}/${$root.token}/ddpb`
				)"
				class="agenda-touch"
				>{{content.join}}</h3>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: "Agendarow",
    props: {
        data: Object
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

<style lang="scss">
    #demoday {
        .section-demo {
            .agenda {
                .agenda-time {
                    font-size: 18px;
                }
            }
        }
    }
</style>