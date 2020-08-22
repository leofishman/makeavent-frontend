<template>
  <a 
    class="admin-bar__share-social admin-bar__share-linkin"
    :href="`http://www.linkedin.com/shareArticle?mini=true&url=${locale}&title=meetup&summary=description&source=makeavent.com`" 
    target="_blank"
  >in</a>
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