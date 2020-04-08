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
                                            <div class="inline hover fat underline" v-on:click="$root.showBCrequesttoast(el, index)">
                                                <img class="inline small-link-icon" src="../assets/img/contact.png" width="20px">
                                                {{$root.content.requestMyBusinessCard}}
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
            vipMembers: this.vipMembers,
        }
    },
    methods: {
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