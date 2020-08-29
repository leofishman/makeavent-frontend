<template>
  <wrap>      
    <template slot="title">{{$root.content.meetupPopupForm.title}}</template>
    <steps slot="inner-from"/>
  </wrap>
</template>

<script>
import steps from './ui/steps'
import wrap from '@/components/Global/popup-form'

export default {
  name: 'GroupPopupForm',
  components: {
    steps,
    wrap
  }
}
</script>
