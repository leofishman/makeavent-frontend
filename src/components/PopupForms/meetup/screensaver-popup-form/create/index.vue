<template>
  <wrap>      
    <template slot="title">{{$root.content.screenSaverPopupFrom.title}}</template>
    <inner slot="inner-from" />
  </wrap>
</template>

<script>
import wrap from '@/components/Global/popup-form'
import inner from './inner'

export default {
  components: {
    wrap,
    inner
  }
}
</script>