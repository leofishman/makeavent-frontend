<template>
    <div class="meetup-profile attendee-profile">
        <div class="attendee-info">
            <b-loading class="loading-overlay--dark" :is-full-page="false" :active="!ready" :can-cancel="false"></b-loading>

            <div v-if="ready" class="columns only-bot-margin no-border" style="width:100%">
                <div class="column nopadding is-2">
                    <figure class="attendee-avatar">
                        <img v-if="data.image" :src="data.image">
                        <img v-else :src="`${api}/static/img/brand-default.png`">
                    </figure>
                </div>
                <div :class="`column nopadding ${!isEdit ? `is-10` : `is-8`}`">
                    <div class="attendee-text">
                        <div @click="goToMeetup" class="click attendee-name" v-html="data.meetup_name"></div>
                        <div class="meetup-topic" v-html="data.meetup_topic"></div>
                    </div>
                </div>
                <div v-if="isEdit" class="column nopadding is-2">
                    <b-button @click="edit" type="is-primary" class="centrify-content">
                        {{content.edit}}
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {MEETUP} from '@/api/endpoints'
import Axios from 'axios'
import EditForm from '@/components/PopupForms/meetup/edit-form/'

export default {
    name: "MeetupsRow",
    props: {
        data: Object,
        isEdit: Boolean
    },
    data() {
        return {
            content: this.$root.content.ProfileMeetupsTabs.MeetupsRow,
            global_content: this.$root.content.common,

            activeTab: 1,
            ready: true
        }
    },
    methods: {
        edit () {
            let popup = this.$buefy.modal.open({
                component: EditForm,
                props: {
                    id: this.data._id
                },
                parent: this,
                canClose: true
            })

            window.EventBus.$on('EditMeetupForm:close', popup.close)
        },

        goToMeetup () {
            this.$router.push({
                name: "Meetup",
                query: {
                    id: this.data._id
                }
            }).catch(() => {
                window.location.reload()
            })
        }
    }
}
</script>
<style lang="scss">
    .meetups-card-container {
        .meetup-profile {
            margin: 0px 0px 10px 0px;
            min-height: 60px;
            position: relative;
            display: block;
            .meetup-topic {
                font-weight: 400;
                overflow-y: hidden;
                max-height: 50px;
                margin: 0px 0px 10px 0px;
            }
        }
    }
    .no-border {
        .column {
            border-left: none !important;
        }
    }
</style>