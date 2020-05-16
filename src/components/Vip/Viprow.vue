<template>
	<div class="box">
		<div class="columns">
			<div class="column vip-pic">
				<img v-if="data.photo" :src="data.photo">
                <img v-else :src="host + '/static/img/avatar-default.png'" alt="">
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

        this.$root.check('Sponsors InvestFunds MediaPartners Startups Speakers')
        .then(async res => {
            let sponsor = this.$root.Sponsors.filter(el => compare(el.name, this.data.company))[0]
            if (sponsor) {
                this.type = 'sponsor'
                this.haveBooth = true
            }

            if (!this.haveBooth) {
                let media = this.$root.MediaPartners.filter(el => compare(el.name, this.data.company))[0]
                if (media) {
                    this.type = 'mediapartner'
                    this.haveBooth = true
                }
            }

            if (!this.haveBooth) {
                let speker = this.$root.Speakers.filter(el => compare(el.name, this.data.company))[0]
                if (speker) {
                    this.type = 'speaker'
                    this.haveBooth = true
                }
            }
    
            if (!this.haveBooth) {
                let access = await Promise.all([
                    this.$root.checkComponentAccess('investfundprofile'),
                    this.$root.checkComponentAccess('startupprofile')
                ])

                if (access[0]) {
                    let investfund = this.$root.InvestFunds.filter(el => compare(el.name, this.data.company))[0]
                    if (investfund) {
                        this.type = 'investfund'
                        this.haveBooth = true
                    }
                }

                else if (!this.haveBooth && access[1]) {
                    let startup = this.$root.Startups.filter(el => compare(el.name, this.data.company))[0]
                    if (startup) {
                        this.type = 'startup'
                        this.haveBooth = true
                    }
                }
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
            this.$parent.openPage(this.type, toUp(this.data.company))
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