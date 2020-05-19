<template>
<div v-if="ready" id="profile-company">
		<navbar></navbar>
		<div class="container">
			<Pagetitle :data="name"/>

			<section class="section section-profile-company">
				<div class="columns is-variable is-8">
					<!-- Profile main -->
					<div class="column is-one-third profile-main">
						<!-- Profile top-->
						<div class="profile-top">
							
							<!-- Company logo -->
							<div>
								<img :src="this.logo">
							</div>

							<!-- Company contacts -->
							<ul class="list-network">
                                <li v-if="website" v-on:click="openAndTrack(website)">
									<span>
										<img src="@/assets/icon/icon-email.svg">
									</span>
									<a>{{commonContent.Website}}</a>
								</li>
								<li 
									v-for="(el, key, index) in socials"
									:key="index"
									v-on:click="openAndTrack(el)"
								>
									<span v-if="el">
										<img :src="require(`../../assets/icon/icon-${key.toLowerCase()}.svg`)">
									</span>
                                    <a v-if="el">{{key}}</a>
								</li>
							</ul>
						</div>

						<!-- Profile bottom-->
						<div class="profile-bottom">
                            <PitchDeck v-for="(el, index) in pitchDeck" :key="index" :data="el"/>
                        </div>
					</div>

					<!-- Profile bio -->
					<div class="column is-two-third profile-bio">
                        <div class="columns is-multiline">
                            <div class="column padding-top-20" v-for="(el, index) in contacts" :key="index">
                                <Member :data="el"/>
                            </div>
                        </div>
						<!-- Bio text -->
                        <article class="bio-description box">
                            <p v-html="description"></p>
                        </article>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import {host} from '@/env'
import io from 'socket.io-client'
import PitchDeck from '@/components/Demoday/Pitchdeck'
import Member from '@/components/CompanyProfile/Member'

export default {
    components: {
        PitchDeck,
        Member
    },
    data() {
        this.$root.checkComponentAccess('startupprofile')
        .then(res => {
            if (!res) {
                this.$root.navToPage(this.$router.currentRoute.params.name)
            }
            else {
                this.chatHeight;
                this.chatHistory      = [];
                this.userTextMessage  = ""
                this.showMessageModal = false
                this.chatAvailable    = false
                this.startup          = ""
                this.description      = ""
                this.demo             = ""
                this.website          = ""
                this.socials          = ""
                this.contacts         = ""
                this.logo             = ""
                this.name             = ""
                this.pitchDeck        = []

                // wait until token and startups ready
                this.$root.check('token Startups').then(() => {
                    this.token = this.$root.token

                    this.name = this.$router.currentRoute.params.name
                    this.startup = this.$root.Startups.filter(el => compare(el.name, this.name))[0]
                    this.logo = host + this.startup.logo

                    this.description = this.startup.description
                    this.demo = this.startup.demo
                    this.website = this.startup.website
                    this.socials = this.startup.socials
                    this.contacts = this.startup.contacts
                    this.time = this.startup.time
                    this.pitchDeck = this.startup.pitchDeck

                    this.ready = true
                }).catch(e => console.log(`${e} inaccessible`))
            }
        })

        return {
            ready: false,
            getInTouch: [],
            name: this.name,
            commonContent: this.$root.content.common,

            userTextMessage: this.userTextMessage,
            chatHeight: this.chatHeight,
            chatHistory: this.chatHistory,
            showMessageModal: this.showMessageModal,

            showQuote: false,
            quotedMessage: '',
            quotedName: '',
            quoteId: '',

            logo: this.logo,
            description: this.description,
            demo: this.demo,
            website: this.website,
            socials: this.socials,
            contacts: this.contacts,
            pitchDeck: this.pitchDeck,

            chat: "",

            chatAvailable: this.chatAvailable
        }
    },
    methods: {
        openAndTrack (link) {
            this.$root.track(name, link)
            this.$root.openExternalInBlank(link)
        }
    },
}
</script>