<template>
    <div v-if="ready" id="profile-company">
		<navbar></navbar>
		<div class="container">
			<!--<Pagetitle :data="name"/>-->
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
								<li v-for="(el, key, index) in socials" :key="index" v-on:click="openAndTrack(el)">
									<span v-if="el">
										<img :src="require(`../../assets/icon/icon-${key.toLowerCase()}.svg`)">
									</span> 
									<a v-if="el">{{key}}</a>
								</li>
							</ul>
						</div>
					</div>

					<!-- Profile bio -->
					<div class="column profile-bio">

						<div class="columns is-multiline member-clasic">
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
import socialLogos from '@/assets/img/socials'
import {api} from '@/env'
import Member from '@/components/CompanyProfile/Member'

export default {
    components: {
        Member
    },
    props: {
        name: {
            default:"",
            type: String
        }
    },
    data() {
        this.ready = false
        this.description = ""
        this.website = ""
        this.socials = ""
        this.contacts = ""
        this.logo = ""
		this.watchButtonClass = ""
		
		this.$root.checkComponentAccess('investfundprofile')
        .then(res => {
            if (res) {
				this.$root.check('InvestFunds').then(() => {
					this.ifp = this.$root.InvestFunds.filter(el => compare(el.name, this.name))[0]

					if (this.ifp) {
						this.description = this.ifp.description
						this.website = this.ifp.website
						this.socials = this.ifp.socials
						this.contacts = this.ifp.contacts
						this.logo = api + this.ifp.logo
	
						this.ready = true
					}
					else
						this.$router.go(-1)
						
				}).catch(e => console.log(`${e} inaccessible`))
			}
            else
                this.$root.createError(this.content.ErrorMessages[3], 'oops')
        })

        return {
            ready: this.ready,
            content: this.$root.content.InvestFundProfile,
            commonContent: this.$root.content.common,

            description: this.description,
            website: this.website,
            socials: this.socials,
            contacts: this.contacts,
            logo: this.logo,
            socialLogos: socialLogos,

            watchButtonClass: this.watchButtonClass
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