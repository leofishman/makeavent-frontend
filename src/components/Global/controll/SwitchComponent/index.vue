<template>
  <section>
    <slot name="switched-header"></slot>
    <b-switch v-model="current">
        <slot name="switched-text">Close</slot>
    </b-switch>
  </section>
</template>

<script>
export default {
    props: ['isSwitched'],
    data(){
      return {
        current: this.$props.isSwitched
      }
    },
    watch: {
      isSwitched(){
        // console.log('this.$props.isSwitched', this.$props.isSwitched);
        // this.current = this.$props.isSwitched
      },
      current() {
        this.$emit('switchItem', this.current)
        return this.current
      }
    }
    // data(){
    //   return {
    //     isSwitched: false
    //   }
    // }
}
</script>