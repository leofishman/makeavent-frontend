/**
 * @modules
 */
import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import '@/assets/css/style.scss'

import './domchange.js'
import env from './env'
const host = env.host
const socket = env.socket
const selfhost = env.self
import VueSocketIO from 'socket.io-client'
import Notifications from 'vue-notification'
import Axios from 'axios'
import crypto from 'crypto'

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
import Pagetitle from './components/Pagetitle.vue'
import ResetPwd from './components/ResetPwd.vue'

/**
 * @modals
 */
import ErrorMessage from '@/components/Modals/Error-message.vue'
import JitsiWebinar from '@/components/Modals/Jitsi-modal.vue'
import ZoomWebinar from '@/components/Modals/Zoom-frame.vue'
import ZoomCompanySpeaker from '@/components/Modals/ZoomFrameCompanySpeaker.vue'

/**
 * @popups
 */
import Bcardpreview from '@/components/Popups/Bcardpreview'
import Upgradeticket from '@/components/Popups/Upgradeticket'
import Privatecall from '@/components/Popups/Privatecall'

import AccessLevels from '@/api/accessLevels'

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
Vue.component('ResetPwd', ResetPwd)
// Vue.component('mobile', Mobile)

const EventBus = new Vue();
window.EventBus = EventBus

window.toUp = (a) => {
  if (a)
    return a.toUpperCase()
  else
    return 'UNDEFINED'
}

window.toLo = (a) => {
  if (a)
    return a.toLowerCase()
  else
    return 'UNDEFINED'
}

window.compare = (a, b) => {
  if (window.toUp(a) == window.toUp(b))
    return true
  else 
    return false
}

new Vue({
  router,
  render: h => h(App),
  data() {
    this.shouldCheckResources = this.$router.currentRoute.name != "Noaccess" &&
    this.$router.currentRoute.name != "Password" &&
    this.$router.currentRoute.name != "Backstage" &&
    this.$router.currentRoute.name != "LoginThenBusinessCard" && 
    this.$router.currentRoute.name != "LoginWithTempEmail" &&
    this.$router.currentRoute.name != "Login" &&
    this.$router.currentRoute.name != "RegistrationHall" &&
    this.$router.currentRoute.name != "LoginWithNewPassword" &&
    this.$router.currentRoute.name != "Register";
    
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

    // this.selectedLanguage = localStorage.selectedLanguage
    // if (!this.selectedLanguage || this.selectedLanguage === undefined)
    this.selectedLanguage = "EN"
    
    let self = this    

    // update resousrce every 5 seconds
    setInterval(() => {
      if (this.shouldCheckResources) {
        this.getResourses()
      }
    }, 5000)

    setInterval(() => {
      if (this.shouldCheckResources)
        this.getUser()
    }, 1000)

    if (this.checkNavShouldBeWithToken()) {
      this.getUser()
      .then(this.getResourses())
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
          this.$router.push('/login')
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

      openGlobalChat: false,

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
      WorkshopAgenda: this.WorkshopAgenda,

      compare: window.compare
    }
  },
  methods: {
    decrypt (data) {
      let key = Buffer.from({
        type: 'Buffer',
        data: [
          104,  49,  15, 239, 237, 200,  63, 181,
          64, 149, 108,  49,  61,  88,  98, 178,
          161, 149,  10, 205,  75, 245,  70, 204,
          22,  96, 191,  76, 229, 241, 125,   3
        ]
      })
      let iv = Buffer.from({
        type: 'Buffer',
        data: [
          82, 158, 100, 186,  92, 35,
          243, 108,  30,  36, 198, 47,
          70,  26, 126,  21
        ]
      })
      let encryptedText = Buffer.from(data, 'hex');
      let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return JSON.parse(decrypted.toString())
    },

    switchOpen () {
      if (this.openGlobalChat)
        this.openGlobalChat = false
      else
        this.openGlobalChat = true
    },

    openExternalInBlank (link) {
      const a = document.createElement('a')
      a.href = link
      a.target = "_blank"
      a.click()
    },

    isAdmin (contacts) {
      let x = contacts.filter(el => compare(el.email, this.profile.email))
      return x.length ? true : false;
    },

    privateCall (contact) {
      if (!this.isThatMe(contact.email)) {
        if (contact.calendly) {
          this.openExternalInBlank(contact.calendly)
        }
      }
      else {
        this.$buefy.dialog.alert(this.content.common.itsYou)
      }
    },

    navToPage (name) {
      switch(name) {
        case "vip" :
        case "mediahall" :
        case "wa" : 
        case "info" :
          this.$router.push({
            path: `/${this.token}/${name}`
          })
          break;

        case "sip" :
          this.checkComponentAccess('startupdemoday')
          .then(res => {
            if (res)
              this.$router.push({
                path: `/${this.token}/${name}`
              })
            else
              this.createError(this.content.ErrorMessages[3], 'oops')
          })
          break;
          
        default : {
          let sponsor = this.Sponsors.filter(el => compare(el.name, name))[0]
          if (sponsor)
            this.$router.push({
              path: `/${this.token}/company`,
              query: {
                name: name.toLowerCase()
              }
            })
          else
				    this.$buefy.dialog.alert(this.content.ErrorMessages[7], 'oops')
        }
      }
    },

    openPage (type, link) {
      switch (type) {
        case 'sponsor' :
          this.$router.push({
            name:"Company",
            query: {
              name: link
            }
          })
          break;

        case 'speaker' :
          this.$router.push({ name: "Agenda" })
          break;

        case 'workshop' :
          break;

        case 'mediapartner' :
          this.$router.push({
            name: "MediaPartnerProfile",
            params: {
              name: link
            }
          })
        break;

        case 'startup' : 
          if (this.$root.cloo(toUp(this.$root.usertype), toUp('investor')))
            this.$router.push({
              name: "StartupProfile",
              params: {
                name: link
              }
            })
          else
            this.$router.push({
              name:"Company",
              query: {
                name: link
              }
            })
        break;  

        case 'investfund' :
          if (this.$root.cloo(toUp(this.$root.usertype), toUp('investor|startup|media'))) {
            this.$router.push({
              name: "InvestFundProfile",
              query: {
                name: link
              }
            })
          }
      }
    },

    defineBoothType (name) {
      return new Promise(async (resolve, reject) => {
        let type = ''
        this.check('Sponsors InvestFunds MediaPartners Startups Speakers')
        .then(async () => {
          let sponsor = this.Sponsors.filter(el => compare(el.name, name))[0]
          if (sponsor) {
            type = 'sponsor'
          }
  
          if (!this.haveBooth) {
            let media = this.MediaPartners.filter(el => compare(el.name, name))[0]
            if (media) {
              type = 'mediapartner'
            }
          }
  
          if (!this.haveBooth) {
            let speker = this.Speakers.filter(el => compare(el.name, name))[0]
            if (speker) {
              type = 'speaker'
            }
          }
  
          if (!this.haveBooth) {
            let access = await Promise.all([
              this.checkComponentAccess('investfundprofile'),
              this.checkComponentAccess('startupprofile')
            ])
  
            if (access[0]) {
              let investfund = this.InvestFunds.filter(el => compare(el.name, name))[0]
              if (investfund) {
                type = 'investfund'
              }
            }
  
            else if (!this.haveBooth && access[1]) {
              let startup = this.Startups.filter(el => compare(el.name, name))[0]
              if (startup) {
                type = 'startup'
              }
            }
          }

          resolve(type)
        })
      })
    },

    openStartupProfile (id) {
			
			let focus_startup = this.Startups.filter(el => compare(el._id, id))[0]
			
			const name = focus_startup.name.toLowerCase()
			if (this.cloo(toUp(this.usertype), toUp('investor'))) {
				this.$router.push({
					path: `/${this.token}/sip/${name}`
				}).catch(e => {
					console.log(e)
				})
			}
			// only investor or media can see startup investment profile
			else {
				this.$router.push({
					path: `/${this.token}/company?name=${name}`
				}).catch(e => {
					console.log(e)
				})
			}
		},

    joinStage (name) {
      this.getWebinar(name).then(webinar => {
        this.joinWebinar(webinar)
      })
    },

    addReminderCompany (data, theme) {
      Axios.post(host + `/reminders/new`, {
        time: data.time,
        reason: `${data.name} ${theme}`
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

    addReminder (data, theme) {
      Axios.post(host + `/reminders/new`, {
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

    getSponsorByName (name) {
      let x = this.Sponsors.filter(el => compare(el.name, name.toUpperCase()))
      if (x.length)
        return x[0]
      else
        return [{}]
    },

    tryBusinessCard (el) {
      if (new Date().toLocaleString() > env.startDate)
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
      else
        this.createError(this.content.ErrorMessages[0], 'explorer')
    },

    checkIfAlreadyAFriend (card) {    
      if (this.activeBusinessCards) {
        if (this.activeBusinessCards.filter(el => compare(el._id, card._id) ).length)
          return true
        else
          return false
      }
      else {
        this.getPengingCards().then(this.getActiveBusinessCards)
        .then(() => {
          if (this.activeBusinessCards.filter(el => compare(el._id, card._id) ).length)
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
        .then(res => {
          let data = this.decrypt(res.data.encryptedData)
          this.profile = data.profile

          if (!this.profile.Linkedin && !this.profile.Facebook && !this.profile.Telegram && !this.profile.photo) {
            this.$router.push('/reghall')
          }

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
          const data = this.decrypt(res.data.encryptedData)

          this.Investors = data.investors
          this.MediaPartners = data.mediapartners
          this.Speakers = data.speakers
          this.Sponsors = data.sponsors
          this.Startups = data.startups
          this.Workshop = data.workshop
          this.InvestFunds = data.investfunds

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
      if (new Date().getTime() < new Date(data.time).getTime()) {
        this.$buefy.dialog.alert({
          title: this.content.common.webinarNotStarted,
          message: `Please return at ${new Date(Number(data.time)).toLocaleString()}`,
        })
      }
      else if (data.status != 'ongoing') {
        this.createError(this.content.ErrorMessages[1], 'webinarNotSet')
      }
      else {
        if (compare(data.name, 'demoday') || data.name.includes('sponsorbooth') || compare(data.name, "networkingbooth")) {
          this.$buefy.modal.open({
            props: {
              data: data
            },
            parent: this,
            component: JitsiWebinar,
            hasModalCard: true,
            canCancel: false,
            trapFocus: true,
            fullScreen: true
          })
        }
        else if (data.name.includes('stage')) {
          this.$buefy.modal.open({
            props: {
              data: data
            },
            parent: this,
            component: ZoomWebinar,
            hasModalCard: true,
            canCancel: false,
            trapFocus: true,
            fullScreen: true
          })
        }
        else {
          this.$buefy.dialog.alert({
            title: this.content.common.webinarNotStarted,
            message: `Please return at ${new Date(Number(data.time)).toLocaleString()}`,
          })
        }
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
          const decrypted = this.decrypt(res.data.encryptedData)
          resolve(decrypted)
        })
        .catch(e => {
          if (compare(e.response.data.error, "MEETUP TIME")) {
            this.createError(this.content.ErrorMessages[0], 'explorer')
          }
          else {
            this.createError(this.content.ErrorMessages[1], 'webinarNotSet')
          }
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

    canCall (data) {
      return new Promise(async (resolve, reject) => {
        if (!this.isThatMe(data.email)) {
          this.checkComponentAccess('privatecall')
          .then(res => {
            if (res) {
              if (data.calendly) {
                resolve(true)
              }
            }
            else
              resolve(res)
          })
        }
        else
          resolve(false)
      })
    },

    getPengingCards () {
      Axios.get(`${host}/users/bcpending`, {
        headers: {
          authorization: localStorage.auth
        }
      })
      .then(res => {
        const decrypted = this.decrypt(res.data.encryptedData)
        this.pendingCards = decrypted
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
        const decrypted = this.decrypt(res.data.encryptedData)
        this.activeBusinessCards = decrypted
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
        this.pendingCards = this.pendingCards.filter(el => el._id !== card._id)
        this.activeBusinessCards.push(card)
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
        this.pendingCards = this.pendingCards.filter(el => el._id !== card._id)
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
          if (compare(contact.email, email)) {
            image = contact.photo
          }
        })
      })

      if (!image)
        this.Speakers.map(speaker => {
          if (compare(speaker.email, email)) {
            image = speaker.photo
          }
        })

      if (!image)
        this.Workshop.map(workshoper => {
          if (compare(workshoper.email, email)) {
            image = workshoper.photo
          }
        })

      if (!image)
        image = '/static/img/avatar-default.png'

      return image
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
        this.$router.currentRoute.path != '/reghall' &&
        this.$router.currentRoute.path != '/noaccess' &&
        this.$router.currentRoute.path != '/backstage' &&
        this.$router.currentRoute.path != '/register' &&
        this.$router.currentRoute.path != '/resetpwd'
      )
        return true
      else
        return false
    },

    check (vars) {
      vars = vars.split(" ")
      let self = this

      return new Promise(async (resolve, reject) => {
        let period = 0
        let timer = setInterval(async () => {
          period += 100
          if (period >= 5000) {
            clearInterval(timer)
            reject(vars)
          }
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
      if (compare(this.profile.email, email))
        return true
      else
        return false
    },

    async showBCrequesttoast (el, index) {
      if (!this.isThatMe(el.email)) {
        this.$buefy.dialog.confirm({
          message: this.content.BusinessCard.reqBusCardConfirm,
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
      let note = this.content.BusinessCard.newContactReqNote(data.name.split(" ")[0], data.company, data.role)
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
      this.$buefy.snackbar.open({
        duration: 5000,
        message: this.content.Snackbars.bcAccepted(data),
        position: 'is-bottom-right',
        queue: false,
      })
      this.getPengingCards()
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

      let message = component

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

        if (component) {
          let message = this.content.upgradeFor(component, this.content.vip, this[`upgradeCost_${type}`])
  
          let self = this
  
          this.$buefy.modal.open({
            parent: this,
            props: {
              title: this.content.common.oops,
              message: message,
              type: type,
              types: [
                type
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
        }
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
            if (this.cloo(toUp(this.usertype), toUp(AccessLevels[type])))
              resolve(true)
            else
              resolve(false)
          }
        }).catch(e => console.log(`${e} inaccessible`))
      })
    },

    openModal (name, data) {
      window.EventBus.$emit(name, data)
    }
  },
  watch: {
    openGlobalChat: function (ev) {
      setTimeout(() => {
        document.getElementById('globalchat-global-messages-box').scrollTo(0, window.outerHeight)
        document.getElementById('vipchat-vip-messages-box').scrollTo(0, window.outerHeight)
      }, 500)
    }
  },
}).$mount('#app')
