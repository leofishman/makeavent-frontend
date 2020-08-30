<template>
  <div class="admin-bar__shortcuts-list-buttons">
      <!-- <start-recording 
        v-if="!isRecording"
        @clicked="clickRecording" 
        class="admin-bar__shortcuts-btn"
      />
      <stop-recording 
        v-if="isRecording"
        @clicked="clickRecording" 
        class="admin-bar__shortcuts-btn"
      />
      <start-streaming 
        v-if="!isStreaming"
        @clicked="clickStreaming" 
        class="admin-bar__shortcuts-btn"
      />
      <stop-streaming 
        v-if="isStreaming"
        @clicked="clickStreaming" 
        class="admin-bar__shortcuts-btn"
      /> -->
      <BackstageControls 
        :Speakers="$root.speakerProfiles"
        :parent="this"
      />
      <show-backstage
        v-if="isBackstage"
        class="admin-bar__shortcuts-btn"
        :name="';aallala'"
        @clicked="clickBackstage"
      >
      </show-backstage>
      <hide-backstage
        v-if="!isBackstage"
        class="admin-bar__shortcuts-btn"
        :name="';aallala'"
        @clicked="clickBackstage" 
      />
  </div>
</template>

<script>
import StartRecording from './StartRecording'
import StartStreaming from './StartStreaming'

import StopRecording from './StopRecording'
import StopStreaming from './StopStreaming'

import BackstageControls from '../../BackstageControls'
import HideBackstage from './HideBackstage'
import ShowBackstage from './ShowBackstage'

import {ActiveButton} from '@/components/Global/controll/'

export default {
  data(){
    return {
      isRecording: false,
      isStreaming: false,
      isBackstage: false
    }
  },
  methods: {
    clickRecording() {
      this.isRecording = !this.isRecording
    },
    clickStreaming() {
      this.isStreaming = !this.isStreaming
    },
    clickBackstage(){
      if ( this.$root.showBackstage )
        this.$root.showBackstage = false
      else
        this.$root.showBackstage = true

      this.isBackstage = !this.isBackstage
    }
  },
  components: {
    StartRecording, StartStreaming,
    StopRecording, StopStreaming,
    BackstageControls, HideBackstage,
    ActiveButton, ShowBackstage
  }
}
</script>
