<template>
  <div class="group-popup-form-wrap" v-if="show">
    <div class="group-popup-form">
      <div class="group-popup-form__header">
        <p>{{$root.content.meetupPopupForm.title}}</p>
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
import eng from '@/english'

export default {
  name: 'GroupPopupForm',
  data(){
    return {
      show: true,
      content: eng
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
