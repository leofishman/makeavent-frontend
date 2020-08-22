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
        :Speakers="$root.speakerProfiles"
        :parent="this" 
        v-if="!isBackstage"
        @clicked="clickBackstage" 
      />
      <hide-backstage
        v-if="isBackstage"
        @clicked="clickBackstage" 
      />
      <active-button 
        class="admin-bar__button"
        :name="'Manage Backstage'"
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
          this.isBackstage = !this.isBackstage
        }
    },
    components: {
        StartRecording, StartStreaming,
        StopRecording, StopStreaming,
        BackstageControls, HideBackstage,
        ActiveButton
    }
}
</script>

<style>

</style>