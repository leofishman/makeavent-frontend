<template>
    <vue-draggable-resizable id="dragablejitsimodal" :w="width" :h="height" @resizing="onResize" :z="99999" :x="getPositionX" :y="getPositionY" :parent="false">
        <b-modal :active="modalActive" has-modal-card :can-cancel="true">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">{{content.room}} {{room._id}}</p>
                    <img class="click webinar-close-icon" src="@/assets/icon/icon-close-black.svg" @click="destroyModal" />
                </header>
                <section id="jitsi-frame-parent" class="modal-card-body">
                    <div :id="`jitsi-frame-${room._id}`" class="hide-jitsi-until-loaded box">
                        <div v-if="showScreensaver" class="content-box">
                            <div class="content">
                                <span>{{content.loading}}</span>
                            </div>
                            <!-- <b-loading :is-full-page="false" :active.sync="showScreensaver" :can-cancel="false"></b-loading> -->
                            <svg class="custom-loader" width="64" height="64" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#333">
                                <g fill="none" fill-rule="evenodd" stroke-width="2">
                                    <circle cx="22" cy="22" r="1">
                                        <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                                        <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
                                    </circle>
                                    <circle cx="22" cy="22" r="1">
                                        <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                                        <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
                                    </circle>
                                </g>
                            </svg>
                        </div>
                    </div>
                </section>
            </div>
        </b-modal>
    </vue-draggable-resizable>
</template>
<script>
import jitsi from '@/api/jitsi'
import Axios from 'axios'
import {api, communitySrv} from '@/env'
import {MEETUP} from '@/api/endpoints'

export default {
    name: "DragableConference",
    props: {
        room: Object
    },
    data () {
        return {
            content: this.$root.content.DragableJitsi,
            width: 600,
            height: 400,
            modalActive: true,
            target: `jitsi-frame-${this.room._id}`,
            showScreensaver: true
        }
    },
    mounted () {
        let self = this
        let timer = setInterval(function () {
            if (document.getElementById(self.target)) {
                clearInterval(timer)
                self.join()
            }

        })
    },
    computed: {
        getPositionX () {
            return window.innerWidth/2 - this.width/2
        },

        getPositionY () {
            return 0-(window.innerHeight/2 - this.height/2)
        }
    },
    methods: {
        join () {
            let once = false
            window.addEventListener('message', (e) => {
                try {
                    if (JSON.parse(e.data).method == '__ready__') {
                        
                        this.showScreensaver = false;
                        document
                            .getElementsByClassName("hide-jitsi-until-loaded")[0]
                            .classList
                            .replace('hide-jitsi-until-loaded', 'hide-jitsi-until-loaded--active')

                        document.getElementById(this.target).children[0].style.height = this.height - 65 + "px"

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

            this.streamApp = new jitsi({
                vueapp: this,
                parentNode: document.getElementById(this.target),
                data: {
                    name: "Private call",
                    webinarRoom: this.room._id,
                    speakers: this.room.participants,
                    admins: [],
                    type: "networkingroom"
                }
            })
            this.streamApp.connect()

            this.streamApp.stream.addEventListener('participantJoined', (e) => {
                if (this.streamApp.type == 'speaker')
                    this.streamApp.stream.executeCommand('changeRole', {
                        id: e.id,
                        role: 'speaker'
                    })
            })
        },

        onResize (x, y, width, height) {
            document.getElementById(this.target).children[0].style.height = height - 65 + "px"
        },

        destroyModal () {
            document.getElementById("dragablejitsimodal").children[0].remove()
            this.$root.roomForDragableConference = {}
            this.$root.showDragableConference = false
            this.leaveRoom()
        },

        leaveRoom () {
            this.$root.leaveRoom(this.room.parentMeetup, this.room._id)
        }
    },
    watch: {
        room: function () {
            try {
                document.getElementById(this.target).children[0].remove()
                this.target = `jitsi-frame-${this.room._id}`
                this.showScreensaver = true
                document
                    .getElementsByClassName("hide-jitsi-until-loaded")[0]
                    .classList
                    .replace('hide-jitsi-until-loaded--active', 'hide-jitsi-until-loaded')

                document.getElementById(this.target).children[0].style.height = this.height - 65 + "px"

            } catch (e) { console.log(e) }

            let self = this

            let timer = setInterval(function () {
                if (document.getElementById(self.target)) {
                    clearInterval(timer)
                    self.join()
                }
            })
        }
    },
}
</script>
<style lang="scss">
@import "./index.scss";

#dragablejitsimodal {
    .modal {
        &:focus {
            outline: none;
        }
        display: block;
        position: relative;
        .modal-background {
            display: none;
        }
        .animation-content {
            max-width: 4086px !important;
            width: 100%;
            margin: 0px;
            .modal-card {
                .modal-card-head {
                    &:hover {
                        cursor:move;
                    }
                }
                .modal-card-body {
                    padding: 0px;
                }
                width: inherit;
            }
        }
    }
}
.vdr {
    box-shadow: 0 0px 30px rgba(0, 0, 0, 0.15);
    background-color: white;
    border: none;
}
.handle {
    width: 10px;
    height: 10px;
    background: #bfbfbf;
    border: none;
}
.area-for-draging {
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100vh;
}
</style>