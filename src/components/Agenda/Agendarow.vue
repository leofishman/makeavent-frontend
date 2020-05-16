<template>
	<div class="box">
		<div class="columns">
			<div class="column agenda-pic">
				<img v-if="data.contact.photo" :src="host + data.contact.photo">
                <img v-else :src="host + '/static/img/avatar-default.png'" alt="">
			</div>
			<div class="column agenda-name">
				<div class="has-text-centered">
					<h3 v-on:click="$root.tryBusinessCard(data.contact)" class="click">{{data.contact.name}} <strong>{{data.contact.role}}</strong></h3>
					<h4 v-on:click="$root.navToPage(data.contact.company)" class="has-text-grey-light is-uppercase click">{{data.contact.company}}</h4>
				</div>
			</div>
			<div class="column investors-fundname is-uppercase">
				<h3 class="has-text-centered">{{data.theme}}</h3>
			</div>
			<div class="column agenda-time">
				<h3 class="has-text-centered">{{new Date(data.time).toLocaleString()}}</h3>
			</div>
			<div class="column agenda-touch is-uppercase">
				<div class="has-text-centered">
					<h3 @click="$root.addReminder(data, reminder)" class="click">{{content.remind}}</h3>
					<h3 :class="data.time > new Date().getTime() ? 'disabled' : ''" @click="$root.joinStage(data.stage)" class="click">{{content.joinSpeach}}</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {host} from '@/env'

export default {
	name: "Agendarow",
	props: {
		data: Object
	},
	data () {
		return {
            reminder: this.$root.content.reminders[0],
			host: host,
			content: this.$root.content.Agendarow
		}
	},
	methods: {
		eventType (el) {
            if (new Date().getTime() > el.time && new Date().getTime() < el.time + 2700000)
                return 'ongoing'
            else if (new Date().getTime() > el.time && new Date().getTime() > el.time + 2700000)
                return 'finished'
        },

        requestOfflineCopy (name, id) {
            if (this.$root.cloo(toUp(this.$root.usertype), toUp('vip|startup|investor|media')))
                this.$root.showMessageToUpgradeStrict('access to offline materials', 'VIP')
            else {
                Axios.post(`${host}/offlinecopy`, {
                    id: id
                },
                {
                    headers: {
                        authorization: localStorage.auth
                    }
                })
                .then(res => {
                    this.$buefy.modal.open({
                        parent: this,
                        component: `
                        <div class="modal-card" style="width: auto">
                            <header class="modal-card-head">
                                ${this.$root.content.common.success}
                            </header>
                            <section class="modal-card-body">
                                <p>
                                ${this.$root.content.offlineMaterialSent(el.name)}
                                </p>
                            </section>
                        </div>
                        `,
                        hasModalCard: true,
                        customClass: 'custom-class custom-class-2',
                        trapFocus: true
                    })
                })
                .catch(e => console.log)
            }
        }
	},
}
</script>

<style scoped>

</style>