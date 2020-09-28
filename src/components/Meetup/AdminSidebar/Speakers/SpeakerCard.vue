<template>
  <div class="admin-bar__speaker-card">
    <b-loading slot="switched-header" 
      :is-full-page="false" 
      :active.sync="isLoading" 
      :can-cancel="false">
      </b-loading>
    <div class="admin-bar__speaker-image">
      <img :src="config.api_url+speaker.photo" alt="">
    </div>
    <div class="admin-bar__speaker-col">
      <div class="admin-bar__speaker-name"><span>{{speaker.name}}</span></div>
      <div class="admin-bar__speaker-position"><span>{{speaker.role}}</span></div>
    </div>
    <span class="close-icon" @click="removeItem">
      <span class="inner-icon">x</span>                
    </span>
  </div>
</template>

<script>
import {MEETUP} from '@/api/endpoints'
import Axios from 'axios'
import { mapActions } from 'vuex'

export default {
  props: {
    speaker: Object
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['getMeetupById']),
    removeItem () {
      this.isLoading = true
      Axios.post(MEETUP.removeSpeakerFromMeetup, {
        userId: this.speaker._id,
        id: this.$root.meetup._id
      }, {
        headers: {
          authorization: localStorage.auth
        }
      })
      .then(async res => {
        this.isLoading = false
        this.getMeetupById({id: this.$root.meetup._id})
      })
      .catch(res => {
        this.isLoading = false
      })
    }
  },
}
</script>

<style lang="scss">
.close-icon {
  margin-left: auto;
  border-radius: 50%;
  background-color: #ff3860;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;

  .inner-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>