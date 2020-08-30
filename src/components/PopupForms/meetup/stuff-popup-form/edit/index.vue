<template>
  <wrap v-if="show" @close="close">     
    <p slot="title">{{$root.content.demoPopupForm.title}}</p>
    <template slot="inner-from">
      <section>
        <inner  @submitForm="close" />
      </section>
    </template>    
  </wrap>
</template>

<script>
import wrap from '@/components/Global/popup-form'
import inner from './inner'

export default {
  data(){
    return {
      show: true,
    }
  },
  methods: {
    close(){
      this.show = false
    }
  },
  components: {
    wrap,
    inner
  }
}
</script>