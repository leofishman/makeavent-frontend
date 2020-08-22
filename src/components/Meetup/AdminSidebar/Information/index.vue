<template>
  <section>
      <item class="admin-bar__info">
            <p class="admin-bar__list-item-header" slot="header">Information</p>
            <template slot="inner">
                <active-button class="admin-bar__button" :name="'Edit Meetup Info'"/>
                <active-button class="admin-bar__button" :name="'Edit Company Info'"/>
                <active-button @clicked="openDocuments" class="admin-bar__button" :name="'Edit Documents'"/>
                <edit-documents :show="showDocuments" />
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'
import EditDocuments from '@/components/PopupForms/meetup/stuff-popup-form/edit/'
import {ActiveButton} from '@/components/Global/controll/'

export default {
    components: {
        ActiveButton, Item, EditDocuments
    },
    methods: {
        openDocuments(){
            this.showDocuments = true
            this.$forceUpdate()
        }
    },
    data(){
        return {
            showDocuments: false
        }
    }
}
</script>
