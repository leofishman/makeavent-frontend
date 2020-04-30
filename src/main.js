/**
 * @modules
 */
import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import '@/assets/css/style.scss'

import env from './env'
const host = env.host
const socket = env.socket
const selfhost = env.self
import VueSocketIO from 'socket.io-client'
import qrcode from 'qrcode-generator-es6'
import Notifications from 'vue-notification'
import Axios from 'axios'

/**
 * @router
 */
import router from './router'

/**
 * @content
 */
import Content from './content'

/**
 * @global_components
 */
import Navbar from './components/Navbar.vue'
import Desktop from './views/desktop/Index.vue'
// import Mobile from './components/mobile/Index.vue'
import GlobalChat from './components/Chats/GlobalChat.vue'
import VipChat from './components/Chats/VipChat.vue'
import Pagetitle from './components/Pagetitle.vue'

/**
 * @modals
 */
import InterviewAgenda from './components/Modals/Interview-agenda.vue'
import OngoingInterview from './components/Modals/Ongoing-interviews.vue'
import ZoomFrame from './components/Modals/Zoom-frame.vue'
import ErrorModal from './components/Modals/Error-message.vue'

/**
 * @VUE_uses
 */
Vue.use(Buefy)
Vue.use(Notifications)
Vue.config.productionTip = false

/**
 * @root
 */
Vue.component('navbar', Navbar)
Vue.component('desktop', Desktop)
Vue.component('Pagetitle', Pagetitle)
// Vue.component('mobile', Mobile)

/**
 * @chats
 */
Vue.component('globalchat', GlobalChat)
Vue.component('vipchat', VipChat)

/**
 * @interview
 */
Vue.component('interview-agenda', InterviewAgenda)
Vue.component('ongoing-interviews', OngoingInterview)

/**
 * @Zoom
 */
Vue.component('zoom-frame', ZoomFrame)

/**
 * @Error
 */
Vue.component('error-message', ErrorModal)

const EventBus = new Vue();
window.EventBus = EventBus

new Vue({
  router,
  render: h => h(App),
  data() {
    this.upgradeCost_business = 0
    this.upgradeCost_vip = 0
    this.pendingCards = []

    this.Investors = undefined
    this.MediaPartners = undefined
    this.Speakers = undefined
    this.Sponsors = undefined
    this.Startups = undefined
    this.Workshop = undefined
    this.Speakingagenda = undefined
    this.DemoDayAgenda = undefined
    this.WorkshopAgenda = undefined

    this.selectedLanguage = localStorage.selectedLanguage
    if (!this.selectedLanguage || this.selectedLanguage === undefined)
      this.selectedLanguage = "EN"
    
    let self = this

    // this code will fetch profile and resources if not loaded for some reason
    setInterval(() => {
      if (
        self.$router.currentRoute.name != "Noaccess" &&
        self.$router.currentRoute.name != "Password" &&
        self.$router.currentRoute.name != "LoginThenBusinessCard" && 
        self.$router.currentRoute.name != "LoginWithTempEmail"
      ) {
        if (self.profile === undefined || self.usertype === undefined || self.token === undefined)
          this.getUser()
  
        if (
            self.Investors === undefined &&
            self.MediaPartners === undefined &&
            self.Speakers === undefined &&
            self.Sponsors === undefined &&
            self.Startups === undefined &&
            self.Workshop === undefined
          )
            this.getResourses()
      }
    }, 1000)

    if (this.checkNavShouldBeWithToken()) {
      this.getUser()
      .then(this.getResourses)
      .then(_ => {
        this.getPengingCards()
        this.getActiveBusinessCards()

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
          this.friendRequestAccepted(data)
        })
      })
      .catch(e => {
        this.$router.push('/login')
      })
    }

    window.EventBus.$on('request_contact_confirmed', (data) => {
      this.friendRequestAccepted(data)
    })

    window.EventBus.$on('show_business_card', data => {
      this.openBusinessCard(data)
    })

    return {
      selectedLanguage: this.selectedLanguage,
      notificationAllowed: "",
      profile: this.profile,
      usertype: this.usertype,
      token: this.token,
      content: Content[this.selectedLanguage],
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
      modals: [],

      pendingCards: this.pendingCards,
      activeBusinessCards: this.activeBusinessCards,

      Investors: this.Investors,
      MediaPartners: this.MediaPartners,
      Speakers: this.Speakers,
      Sponsors: this.Sponsors,
      Startups: this.Startups,
      Workshop: this.Workshop,

      Speakingagenda: this.Speakingagenda,
      DemoDayAgenda: this.DemoDayAgenda,
      WorkshopAgenda: this.WorkshopAgenda
    }
  },
  methods: {
    openExternalInBlank (link) {
      const a = document.createElement('a')
      a.href = link
      a.target = "_blank"
      a.click()
    },

    isSocial (data) {
      return [
        
      ]
    },

    navToPage (name) {
      switch(name) {
        case "vip" :
        case "mediahall" :
        case "sip" :
        case "wa" : 
        case "info" :
        this.$router.push({
          path: `/${this.$root.token}/${name}`
        })
        break;

        default :
        this.$router.push({
          path: `/${this.$root.token}/company`,
          query: {
            name: name.toLowerCase()
          }
        })
      }
    },

    joinStage (name) {
      this.$root.getWebinar(name).then(webinar => {
        this.$root.joinWebinar(webinar.zoomWebinarId, "")
      })
    },

    getSponsorSlot (id) {
      return this.Sponsors[id]
    },

    checkIfAlreadyAFriend (card) {               
      if (this.activeBusinessCards.filter(el => el._id == card._id ).length)
        return true
      else
        return false
    },

    getUser () {
      return new Promise((resolve, reject) => {
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

          resolve(true)
        })
      })
    },

    track (name, url) {            
      Axios.post(`${host}/track`, {
        url: url,
        profile: name
      })
      
      return url
    },

    getResourses () {
      return new Promise((resolve, reject) => {
        Axios.get(`${host}/resources?names=investors,mediapartners,speakers,sponsors,startups,workshop,investfunds`, {
          headers: {
            authorization: localStorage.auth
          }
        })
        .then(res => {
          this.Investors = res.data.investors
          this.MediaPartners = res.data.mediapartners
          this.Speakers = res.data.speakers
          this.Sponsors = res.data.sponsors
          this.Startups = res.data.startups
          this.Workshop = res.data.workshop
          this.InvestFunds = res.data.investfunds
  
          if (this.Workshop.length > 1) 
            this.WorkshopAgenda = this.Workshop.filter((a, b) => a.time - b.time)
          else
            this.WorkshopAgenda = this.Workshop
  
          if (this.Speakers.length > 1) 
            this.Speakingagenda = this.Speakers.filter((a, b) => a.time - b.time)
          else
            this.Speakingagenda = this.Speakers
  
          if (this.Startups.length > 1) 
            this.DemoDayAgenda = this.Startups.filter((a, b) => a.time - b.time)
          else
            this.DemoDayAgenda = this.Startups
          
          resolve(true)
        })
      })
    },

    joinWebinar (id, leaveUrl) {
      window.EventBus.$emit('open-webinar-window', { 
        meetingNumber: id,
        leaveUrl: leaveUrl
      })
    },

    getWebinar (name) {
      return new Promise((resolve, reject) => {
        Axios.get(`${host}/webinars?name=${name}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          window.EventBus.$emit('show-error-modal', {
            text: this.$root.content.ErrorMessages[1],
            errorMessage: 'webinarNotSet'
          })
        })
      })
    },

    getPengingCards () {
      Axios.get(`${host}/users/bcpending`, {
        headers: {
          authorization: localStorage.auth
        }
      })
      .then(res => {
        this.pendingCards = res.data
        this.pendingCards.map(el => {
          el.photo = this.tryGetProfilePhoto(el.email)
        })
      })
      .catch(err => {
        console.log(err)
      })
    },

    getActiveBusinessCards () {
      Axios.get(`${host}/users/bcconnected`, {
        headers: {
          authorization: localStorage.auth
        }
      })
      .then(res => {
        this.activeBusinessCards = res.data
        this.activeBusinessCards.map(el => {
          el.photo = this.tryGetProfilePhoto(el.email)
        })
      })
      .catch(err => {
        console.log(err)
      })
    },

    acceptBusinessCard (card) {
      Axios.post(`${host}/users/acceptBusinessCard`, card, {
        headers: {
          authorization: localStorage.auth
        }
      })
      .then(el => {
        setTimeout(() => {
          window.EventBus.$emit('close-overlay-by-id', card._id)

        }, 1000)
      })
    },

    denyBusinessCardRequest (card) {
      Axios.post(`${host}/users/denyBusinessCardRequest`, card, {
        headers: {
          authorization: localStorage.auth
        }
      })
      .then(el => {
        window.EventBus.$emit('close-overlay-by-id', card._id)
      })
    },

    tryGetCompanyLogo (name) {
      return new Promise(async (resolve, reject) => {
        if (name) {
          const response = await Axios.get(host + `/data/companylogo/${name.toUpperCase()}`)
          resolve(response.data)
        }
        else
          resolve('')
      })
    },

    tryGetProfilePhoto (email) {
      let image;
      
      let haveContacts = this.Sponsors.filter(el => el.contacts !== undefined)
      haveContacts.map(el => {
        el.contacts.map((contact, index) => {
          if (contact.email == email) {
            image = contact.photo
          }
        })
      })

      if (!image)
        this.Speakers.map(speaker => {
          if (speaker.email == email) {
            image = speaker.photo
          }
        })

      if (!image)
        this.Workshop.map(workshoper => {
          if (workshoper.email == email) {
            image = workshoper.photo
          }
        })

      return host + image
    },

    combineContent (names) {
      let str = ''
      let arr = names.split(' ')
      arr.map(el => {
        str += this.content[el] + ' '
      })
      return str
    },

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

    check (vars) {
      vars = vars.split(" ")
      let self = this
      return new Promise(async (resolve, reject) => {
        let timer = setInterval(async () => {
          const list = vars.map(el => new Promise((resolve, reject) => {
            if (self[el])
              resolve(true)
          }))
          
          await Promise.all(list)
          clearInterval(timer)
          resolve(true)
        }, 100)
      })
    },

    tokenCheck () {
      let self = this
      return new Promise(async (resolve, reject) => {
        let timer = setInterval(() => {
          if (self.token) {
            clearInterval(timer)
            resolve(true)
          }
        }, 100)
      })
    },

    isThatMe (email) {
      if (this.profile.email == email)
        return true
      else
        return false
    },

    async showBCrequesttoast (el, index) {
      if (!this.isThatMe(el.email)) {
        const response = await Axios.get(host + "/users/bcconnected", {
          headers: {
            authorization: localStorage.auth
          }
        })

        const target = response.data.filter(cards => { el.email == cards.email })
        
        if (target.length) {
          window.EventBus.$emit('request_contact_confirmed', target[0])
        }
        else {
          this.$buefy.dialog.confirm({
            message: this.content.reqBusCardConfirm,
            cancelText: this.content.no,
            confirmText: this.content.yes,
            type: 'is-primary',
  
            onConfirm: () => {
              Axios.post(`${host}/users/savebusinesscard`, {
                id: el._id,
                data: this.profile
              }, {
                headers: {
                  authorization: localStorage.auth
                }
              }).then(res => {
                window.io.emit('request_contact_information', {
                  from: this.profile,
                  to: el
                })
              })
            }
          })
        }
      }
    },

    openIncomingContactRequest (data) {
      let note = this.content.newContactReqNote(data.name.split(" ")[0], data.company, data.role)
      let note2 = this.content.acceptLaterNote(`${selfhost}/${this.token}/profile`)

      this.$buefy.snackbar.open({
        duration: 5000,
        message: `
        ${note}<br>
        ${note2}  
        `,
        position: 'is-bottom-right',
        type: 'is-primary',
        actionText: this.content.accept,
        queue: false,
      })
    },

    friendRequestAccepted (data) {
      this.getPengingCards()
    },

    openBusinessCard (data) {
      const h = this.$createElement
      const titleVNode = h('div', { domProps: { innerHTML: data.name } })
      
      let image = this.tryGetProfilePhoto(data.email)

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
            self.content.openQrCode
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
      const titleVNode = h('div', { domProps: { innerHTML: this.content.oops } })
      let message = this.content.onlyForVIP(component, type)
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

      let message = this.content.onlyForVIP(component, this.content.business + this.content.or + this.content.vip)
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
                  innerHTML: this.content.oops
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
                    self.$emit('bv::hide::modal', 'dual-pay-modal')
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
        let message = this.content.upgradeFor(component, this.content.vip, this[`upgradeCost_${type}`])
      
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
                  innerHTML: this.content.oops
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
                    self.$emit('bv::hide::modal', 'strict-pay-modal')
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
            self.$emit('bv::hide::modal', 'strict-pay-modal')
            self.$emit('bv::hide::modal', 'dual-pay-modal')
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

    /**
     * @description cloo - Check Like Or Operator. Instead of a || b || ...
     * @param {string} valueToCheck parameter that should appear in options
     * @param {string} str option to compare value to
     */
    cloo (valueToCheck, str) {
      const arr = str.split("|")
      if (arr.includes(valueToCheck))
        return true
      else
        return false
    },

    checkComponentAccess (type) {
      return new Promise ((resolve, reject) => {
        this.check('usertype').then(_ => {
          if (this.usertype) {
            switch (type) {
              case 'globalchat' : 
                if (this.cloo(this.usertype, "business|vip|media|startup|investor"))
                  resolve(true)
                else
                  resolve(false)
                break

              case 'vipchat' :
                if (this.cloo(this.usertype, "vip|media|startup|investor"))
                  resolve(true)
                else
                  resolve(false)
                break

              case 'companychat' : 
                if (this.cloo(this.usertype, "business|vip|media|startup|investor"))
                  resolve(true)
                else
                  resolve(false)
                break

              case 'startupchat' : 
                if (this.usertype == "investor")
                  resolve(true)
                else
                  resolve(false)
                break

              case "investorslist" :
                if (this.cloo(this.usertype, 'investor|startup|media'))
                  resolve(true)
                else
                  resolve(false)
                break
            }
          }
        })
      })
    },

    openModal (name, data) {
      window.EventBus.$emit(name, data)
    }
  },
}).$mount('#app')
