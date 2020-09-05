<template>
  <div class="admin-bar__shortcuts-list-buttons">
      <start-recording 
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
      />
      <BackstageControls 
        :Speakers="$root.meetup.speakers"
        :parent="this"
      />
      <!-- <show-backstage
        v-if="isBackstage"
        class="admin-bar__shortcuts-btn"
        @clicked="clickBackstage"
      >
      </show-backstage> -->
      <BackstageSwitch
        v-if="!isBackstage"
      />
      <ScreenButtonSwitch />
  </div>
</template>

<script>
import StartRecording from './StartRecording'
import StartStreaming from '../../Streaming/Buttons/StartStreaming'

import StopRecording from './StopRecording'
import StopStreaming from '../../Streaming/Buttons/StopStreaming'

import BackstageSwitch from './BackstageSwitch'
import BackstageControls from '../../BackstageControls'
import ScreenButtonSwitch from './ScreenButtonSwitch'

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
  },
  components: {
    StartRecording, StartStreaming,
    StopRecording, StopStreaming,
    BackstageControls, BackstageSwitch,
    ActiveButton, ScreenButtonSwitch
  }
}
</script>
