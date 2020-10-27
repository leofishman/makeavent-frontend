<template>
  <div>      
    <b-loading 
      :is-full-page="false" 
      :active.sync="isLoading" 
      :can-cancel="false"
    />
    <switch-component class="admin-bar__switcher" :isSwitched="isActiveLocal" @switchItem="updateActive">  
      <p v-if="!isActiveLocal" slot="switched-text">{{content.off}}</p>
      <p v-if="isActiveLocal" slot="switched-text">{{content.active}}</p>
    </switch-component>
    <switch-component v-if="isActiveLocal" class="admin-bar__switcher" :isSwitched="!isLightMode" @switchItem="updateMode">  
      <p v-if="isLightMode" slot="switched-text">{{content.light}}</p>
      <p v-if="!isLightMode" slot="switched-text">{{content.dark}}</p>
    </switch-component>

    <b-button v-if="isActiveLocal" @click="resetToDefault" class="is-primary">{{content.resetToDefault}}</b-button>
  </div>
</template>

<script>
import {SwitchComponent} from "@/components/Global/controll/"
import { mapMutations } from "vuex"

import routes from '@/store/routes/meetup-form'

export default {
    props: {
      isActive: Boolean,
      isLight: Boolean
    },
    components: {
      SwitchComponent
    },
    watch: {
      isLight(){
        this.isLightMode = this.$props.isLight
      }
    },
    data(){
      return {
        content: this.$root.content.adminSidebar.items.design.switchers,
        isActiveLocal: this.$props.isActive,
        isLightMode: this.$props.isLight,
        isLoading: false,
      }
    },
    methods: {
      resetToDefault() {
        this.updateIsDefault()
        this.$emit("resetToDefault")        
      },
      updateActive(){
        this.isActiveLocal = !this.isActiveLocal
        this.$emit("updateActive", this.isActiveLocal)
      },
      async updateMode(){
        this.isLightMode = !this.isLightMode
        this.$emit("updateMode", this.isLightMode)

        try {
          this.isLoading = true
          const obj = {
              id: this.$root.meetup._id,
              color_schema: this.$store.getters.meetupFull.color_schema,
              custom_colors: this.$store.getters.meetupFull.custom_colors,
              preview: 'no_update',
              image: 'no_update',
              meetup_name: "no_update",
              description: "no_update",
              company_name: "no_update",
              company_description: "no_update",
              date: "no_update",
              website: "no_update",
          }
          await routes.postUpdate(obj)
          this.isLoading = false
        } catch (e){
          console.log(e);
        }
      },
      ...mapMutations(["updateSchemaColor", "updateColor", "updateIsDefault"])
    }
}
</script>

<style>

</style>