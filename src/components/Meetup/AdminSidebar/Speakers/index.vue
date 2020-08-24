<template>
  <section>
      <item class="admin-bar__speakers">
            <p class="admin-bar__list-item-header" slot="header">{{this.$root.content.adminSidebar.items.speakers.title}}</p>
            <template slot="inner">
                <div class="admin-bar__speakers-list">
                    <active-button class="admin-bar__button" :name="$root.content.adminSidebar.items.buttons.manage"/>
                    <template v-if="$store.getters.meetupFull.speakers">
                        <div class="admin-bar__speakers-cards">
                            <speaker-card 
                                v-for="(item, index) of $store.getters.meetupFull.speakers"
                                :key="index"
                                :speaker="item"
                            />
                        </div>
                    </template>
                    <active-button @clicked="openAddFrom" class="admin-bar__button" :name="$root.content.adminSidebar.items.buttons.add"/>
                </div>
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'
import {ActiveButton} from '@/components/Global/controll/'

import InviteForm from '@/components/PopupForms/meetup/invite-popup-form/'

import SpeakerCard from './SpeakerCard'

export default {
    components: {
        ActiveButton, Item,
        SpeakerCard, InviteForm
    },
    methods: {
        openAddFrom(){
            this.$buefy.modal.open({
                // fullScreen: true,
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                // customClass: 'modal-dark fullscreen-iframe',
                component: InviteForm,
                parent: this
            })
        }
    }
}
</script>

<style>

</style>