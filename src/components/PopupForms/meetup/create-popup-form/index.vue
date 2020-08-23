<template>
  <!-- <div class="group-popup-form-wrap" v-if="show"> -->
    <!-- <div class="group-popup-form">
      <div class="group-popup-form__header">
        <p>{{$root.content.meetupPopupForm.title}}</p>
        <img class="close" src="@/assets/icon/steps-close.png" @click="close">
      </div>
      <div class="group-popup-form__content">
        <steps
          @submitForm="close"
        />
      </div>
    </div> -->
    
    <wrap>      
      <template slot="title">{{$root.content.meetupPopupForm.title}}</template>
      <steps slot="inner-from"/>
    </wrap>
  <!-- </div> -->
</template>

<script>
import steps from './ui/steps'
import wrap from '@/components/Global/popup-form'

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
    steps,
    wrap
  }
}
</script>
