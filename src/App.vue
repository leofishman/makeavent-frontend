<template>
  <main id="app">
    <router-view></router-view>
    
    <notifications classes='n-light' group="new-connection-request" position="bottom right" width="500px"/>
    
    <b-sidebar
      type="is-light"
      :fullheight="true"
      :fullwidth="false"
      :overlay="false"
      :right="true"
      :can-cancel="false"
      :open.sync="$root.openGlobalChat"
      class="height-100"
    >
      <div v-on:click="$root.switchOpen()" class="sidebar-background"></div>
      <div id="chats-sidebar">
        <section>
          <b-tabs class="chat" type="is-toggle" expanded >
            <b-tab-item :label="$root.project.name + ' ' + $root.content.common.coffeeChat">
              <div id="globalchat">
                <Chat v-bind:key="'globalchat'" checkAccess="globalchat" :contacts="[]" type="globalchat" name="global" _id="global" />
              </div>
            </b-tab-item>
          </b-tabs>
        </section>
      </div>
    </b-sidebar>
    
    <DragableConference v-if="$root.showDragableConference" :room="$root.roomForDragableConference"/>
    <!-- <DragableConference v-if="true" :room="$root.roomForDragableConference"/> -->
  </main>
</template>

<script>

import Chat from '@/components/Chats/Chat'
import DragableConference from '@/components/VideoStreams/DragableJitsi'

export default {
  name: 'App',
  components: {
    Chat,
    DragableConference
  },
  data() {
    return {
      self: this, // need for chat
      contacts: [], // need for chat
    }
  },

}
</script>

<style lang="scss">
@import "@/components/Chats/index.scss";
.chat-wrapper {
  @extend %chat-wrapper;
}
</style>
