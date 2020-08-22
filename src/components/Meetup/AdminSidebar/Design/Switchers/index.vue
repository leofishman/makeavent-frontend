<template>
  <div>      
      <switch-component class="admin-bar__switcher" :isSwitched="isActiveLocal" @switchItem="updateActive">  
        <p v-if="!isActiveLocal" slot="switched-text">Off</p>
        <p v-if="isActiveLocal" slot="switched-text">Active</p>
      </switch-component>
      <switch-component v-if="isActiveLocal" class="admin-bar__switcher" :isSwitched="isLightMode" @switchItem="updateMode">  
        <p v-if="!isLightMode" slot="switched-text">Light Mode</p>
        <p v-if="isLightMode" slot="switched-text">Dark Mode</p>
      </switch-component>
  </div>
</template>

<script>
import {SwitchComponent} from '@/components/Global/controll/'

export default {
    props: {
      isActive: Boolean
    },
    components: {
      SwitchComponent
    },
    data(){
      return {
        isActiveLocal: this.$props.isActive,
        isLightMode: false
      }
    },
    methods: {
      updateActive(){
        this.isActiveLocal = !this.isActiveLocal
        this.$emit('updateActive', this.isActiveLocal)
      },
      updateMode(){
        this.isLightMode = !this.isLightMode
      }
    }
}
</script>

<style>

</style>