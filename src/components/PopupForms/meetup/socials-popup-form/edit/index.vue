<template>
  <wrap>      
    <template slot="title">{{$root.content.meetupSocialsPopupFrom.title}}</template>
    <inner slot="inner-from" />
  </wrap>
</template>

<script>
import wrap from '@/components/Global/popup-form'
import inner from './inner'

export default {
  components: {
    inner, wrap
  }
}
</script>