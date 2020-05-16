<template>
    <div id="vip">
        <navbar></navbar>

        <div class="container">

            <Pagetitle data="VIP e-meeting room"/>

            <section class="section section-vip">
                <div class="columns is-multiline">
                    <div v-if="displayContent" class="column is-full">
                        <Viprow 
                            v-for="(el, index) in vipMembers" :key="index"
                            :data="el"
                        />
                    </div>
                </div>

            </section>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {host, self} from '@/env'
import Viprow from './Viprow'

export default {
    components: {
        Viprow
    },
    data() {
        this.vipMembers = []
        this.activiness = []

        this.$root.check('usertype token Sponsors activeBusinessCards').then(async _ => {
            if ( this.verifyVip() ) {
                await this.getVipMembers()
                this.adInfoToSpeakers()

                this.displayContent = true
            }
            // else {
            //     this.$router.push('/')
            // }
        }).catch(e => console.log(`${e} inaccessible`))

        return {
            displayContent: false,
            vipMembers: this.vipMembers,
            content: this.$root.content.VipMeetingRoom
        }
    },
    methods: {
        verifyVip () {
            if (this.$root.cloo(toUp(this.$root.usertype), toUp('vip|media|startup|investor'))) {
                return true
            }
            else 
                this.$root.showMessageToUpgradeStrict('VIP e-MEETING ROOM', 'vip')
        },

        getVipMembers () {
            return new Promise((resolve, reject) => {
                axios.get(`${host}/users/vip`, {
                    headers: {
                        authorization: localStorage.auth
                    }
                })
                .then(res => {
                    this.vipMembers = res.data
                    this.vipMembers.sort(function(a, b){
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                    })
                    resolve(true)
                })
                .catch(e => {
    
                }) 
            })
        },

        adInfoToSpeakers () {
            this.vipMembers.map(el => {
                if (!el.photo)
                    el.photo = host + this.$root.tryGetProfilePhoto(el.email)
                else
                    el.photo = host + el.photo
            })
        },

        openPage (type, link) {
            switch (type) {
                case 'sponsor' :
                    this.$router.push({
                        name:"Company",
                        query: {
                            name: link
                        }
                    })
                    break;

                case 'speaker' :
                    this.$router.push({ name: "Agenda" })
                    break;

                case 'workshop' :
    
                case 'mediapartner' :
                    this.$router.push({
                        name: "MediaPartnerProfile",
                        params: {
                            name: link
                        }
                    })
                    break;

                case 'startup' : 
                    if (this.$root.cloo(toUp(this.$root.usertype), toUp('investor')))
                        this.$router.push({
                            name: "StartupProfile",
                            params: {
                                name: link
                            }
                        })
                    else
                        this.$router.push({
                            name:"Company",
                            query: {
                                name: link
                            }
                        })
                    break;

                case 'investfund' :
                    if (this.$root.cloo(toUp(this.$root.usertype), toUp('investor|startup|media'))) {
                        this.$router.push({
                            name: "InvestFundProfile",
                            query: {
                                name: link
                            }
                        })
                    }
            }
        }
    },
}
</script>