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
					</div>

					<!-- Profile bio -->
					<div class="column is-two-third profile-bio">
						<div class="columns is-multiline">
                            <div class="column is-one-third padding-top-20" v-for="(el, index) in contacts" :key="index">
                                <Member :data="el"/>
                            </div>
                        </div>
						<div class="tile is-ancestor">
							<div class="tile is-vertical">

								<!-- Bio text -->
								<div class="tile is-parent">
									<article>
                                        <p v-html="description"></p>
									</article>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
<script>
import socialLogos from '@/assets/img/socials'
import {host} from '@/env'
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
		
		this.$root.checkComponentAccess('startupdemoday')
        .then(res => {
            if (res) {
				this.$root.check('InvestFunds').then(() => {
					this.ifp = this.$root.InvestFunds.filter(el => compare(el.name, this.name))[0]
					
					if (this.ifp) {
						this.description = this.ifp.description
						this.website = this.ifp.website
						this.socials = this.ifp.socials
						this.contacts = this.ifp.contacts
						this.logo = host + this.ifp.logo
	
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
        
    },
}
</script>