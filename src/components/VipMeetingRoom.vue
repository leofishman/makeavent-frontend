<template>
    <div v-if="displayContent">
        <navbar></navbar>
        <b-container fluid="sm">
            <b-card
                v-for="(el, index) in vipMembers" :key="index"
                footer-bg-variant="outline-warning"
                style="max-width:100%; margin-top:50px;"
            >
                <b-card-body class="canclick">
                    <b-row no-gutters>
                        <b-col md="2" style="text-align:center">
                            <img class="contact-photo" :src="el.photo" alt="">
                        </b-col>
                        <b-col md="10">
                            <b-row>
                                <b-col md="8">
                                    <div style="font-size:32px">
                                        {{el.name + ' ' + el.role + ' at ' + el.company}}
                                    </div>
                                    <b-row style="margin-top:20px;">
                                        <b-col>
                                            <div class="inline hover fat underline" v-on:click="openRequestContactModal(el)">
                                                <img class="inline small-link-icon" src="../assets/img/contact.png" width="20px">
                                                {{$root.content.requestMyBusinessCard}}
                                            </div>
                                        </b-col>
                                        <b-col>
                                            <div class="underline">
                                                <b-link class="hover fat" target="_blank" :href="el.calendly">
                                                    <img class="inline small-link-icon" src="../assets/img/phone.svg" width="20px">
                                                    {{$root.content.sheduleAprivateCall}}
                                                </b-link>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col md="4" style="margin:auto;">
                                    <div v-if="el.booth">
                                        <div class="inline hover fat right-links" v-on:click="openPage(el.booth)">
                                            <img class="inline small-link-icon" src="../assets/img/booth.png">
                                            {{$root.content.findInEbooth}}
                                        </div>
                                    </div>
                                    <div v-if="el.speaker">
                                        <div class="inline hover fat right-links" v-on:click="openPage(el.speaker)">
                                            <img class="inline small-link-icon" src="../assets/img/speaker.png">
                                            {{$root.content.findInSpeakers}}
                                        </div>
                                    </div>
                                    <div v-if="el.workshop">
                                        <div class="inline hover fat right-links" v-on:click="openPage(el.workshop)">
                                            <img class="inline small-link-icon" src="../assets/img/worksshop.png">
                                            {{$root.content.findInWorkshop}}
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-card-body>
            </b-card>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
import {host, self} from '../env'
import Sponsors from '../sponsors'
import Speakers from '../speakers'
import Workshop from '../workshop'

export default {
    data() {
        this.vipMembers = []
        this.activiness = []

        let timer = setInterval(async () => {
            if (this.$root.usertype && this.$root.token) {
                clearInterval(timer)
                
                if ( this.verifyVip() ) {
                    await this.getVipMembers()
                    this.adInfoToSpeakers()

                    this.displayContent = true
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
            return new Promise((resolve, reject) => {
                axios.get(`${host}/getusers/vip`, {
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
                if (Sponsors[el.company.toUpperCase()]) {
                    const companyName = el.company.toUpperCase()
                    const company = Sponsors[companyName]

                    Object.values(company.contacts).map((contact, index) => {
                        if (contact.email == el.email) {
                            el.photo = require(`../assets/img/sponsors/${companyName}/contact${index+1}.png`)
                            el.booth = `${self}/${this.$root.token}/company?name=${companyName.toLowerCase()}`
                        }
                    })

                    Speakers.map(speaker => {
                        if (speaker.email == el.email) {
                            if (!el.photo)
                                el.photo = require(speaker.photo)
                            
                            el.speaker = `1`
                        }
                    })

                    Workshop.map(workshoper => {
                        if (workshoper.email == el.email) {
                            if (!el.photo)
                                el.photo = require(workshoper.photo)
                            
                            el.workshop = `1`
                        }
                    })
                }
            })
        },

        async openRequestContactModal (el) {
            if (el.email != this.$root.profile.email) {
                try {
                    const response = await axios.post(host + "/isSafeSharing", {
                        from: this.$root.profile,
                        to: el
                    })

                    window.EventBus.$emit('request_contact_confirmed', response.data)
                }
                catch (e) {
                    const content = this.$root.content
                    const question = content.areYouSure
                    + " " + content.request
                    + " " + el.name.split(' ')[0] + '`s'
                    + " " + content.businessCard

                    let note = content.requestContact(el.name.split(' ')[0])
                    note = this.$root.convertContentWithLineBreaks(note)
                    
                    this.$bvModal.msgBoxConfirm([note], {
                        title: question,
                        size: 'md',
                        buttonSize: 'md',
                        okVariant: 'primary',
                        okTitle: content.yes,
                        cancelTitle: content.no,
                        footerClass: 'p-2',
                        hideHeaderClose: false,
                        noCloseOnBackdrop: true,
                        noCloseOnEsc: true,
                        centered: true
                    })
                    .then(value => {
                        if (value)
                            window.io.emit('request_contact_information', {
                                from: this.$root.profile,
                                to: el
                            })
                        
                    })
                    .catch(e => {
                        console.log(e)
                    })
                }
            }
        },

        openPage (link) {
            this.$router.push(link.split(self)[1])
        }
    },
}
</script>
<style lang="css">
    .right-links { 
        color: #00008bb5;
        margin-bottom: 5px;
    }
    .underline {
        border-bottom: 1px solid black;
        width: 90%;
        text-align: center;
        margin: auto
    }
    .fat {
        font-size:16px;
    }
    .fat:hover {
        text-decoration: none;
    }
    .fat a {
        color: black
    }
    .fat a:hover {
        cursor: pointer;
        font-size: 16px;
        color: black;
        text-decoration: none;
    }
    .small-link-icon {
        width: 20px;
        opacity: 0.6;
        margin-right:5px;
    }
    .inline {
        display:inline-block
    }
</style>