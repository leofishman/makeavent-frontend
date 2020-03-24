<template>
    <div v-if="displayContent">
        <b-container>
            <b-card
                v-for="(el, index) in vipMembers" :key="index"
                footer-bg-variant="outline-warning"
                style="max-width:100%"
            >
                <b-card-title v-on:click="requestContact(el)" class="canclick">
                    <b-row no-gutters>
                        <b-col md="3">
                            <img :src="el.photo" alt="">
                        </b-col>
                        <b-col md="9">
                            {{el.name + ' ' + el.role + ' at ' + el.company}}
                        </b-col>
                    </b-row>
                </b-card-title>
            </b-card>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
import {host} from '../env'
import Sponsors from '../sponsors'

export default {
    data() {
        this.vipMembers = []

        let timer = setInterval(() => {
            if (this.$root.usertype && this.$root.token) {
                clearInterval(timer)
                
                if ( this.verifyVip() ) {
                    this.getVipMembers()
                }
            }
        })

        return {
            displayContent: false,
            vipMembers: this.vipMembers
        }
    },
    methods: {
        verifyVip () {
            if (this.$root.usertype != "vip") {
                const h = this.$createElement
                
                const titleVNode = h('div', { domProps: { innerHTML: this.$root.content.oops } })
                
                const messageVNode = this.$root.convertContentWithLineBreaks(this.$root.content.onlyForVIP('VIP e-MEETING ROOM'))
                
                this.$bvModal.msgBoxConfirm([messageVNode], {
                    title: [titleVNode],
                    buttonSize: 'md',
                    centered: true,
                    size: 'md',
                    okTitle: this.$root.content.yes,
                    cancelTitle: this.$root.content.no,
                    noCloseOnBackdrop: true,
                    noCloseOnEsc: true
                }).then(trigger => {   
                    if (trigger) {
                        // were?
                    }
                    else
                        this.$router.back()
                })
            }
            return true
        },

        getVipMembers () {
            axios.get(`${host}/getusers/vip`, {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                this.vipMembers = res.data
                this.adjustPhotoToSpeakers()

                this.displayContent = true
            })
            .catch(e => {

            }) 
        },

        adjustPhotoToSpeakers () {
            this.vipMembers.map(el => {
                if (Sponsors[el.company.toUpperCase()]) {
                    const companyName = el.company.toUpperCase()
                    const company = Sponsors[companyName]

                    Object.values(company.contacts).map((contact, index) => {
                        if (contact.email == el.email)
                            el.photo = require(`../assets/img/sponsors/${companyName}/contact${index+1}.png`)
                    })
                }
            })
        }
    },
}
</script>
<style lang="css">
    
</style>