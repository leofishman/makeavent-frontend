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
import GlobalChat from './components/Chats/GlobalChat.vue'
import VipChat from './components/Chats/VipChat.vue'
import Pagetitle from './components/Pagetitle.vue'

/**
 * @modals
 */
import ErrorMessage from './components/Modals/Error-message.vue'
import JitsiWebinar from './components/Modals/Jitsi-modal.vue'
import ZoomWebinar from './components/Modals/Zoom-frame.vue'

/**
 * @popups
 */
import Bcardpreview from '@/components/Popups/Bcardpreview'
import Upgradeticket from '@/components/Popups/Upgradeticket'

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
        self.$router.currentRoute.name != "LoginWithTempEmail" &&
        self.$router.currentRoute.name != 'Login'
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

    isAdmin (contacts) {
      let x = contacts.filter(el => el.email == this.profile.email)
      return x.length ? true : false;
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
          path: `/${this.token}/${name}`
        })
        break;

        default :
        this.$router.push({
          path: `/${this.token}/company`,
          query: {
            name: name.toLowerCase()
          }
        })
      }
    },

    joinStage (name) {
      this.getWebinar(name).then(webinar => {
        this.joinWebinar(webinar)
      })
    },

    addReminder (data, theme) {
      Axios.post(host + `/reminders/new`, {
        email: data.contact.email,
        time: data.time,
        reason: `${data.contact.name} ${data.contact.role} ${data.contact.company} ${theme}`
      }, {
        headers: {
          authorization: localStorage.auth
        }
      })
      .then((res) => {
        this.$buefy.dialog.alert(this.content.common.success)
      })
      .catch(err => {
        this.createError(this.content.ErrorMessages[2], 'oops')
      })
    },

    getSponsorSlot (id) {
      return this.Sponsors[id]
    },

    tryBusinessCard (el) {
      this.checkComponentAccess('bcrequest')
      .then(haveAccessToBc => {
        if (haveAccessToBc) {
          if (this.checkIfAlreadyAFriend(el)) {
            this.$buefy.modal.open({
              parent: this,
              props: {
                data: el
              },
              component: Bcardpreview,
              hasModalCard: true,
              customClass: 'bcardpreview',
              trapFocus: true
            })
          }
          else {
            this.showBCrequesttoast(el)
          }
        }
        else {
          this.showMessageToUpgradeBusOrVip('Business Cards')
        }
      })
    },

    checkIfAlreadyAFriend (card) {    
      if (this.activeBusinessCards) {
        if (this.activeBusinessCards.filter(el => el._id == card._id ).length)
          return true
        else
          return false
      }
      else {
        this.getPengingCards().then(this.getActiveBusinessCards)
        .then(() => {
          if (this.activeBusinessCards.filter(el => el._id == card._id ).length)
            return true
          else
            return false
        })
      }
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

    DateComparator (a, b) {
      if (a.time < b.time) {
          return -1;
      } else if (a.time > b.time) {
          return 1;
      } else {
          return 0;
      }
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
            this.WorkshopAgenda = this.Workshop.sort(this.DateComparator)
          else
            this.WorkshopAgenda = this.Workshop
  
          if (this.Speakers.length > 1) 
            this.Speakingagenda = this.Speakers.sort(this.DateComparator)
          else
            this.Speakingagenda = this.Speakers
  
          if (this.Startups.length > 1) 
            this.DemoDayAgenda = this.Startups.sort(this.DateComparator)
          else
            this.DemoDayAgenda = this.Startups

          resolve(true)
        })
        .catch(e => {
          if (!localStorage.auth || localStorage.auth == "undefined") {
            this.$router.push('/login')
          }
        })
      })
    },

    joinWebinar (data) {
      if (data.platform == "jitsi") {
        this.$buefy.modal.open({
          props: {
            data: data
          },
          parent: this,
          component: JitsiWebinar,
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true
        })
      }
      else if (data.platform == "zoom") {
        this.$buefy.modal.open({
          props: {
            data: data
          },
          parent: this,
          component: ZoomWebinar,
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true
        })
      }
    },

    getWebinar (name) {
      return new Promise((resolve, reject) => {
        Axios.get(`${host}/webinars?name=${name}`, {
          headers: {
            authorization: localStorage.auth
          }
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          this.createError(this.content.ErrorMessages[1], 'webinarNotSet')
        })
      })
    },

    createError (text, errorMessage) {
      this.$buefy.modal.open({
        parent: this,
        props: {
          text: text, 
          errorMessage: errorMessage
        },
        component: ErrorMessage,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true
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
        this.$router.currentRoute.path != '/loginrtp' &&
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
            if (el.split('.')[1] == "length") {
              if (self[el.split('.')[0]])
                if (self[el.split('.')[0]].length)
                  resolve(true)
            }
            else if (self[el])
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
      else 
        this.$buefy.dialog.alert(this.content.common.itsYou)
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

    joinChats () {
      this.joinGlobalChat()
      this.joinVipChat()
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
            clearInterval(timerForUserLoged)
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

      let message = this.content.onlyForUsertype(component, this.content.business + this.content.or + this.content.vip)

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

        let self = this

        this.$buefy.modal.open({
          parent: this,
          props: {
            title: this.content.common.oops,
            message: message,
            type: "",
            types: [
              'business',
              'vip'
            ]
          },
          component: Upgradeticket,
          hasModalCard: true,
          customClass: 'upgradeticket',
          trapFocus: true,
          onCancel: function () {
            self[`business_paypalButtonRendered`] = false
            self[`vip_paypalButtonRendered`] = false
          }
        })
      })
    },

    async showMessageToUpgradeStrict (component, type) {
      Axios.get(`${host}/ticket/upgrade?type=${type}`, {
        headers: {
          authorization: localStorage.auth
        }
      }).then(res => {
        this[`upgradeCost_${type}`] = res.data.amount
        let message = this.content.upgradeFor(component, this.content.vip, this[`upgradeCost_${type}`])

        let self = this

        this.$buefy.modal.open({
          parent: this,
          props: {
            title: this.content.common.oops,
            message: message,
            type: type,
            types: [
              'vip'
            ]
          },
          component: Upgradeticket,
          hasModalCard: true,
          customClass: 'upgradeticket',
          trapFocus: true,
          onCancel: function () {
            self[`${type}_paypalButtonRendered`] = false
          }
        })
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
              this.upgradeTicket(type)
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

              case "bcrequest" : 
                if (this.cloo(this.usertype, "business|vip|media|startup|investor"))
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
