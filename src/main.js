/**
 * @modules
 */
import Vue from 'vue'
import VueSocketIO from 'socket.io-client'
import Notifications from 'vue-notification'
import Axios from 'axios'
import Buefy from 'buefy'
import VueDraggableResizable from 'vue-draggable-resizable'
import InlineSvg from 'vue-inline-svg'

window.EventBus = new Vue();

import '@/assets/css/style.scss'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import './domchange.js'
import './global_functions.js'

import App from './App.vue'
import {api, socket, self, logo, app, type, communitySrv} from './env'
import {MEETUP} from '@/api/endpoints'

import util from '@/util'
import lodash from 'lodash'
import config from '@/config/config'


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
import Navbar from './components/Navbar/Navbar.vue'
import Desktop from './views/desktop/Index.vue'
import Pagetitle from './components/Pagetitle.vue'
import ResetPwd from './components/Auth/ResetPwd.vue'

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
import Privatecall from '@/components/Popups/Privatecall'
import ActionsWithUserModal from '@/components/Popups/ActionsWithUsers'
import AcceptedInterview from '@/components/Popups/AcceptedInterview'

import AccessLevels from '@/middleware/accessLevels'
import ActionsLord from '@/middleware/ActionsLord'

import store from './store'


Vue.prototype.util = util
Vue.prototype._ = lodash
Vue.prototype.config = config
Vue.prototype.api = api
Vue.prototype.communitySrv = communitySrv

const selfhost = self

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
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('inline-svg', InlineSvg)

Vue.prototype.subscribeMutation = function(someMutation, someFunction) {
  this.$store.subscribe((mutation, state) => {
      if(mutation === someMutation){
          someFunction(state)
      }
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
  data() {   
    let self = this
    
    this.project       = {}
    this.pendingCards  = []
    this.MediaPartners = undefined
    this.Speakers      = undefined
    this.Sponsors      = undefined
    
    /**
     * @description This identifies project type and there are logic based on this type
     */
    this.project.type = type

    this.actionsLord = new ActionsLord(this)

    this.selectedLanguage = localStorage.selectedLanguage
    if (!this.selectedLanguage || this.selectedLanguage === undefined)
      this.selectedLanguage = "EN"
    
    // update resousrce every 60 seconds
    setInterval(() => {
      if (this.shouldCheckResources()) {

        this.actionsLord.GET_RESOURCES ? this.getResourses() : null;
      
      }
    }, 60000)

    setInterval(() => {
      if (this.shouldCheckResources()) {
        this.getUser()
        this.getPengingCards()
        this.getActiveBusinessCards()
      }
    }, 15000);
    
    (this.shouldCheckResources() ? this.getUser() : Promise.resolve(true))
    .then(this.actionsLord.GET_RESOURCES ? this.getResourses() : Promise.resolve(true))
    .then(_ => {
      if (this.$router.currentRoute.query.mediaName && this.$router.currentRoute.query.type == "acceptinterview") {
        Axios.post(api + "/webinars/acceptinterviewinvitation", {
          mediaName: this.$router.currentRoute.query.mediaName,
        }, {
          headers: {
            authorization: localStorage.auth
          }
        })
        .then(res => {
          const mediaName = this.$router.currentRoute.query.mediaName
          this.$buefy.modal.open({
            title: "Success",
            parent: this,
            component: AcceptedInterview,
            props: {
              mediaName: mediaName
            }
          })
        })
        .catch(e => {
          this.createError(e, 'oops')
        })
      }

      this.getPengingCards()
      this.getActiveBusinessCards()

      window.io = VueSocketIO(socket, {
        query: {
          token: localStorage.auth
        }
      })
      this.reloadSocketListeners()

      Notification.requestPermission().then(function(result) {
        self.notificationAllowed = true
      });
  
    })
    .catch(e => {
      this.$router.push('/login').catch(e => {})
    })

    window.EventBus.$on('request_contact_confirmed', (data) => {
      this.friendRequestAccepted(data)
    })

    window.EventBus.$on('show_business_card', data => {
      this.openBusinessCard(data)
    })

    return {
      project: {
        logo: logo,
        name: this.capitalizeFirstLetter(app)
      },
      meetup: false,
      meetupExtraData: {},

      selectedLanguage: this.selectedLanguage,
      notificationAllowed: "",
      profile: this.profile,
      usertype: this.usertype,
      content: Content[this.selectedLanguage],

      openGlobalChat: false,
      openMeetupSettings: true,
      isUserAdmin: false,

      modals: [],

      pendingCards: this.pendingCards,
      activeBusinessCards: this.activeBusinessCards,

      MediaPartners: this.MediaPartners,
      Speakers: this.Speakers,
      Sponsors: this.Sponsors,
    
      Speakingagenda: this.Speakingagenda,

      compare: window.compare,

      showDragableConference: false,
      roomForDragableConference: {},
      activeRooms: [],

      showBackstage: true,
      showScreenButtons: true,

      backstage: {
        mic: false,
        video: false,
        toggleLoading: false
      },
      mainroom: {
        mic: false,
        video: false,
        toggleLoading: false
      },

      backstage_streamApp: {},
      mainroom_streamApp: {},
      reload: []
    }
  },
  methods: {
    reloadSocketListeners () {
        
      window.io.on('connect', (lala) => {
        console.log('socket connected')
      })
  
      // window.io.on('logout', () => {
      //   localStorage.auth = ""
      //   this.$router.push('/login')
      // })
  
      clearInterval(this.authSocketCheck)
      this.authSocketCheck = setInterval(() => {
        window.io.emit('auth', { id:localStorage.auth })
      }, 30000)
  
      window.io.on('incomming_contact_request', (data) => {
        this.openIncomingContactRequest(data)
      })
  
      window.io.on('request_contact_confirmed', (data) => {
        this.friendRequestAccepted(data)
      })

      window.io.on('stage_change_for_user', (msg) => {
        window.EventBus.$emit('STAGE_MANAGER:stage_change_for_user', msg)
      })
    },

    shouldCheckResources () {
      if ( this.$router.currentRoute.name != "Noaccess" &&
      this.$router.currentRoute.name != "Password" &&
      this.$router.currentRoute.name != "Backstage" &&
      this.$router.currentRoute.name != "LoginThenBusinessCard" && 
      this.$router.currentRoute.name != "LoginWithTempEmail" &&
      this.$router.currentRoute.name != "Login" &&
      this.$router.currentRoute.name != "RegistrationHall" &&
      this.$router.currentRoute.name != "LoginWithNewPassword" &&
      this.$router.currentRoute.name != "Register" )
        return true
    },

    canRequestInterview () {
      if (this.checkComponentAccess('interview')) {
        return true
      }
      else {
        return false
      }
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
      return contacts.includes(this.profile._id)
    },

    privateCall (contact) {
      if (!this.isThatMe(contact._id)) {
        if (this.checkIfAlreadyAFriend(contact)) {
          if (contact.calendly) {
            this.openExternalInBlank(contact.calendly)
          }
        }
        else
          this.createError("Only connected user can access private call. Request a business card first.", 'oops')
      }
      else {
        this.$buefy.dialog.alert(this.content.common.itsYou)
      }
    },

    navToPage (name) {
      switch(name) {
        case "mediahall" :
        case "info" :
          this.$router.push({
            path: `/${name}`
          })
          break;
          
        default : {
          // let sponsor = this.Sponsors.filter(el => compare(el.name, name))[0]
          // if (sponsor)
          //   this.$router.push({
          //     path: `/company`,
          //     query: {
          //       name: name.toLowerCase()
          //     }
          //   })
          // else
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

        case 'mediapartner' :
          this.$router.push({
            name: "MediaPartnerProfile",
            params: {
              name: link
            }
          })
        break;
      }
    },

    defineBoothType (name) {
      return new Promise(async (resolve, reject) => {
        let type = ''
        this.check('Sponsors MediaPartners Speakers')
        .then(async () => {
          // let sponsor = this.Sponsors.filter(el => compare(el.name, name))[0]
          // if (sponsor) {
          //   type = 'sponsor'
          // }
  
          if (!this.haveBooth) {
            let media = this.MediaPartners.filter(el => compare(el.name, name))[0]
            if (media) {
              type = 'mediapartner'
            }
          }
  
          if (!this.haveBooth) {
            // let speker = this.Speakers.filter(el => compare(el.name, name))[0]
            // if (speker) {
            //   type = 'speaker'
            // }
          }

          resolve(type)
        })
      })
    },

    joinStage (name) {
      this.getWebinar(name).then(webinar => {
        this.joinWebinar(webinar)
      })
    },

    addReminderCompany (data, theme) {
      Axios.post(api + `/reminders/new`, {
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
      Axios.post(api + `/reminders/new`, {
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
      // if (new Date().toLocaleString() > env.startDate)
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
      // else
      //   this.createError(this.content.ErrorMessages[0], 'explorer')
    },

    checkIfAlreadyAFriend (card) {
      if (this.isThatMe(card._id)) {
        return true
      }
      else if (this.activeBusinessCards) {
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
        Axios.get(api+`/auth/checkAccess?path=HOME`, {
          headers: {
            authorization: localStorage.auth
          }
        })
        .then(res => {
          let data = res.data
          this.profile = data.profile
          this.usertype = data.type

          resolve(true)
        })
        .catch(e => {
          if (compare(e.response.data ,"NO ACCESS"))
            this.$router.push('/login').catch(e => {})
        })
      })
    },

    track (name, url) {            
      Axios.post(`${api}/track`, {
        url: url,
        profile: name
      })
      
      return url
    },

    getResourses () {
      return new Promise((resolve, reject) => {
        Axios.get(`${api}/resources?names=mediapartners,speakers,sponsors`, {
          headers: {
            authorization: localStorage.auth
          }
        })
        .then(res => {
          const data = res.data

          this.MediaPartners = data.mediapartners
          this.Speakers = data.speakers
          this.Sponsors = data.sponsors

          if (this.Speakers.length > 1) {
            let flags = {}
            this.Speakingagenda = this.util.sortArrayBy(this.Speakers, 'time')
            this.Speakingagenda = this.Speakingagenda.filter(el => {
              if (flags[el.contact.name]) {
                return false;
              }
              flags[el.contact.name] = true;
              return true;
            })
          }
          else
            this.Speakingagenda = this.Speakers

          resolve(true)
        })
        .catch(e => {
          if (!localStorage.auth || localStorage.auth == "undefined") {
            this.$router.push('/login').catch(e => {})
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
        if (
          compare(data.name, 'demoday') ||
          data.name.includes('sponsorbooth') ||
          compare(data.name, "networkingbooth") ||
          data.name.includes('interviewbooth')
        ) {
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
        Axios.get(`${api}/webinars?name=${name}`, {
          headers: {
            authorization: localStorage.auth
          }
        })
        .then(res => {
          const decrypted = res.data
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

    createError (text, errorMessage, cancelEvent) {
      this.$buefy.modal.open({
        parent: this,
        props: {
          text: text, 
          errorMessage: errorMessage,
          cancelEvent: cancelEvent
        },
        component: ErrorMessage,
        hasModalCard: true,
        trapFocus: true,
      })
    },

    canCall (data) {
      return new Promise(async (resolve, reject) => {
        if (!this.isThatMe(data._id)) {
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
      return new Promise(async (resolve, reject) => {
        Axios.get(`${api}/users/bcpending`, {
          headers: {
            authorization: localStorage.auth
          }
        })
        .then(res => {
          this.pendingCards = this.util.sortArrayBy(res.data, 'name')
          this.pendingCards.map(el => {
            if (!el.photo)
              el.photo = this.tryGetProfilePhoto(el.email)
          })

          resolve(true)
        })
        .catch(err => {
          resolve(true)
          console.log(err)
        })
      })
    },

    getActiveBusinessCards () {
      return new Promise(async (resolve, reject) => {
        Axios.get(`${api}/users/bcconnected`, {
          headers: {
            authorization: localStorage.auth
          }
        })
        .then(res => {
          this.activeBusinessCards = this.util.sortArrayBy(res.data, 'name')
          this.activeBusinessCards.map(el => {
            if (!el.photo)
              el.photo = this.tryGetProfilePhoto(el.email)
          })

          resolve(true)
        })
        .catch(err => {
          resolve(true)
          console.log(err)
        })
      })
    },

    acceptBusinessCard (card) {
      Axios.post(`${api}/users/acceptBusinessCard`, card, {
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
      Axios.post(`${api}/users/denyBusinessCardRequest`, card, {
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
          const response = await Axios.get(api + `/data/companylogo/${name.toUpperCase()}`)
          resolve(response.data)
        }
        else
          resolve('')
      })
    },

    tryGetProfilePhoto (email) {
      let image;
     
      // let haveContacts = this.Sponsors.filter(el => el.contacts !== undefined)
      // haveContacts.map(el => {
      //   el.contacts.map((contact, index) => {
      //     if (compare(contact.email, email)) {
      //       image = contact.photo
      //     }
      //   })
      // })

      if (this.Speakers && !image)
        this.Speakers.map(speaker => {
          if (compare(speaker.email, email)) {
            image = speaker.photo
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

    isThatMe (id) {
      if (compare(this.profile._id, id))
        return true
      else
        return false
    },

    async showBCrequesttoast (el, index) {
      if (!this.isThatMe(el._id)) {
        this.$buefy.modal.open({
          parent: this,
          props: {
            targetContact: el
          },
          component: ActionsWithUserModal,
          hasModalCard: true,
          trapFocus: true
        })
      }
      else 
        this.$buefy.dialog.alert(this.content.common.itsYou)
    },

    openIncomingContactRequest (info) {
      let note = this.content.BusinessCard.newContactReqNote(info.from.name.split(" ")[0], info.from.company, info.from.role)
      let note2 = this.content.acceptLaterNote(`${selfhost}/profile`)

      this.$buefy.snackbar.open({
        duration: 5000,
        message: `
          <div>
            <div style="">
              ${note}<br>
              ${note2}
            </div>
            <div style="color: #696969;
              background: #f3f3f3;
              font-size: 1.3rem;
              padding: 10px;
              border-radius: 5px;
              font-weight: 500;
              border: 1px solid #d1d1d1;"
            >
              ${info.note}
            </div>
          </div>
        `,
        position: 'is-bottom-right',
        type: 'is-primary',
        actionText: this.content.accept,
        component: `<template></template>`,
        queue: false,
        onAction: () => {
          this.acceptBusinessCard(info.from)
        }
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
    },

    childsEqualsToData (id, data) {
      return Array.from(document.getElementById(id).children).length == data.length ? true : false;
    },

    joinRoom (room) {
      if (!room.participants.includes(this.profile._id)) {
        let promises = this.activeRooms.filter(el => {
          if (el.participants.includes(this.profile._id))
            return this.leaveRoom(el.parentMeetup, el._id)
        })
  
        Axios.post(MEETUP.joinMeetupRoom, {		
          id: room.parentMeetup,
          roomId: room._id
        },
        {
          headers: {
            authorization: localStorage.auth
          }
        }).then(res => {
          this.showDragableConference = true
          room.participants.push(this.profile._id)
          this.roomForDragableConference = room
        })
      }
    },

    leaveRoom (id, roomId) {
      return new Promise((resolve, reject) => {
        Axios.post(MEETUP.leaveMeetupRoom, {		
          id: id,
          roomId: roomId
        },
        {
          headers: {
            authorization: localStorage.auth
          }
        }).then(res => {
          this.activeRooms = res.data
          resolve()
        })
      })
    }
  },
  watch: {
    openGlobalChat: function (ev) {
      let self = this
      let timer = setInterval(() => {
        if (self.childsEqualsToData) {
          clearInterval(timer)
          document.getElementById('globalchat-global-messages-box').scrollTo(0, 123456789)
        }
      }, 50)
    }
  },
}).$mount('#app')
