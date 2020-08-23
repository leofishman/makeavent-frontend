<template>
  <div>      
      <primary :isLight="light"/>
      <dark :isLight="light"/>
      <light :isLight="light"/>
  </div>
</template>

<script>
import Dark from './Dark'
import Light from './Light'
import Primary from './Primary'

export default {
    props: {
      isLight: Boolean
    },
    components: {
      Dark,
      Light,
      Primary,
    },
    watch: {
      isLight(){
        this.light = this.$props.isLight
      }
    },
    data(){
      return {
        light: this.$props.isLight
      }
    }
}
</script>

<style>

</style>