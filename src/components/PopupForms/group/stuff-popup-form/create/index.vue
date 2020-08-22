
<template>
  <wrap v-if="show">      
    <template slot="title">{{$root.content.groupStuffPopupForm.title}}</template>
    <inner slot="inner-from" @submitForm="close" />
  </wrap>
</template>

<script>
import wrap from '@/components/Global/popup-form'
import inner from './inner'

export default {
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
    wrap,
    inner
  }
}
</script>