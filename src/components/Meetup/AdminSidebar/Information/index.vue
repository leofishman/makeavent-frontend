<template>
  <section>
      <item class="admin-bar__info">
            <p class="admin-bar__list-item-header" slot="header">{{content.title}}</p>
            <template slot="inner">
                <active-button @clicked="editMeetup" class="admin-bar__button" :name="content.buttons.meetup"/>
                <active-button @clicked="openDocuments" class="admin-bar__button" :name="content.buttons.documents"/>
                <active-button @clicked="openDemos" class="admin-bar__button" :name="content.buttons.demos"/>
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'

import EditDocuments from '@/components/PopupForms/meetup/stuff-popup-form/edit/'
import EditMeetup from '@/components/PopupForms/meetup/edit-form/'
import EditDemo from '@/components/PopupForms/meetup/demo-popup-form/edit'

import {ActiveButton} from '@/components/Global/controll/'

export default {
    props: {
        id: String
    },
    components: {
        ActiveButton, Item, EditDocuments, EditMeetup, EditDemo
    },
    methods: {
        openDocuments(){
            let popup = this.$buefy.modal.open({
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                component: EditDocuments,
                parent: this
            })
            window.EventBus.$on('MaterialsPopup:close', popup.close)
        },
        editMeetup(){
            let popup = this.$buefy.modal.open({
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                component: EditMeetup,
                props: {
                    id: this.id
                },
                parent: this
            })
            window.EventBus.$on('EditMeetupForm:close', popup.close)
        },
        openDemos () {
            let popup = this.$buefy.modal.open({
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                component: EditDemo,
                parent: this
            })
            window.EventBus.$on('DemoPopupForm:close', popup.close)
        }
    },
    data(){
        return {
            content: this.$root.content.adminSidebar.items.information,
            showDocuments: false
        }
    }
}
</script>
