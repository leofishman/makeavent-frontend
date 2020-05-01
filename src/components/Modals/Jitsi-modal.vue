<template>
    <b-modal :width="960" :active.sync="isCardModalActive" scroll="keep">
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        
                    </div>
                    <div class="media-content">
                        <p class="title is-4">John Smith</p>
                        <p class="subtitle is-6">@johnsmith</p>
                    </div>
                </div>

                <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a>#css</a> <a>#responsive</a>
                    <br>
                    <small>11:09 PM - 1 Jan 2016</small>
                </div>
            </div>
            <div id="jitsi-modal-target" class="card-image">
                
            </div>
        </div>
    </b-modal>
</template>
<script>
import jitsi from '@/api/jitsi'

export default {
    name: "Jitsimodal",
    components: {

    },
    data () {
        return {
            isCardModalActive: false,
        }
    },
    methods: {

    },
    mounted() {
        window.EventBus.$on('open-jitsi-window', (data) => {
            this.isCardModalActive = true
            let timer = setInterval(() => {
                if (document.querySelector("#jitsi-modal-target")) {
                    clearInterval(timer)
                    new jitsi({
                        vueapp: this,
                        data: {
                            name: data.name,
                            token: this.$root.token,
                            parentNode: document.querySelector("#jitsi-modal-target")
                        }
                    })
                }
            })
        })
    },
}
</script>