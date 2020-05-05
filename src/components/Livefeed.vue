<template>
  <b-sidebar type="is-white livefeed" open position="fixed" :can-cancel="false" :reduce="reduce">
    <div class="feeds">
      <b-field>
        <b-switch v-model="reduce"></b-switch>
      </b-field>

      <h3>#blockconf</h3>
      <Feed />
      <Feed />
      <Feed />
    </div>
  </b-sidebar>
</template>

<script>
  import Feed from '@/components/Livefeed/Feed.vue'

  export default {
    name: 'Livefeed',
    components: {
      Feed
    },
    data() {
      return {
        reduce: true,
        isSwitched: false,
        isSwitchedCustom: 'Open'
      }
    }
  };
</script>

<style lang="scss">

</style>