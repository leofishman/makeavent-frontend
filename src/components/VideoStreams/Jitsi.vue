<template>
    <div id="video-stream">
        <div class="box">
            <div class="content-box" v-if="showScreensaver">
                <div class="content">
                    <span>{{content.willStartIn}}</span> {{clock}}
                </div>
                <video v-if="$root.meetup.screensaver" class="screensaver" autoplay muted loop>
                    <source :src="$root.meetup.screensaver" type="video/mp4">
                </video>
            </div>
            <div id="jitsi-modal-target" class="card-image"></div>
        </div>
    </div>
</template>
<script>
import jitsi from '@/api/jitsi'

export default {
    name: "JitsiStream",
    props: {
        meetup: Object
    },
    data () {
        this.countdown(this.$root.meetup.startDate)

        return {
            showScreensaver: true,
            clock: this.clock,
            dotsGoingUp: true,
            content: this.$root.content.JitsiStream
        }
    },
    methods: {
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
                self.$parent.getMeetup()
                .then(self.checkStreamStarted)
            }, 5000)
        },

        checkStreamStarted () {
            if (this.$root.meetup.status == "ongoing") {
                clearInterval(this.timerCheckStream)

                let once = false
                window.addEventListener('message', (e) => {
                    try {
                        if (JSON.parse(e.data).method == '__ready__') {
                            this.showScreensaver = false;
                            if (!once) {
                                if (this.streamApp.type != 'speaker') {
                                    this.streamApp.stream.executeCommand('toggleVideo')
                                    this.streamApp.stream.executeCommand('toggleAudio');
                                    once = true
                                }
                            }
                        }
                    } catch (e) {}
                })

                this.$root.check('meetup')
                .then(() => {
                    this.$root.meetup.type = "meetup"
                    this.streamApp = new jitsi({
                        vueapp: this,
                        parentNode: document.getElementById("jitsi-modal-target"),
                        data: this.$root.meetup
                    })
                    this.streamApp.connect()

                    this.streamApp.stream.addEventListener('participantJoined', (e) => {
                        if (this.streamApp.type == 'speaker')
                            this.streamApp.stream.executeCommand('changeRole', {
                                id: e.id,
                                role: 'speaker'
                            })
                    })

                    document.getElementById("jitsi-modal-target").children[0].style.height = "450px"
                })


            }
            else {
                this.showScreensaver = true
            }
        }
    },
    mounted () {
        let self = this

        let timer = setInterval(() => {
            if (document.getElementById("jitsi-modal-target")) {
                clearInterval(timer)
                self.checkStreamStarted()
            }
        })
    }
}
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
@import "bulma/sass/utilities/initial-variables.sass";
@import "bulma/sass/utilities/derived-variables.sass";
@import '@/assets/css/chatBubble.scss';
@import '@/assets/css/textarea_message.scss';

#video-stream {
    .box {
        margin-bottom: 3rem;
        padding: 0px;
        min-height: 450px;
        box-shadow: $shadow-2;
        background-color: transparent;
    }
    .screensaver {
        object-fit: cover;
        height: 100%;
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
    }
    .webinar-close-icon {
        position: absolute;
        right: 20px;
        width: 20px;
        top: 20px;
    }
    .filmstrip {
        display: none !important;
    }
}
</style>
