<template>
    <div>
        <div :id="id" class="video-stream">
            <div class="box">
                <div class="content-box" v-if="showScreensaver">
                    <div v-if="defaultLoader" class="content">
                        <span>{{content.willStartIn}}</span> {{clock}}
                    </div>
                    <div v-else-if="joiningBackstage" class="content">
                        <span v-html="content.joiningBackstage"></span>
                    </div>
                    <div v-else-if="joiningMainroom" class="content">
                        <span v-html="content.joiningMainroom"></span>
                    </div>
                    
                    <div :style="{
                        backgroundColor: meetup.screensaverColor,
                        opacity: meetup.screensaverColor ? 0.6 : 0
                    }" class="scr-saver-fileld__bg"></div>
                    <video v-if="meetup.screensaver" class="screensaver" autoplay muted loop>
                        <source :src="meetup.screensaver" type="video/mp4">
                    </video>
                </div>

                <div v-if="!showScreensaver && $root.showScreenButtons" class="screen-buttons">
                    <div class="columns nopadding">
                        <div v-if="!$root[id].video" class="column">
                            <div @click="toggleVideo()" class="screen-buttons-image-wrap">
                                <img src="@/assets/img/VideoStream/camera.svg" alt="">
                            </div>
                        </div>
                        <div v-if="$root[id].video" class="column">
                            <div @click="toggleVideo()" class="screen-buttons-image-wrap">
                                <img src="@/assets/img/VideoStream/cameraoff.svg" alt="">
                            </div>
                        </div>
                        <div v-if="!$root[id].mic" class="column">
                            <div @click="toggleAudio()" class="screen-buttons-image-wrap">
                                <img src="@/assets/img/VideoStream/mic.svg" alt="">
                            </div>
                        </div>
                        <div v-if="$root[id].mic" class="column">
                            <div @click="toggleAudio()" class="screen-buttons-image-wrap">
                                <img src="@/assets/img/VideoStream/micoff.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <div :id="jitsiTarget" class="card-image"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios       from 'axios'
import VueSocketIO from 'socket.io-client'
import {MEETUP}    from '@/api/endpoints'
import jitsi       from '@/api/jitsi'
import {api, STAGES_MANAGER_HOST, STAGES_MANAGER_PATH} from '@/env'

export default {
    name: "JitsiStream",
    props: {
        _id: String,
        meetup: Object
    },
    data () {
        window.EventBus.$on('STAGE_MANAGER:stage_change_for_user', (msg) => {
            this.defineHowToRender()
            
            if ( this.userType != "admin" ) {
                const isInBackstage  = msg.backstage.participants.includes(this.$root.profile._id)
                const isInmainroom = msg.mainroom.participants.includes(this.$root.profile._id)

                this.backstage  = msg.backstage
                this.mainroom = msg.mainroom

                if ( isInBackstage ) {
                    this.id = "backstage"
                }

                if ( isInmainroom ) {
                    this.id = "mainroom"
                }
            }
        })

        this.id = this._id
        this.defineHowToRender()
        this.countdown(this.$root.meetup.startDate)

        return {
            content: this.$root.content.JitsiStream,

            showScreensaver: true,
            clock: this.clock,
            dotsGoingUp: true,
            userType: "",
            id: this._id, 

            defaultLoader: true,
            joiningBackstage: false,
            joiningMainroom: false,

            jitsiTarget: `jitsi-modal-target-${this.id}`,
            iframe: "",
        }
    },
    methods: {
        defineHowToRender () {
            if ( this.$root.meetup.speakers.filter(el => el._id == this.$root.profile._id).length )
                this.userType = 'speaker'
            
            else
                this.userType = 'basic'
            
            if (this.$root.isUserAdmin)
                this.userType = 'admin'
        },

        countdown (time) {
            const self = this
            const countDownDate = new Date(time).getTime();

            this.countdownForWebinar()

            const x = setInterval(function() {
                const now = new Date().getTime();
                const distance = countDownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                self.clock = days + "D " + hours + "H "
                + minutes + "M " + seconds + "S ";

                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(x);
                    self.content.willStartIn = 'Starting'
                    self.clock = ''
                    self.dotdot()
                }
            }, 1000);
        },

        dotdot () {
            const self = this
            var dots = window.setInterval( function() {
                if ( self.dotsGoingUp ) 
                    self.clock += ".";
                else {
                    self.clock = ""
                    if ( self.clock === "")
                        self.dotsGoingUp = true;
                }
                if ( self.clock.length > 2 )
                    self.dotsGoingUp = false;

            }, 1000);
        },

        countdownForWebinar () {
            let self = this
            this.timerCheckStream = setInterval(() => {
                if ( self.$root.shouldCheckResources() )
                    if ( !self.$root.cronMeetupSchema ) {
                        self.$parent.getMeetup()
                        .then(() => {
                            if ( self.checkStreamStarted() ) {
                                clearInterval(this.timerCheckStream)
                                self.startStream()
                            }
                        })
                    }
                    else {
                        if ( self.checkStreamStarted() ) {
                            clearInterval(this.timerCheckStream)
                            self.startStream()
                        }
                    }
            }, 5000)
        },

        checkStreamStarted () {
            if ( this.userType == 'admin' )
                return true

            else if ( this.userType == "speaker" ) {
                if ( this.id == "backstage" )
                    return true

                else if ( this.id == "mainroom" ) {
                    if (this.$root.meetup.status == "ongoing")
                        return true

                    else
                        return false
                }
            }

            else if ( this.userType == "basic" ) {
                if ( this.id == "mainroom" )
                    if (this.$root.meetup.status == "ongoing")
                        return true

                    else
                        return false
            }
        },

        getBackstage () {
            if ( this.userType == 'admin' )
                return new Promise((resolve, reject) => {
                    Axios.create({
                        baseURL: MEETUP.getMeetupBackstage + '?id=' + this.$root.meetup._id,
                        headers: {
                            authorization: localStorage.auth
                        }
                    })()
                    .then(res => {
                        this.backstage = res.data
                        resolve()
                    })
                    .catch(reject)
                })
            else
                return
		},

        startStream () {
            clearInterval(this.timerCheckStream)

            let once, avatarPic = false

            this.$root.check('meetup')
            .then(async () => {
                const meetup = this.$root.meetup
                meetup.type = "meetup"

                if ( this.id == "backstage" ) {
                    await this.getBackstage()
                    meetup.webinarRoom = this.backstage._id
                }

                this.$root[`${this.id}_streamApp`] = new jitsi({
                    vueapp: this,
                    parentNode: document.getElementById(this.jitsiTarget),
                    data: this.$root.meetup
                })

                this.$root[`${this.id}_streamApp`].on('MavModifiers:ready', async () => {
                    this.showScreensaver = false;

                    if (!once) {
                        if (this.$root[`${this.id}_streamApp`].type != 'speaker') {
                            if ( !await this.$root[`${this.id}_streamApp`].stream.isAudioMuted() )
                                this.$root[`${this.id}_streamApp`].stream.executeCommand('toggleAudio');

                            if ( !await this.$root[`${this.id}_streamApp`].stream.isVideoMuted() )
                                this.$root[`${this.id}_streamApp`].stream.executeCommand('toggleVideo')
                            
                            once = true
                        }
                    }

                    if ( !avatarPic ) {
                        this.$root[`${this.id}_streamApp`].stream.executeCommand('avatarUrl', this.api + this.$root.profile.photo)
                        avatarPic = true
                    }
                })

                this.$root[`${this.id}_streamApp`].connect()

                this.$root[this.id].mic = !await this.$root[`${this.id}_streamApp`].stream.isAudioMuted()
                this.$root[this.id].video = !await this.$root[`${this.id}_streamApp`].stream.isVideoMuted()

                this.$root[`${this.id}_streamApp`].stream.addEventListener('participantJoined', (e) => {
                    if ( this.$root[`${this.id}_streamApp`].type == 'speaker' )
                        this.$root[`${this.id}_streamApp`].stream.executeCommand('changeRole', {
                            id: e.id,
                            role: 'speaker'
                        })
                })
                
                this.iframe = document.getElementById(this.jitsiTarget).children[0]
            })
        },

        createJitsiParent () {
            setTimeout(() => {
                const div = document.createElement('div')
                div.id = this.jitsiTarget
                document.getElementById(this.id).children[0].insertAdjacentElement('beforeend', div)
                clearInterval(this.timerCheckStream)
                this.countdownForWebinar()
            }, 500)
        },

        async toggleAudio () {
            this.$root[this.id].mic = this.$root[this.id].mic ? false : true
            this.$root[`${this.id}_streamApp`].stream.executeCommand('toggleAudio')
        },
        
        async toggleVideo () {
            if ( !this.$root[this.id].toggleLoading ) {
                this.$root[this.id].toggleLoading = true
                let after;
                let before = await this.$root[`${this.id}_streamApp`].stream.isVideoMuted()
                this.$root[`${this.id}_streamApp`].stream.executeCommand('toggleVideo')

                setTimeout(async () => {
                    after = await this.$root[`${this.id}_streamApp`].stream.isVideoMuted()
                    if ( after != before ) {
                        this.$root[this.id].video = this.$root[this.id].video ? false : true
                        this.$root[this.id].toggleLoading = false
                    }
                }, 1000)
            }
        }
    },
    watch: {
        '$root.meetup.status': function () {
            if ( !this.checkStreamStarted(this) ) {
                document.getElementById(this.jitsiTarget).remove()
                this.showScreensaver = true
            }
            else {
                if ( !document.getElementById(this.jitsiTarget) ) {
                    this.createJitsiParent()
                }
            }
        },
        'id': function () {
            this.showScreensaver = true

            if ( this.id == "mainroom" ) {
                this.joiningBackstage = false
                this.joiningMainroom  = true
            }

            if ( this.id == "backstage" ) {
                this.joiningBackstage = true
                this.joiningMainroom  = false
            }

            document.getElementById(this.jitsiTarget).remove()
                
            this.jitsiTarget   = `jitsi-modal-target-${this.id}`
            this.defaultLoader = false

            this.createJitsiParent()
        },
        '$root.meetup': function () {
            if ( this.iframe )
                this.iframe.contentWindow.postMessage({
                    type: "parent_app_data:meetup",
                    data: this.$root.meetup
                }, '*');
        }
    },
    mounted () {
        this.defineHowToRender()
        let self = this

        let timer = setInterval(() => {
            if (document.getElementById(this.jitsiTarget)) {
                clearInterval(timer)
                if ( self.checkStreamStarted() ) {
                    self.startStream()
                }
            }
        })
    }
}
</script>
<style lang="scss">
@import "./index.scss";

.screen-buttons {
    position: absolute;
    z-index: 10000;
    width: 100%;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    .screen-buttons-image-wrap {
        padding: 10px;
        position: relative;
        display: block;
        border: solid 5px #00000080;
        border-radius: 50%;
        margin: auto;
        width: max-content;
        cursor: pointer;
        background: #ffffff80;
        img {
            width: 100px;
            height: 100px;
            opacity: 0.5;
        }
        &:hover {
            background: #ffffffe6;
        }
    }
}
</style>
