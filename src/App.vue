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
            <b-tab-item :label="`Blockconf ` + $root.content.common.coffeeChat">
              <Chat id="globalchat" checkAccess="globalchat" :parent="self" type="globalchat" name="global" />
            </b-tab-item>
            <b-tab-item :label="`Blockconf ` + $root.content.common.vipChat">
              <Chat id="vipchat" checkAccess="vipchat" :parent="self" type="vipchat" name="vip" />
            </b-tab-item>
          </b-tabs>
        </section>
      </div>
    </b-sidebar>
  </main>
</template>

<script>

import Chat from '@/components/CompanyProfile/Chat'


export default {
  name: 'App',
  components: {
    Chat
  },
  data() {
    let self = this
    onDomChange(function () {
      if (Array.from(document.getElementsByClassName('sidebar-background')).length)
        document.getElementsByClassName('sidebar-background')[0].addEventListener('click', (e) => {
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
