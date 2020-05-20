<template>
	<div class="box">
		<div class="columns">
			<div class="column vip-pic">
				<img v-if="data.photo" :src="data.photo">
                <img v-else :src="host + '/static/img/avatar-default.png'" alt="">
			</div>
			<div class="column vip-name">
				<div class="has-text-centered">
					<h3><strong class="click" v-on:click="$root.tryBusinessCard(data)">{{data.name}}</strong><br> {{data.role}}</h3>
				</div>
			</div>
			<div class="column is-uppercase">
				<h3 class="has-text-centered has-text-grey-light">{{data.company}}</h3>
			</div>
			
            <div class="column vip-touch" v-if="$root.isThatMe(data.email)">
                <ul></ul>
                {{content.itsyou}}
            </div>
			<div v-else class="column vip-touch">
				<ul>
					<li v-on:click="$root.tryBusinessCard(data)" v-if="!$root.checkIfAlreadyAFriend(data)">{{content.rbc}}</li>
                    <li v-on:click="$root.tryBusinessCard(data)" v-else>{{$root.content.common.viewBc}}</li>
					<!-- NOT RELEASED -->
                    <li v-on:click="$root.privateCall(data)">{{content.spc}}</li>
					<li v-if="haveBooth" v-on:click="openDefinedPage()">{{content.findInEbooth}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {host} from '@/env'
export default {
    name: "Viprow",
    props: {
        data: Object
    },
    data () {
        this.haveBooth = false
        this.type = ''

        this.$root.defineBoothType(toUp(this.data.company))
        .then(type => {
            if (type) {
                this.haveBooth = true
                this.type = type
            }
        })

        return {
            host: host,
            content: this.$root.content.VipMeetingRoom,
            haveBooth: this.haveBooth
        }
    },
    methods: {
        openDefinedPage () {
            this.$root.openPage(this.type, toUp(this.data.company))
        }
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