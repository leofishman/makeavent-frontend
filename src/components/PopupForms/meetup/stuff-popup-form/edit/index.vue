<template>
  <wrap v-if="show" @close="close">      
    <template slot="title">{{$root.content.stuffPopupForm.title}}</template>
    <inner slot="inner-from" @submitForm="close" />
  </wrap>
</template>

<script>
import wrap from '@/components/Global/popup-form'
import inner from './inner'

export default {
  props: ['show'],
  
  data(){
    return {
      show: this.$props.show,
    }
  },
  methods: {
    close(){
      this.show = false
    },
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