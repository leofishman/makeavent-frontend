<template>
  <main id="app">
    <router-view></router-view>
    
    <notifications classes='n-light' group="new-connection-request" position="bottom right" width="500px"/>
    
    <b-sidebar
      type="is-light"
      :fullheight="true"
      :fullwidth="false"
      :overlay="true"
      :right="true"
      :can-cancel="false"
      :open.sync="$root.openGlobalChat"
    >
      <div>
        <section id="chats-sidebar" style="padding-top:80px; overflow:hidden; background:white;">
          <b-tabs class="chat" style="width:600px; pointer-events:all" type="is-toggle" expanded >
            <b-tab-item :label="$root.project.name + ' ' + $root.content.common.coffeeChat">
              <div id="globalchat">
                <Chat checkAccess="globalchat" :contacts="[]" type="globalchat" name="global" _id="global" />
              </div>
            </b-tab-item>
          </b-tabs>
        </section>
      </div>
    </b-sidebar>
    
    <DragableConference v-if="$root.showDragableConference" :room="$root.roomForDragableConference"/>
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
    let self = this
    onDomChange(function () {
      if (Array.from(document.getElementsByClassName('sidebar-background')).length)
        document.getElementsByClassName('sidebar-background')[0].addEventListener('click', (e) => {
          if (e.path[1].id == "chats-sidebar")
            self.$root.switchOpen()
        })
    })

    return {
      self: this, // need for chat
      contacts: [], // need for chat
    }
  }
}
</script>

<style lang="css">
  
</style>
