<template>
  <main id="app">
    <router-view></router-view>
    <notifications classes='n-light' group="new-connection-request" position="bottom right" width="500px"/>
  </main>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
}
</script>

<style lang="css">
  
</style>
