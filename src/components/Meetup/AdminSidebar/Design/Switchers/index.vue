<template>
  <div>      
      <switch-component class="admin-bar__switcher" :isSwitched="isActiveLocal" @switchItem="updateActive">  
        <p v-if="!isActiveLocal" slot="switched-text">{{content.off}}</p>
        <p v-if="isActiveLocal" slot="switched-text">{{content.active}}</p>
      </switch-component>
      <switch-component v-if="isActiveLocal" class="admin-bar__switcher" :isSwitched="!isLightMode" @switchItem="updateMode">  
        <p v-if="isLightMode" slot="switched-text">{{content.light}}</p>
        <p v-if="!isLightMode" slot="switched-text">{{content.dark}}</p>
      </switch-component>

      <b-button @click="resetToDefault" class="is-primary">{{content.resetToDefault}}</b-button>
  </div>
</template>

<script>
import {SwitchComponent} from "@/components/Global/controll/"
import { mapMutations } from "vuex"

export default {
    props: {
      isActive: Boolean,
      isLight: Boolean
    },
    components: {
      SwitchComponent
    },
    data(){
      return {
        content: this.$root.content.adminSidebar.items.design.switchers,
        isActiveLocal: this.$props.isActive,
        isLightMode: this.$props.isLight
      }
    },
    methods: {
      resetToDefault() {
        this.$emit("resetToDefault")        
      },
      updateActive(){
        this.isActiveLocal = !this.isActiveLocal
        this.$emit("updateActive", this.isActiveLocal)
      },
      updateMode(){
        this.isLightMode = !this.isLightMode
        this.$emit("updateMode", this.isLightMode)
      },
      ...mapMutations(["updateSchemaColor", "updateColor"])
    }
}
</script>

<style>

</style>