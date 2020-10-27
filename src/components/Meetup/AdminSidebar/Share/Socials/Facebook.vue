<template>
  <a class="admin-bar__share-social"
    :href="`https://www.facebook.com/sharer/sharer.php?u=${link}`" 
    target="_blank"
  >
    <inline-svg :src="require(`@/assets/img/socials/facebook.svg`)" />
  </a>
</template>

<script>
import MeetupFormRoutes from '@/store/routes/meetup-form'

export default {
  async mounted(){
    const obj = {
      role: 'basic',
      userId: this.$root.profile._id,
      id: this.$root.meetup._id
    }
    const res = await MeetupFormRoutes.postCreateInviteLink(obj);
    this.link = res.data
  },
  data () {
    return {
      link: "",
      img: ""
    }
  },
}
</script>

<style>

</style>