<template>
  <section>
      <item class="admin-bar__share">
            <p class="admin-bar__list-item-header" slot="header">Share</p>
            <template slot="inner">
                <in-active-button class="admin-bar__button" :name="'Copy link to Clipboard'"/>
                <in-active-button class="admin-bar__button" :name="'Send Email Invitations'"/>
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
    components: {
        Socials,
        InActiveButton,
        Item,
    }
}
</script>
