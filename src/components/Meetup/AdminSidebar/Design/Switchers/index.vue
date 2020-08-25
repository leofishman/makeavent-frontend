<template>
  <div>      
      <switch-component class="admin-bar__switcher" :isSwitched="isActiveLocal" @switchItem="updateActive">  
        <p v-if="!isActiveLocal" slot="switched-text">{{this.$root.content.adminSidebar.items.design.switchers.off}}</p>
        <p v-if="isActiveLocal" slot="switched-text">{{this.$root.content.adminSidebar.items.design.switchers.active}}</p>
      </switch-component>
      <switch-component v-if="isActiveLocal" class="admin-bar__switcher" :isSwitched="!isLightMode" @switchItem="updateMode">  
        <p v-if="isLightMode" slot="switched-text">{{this.$root.content.adminSidebar.items.design.switchers.light}}</p>
        <p v-if="!isLightMode" slot="switched-text">{{this.$root.content.adminSidebar.items.design.switchers.dark}}</p>
      </switch-component>
  </div>
</template>

<script>
import {SwitchComponent} from '@/components/Global/controll/'

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
        isActiveLocal: this.$props.isActive,
        isLightMode: this.$props.isLight
      }
    },
    methods: {
      updateActive(){
        this.isActiveLocal = !this.isActiveLocal
        this.$emit('updateActive', this.isActiveLocal)
      },
      updateMode(){
        this.isLightMode = !this.isLightMode
        this.$emit('updateMode', this.isLightMode)
      }
    }
}
</script>

<style>

</style>