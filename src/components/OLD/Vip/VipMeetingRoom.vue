<template>
    <div id="vip">
        <navbar></navbar>

        <div class="container is-fluid">

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
import {api, self} from '@/env'
import Viprow from './Viprow'

export default {
    components: {
        Viprow
    },
    data() {
        this.vipMembers = []
        this.activiness = []

        this.$root.check('usertype Sponsors activeBusinessCards').then(async _ => {
            if ( this.verifyVip() ) {
                await this.getVipMembers()
                this.adInfoToSpeakers()

                /**
                 * loop updating vips
                 */
                setInterval(async () => {
                    await this.getVipMembers()
                    this.adInfoToSpeakers()
                }, 60000)

                this.displayContent = true
            }
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
                axios.get(`${api}/users/vip`, {
                    headers: {
                        authorization: localStorage.auth
                    }
                })
                .then(res => {
                    const decrypted = res.data
                    this.vipMembers = decrypted
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
                    el.photo = api + this.$root.tryGetProfilePhoto(el.email)
                else
                    el.photo = api + el.photo
            })
        },
    },
}
</script>
