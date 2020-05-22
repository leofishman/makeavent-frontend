<template>
	<div v-if="ready" id="demoday" class="has-background-white-ter">
		<navbar></navbar>

		<div class="container">

			<Pagetitle :data="content.ddpb"/>

			<section class="section section-demo">
				<div class="columns is-variable is-8">

					<div class="column is-7">
						<Agenda />
					</div>
				</div>
			</section>
		</div>

		<div id="chat">
            <div class="chat-top">
                <h3 @click="$root.joinStage('demoday')" class="enterebooth is-uppercase">{{content.joinPitching}}</h3>
            </div>
		    <Chat :checkAccess="'startupchat'" :parent="self" type="startup" name="demodaychat" />
        </div>
	</div>
</template>

<script>
import Pagetitle from '@/components/Pagetitle.vue'
import Chat from '@/components/CompanyProfile/Chat.vue'
import Agenda from './Agenda.vue'
import {socket} from '@/env'
import io from 'socket.io-client'

export default {
    name: "Demoday",
    components: {
        Pagetitle,
		Agenda,
		Chat
    },
    props: {
        data: String
    },
    data () {
		this.$root.checkComponentAccess('startupdemodaypitchingbooth')
        .then(res => {
            if (res)
                this.ready = true
            else
                this.$root.createError(this.$root.content.ErrorMessages[5], 'oops')
        })

        return {
			ready: false,
			self: this,
			contacts: [], // this var always empty here, needed for chat
            content: this.$root.content.StartupsDemoDay
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>

</style>