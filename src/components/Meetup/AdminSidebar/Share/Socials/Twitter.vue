<template>
  <a 
    class="admin-bar__share-social admin-bar__share-linkin"
    :href="`http://www.twitter.com/share?http://localhost:8081/${locale}`"
    target="_blank"
  >tw</a>
</template>

<script>
export default {
  computed: {
    locale(){
      return window.location.href
    }
  }
}
</script>

<style>

</style>