<template>
	<div class="box">
		<div class="columns">
			<div class="column agenda-pic">
				<img v-if="data.contact.photo" :src="api + data.contact.photo">
                <img v-else :src="api + '/static/img/avatar-default.png'">
			</div>
			<div class="column agenda-name">
				<div class="has-text-centered">
					<h3 v-on:click="$root.tryBusinessCard(data.contact)" class="click">{{data.contact.name}} <br><strong>{{data.contact.role}}</strong></h3>
					<h4 v-on:click="openBooth()" class="is-uppercase click">{{data.contact.company}}</h4>
				</div>
			</div>
			<div class="column">
				<h3 class="has-text-centered">{{data.theme}}</h3>
			</div>
			<div class="column agenda-time">
				<h3 class="has-text-centered">{{new Date(data.time).toLocaleString()}}</h3>
			</div>
			<div class="column agenda-touch is-uppercase">
				<div class="has-text-centered">
					<h3 @click="$root.addReminder(data, reminder)" class="click">{{content.remind}}</h3>
					<h3 :class="data.time > new Date().getTime() ? 'disabled' : ''" @click="data.time < new Date().getTime() ? $root.joinStage(data.stage) : ''" class="click">{{content.joinSpeach}}</h3>
				</div>
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
        this.type = ""
        this.haveBooth = ""
        
        this.$root.defineBoothType(toUp(this.data.contact.company))
        .then(type => {
            if (type) {
                this.haveBooth = true
                this.type = type
            }
        })

		return {
            reminder: this.$root.content.reminders[0],
			content: this.$root.content.Agendarow
		}
	},
	methods: {
        openBooth () {
			this.$root.openPage(this.type, toUp(this.data.contact.company))
        },
        
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
                Axios.post(`${this.api}/offlinecopy`, {
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