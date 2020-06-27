<template>
  <div style="margin-left: 0px;" id="home">

    <!-- Live Feed -->
    <Livefeed v-if="false" />

    <!-- Stories -->
    <Stories v-if="false" />
    
  </div>
</template>
<script>
  import Axios from 'axios'
  import {api} from '../../env'

  import Stories from '@/components/Stories/Stories.vue'
  import Livefeed from '@/components/Livefeed/Livefeed.vue'

  export default {
    name: "desktop",
    components: {
      Stories,
      Livefeed
    },
    data() {
      this.$root.check('Sponsors').then(_ => {
        this.ready = true
      }).catch(e => console.log(`${e} inaccessible`))

      return {
        joinMeeting: false,
        api: api,

        ready: false,
      }
    },
  }
</script>