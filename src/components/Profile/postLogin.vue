<template>
	<div id="profile">
		<navbar></navbar>


<span v-show="1===2">
<MeetupsTabs />
</span>

 <span v-show="newVent">{{loadedMeetupsId}} </span>
		<div class="container is-fluid" v-if="ready">
			<div class="welcome">
                Hello, we are setting the enviroment, please hold....

            </div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Pagetitle from '@/components/Pagetitle.vue'
	import Businesscardconected from '@/components/Profile/Businesscardconected.vue'
	import Businesscardpending from '@/components/Profile/Businesscardpending.vue'
	import Interviewsupcoming from '@/components/Profile/Interviewsupcoming.vue'
	import Interviewspast from '@/components/Profile/Interviewspast.vue'
	import Interviewsfailed from '@/components/Profile/Interviewsfailed.vue'
    import MeetupsTabs from './MeetupsTab'
    import MeetupFormRoutes from '@/store/routes/meetup-form'
	import { mapGetters } from 'vuex'

	export default {
		name: "postLogin",
		components: {
			Pagetitle,
			Businesscardconected,
			Businesscardpending,
			Interviewsupcoming,
			Interviewspast,
			Interviewsfailed,
			MeetupsTabs
		},
		props: {
			data: String
		},
		async mounted() {
			this.ready = false
			this.newVent = false
			this.profileParamsFocus = {
				name: false
			}

			this.pendingCardsLoading = true
			this.connectedCardsLoading = true
			this.$root.check('profile').then(() => {
				this.newRole = this.$root.profile.role
				this.newCompany = this.$root.profile.company
				this.newLinkedin = this.$root.profile.Linkedin
				this.newFacebook = this.$root.profile.Facebook
				this.newTelegram = this.$root.profile.Telegram
				this.newCalendly = this.$root.profile.calendly
				this.ready = true
			}).catch(e => console.log(`${e} inaccessible`))
			await this.$root.getActiveBusinessCards()
            await this.$root.getPengingCards()
			
			this.pendingCardsLoading = false
            },

		data() {
			return {
				content: this.$root.content.Profile,
				comm_content: this.$root.content.common,
				ready: this.ready,
				pendingCardsLoading: false,
				connectedCardsLoading: false,

				profileParamsFocus: this.profileParamsFocus,
				activeTab: 0,
				activeTabInterview: 0,
				
				isCardModalActive: false,
				networksModalActive: false,

				showEditPhoto: false,

				newRole: "",
				newCompany: "",
				newLinkedin: "",
				newFacebook: "",
				newTelegram: "",
				newCalendly: "",
				newPhoto: "",
				newVent: this.newVent,
                newUser: false
			}
        },
        computed: {

            async loadedMeetupsId () {
                if (this.ready) {
                    if (this.$store.state.profile.loadedMeetups.length > 0)   {
						
						console.log(115, this.$store.state.profile.loadedMeetups); 
						location.reload();
                                /*    this.$router.push({
                                        name: "demo", 
                                        query: {id: this.$store.state.profile.loadedMeetups[0]._id}
                                        })
                                        return this.$store.state.profile.loadedMeetups[0]._id */
                    } else {

                            const today = new Date();
                            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
                            const vent_data = {    
                                        name: 'demo vent',
                                        description: 'My awesome vent created on ' + date,
                                        company_name: 'Here go my company name',
                                        company_description: 'What my company does?',
                                        date: date,
                                      }
                                    console.log('create vent')
                            const res = await MeetupFormRoutes.postAddMeetup(vent_data)
                            console.log(171, res, this.$store.state.profile.loadedMeetups)
							this.newUser = true;
						/*	this.$router.push({
                                        name: "Meetup", 
                                        query: {id: this.$store.state.profile.loadedMeetups[0]._id}
                                        })*/ 
							this.$router.push({
									name: "DemoVent", 
									
									})
							  
                    }
                } else {console.log(151, 'else')
                    return 0
                }
             
                
            },
        }
       
	}
</script>

<style lang="scss">
@import "./profile.scss";
</style>
