<template>
  <section>
      <item class="admin-bar__speakers">
            <p class="admin-bar__list-item-header" slot="header">{{$root.content.adminSidebar.items.speakers.title}}</p>
            <template slot="inner">
                <div class="admin-bar__speakers-list">
                    <BackstageControls 
                        :Speakers="$root.meetup.speakers"
                        :parent="this"
                    />

                    <template v-if="speakers">
                        <div class="admin-bar__speakers-cards">
                            <speaker-card 
                                v-for="(item, index) of speakers"
                                :key="index"
                                :speaker="item"
                            />
                        </div>
                    </template>
                    <active-button @clicked="openAddFrom" class="admin-bar__button" :name="$root.content.adminSidebar.items.speakers.buttons.add"/>
                </div>
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'
import {ActiveButton} from '@/components/Global/controll/'

import BackstageControls from '@/components/Meetup/AdminSidebar/BackstageControls'
import InviteForm from '@/components/PopupForms/meetup/invite-popup-form/'
import SpeakerCard from './SpeakerCard'

export default {
    components: {
        ActiveButton, Item,
        SpeakerCard, InviteForm, BackstageControls
    },
    computed: {
        speakers () {
            return this.$store.state.meetupForm.speakers
        }
    },
    methods: {
        openAddFrom(){
            this.$buefy.modal.open({
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                component: InviteForm,
                parent: this
            })
        }
    }
}
</script>

<style>

</style>