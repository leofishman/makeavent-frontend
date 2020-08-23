<template>
  <div class="group-popup-form-wrap" v-if="show">
    <div class="group-popup-form">
      <div class="group-popup-form__header">
        <p>{{$root.$root.content.globalForms.popupTitle}}</p>
        <img class="close" src="@/assets/icon/steps-close.png" @click="close">
      </div>
      <div class="group-popup-form__content">
        <steps
          @submitForm="close"
        />
      </div>
    </div>
  </div>
</template>

<script>
import steps from './ui/steps'

export default {
  name: 'GroupPopupForm',
  data(){
    return {
      show: true,
    }
  },
  methods: {
    close(){
      this.show = false
    }
  },
  components: {
    steps
  }
}
</script>