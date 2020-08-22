<template>
  <wrap v-if="show">      
    <template slot="title">{{$root.content.meetupSocialsPopupFrom.title}}</template>
    <inner slot="inner-from" @submitForm="close" />
  </wrap>
</template>

<script>
import wrap from '@/components/Global/popup-form'
import inner from './inner'

export default {
  components: {
    inner, wrap
  },
  data(){
    return {
      show: true,
    }
  },
  methods: {
    close(){
      this.show = false
    }
  }
}
</script>