<template>
  <div>
    <b-loading 
      slot="switched-header" 
      :is-full-page="false" 
      :active.sync="isLoading" 
      :can-cancel="false"
    />
    <b-field :label="transmition.labels.meetup">  
      <b-switch v-model="openStatus">
        <p v-if="openStatus">{{transmition.placeholders.close}}</p>
        <p v-else>{{transmition.placeholders.opened}}</p>
      </b-switch>
    </b-field>
  </div>
</template>

<script>
import {SwitchComponent} from '@/components/Global/controll/'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    SwitchComponent
  },
  methods: {
    ...mapActions(['toggleMeetupRoom']),
  },
  computed: {
    ...mapGetters({
      meetupRoomOpened: 'meetupRoomOpened'
    }),
    openStatus: {
      get(){
        return this.meetupRoomOpened == "ongoing" ? true : false
      },
      async set(){
        const obj = {
          id: this.$root.meetup._id
        }

        this.isLoading = true
        await this.toggleMeetupRoom(obj)
        this.isLoading = false 
      } 
    }
  },
  data(){
    return {
      transmition: this.$root.content.adminSidebar.items.transmition,

      switcher: this.$store.state.meetupForm.meetupRoomOpened,
      isLoading: false
    }
  }
}
</script>