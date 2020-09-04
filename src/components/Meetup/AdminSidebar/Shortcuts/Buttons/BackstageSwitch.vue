<template>
  <div class="admin-bar__switcher">
    <b-field :label="content.buttons.h_backst">  
      <b-switch v-model="$root.showBackstage">
        <p v-if="$root.showBackstage">{{content.close}}</p>
        <p v-else>{{content.open}}</p>
      </b-switch>
    </b-field>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "BackstageSwitch",
  watch: {
      
  },
  methods: {
    switch () {
        
    }
  },
  data(){
    return {
      content: this.$root.content.adminSidebar.items.shortcuts,
    }
  },
}
</script>

<style>

</style>