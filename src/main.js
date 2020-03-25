import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BIconThreeDotsVertical } from 'bootstrap-vue'
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

import Sponsors from './sponsors'
import Speakers from './speakers'
import Workshop from './workshop'
import qrcode from 'qrcode-generator-es6'

new Vue({
  router,
  render: h => h(App),
  data() {
    let selectedLanguage = localStorage.selectedLanguage
    if (!selectedLanguage || selectedLanguage === undefined)
      selectedLanguage = "EN"

    let self = this

    if (this.checkNavShouldBeWithToken()) {
      Axios.get(host+`/login/checkToken?access=${window.location.pathname.split('/')[1]}`, {
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
        // this.$router.push('/login')
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
          window.open('/login')
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
      }
    }, 100)

    window.EventBus.$on('request_contact_confirmed', (data) => {
      this.openContactConfirmedModal(data)
    })

    window.EventBus.$on('show_business_card', data => {
      this.openBusinessCard(data)
    })

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
    checkNavShouldBeWithToken () {
      if (
        !this.token &&
        !this.profile &&
        !this.usertype &&
        !this.$router.currentRoute.fullPath.includes('auth=true') &&
        this.$router.currentRoute.path != '/login' &&
        this.$router.currentRoute.path != '/loginWithTemporaryEmail' &&
        this.$router.currentRoute.path != '/businesscard'
      )
        return true
      else
        return false
    },

    tokenCheck () {
      let self = this
      return new Promise(async (resolve, reject) => {
        let timer = setInterval(() => {
          if (this.token) {
            clearInterval(timer)
            resolve(true)
          }
        }, 100)
      })
    },

    openIncomingContactRequest (data) {
      let note = this.content.newContactReqNote(data.name.split(" ")[0], data.company, data.role)
      note = this.convertContentWithLineBreaks(note)

      this.$bvModal.msgBoxConfirm([note], {
        title: this.content.newContactReq,
        size: 'md',
        buttonSize: 'md',
        okVariant: 'primary',
        okTitle: this.content.yes,
        cancelTitle: this.content.no,
        footerClass: 'p-2',
        hideHeaderClose: false,
        noCloseOnBackdrop: true,
        noCloseOnEsc: true,
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
        noCloseOnBackdrop: true,
        noCloseOnEsc: true,
        centered: true
      })
      .then(value => {
        if (value) {
          this.openBusinessCard(data)
        }
        else {
          Axios.post(`${host}/data/savebusinesscard`, data, {
            headers: {
              authorization: localStorage.auth
            }
          })
          .then(res => {
            this.$bvModal.msgBoxOk([this.convertContentWithLineBreaks(this.$root.content.businessCardSavedToEmail)], {
              title: 'Confirmation',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'success',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
            })
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
    },

    openBusinessCard (data) {
      const h = this.$createElement
      const titleVNode = h('div', { domProps: { innerHTML: data.name } })
      
      let image;

      if (Sponsors[data.company.toUpperCase()])
        Object.values(Sponsors[data.company.toUpperCase()].contacts).map((contact, index) => {
          if (contact.email == data.email) {
            image = require(`./assets/img/sponsors/${data.company.toUpperCase()}/contact${index+1}.png`)
          }
        })

      if (!image)
        Speakers.map(speaker => {
          if (speaker.email == data.email) {
            image = require(`./assets/img/workshopers/${data.name}.png`)
          }
        })

      if (!image)
        Workshop.map(workshoper => {
          if (workshoper.email == data.email) {
            image = require(`./assets/img/speakers/${data.name}.png`)
          }
        })

      let tg;
      let fb;
      let ln;
      if (data.Telegram)
        tg = true
      if (data.Facebook)
        fb = true
      if (data.Linkedin)
        ln = true

      let self = this

      const createSocialNode = (name) => {
        return h('div', [
          h('b-link', {
            props: {
              href: data[name],
              target: '_blank'
            }
          }, [
            h('b-img', {
              props: {
                src: require(`./assets/img/socials/${name.toLowerCase()}.svg`)
              },
              style: {
                width:'50px'
              }
            })
          ]),
          h('b-button', {
            style: {
              background: "none",
              border: "none",
              color: "grey",
            },
            on: {
              click: function () { 
                self.openAsQr(data[name])
              }
            }
          }, [
            self.$root.content.openQrCode
          ])
        ])
      }

      const messageVNode = h('div', { class: ['foobar'] }, [
        (image) ? h('b-img', {
          props: {
            src: image,
            thumbnail: true,
            center: true,
            fluid: true,
            rounded: 'circle'
          }
        }) : "",
        h('p', {
            class: ['text-center'],
            style: {
              "margin": "20px 0px",
              "font-size": "25px",
            }
          },
          [ data.role + " at " + data.company ]
        ),
        h('div', { class: ['row'] }, [
          h('div', { class: ['col centercol'], style: { "margin-bottom": "20px" } }, [
            data.email
          ])
        ]),
        h('div', { class: ['row'] }, [
          ln ? h('div', { class: ['col centercol'] }, [
            createSocialNode("Linkedin")
          ]) : '',
          tg ? h('div', { class: ['col centercol'] }, [
            createSocialNode("Telegram")
          ]) : '',
          fb ? h('div', { class: ['col centercol'] }, [
            createSocialNode("Facebook")
          ]) : ''
        ])
      ])

      this.$bvModal.msgBoxOk([messageVNode], {
        title: [titleVNode],
        buttonSize: 'md',
        centered: true,
        size: 'md',
        hideHeaderClose: false,
        noCloseOnBackdrop: true,
        noCloseOnEsc: true,
      })
    },

    openAsQr (link) {
      const h = this.$createElement
      
      const qr = new qrcode(0, 'H');
      qr.addData(link);
      qr.make();
      const svg = qr.createSvgTag({})
      
      const messageVNode = h('div', {
        class: ['foobar'],
        props: {
          thumbnail: true,
          center: true,
          fluid: true,
        },
        domProps: {
          innerHTML: svg
        }
      })
      
      this.$bvModal.msgBoxOk([messageVNode], {
        title: '',
        buttonSize: 'sm',
        centered: true, size: 'sm'
      })
    },

    joinChats () {
      this.joinGlobalChat()
      this.joinVipChat()
    },

    convertContentWithLineBreaks (content) {
      const h = this.$createElement
      content = content.split('<br>')

      let arr = []
      for (var i = 0; i < content.length; i += 1) {
        arr.push(h('p', [content[i]]))
        content[i+1] && arr.push(h('br'))
      }

      return h(
        'div', { class: ['foobar'] },
        [
          arr
        ]
      )
    }
  },
}).$mount('#app')
