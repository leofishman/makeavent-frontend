<template>
  <b-sidebar type="is-white livefeed" open position="fixed" :reduce="reduce" :can-cancel="false">
    <div class="feeds" @click="Newstory = true">
      <div class="story-create">
        <p>{{content.newStoryButton}}</p>
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
        isSwitched: false,
        isSwitchedCustom: 'Open',

        Newstory: false,

        content: this.$root.content.Storycreate
      }
    }
  };
</script>

<style lang="scss">

</style>