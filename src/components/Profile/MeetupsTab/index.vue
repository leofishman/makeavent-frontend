<template>
    <div >
        <h3 class="title">{{content.title}}</h3>
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
                <CreateNewButton />
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

export default {
    name: "Meetups",
    components: {
        CreateNewButton,
        MeetupsRow
    },
    data() {
        this.isJoinedMeetup()
            ? this.filterMeetupsOnlyAdminStatus()
            : null;

        return {
            content: this.$root.content.ProfileMeetupsTabs,
            global_content: this.$root.content.common,

            activeTab: 0,
            filteredOnlyAdmin: [],
            loadedMeetups: [],

            ready: false,
        }
    },
    methods: {
        getMeetup (id) {
            return new Promise(async (resolve, reject) => {
                await Axios.get(MEETUP.getById + "?id=" + id, {
                    headers: {
                        authorization: localStorage.auth
                    }
                })
                .then(res => {
                    this.loadedMeetups.push(res.data.meetup)
                    window.EventBus.$emit(`MeetupsRow:cachedChanged`)
                    resolve(res.data.meetup.admins)
                })
                .catch(err => {
                    this.$root.profile.meetups = this.$root.profile.meetups.filter(el => el != id)
                })
            })
        },

        async filterMeetupsOnlyAdminStatus () {
            this.ready             = false
            this.filteredOnlyAdmin = []
            this.loadedMeetups     = []

            const promises = this.$root.profile.meetups.map(async meetupId => new Promise(async (resolve, reject) => {
                const admins = await this.getMeetup(meetupId)
                if ( admins.includes(this.$root.profile._id) ) {
                    this.filteredOnlyAdmin.push(this.loadedMeetups.filter(el => el._id == meetupId)[0])
                }

                resolve(true)
            }))
            await Promise.all(promises)

            this.filteredOnlyAdmin = this.util.sortArrayBy(this.filteredOnlyAdmin, 'meetup_name')
            this.loadedMeetups     = this.util.sortArrayBy(this.loadedMeetups, 'meetup_name')

            this.ready = true
        },

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
    watch: {
        "$root.profile" : async function (_old, _new) {
            if ( !_old.meetups.equals(_new.meetups) )
                this.filterMeetupsOnlyAdminStatus()
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