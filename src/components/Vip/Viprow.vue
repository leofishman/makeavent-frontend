<template>
	<div class="box">
		<div class="columns">
			<div class="column vip-pic">
				<img :src="data.photo">
			</div>
			<div class="column vip-name">
				<div class="has-text-centered">
					<h3>{{data.name}} <strong>{{data.role}}</strong></h3>
				</div>
			</div>
			<div class="column vip-fundname is-uppercase">
				<h3 class="has-text-centered has-text-grey-light">{{data.company}}</h3>
			</div>
			
            <div class="column vip-touch is-uppercase" v-if="$root.isThatMe(data.email)">
                <ul></ul>
                {{content.itsyou}}
            </div>
			<div v-else class="column vip-touch is-uppercase">
				<ul>
					<li v-on:click="$root.tryBusinessCard(data)" v-if="!$root.checkIfAlreadyAFriend(data)">{{content.rbc}}</li>
                    <li class="connected" v-else>{{$root.content.common.alreadyConnected}}</li>
					<!-- NOT RELEASED -->
                    <li v-on:click="$root.privateCall(data)">{{content.spc}}</li>
					<li v-if="data.company" v-on:click="$root.navToPage(data.company)">{{content.findInEbooth}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Viprow",
		props: {
			data: Object
        },
        data () {
            return {
                content: this.$root.content.VipMeetingRoom
            }
        },
        methods: {

        }
	}
</script>

<style scoped lang="scss">
    #vip {
        .section-vip {
            .box {
                .vip-touch {
                    li {
                        &.connected {
                            color: grey;
                            &:before {
                                background-image:none;
                                background-color:transparent;
                                box-shadow: none;
                            }
                        }
                    }
                }
            }
        }
    }
</style>