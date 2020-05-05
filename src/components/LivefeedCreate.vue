<template>
  <b-sidebar type="is-white livefeed" open position="fixed" :reduce="reduce">
    <div class="feeds">
      <div class="livefeed-create">
        <p>Stories</p>
      </div>
      
    </div>
  </b-sidebar>
</template>

<script>
  //import Feed from '@/components/Livefeed/Feed.vue'

  export default {
    name: 'LivefeedCreate',
    components: {},
    data() {
      return {
        reduce: true,
        canCancel: false,
        isSwitched: false,
        isSwitchedCustom: 'Open'
      }
    }
  };
</script>

<style lang="scss">

</style>