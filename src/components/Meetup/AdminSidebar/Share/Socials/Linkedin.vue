<template>
  <a 
    class="admin-bar__share-social"
    :href="`http://www.linkedin.com/shareArticle?mini=true&url=${link}&title=meetup&summary=description&source=makeavent.com`" 
    target="_blank"
  >
    <inline-svg :src="require(`@/assets/img/socials/linkedin.svg`)"/>
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