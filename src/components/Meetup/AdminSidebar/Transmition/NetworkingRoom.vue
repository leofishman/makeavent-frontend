<template>
  <div>
      <b-loading 
          slot="switched-header" 
          :is-full-page="false" 
          :active.sync="isLoading" 
          :can-cancel="false"
      />
      <b-field :label="'Networking Room'">  
        <b-switch v-model="isSwitched">
          Close
        </b-switch>
      </b-field>
  </div>
</template>

<script>
import {SwitchComponent} from '@/components/Global/controll/'

import {mapActions} from 'vuex'

export default {
    components: {
      SwitchComponent
    },
    watch: {
      isSwitched: async function(){
        const obj = {
          id: this.$root.meetup._id
        }

        this.isLoading = true
        await this.toggleMeetupNetworkingRoom(obj)
        this.isLoading = false
      }
    },
    methods: {
      ...mapActions(['toggleMeetupNetworkingRoom'])
    },
    data(){
      return {
        isSwitched: this.$root.meetup.networkingRoomOpened,
        isLoading: false
      }
    },
}
</script>

<style>

</style>