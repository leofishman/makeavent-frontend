<template>
  <button class="button is-grey" @click="click">{{name}}</button>
</template>

<script>
export default {
    props: {
        name: String
    },
    methods: {
        click(){
            return this.$emit('clicked')
        }
    }
}
</script>

<style>

</style>