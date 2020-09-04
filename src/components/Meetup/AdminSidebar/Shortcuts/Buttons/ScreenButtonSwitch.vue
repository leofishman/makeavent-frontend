<template>
  <div class="admin-bar__switcher">
    <b-field :label="content.switchers.showScreenButtons">  
      <b-switch v-model="$root.showScreenButtons">
        <p v-if="$root.showScreenButtons">{{content.close}}</p>
        <p v-else>{{content.open}}</p>
      </b-switch>
    </b-field>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: "ScreenButtonSwitch",
    watch: {
        '$root.showScreenButtons': async function(){
            this.switch()
        }
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