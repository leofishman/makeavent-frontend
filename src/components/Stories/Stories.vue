<template>
  <section class="section section-stories">
      <div class="container">
        <div class="stories">
          <Story v-for="item in items" :key="item.id" :show="indexOpen == item.id" :company="item" v-on:onOpen="setIndex(item.id)" v-on:onClose="setIndex(0)" />
        </div>
      </div>
  </section>
</template>

<script>
  import Story from './Story.vue'

  export default {
    name: 'Stories',
    methods: {
      setIndex: function(index) {
        if(this.indexOpen == index) {
          this.indexOpen = 0
        }
        else {
          this.indexOpen = index;
        }
      }
    },
    data() {
      return {
        indexOpen : 0,
        items: [
        { id: 1, name: 'RSK', logo: 'logo-RSK.png' },
        { id: 2, name: 'CRYPTTP', logo: 'logo-CRYPTTP.png' },
        { id: 3, name: 'FAS', logo: 'logo-FAS.png' },
        { id: 4, name: 'RSK', logo: 'logo-RSK.png' },
        { id: 5, name: 'CRYPTTP', logo: 'logo-CRYPTTP.png' },
        { id: 6, name: 'FAS', logo: 'logo-FAS.png' },
        { id: 7, name: 'RSK', logo: 'logo-RSK.png' },
        ],
      }
    },

    components: {
      Story
    }
  }
</script>

<style lang="scss">

</style>