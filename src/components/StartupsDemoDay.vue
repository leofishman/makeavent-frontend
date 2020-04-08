<template>
    <div>
        <navbar></navbar>

        <b-row style="margin-top:50px" class="justify-content-center">
            <b-col md="2"></b-col>
            <b-col md="3">
                <div
                    v-on:click="openStartupProfile('0')" class="hall-block" style="background:black">
                    <img
                        v-if="getStartupProfile('0')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('0').logo"
                    >
                </div>

                <div
                    v-on:click="openStartupProfile('1')" class="hall-block" style="margin-top:50px">
                    <img
                        v-if="getStartupProfile('1')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('1').logo"
                    >
                </div>

                <div
                    v-on:click="openStartupProfile('2')" class="hall-block" style="margin-top:50px">
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
                    v-on:click="openStartupProfile('3')" class="hall-block">
                    <img
                        v-if="getStartupProfile('3')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('3').logo"
                    >
                </div>

                <div
                    v-on:click="openStartupProfile('4')" class="hall-block" style="margin-top:50px">
                    <img
                        v-if="getStartupProfile('4')"
                        class="absolute-bg-image"
                        style="width:90%; opacity: 1"
                        :src="host + getStartupProfile('4').logo"
                    >
                </div>

                <div
                    v-on:click="openStartupProfile('5')" class="hall-block" style="margin-top:50px">
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
                    <div class="button" v-on:click="$router.push(`/${$root.token}/ddpb`)">
                        {{content.ddpb}}
                    </div>
                    <div class="button investors">
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
        return {
            host: host,
            show: true,
            content: this.$root.content.StartupsDemoDay
        }
    },
    methods: {
        getStartupProfile (id) {
            return this.$root.Startups[id]
        },

        openStartupProfile (id) {
            const name = this.$root.Startups[id].name.toLowerCase()
            this.$router.push({
                path: `/${this.$root.token}/startupsdemoday/${name}`
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>
<style lang="css">
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