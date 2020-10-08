<template>
    <section>
        <item class="admin-bar__shortcuts">
            <p class="admin-bar__list-item-header" slot="header">{{transmition.title}}</p>
            <template slot="inner">
                <close-meetup class="admin-bar__streaming-list-btn" />
                <meetup-room class="admin-bar__switcher" />
                <!-- <select-time class="admin-bar__switcher"/> -->
                <networking-room class="admin-bar__switcher" />
            </template>
        </item>
    </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'

import MeetupRoom from './MeetupRoom'
import NetworkingRoom from './NetworkingRoom'
// import SelectTime from './SelectTime'
import CloseMeetup from './CloseMeetup'

export default {
    components: {
        Item,
        MeetupRoom,
        NetworkingRoom,
        CloseMeetup
        // SelectTime
    },
    data() {
        return {
            transmition: this.$root.content.adminSidebar.items.transmition
        }
    },
}
</script>