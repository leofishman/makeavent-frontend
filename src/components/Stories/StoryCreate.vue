<template>
  <b-sidebar type="is-white livefeed" open position="fixed" :reduce="reduce">
    <div class="feeds" @click="Newstory = true">
      <div class="story-create">
        <p>New story</p>
      </div>
    </div>

    <!-- Modal -->
    <b-modal :active.sync="Newstory" scroll="keep">
      <Newstory />
    </b-modal>
  </b-sidebar>
</template>

<script>
  //import Feed from '@/components/Livefeed/Feed.vue'
  import Newstory from '@/components/Stories/Newstory.vue'

  export default {
    name: 'Storycreate',
    components: {
      Newstory
    },
    data() {
      return {
        reduce: true,
        canCancel: false,
        isSwitched: false,
        isSwitchedCustom: 'Open',

        Newstory: false
      }
    }
  };
</script>

<style lang="scss">

</style>