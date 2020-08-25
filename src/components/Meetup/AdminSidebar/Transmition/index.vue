<template>
  <section>
      <item class="admin-bar__shortcuts">
            <p class="admin-bar__list-item-header" slot="header">{{this.$root.content.adminSidebar.items.transmition.title}}</p>
            <template slot="inner">
                <meetup-room class="admin-bar__switcher" />
                <select-time class="admin-bar__switcher"/>
                <networking-room class="admin-bar__switcher" />
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'

import MeetupRoom from './MeetupRoom'
import NetworkingRoom from './NetworkingRoom'
import SelectTime from './SelectTime'

export default {
    components: {
        Item,
        MeetupRoom,
        NetworkingRoom,
        SelectTime
    }
}
</script>