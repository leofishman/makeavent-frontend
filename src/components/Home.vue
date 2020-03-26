<template>
  <div>
    <navbar :nav="true"></navbar>
    <desktop v-if="!isMobileWidth()"></desktop>
    <mobile v-if="isMobileWidth()"></mobile>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {

    return {
      
    }
  },
  methods: {
    isMobileWidth() {
      return window.innerWidth < 768
    }
  },
}
</script>