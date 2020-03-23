import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'
import { host, socket } from './env'
import VueSocketIO from 'socket.io-client'

import router from './router'
import Content from './content'

import Navbar from './components/Navbar.vue'
import Desktop from './components/desktop/Index.vue'
import Mobile from './components/mobile/Index.vue'
import GlobalChat from './components/GlobalChat.vue'
import VipChat from './components/VipChat.vue'
import Axios from 'axios';

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component('navbar', Navbar)
Vue.component('desktop', Desktop)
Vue.component('mobile', Mobile)
Vue.component('globalchat', GlobalChat)
Vue.component('vipchat', VipChat)

const EventBus = new Vue();
window.EventBus = EventBus


new Vue({
  router,
  render: h => h(App),
  data() {
    let selectedLanguage = localStorage.selectedLanguage
    if (!selectedLanguage || selectedLanguage === undefined)
      selectedLanguage = "EN"

    let self = this

    if (!this.token && !this.profile && !this.usertype) {
      Axios.get(host+`/login/checkToken?access=${window.location.hash.split('#/')[1].split("/")[0]}`, {
        headers: {
          authorization: localStorage.auth
        }
      })
      .then(data => {
        data = data.data
        this.profile = data.profile
        this.token = data.accessLink
        this.usertype = data.type
      })
      .catch(e => {
        this.$router.push('/login')
      })
    }

    let waitLogin = setInterval(() => {
      if (this.token && this.profile && this.usertype) {
        clearInterval(waitLogin)

        window.io = VueSocketIO(socket, {
          query: {
            token: this.token
          }
        })
    
        window.io.on('connect', () => {
          console.log('socket connected')
        })
    
        window.io.on('logout', () => {
          localStorage.auth = ""
          window.open('/#/login')
        })
    
        setInterval(() => {
          window.io.emit('auth', { id:this.token })
        }, 5000)
    
        Notification.requestPermission().then(function(result) {
          self.notificationAllowed = true
        });
    
        window.io.on('incomming_contact_request', (data) => {
          this.openIncomingContactRequest(data)
        })
    
        window.io.on('request_contact_confirmed', (data) => {
          this.openContactConfirmedModal(data)
        })
    
        window.EventBus.$on('request_contact_confirmed', (data) => {
          this.openContactConfirmedModal(data)
        })
      }
    }, 100)

    return {
      notificationAllowed: "",
      profile: "",
      usertype: "",
      token: "",
      content: Content[selectedLanguage],
      globalchat: "",
      vipchat: ""
    }
  },
  methods: {
    tokenCheck () {
      let self = this
      return new Promise(async (resolve, reject) => {
        let timer = setInterval(() => {
          console.log(this.token, self.token)
          if (this.token) {
            clearInterval(timer)
            resolve(true)
          }
        }, 100)
      })
    },

    openIncomingContactRequest (data) {
      const note = this.content.newContactReqNote(data.name.split(" ")[0], data.company, data.role)
      
      this.$bvModal.msgBoxConfirm(note, {
        title: this.content.newContactReq,
        size: 'md',
        buttonSize: 'md',
        okVariant: 'primary',
        okTitle: this.content.yes,
        cancelTitle: this.content.no,
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
      .then(value => {
        if (value)
          window.io.emit('agree_sharing_contact_info', { me: this.profile, to:data })
      })
      .catch(e => {
      })
    },

    openContactConfirmedModal (data) {
      const note = this.content.actionsWithBusCard

      this.$bvModal.msgBoxConfirm(note, {
        title: this.content.userConfirmedSharingInfo(data),
        size: 'md',
        buttonSize: 'md',
        okVariant: 'primary',
        okTitle: this.content.print,
        cancelTitle: this.content.save,
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
      .then(value => {
        
      })
      .catch(e => {
        
      })
    },

    joinChats () {
      this.joinGlobalChat()
      this.joinVipChat()
    }
  },
}).$mount('#app')
