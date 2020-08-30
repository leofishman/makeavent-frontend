<template>
  <div>      
      <primary :isLight="light" :defaultValue="primary" />
      <dark :isLight="light" :defaultValue="dark" />
      <light :isLight="light" :defaultValue="lightC" @toggle-default-value="$emit('toggle-default-value')" />
  </div>
</template>

<script>
import Dark from './Dark'
import Light from './Light'
import Primary from './Primary'

export default {
    props: {
      isLight: Boolean,
      defaultValue: Object
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
    },
    computed: {
      dark() {
        return {
          color: this.$props.defaultValue.dark,
          isActive: this.$props.defaultValue.isActive,
        } 
      },
      lightC() {
        return {
          color: this.$props.defaultValue.light,
          isActive: this.$props.defaultValue.isActive,
        } 
      },
      primary() {
        return {
          color: this.$props.defaultValue.primary,
          isActive: this.$props.defaultValue.isActive,
        } 
      },
    }
}
</script>

<style>

</style>