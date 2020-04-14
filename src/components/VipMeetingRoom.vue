<template>
    <div v-if="displayContent">
        <navbar></navbar>
        <b-container fluid="sm" style="width:1250px">
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
                                    <b-row v-if="$root.isThatMe(el.email)">
                                        It is you
                                    </b-row>
                                    <b-row v-else style="margin-top:20px;">
                                        <b-col>
                                            <div v-if="!checkIfAlreadyAFriend(el)" class="inline hover fat underline" v-on:click="$root.showBCrequesttoast(el, index)">
                                                <img class="inline small-link-icon" src="../assets/img/contact.png" width="20px">
                                                {{$root.content.requestMyBusinessCard}}
                                            </div>
                                            <div v-else>
                                                {{$root.content.common.alreadyConnected}}
                                            </div>
                                            <b-toast
                                                :id="`req-contact-toast-${el._id}-${index}`"
                                                :title="$root.content.reqBusCardConfirm"
                                                static
                                                no-auto-hide
                                            >
                                                <b-button
                                                    style="
                                                        line-height:normal;
                                                        margin-left: auto;
                                                        display: block;
                                                    "
                                                    v-on:click="$root.openRequestContactModal(`req-contact-toast-${el._id}-${index}`, el)"
                                                    variant="primary"
                                                >{{$root.content.yes}}
                                                </b-button>
                                            </b-toast>
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
                                    <div v-if="el.sponsors">
                                        <div class="inline hover fat right-links" v-on:click="openPage('sponsor', el.sponsors)">
                                            <img class="inline small-link-icon" src="../assets/img/booth.png">
                                            {{content.findInEbooth}}
                                        </div>
                                    </div>
                                    <div v-if="el.speakers">
                                        <div class="inline hover fat right-links" v-on:click="openPage('speaker', el.speakers)">
                                            <img class="inline small-link-icon" src="../assets/img/speaker.png">
                                            {{content.findInSpeakers}}
                                        </div>
                                    </div>
                                    <div v-if="el.workshop">
                                        <div class="inline hover fat right-links" v-on:click="openPage('workshop', el.workshop)">
                                            <img class="inline small-link-icon" src="../assets/img/worksshop.png">
                                            {{content.findInWorkshop}}
                                        </div>
                                    </div>
                                    <div v-if="el.mediapartner">
                                        <div class="inline hover fat right-links" v-on:click="openPage('mediapartner', el.mediapartner)">
                                            <img class="inline small-link-icon" src="../assets/img/worksshop.png">
                                            {{content.findInMediaPartner}}
                                        </div>
                                    </div>
                                    <div v-if="el.startup && $root.usertype == 'investor'">
                                        <div class="inline hover fat right-links" v-on:click="openPage('startup', el.startup)">
                                            <img class="inline small-link-icon" src="../assets/img/worksshop.png">
                                            {{content.findInStartups}}
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

export default {
    data() {
        this.vipMembers = []
        this.activiness = []

        this.$root.check('usertype token Sponsors activeBusinessCards').then(async _ => {
            if ( this.verifyVip() ) {
                await this.getVipMembers()
                this.adInfoToSpeakers()

                this.displayContent = true
            }  
        })

        return {
            displayContent: false,
            vipMembers: this.vipMembers,
            content: this.$root.content.VipMeetingRoom
        }
    },
    methods: {
        checkIfAlreadyAFriend (card) {               
            if (this.$root.activeBusinessCards.filter(el => el._id == card._id ).length)
                return true
            else
                return false
        },

        verifyVip () {
            if (this.$root.usertype == "vip" || this.$root.usertype == "media" || this.$root.usertype == "startup" || this.$root.usertype == "investor") {
                return true
            }
            else 
                this.$root.showMessageToUpgrade('VIP e-MEETING ROOM', 'VIP')
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
                    if (this.$root.cloo(this.$root.usertype, 'investor'))
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
            }
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