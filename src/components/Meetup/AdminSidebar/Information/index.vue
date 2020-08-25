<template>
  <section>
      <item class="admin-bar__info">
            <p class="admin-bar__list-item-header" slot="header">{{this.$root.content.adminSidebar.items.information.title}}</p>
            <template slot="inner">
                <active-button @clicked="openMeetups" class="admin-bar__button" :name="$root.content.adminSidebar.items.information.buttons.meetup"/>
                <active-button class="admin-bar__button" :name="$root.content.adminSidebar.items.information.buttons.company"/>
                <active-button @clicked="openDocuments" class="admin-bar__button" :name="$root.content.adminSidebar.items.information.buttons.documents"/>
                <!-- <edit-documents /> -->
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'

import EditDocuments from '@/components/PopupForms/meetup/stuff-popup-form/edit/'
import EditMeetup from '@/components/PopupForms/meetup/edit-form/'

import {ActiveButton} from '@/components/Global/controll/'

export default {
    components: {
        ActiveButton, Item, EditDocuments, EditMeetup
    },
    methods: {
        openDocuments(){
            this.$buefy.modal.open({
                // fullScreen: true,
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                // customClass: 'modal-dark fullscreen-iframe',
                component: EditDocuments,
                parent: this
            })
        },
        openMeetups(){
            this.$buefy.modal.open({
                // fullScreen: true,
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                // customClass: 'modal-dark fullscreen-iframe',
                component: EditMeetup,
                parent: this
            })
        }
    },
    data(){
        return {
            showDocuments: false
        }
    }
}
</script>
