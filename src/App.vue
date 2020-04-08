<template>
  <div id="app">
    <router-view></router-view>

    <interview-agenda></interview-agenda>
    <ongoing-interviews></ongoing-interviews>

    <b-sidebar id="sidebar-chat" right title="Chat"  shadow>
      <globalchat></globalchat>
    </b-sidebar>

    <notifications classes='n-light' group="new-connection-request" position="bottom right" width="500px"/>
  </div>
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
