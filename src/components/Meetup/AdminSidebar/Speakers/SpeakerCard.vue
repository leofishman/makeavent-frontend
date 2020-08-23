<template>
  <div class="admin-bar__speaker-card">
      <div class="admin-bar__speaker-image">
        <img :src="config.api_url+speaker.photo" alt="">
      </div>
      <div class="admin-bar__speaker-col">
        <div class="admin-bar__speaker-name"><span>{{speaker.name}}</span></div>
        <div class="admin-bar__speaker-position"><span>{{speaker.role}}</span></div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    speaker: Object
  },
}
</script>

<style>

</style>