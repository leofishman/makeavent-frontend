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
    this.upgradeCost_business = 0
    this.upgradeCost_vip = 0

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
      })
      .catch(e => {
        this.$router.push('/login')
      })
    }

    // let waitLogin = setInterval(() => {
    //   if (this.token && this.profile && this.usertype) {
    //     clearInterval(waitLogin)

        
    //   }
    // }, 100)

    window.EventBus.$on('request_contact_confirmed', (data) => {
      this.openContactConfirmedModal(data)
    })

    window.EventBus.$on('show_business_card', data => {
      this.openBusinessCard(data)
    })

    return {
      notificationAllowed: "",
      profile: this.profile,
      usertype: this.usertype,
      token: this.token,
      content: Content[selectedLanguage],
      globalchat: "",
      vipchat: "",
      rowStyle: {
        'display': '-ms-flexbox',
        'display': '-webkit-box',
        'display': 'flex',
        '-ms-flex-wrap': 'wrap',
        'flex-wrap': 'wrap',
        '-ms-flex-align': 'center',
        '-webkit-box-align': 'center',
        'align-items': 'center',
        '-ms-flex-pack': 'end',
        '-webkit-box-pack': 'end',
        'justify-content': 'flex-end',
        'padding': '0.75rem',
        'border-top': '1px solid #dee2e6',
        'border-bottom-right-radius': 'calc(0.3rem - 1px)',
        'border-bottom-left-radius': 'calc(0.3rem - 1px)',
      },

      business_paypalButtonRendered: false,
      vip_paypalButtonRendered: false,
      modals: []
    }
  },
  methods: {
    capitalizeFirstLetter (text) {
      return text.charAt(0).toUpperCase() + text.substring(1);
    },

    checkNavShouldBeWithToken () {
      if (
        !this.token &&
        !this.profile &&
        !this.usertype &&
        !this.$router.currentRoute.fullPath.includes('auth=true') &&
        this.$router.currentRoute.path != '/login' &&
        this.$router.currentRoute.path != '/loginWithTemporaryEmail' &&
        this.$router.currentRoute.path != '/noaccess' &&
        !this.$router.currentRoute.fullPath.includes('businesscard')
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
    },

    showMessageToUpgrade (component, type) {
      const self = this
      const h = this.$createElement
      const titleVNode = h('div', { domProps: { innerHTML: this.$root.content.oops } })
      let message = this.$root.content.onlyForVIP(component, type)
      message = message.split("<br>")
      
      const messageVNode = h('div', {  }, [
        h('div', {}, [
          message[0]
        ]),
        h('br'),
        h('div', {}, [
          message[1],
        ]),
        h('div', { class:['row'], style: {
          'display': '-ms-flexbox',
          'display': '-webkit-box',
          'display': 'flex',
          '-ms-flex-wrap': 'wrap',
          'flex-wrap': 'wrap',
          '-ms-flex-align': 'center',
          '-webkit-box-align': 'center',
          'align-items': 'center',
          '-ms-flex-pack': 'end',
          '-webkit-box-pack': 'end',
          'justify-content': 'flex-end',
          'padding': '0.75rem',
          'border-top': '1px solid #dee2e6',
          'border-bottom-right-radius': 'calc(0.3rem - 1px)',
          'border-bottom-left-radius': 'calc(0.3rem - 1px)',
        } }, [
          h('div', { class:['col-2 leftalign nopadding'] }, [
            h(
              'b-button',
              {
                class:[
                  'btn-warning'
                ],
                on: {
                  click: function () {
                    self.$router.push('/')
                  }
                }
              },
              [
                this.content.no
              ]
            ),
          ]),
          h('div', { class:['col-4 rightalign nopadding'] }, [
            h(
              'b-button',
              {
                props:
                {
                  variant: "primary"
                }, 
                on: {
                  click: function () { 
                    self.upgradeTicket("vip")
                  }
                }
              },
              [ 
                this.content.buyTicket(this.content.vip)
              ]
            )
          ])
        ]),
      ])

      this.$bvModal.msgBoxConfirm([messageVNode], {
        title: [titleVNode],
        buttonSize: 'md',
        centered: true,
        size: 'md',
        noCloseOnBackdrop: true,
        noCloseOnEsc: true,
        footerClass: 'none'
      })
    },

    upgradeTicket(type) {
      if (localStorage.auth) {
        Axios.post(`${host}/ticket/upgrade`, {
          type: type
        }, {
          headers: {
            authorization: localStorage.auth
          }
        })
        .then(res => {
          this.profile = res.data.profile
          window.location.reload()
        })
        .catch(e => {})
      }
      else {
        this.$router.push('/login')
        let timerForUserLoged = setInterval(() => {
          if (localStorage.auth) {
            clearInterva(timerForUserLoged)
            Axios.post(`${host}/ticket/upgrade`, {
              type: type
            }, {
              headers: {
                authorization: localStorage.auth
              }
            })
            .then(res => {
              this.profile = res.data.profile
              window.location.reload()
            })
            .catch(e => {})
          }
        }, 100)
      }
    },

    showMessageToUpgradeBusOrVip (component) {
      this[`business_paypalButtonRendered`] = false
      this[`vip_paypalButtonRendered`] = false

      const h    = this.$createElement
      const self = this

      let message = this.$root.content.onlyForVIP(component, this.$root.content.business + this.$root.content.or + this.$root.content.vip)
          message = message.split('<br>')

      Axios.get(`${host}/ticket/upgrade?type=business`, {
        headers: {
          authorization: localStorage.auth
        }
      }).then(res => {
        this.upgradeCost_business = res.data.amount
        return Axios.get(`${host}/ticket/upgrade?type=vip`, {
          headers: {
            authorization: localStorage.auth
          }
        })
      }).then(res => {
        this.upgradeCost_vip = res.data.amount

        const messageVNode = h('div', {  }, [
          h(
            'div', {
              class: ["modal-header"],
            },
            [
              h('h5', {
                class:['modal-title'],
                domProps: {
                  innerHTML: this.$root.content.oops
                }
              }),
              h('button', {
                class:['close'],
                attrs: {
                  type: "button",
                  ariaLabel: "Close"
                },
                on: {
                  click: function () {
                    self.$root.$emit('bv::hide::modal', 'dual-pay-modal')
                    self[`business_paypalButtonRendered`] = false
                    self[`vip_paypalButtonRendered`] = false
                  }
                }
              }, 
              [
                '×'
              ])
            ]
          ),
          h('div', { style: { padding:'16px' } }, [
            h('div', {
              domProps: {
                innerHTML: message[0]
              }
            }),
            h('br'),
            h('div', {
              domProps: {
                innerHTML: message[1]
              }
            })
          ]),
          h('div', { class:['row nopadding'], style: this.rowStyle }, [
            h('b-col', [
              h('b-dropdown', {attrs:{ variant:"outline-primary", text:this.content.chooseTicketType }}, [
                h('b-dropdown-item', {
                  on: {
                    click: function () {
                      self.business_paypalButtonRendered = false
                      if (document.querySelector('div[id^="zoid-paypal-buttons"]'))
                        document.querySelector('div[id^="zoid-paypal-buttons"]').remove()
                      
                      self.renderPaypalButton("vip", 'dual-paypal-button-container')
                    }
                  },
                }, [
                  this.content.vip + '  $' + this.upgradeCost_vip + '.00'
                ]),
                h('b-dropdown-item', {
                  on: {
                    click: function () {
                      self.vip_paypalButtonRendered = false
                      if (document.querySelector('div[id^="zoid-paypal-buttons"]'))
                        document.querySelector('div[id^="zoid-paypal-buttons"]').remove()
                      
                      self.renderPaypalButton("business", 'dual-paypal-button-container')
                    }
                  }
                }, [
                  this.content.business + '  $' + this.upgradeCost_business + '.00'
                ])
              ])
            ]),
            h('b-col', [
              h('div', { attrs: {id: 'dual-paypal-button-container'} })
            ])
          ]),
        ])
  
        this.$bvModal.msgBoxConfirm([messageVNode], {
          buttonSize: 'md',
          centered: true,
          size: 'md',
          footerClass: 'none',
          hideHeaderClose: true,
          noCloseOnBackdrop: true,
          noCloseOnEsc: true,
          id: 'dual-pay-modal'
        })
      })
    },

    async showMessageToUpgradeStrict (component, type) {
      const h = this.$createElement
      const self = this

      Axios.get(`${host}/ticket/upgrade?type=${type}`, {
        headers: {
          authorization: localStorage.auth
        }
      }).then(res => {
        this[`upgradeCost_${type}`] = res.data.amount
        let message = this.$root.content.upgradeFor(component, this.$root.content.vip, this[`upgradeCost_${type}`])
      
        message = message.split('<br>')
  
        const messageVNode = h('div', {  }, [
          h(
            'div', {
              class: ["modal-header"],
            },
            [
              h('h5', {
                class:['modal-title'],
                domProps: {
                  innerHTML: this.$root.content.oops
                }
              }),
              h('button', {
                class:['close'],
                attrs: {
                  type: "button",
                  ariaLabel: "Close"
                },
                on: {
                  click: function (event) {
                    self.$root.$emit('bv::hide::modal', 'strict-pay-modal')
                    self[`${type}_paypalButtonRendered`] = false
                  }
                }
              },
              [
                '×'
              ])
            ]
          ),
          h('div', { style: { padding:'16px' } }, [
            h('div', {
              domProps: {
                innerHTML: message[0]
              }
            }),
            h('br'),
            h('div', {
              domProps: {
                innerHTML: message[1]
              }
            })
          ]),
          h('div', { class:['row'], style: this.rowStyle }, [
            h('div', {
              class:['col centercol nopadding'],
              attrs: {
                id: `paypal-button-container-${type}`
              }
            },),
          ]),
        ])
  
        this.$bvModal.msgBoxConfirm([messageVNode], {
          buttonSize: 'md',
          centered: true,
          size: 'md',
          footerClass: 'none',
          hideHeaderClose: true,
          noCloseOnBackdrop: true,
          noCloseOnEsc: true,
          id: 'strict-pay-modal'
        })
        
        setTimeout(() => {
          this.renderPaypalButton(type, `paypal-button-container-${type}`)
        }, 500)
      })
    },

    renderPaypalButton (type, to) {
      let self = this
      if (!this[`${type}_paypalButtonRendered`]) {
        this[`${type}_paypalButtonRendered`] = true
        paypal.Buttons({
          env: 'production',
          locale: 'en_US',
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: self[`upgradeCost_${type}`]
                }
              }]
            });   
          },
      
          // Finalize the transaction
          onApprove: function(data, actions) {
            self.$root.$emit('bv::hide::modal', 'strict-pay-modal')
            self.$root.$emit('bv::hide::modal', 'dual-pay-modal')
            self[`${type}_paypalButtonRendered`] = false

            return actions.order.capture().then(function(details) {
              Axios.post(`${host}/ticket/upgrade`, {
                type: type
              }, {
                headers: {
                  authorization: localStorage.auth
                }
              }).then(res => {
                window.location.reload()
              })
            })
          }
        }).render(`#${to}`);
      }
    },

    isChatAvailable (type) {
      return new Promise ((resolve, reject) => {
        let self = this
        let timer = setInterval(() => {
          if (self.usertype) {
            clearInterval(timer)
            switch (type) {
              case 'global' : 
                if (self.usertype == "business" || self.usertype == "vip")
                  resolve(true)
                else
                  resolve(false)
                break

              case 'vip' :
                if (self.usertype == "vip")
                  resolve(true)
                else
                  resolve(false)
                break

              case 'company' : 
                if (self.usertype == "business" || self.usertype == "vip")
                  resolve(true)
                else
                  resolve(false)
                break
            }
          }
        })
      })
    },
  },
}).$mount('#app')
