<template>
  <section>
      <item class="admin-bar__share">
            <p class="admin-bar__list-item-header" slot="header">{{this.$root.content.adminSidebar.items.share.title}}</p>
            <template slot="inner">
                <in-active-button @clicked="copy" class="admin-bar__button" :name="$root.content.adminSidebar.items.share.buttons.clipboard"/>
                <in-active-button class="admin-bar__button" :name="$root.content.adminSidebar.items.share.buttons.invitations"/>
                <input :value="link" class="input-disabled__inner" type="text">
                <socials/>
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'
import {InActiveButton} from '@/components/Global/controll/'
import Socials from './Socials'

export default {
    mounted(){
        var copyText = document.querySelector('.admin-bar__share .input-disabled__inner')
        copyText.value = this.link
    },
    components: {
        Socials,
        InActiveButton,
        Item,
    },
    methods: {
        copy(){            
            var copyText = document.querySelector('.admin-bar__share .input-disabled__inner')
            copyText.value = this.link
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            /* Copy the text inside the text field */
            document.execCommand("copy");

            this.$buefy.notification.open({
                duration: 3000,
                position: 'is-bottom-left',
                message: this.clipboard,
            })
        }
    },
    computed: {
        link(){
            return window.location.href
        }
    }
}
</script>
