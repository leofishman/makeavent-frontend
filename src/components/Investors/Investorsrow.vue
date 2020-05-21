<template>
	<div class="box">
		<div class="columns">
			<div class="column investors-pic">
				<img v-if="data.photo" :src="host + data.photo">
                <img v-else :src="host + '/static/img/avatar-default.png'" alt="">
			</div>
			<div class="column investors-name">
				<div class="has-text-centered">
					<h3
						@click="$root.tryBusinessCard(data)"
						class="has-text-centered click"
					><strong>{{data.name}}</strong><br> {{data.role}}</h3>
				</div>
			</div>
			<div class="column is-uppercase">
				<h3 @click="openInvestorBooth()" class="has-text-centered has-text-grey-light click">{{data.company}}</h3>
			</div>
			<div @click="$root.tryBusinessCard(data)" class="click column investors-flag is-uppercase">
				<!-- <img class="has-text-centered" src="@/assets/icon-target.svg"> -->
				<h3 class="has-text-centered">{{content.rbc}}</h3>
			</div>
			<div v-if="canCall" @click="$root.privateCall(data)" class="click column investors-touch is-uppercase">
				<h3 class="has-text-centered">{{content.rem}}</h3>
			</div>
		</div>
	</div>
</template>

<script>
import {host} from '@/env'

export default {
	name: "Investorsrow",
	props: {
		data: Object
	},
	data () {
		this.type = ""
		this.haveBooth = ""

		this.$root.defineBoothType(toUp(this.data.company))
        .then(type => {
            if (type) {
                this.haveBooth = true
                this.type = type
            }
		})
		
		this.$root.canCall(this.data)
		.then(res => {
			this.canCall = res
		})

		return {
			content: this.$root.content.Investors,
			host: host,
			canCall: this.canCall
		}
	},
	methods: {
		openInvestorBooth () {
			this.$root.openPage(this.type, toUp(this.data.company))
		}
	}
}
</script>

<style scoped>

</style>