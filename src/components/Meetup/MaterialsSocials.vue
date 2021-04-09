<template>
  <section> 
      <active-button @clicked="openDocuments" class="admin-bar__button" :name="content.buttons.documents"/>
      <active-button @clicked="openSocials" class="admin-bar__button" :name="content.buttons.socials"/>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'

import EditDocuments from '@/components/PopupForms/meetup/stuff-popup-form/edit/'
import EditSocials from '@/components/PopupForms/meetup/socials-popup-form/edit'

import {ActiveButton} from '@/components/Global/controll/'

export default {
    name: "MaterialsSocials",
    props: {
        id: String
    },
    components: {
        ActiveButton, Item, EditDocuments
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
        openSocials () {
            let popup = this.$buefy.modal.open({
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                component: EditSocials,
                parent: this
            })
            window.EventBus.$on('SocialsPopupForm:close', popup.close)
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
