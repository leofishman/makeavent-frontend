<template>
    <div >
        <div class="columns create-meetup-column">
            <div class="column">
                <h3 class="title">{{content.title}}</h3>
            </div>
            <div class="column">
                <CreateNewButton />
            </div>
        </div>
        <b-tabs v-model="activeTab">
            <b-tab-item :label="content.my">
                <b-loading v-if="isJoinedMeetup()" class="loading-overlay--dark" :is-full-page="false" :active="!ready" :can-cancel="false"></b-loading>

                <div class="meetups-card-container"  v-if="ready && isJoinedMeetup()">
                    <MeetupsRow
                        v-for="(el, index) in loadedMeetups"
                        :key="index"
                        :data="el"
                        :isEdit="false" />
                </div>
                <div v-else v-html="content.noMeetups"></div>
            </b-tab-item>

            <b-tab-item :label="content.created">
                <b-loading v-if="isJoinedMeetup()" class="loading-overlay--dark" :is-full-page="false" :active="!ready" :can-cancel="false"></b-loading>
                <div class="meetups-card-container" v-if="ready && isJoinedMeetup()">
                    <MeetupsRow
                        v-for="(el, index) in filteredOnlyAdmin"
                        :key="index"
                        :data="el"
                        :isEdit="true" />
                </div>
                <div v-else v-html="content.noMeetupsCreate"></div>
            </b-tab-item>
        </b-tabs>
    </div>
</template>
<script>
import {MEETUP} from '@/api/endpoints'
import Axios from 'axios'

import CreateNewButton from './CreateNewButton'
import MeetupsRow from './MeetupsRow'
import LoginWithNewPasswordVue from '../../Auth/LoginWithNewPassword.vue'
import { mapGetters } from 'vuex'

export default {
    name: "Meetups",
    components: {
        CreateNewButton,
        MeetupsRow
    },
    data() {
        return {
            content: this.$root.content.ProfileMeetupsTabs,
            global_content: this.$root.content.common,

            activeTab: 0,
        }
    },
    async mounted() {
        this.isJoinedMeetup()
        ? this.filterMeetupsOnlyAdminStatus().then(func => {
                func(this.$root.profile)
            })
        : null  
    },
    methods: {
        ...mapGetters(['filterMeetupsOnlyAdminStatus']),
        isJoinedMeetup () {
            if ( this.$root.profile.meetups ) {
                if ( this.$root.profile.meetups.length )
                    return true
                else
                    return false
            }
            else
                return false
        }
    },
    computed: {
        filteredOnlyAdmin () {
            return this.$store.state.profile.filteredOnlyAdmin
        },
        loadedMeetups () {
            return this.$store.state.profile.loadedMeetups
        },
        ready () {
            return this.$store.state.profile.meetupTabsReady
        }
    },
    watch: {
        "$root.profile" : async function (_old, _new) {
            if ( !_old.meetups.equals(_new.meetups) )
                this.filterMeetupsOnlyAdminStatus().then(func => {
                    func(this.$root.profile)
                })
        }
    },
}
</script>
<style lang="scss">
    .meetups-card-container {
        max-height: 270px;
        overflow-y: auto;
    }
</style>