<template>
    <div>
        <navbar></navbar>

        <b-row style="margin-top:20px;">
            <b-col class="fund-profile" v-on:click="openInvestorBooth('COINSILLIUM')">
                <img class="centrify" style="width:100%; position:relative" :src="getFundLogo('COINSILLIUM.png')" alt="">
            </b-col>
            <b-col class="fund-profile" v-on:click="openInvestorBooth('ANGEL VEST')">
                <img class="centrify" style="width:100%; position:relative" :src="getFundLogo('ANGEL VEST.png')" alt="">
            </b-col>
            <b-col class="fund-profile" v-on:click="openInvestorBooth('UVECON')">
                <img class="centrify" style="width:100%; position:relative" :src="getFundLogo('UVECON.png')" alt="">
            </b-col>
            <b-col class="fund-profile" v-on:click="openInvestorBooth('FAS')">
                <img class="centrify" style="width:100%; position:relative" :src="getFundLogo('FAS.png')" alt="">
            </b-col>
        </b-row>

        <b-row style="margin-top:50px" class="justify-content-center">
            <b-col md="2"></b-col>
            <b-col md="3">
                <div
                    v-on:click="openStartupProfile('0')"
                    class="hall-block"
                    style="background:black"
                >
                    <img
                        v-if="getStartupProfile('0')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('0').logo"
                    >
                </div>

                <div
                    v-on:click="openStartupProfile('1')"
                    class="hall-block"
                    style="margin-top:50px"
                >
                    <img
                        v-if="getStartupProfile('1')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('1').logo"
                    >
                </div>

                <div
                    v-on:click="openStartupProfile('2')"
                    class="hall-block"
                    style="margin-top:50px"
                >
                    <img
                        v-if="getStartupProfile('2')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('2').logo"
                    >
                </div>
            </b-col>
            <b-col md="3">
                <div
                    v-on:click="openStartupProfile('3')"
                    class="hall-block">
                    <img
                        v-if="getStartupProfile('3')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('3').logo"
                    >
                </div>

                <div
                    v-on:click="openStartupProfile('4')"
                    class="hall-block"
                    style="margin-top:50px"
                >
                    <img
                        v-if="getStartupProfile('4')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('4').logo"
                    >
                </div>

                <div
                    v-on:click="openStartupProfile('5')"
                    class="hall-block"
                    style="margin-top:50px"
                >
                    <img
                        v-if="getStartupProfile('5')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('5').logo"
                    >
                </div>        
            </b-col>
            <b-col>
                <div class="right-menu">
                    <div
                        class="button"
                        v-on:click="$router.push(`/${$root.token}/ddpb`)"
                    >
                        {{content.ddpb}}
                    </div>

                    <div
                        v-if="$root.cloo($root.usertype, 'investor|startup')"
                        class="button investors"
                        v-on:click="$router.push(`/${$root.token}/investors`)"
                    >
                        {{content.investors}}
                    </div>
                </div>  
            </b-col>
        </b-row>
    </div>
</template>
<script>
import {host} from '../env'
export default {
    data() {
        this.content = this.$root.content.StartupsDemoDay
        return {
            host: host,
            show: true,
            content: this.content
        }
    },
    methods: {
        getStartupProfile (id) {
            return this.$root.Startups[id]
        },

        getFundLogo(img) {
            return host + '/static/img/InvestmentFunds/' + img
        },

        openStartupProfile (id) {
            const name = this.$root.Startups[id].name.toLowerCase()
            if (this.$root.cloo(this.$root.usertype, 'investor')) {
                this.$router.push({
                    path: `/${this.$root.token}/sip/${name}`
                }).catch(e => {
                    console.log(e)
                })
            }
            // only investor can see startup investment profile
            else {
                this.$router.push({
                    path: `/${this.$root.token}/company?name=${name}`
                }).catch(e => {
                    console.log(e)
                })
            }
        },

        openInvestorBooth (name) {
            this.$router.push({
                name: "InvestFundProfile",
                query: {
                    name: name.toLowerCase()
                }
            })
        }
    },
}
</script>
<style lang="css">
    .fund-profile {
        padding:50px;
    }
    .fund-profile:hover {
        cursor: pointer;
    }
    .right-menu {
        height: calc(100% + 50px);
        background: white;
        margin-top: -50px;
        padding: 50px 0px;
        text-align: right;
        max-width: 300px;
        display: block;
        position: relative;
        margin-left: auto;
    }
    .right-menu .button {
        color: white;
        background: blue;
        padding: 20px;
        font-weight: 600;
        margin-top: 10px;
        font-size: 20px;
    }
    .right-menu .investors {
        background: #bd8800;
        color: white;
        padding: 20px;
        font-weight: 600;
        margin-top: 10px;
        font-size: 20px;
    }
    .button:hover {
        cursor: pointer;
    }
    .investors:hover {
        cursor: pointer;
    }
</style>