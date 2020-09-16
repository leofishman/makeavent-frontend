<template>
    <div class="modal-card">
        <div class="modal-card-head">
            <p class="modal-card-title">
                {{content.title}}
            </p>
        </div>
        <div class="modal-card-body">
            <!-- <b-collapse :open="false" class="card" animation="slide" aria-id="contentIdForA11y3"> -->
                <div
                    slot="trigger" 
                    slot-scope="props"
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3">
                    <p class="card-header-title">
                        {{content.title}}
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>
                <div class="card-content bcnote-card-content">
                    <p>
                        {{content.note}}
                    </p>
                    <textarea v-model="reqNote" class="bcnote content"></textarea>
                </div>
                <footer class="card-footer" >
                    <a v-on:click="onConfirm()" class="card-footer-item">{{comm_content.submit}}</a>
                </footer>
            <!-- </b-collapse> -->

            <!-- <div v-on:click="$root.privateCall(targetContact)" style="box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);" class="click">
                <p class="card-header-title">
                    Schedule a private call
                </p>
            </div> -->

            <div v-on:click="requestInterview()" style="box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);" class="click" v-if="allowInterview">
                <p class="card-header-title">
                    Request interview
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'

export default {
    name: "ActionWithUsers",
    props: {
        targetContact: Object
    },
    data () {
        if (this.$root.usertype == "media")
            this.allowInterview = true
        
        return {
            allowInterview: this.allowInterview,
            reqNote: "",

            content: this.$root.content.ActionsWithUsers,
            comm_content: this.$root.content.common
        }
    },
    methods: {
        onConfirm () {
            Axios.post(`${this.api}/users/savebusinesscard`, {
                id: this.targetContact._id,
                data: this.$root.profile
            }, {
                headers: {
                    authorization: localStorage.auth
                }
            }).then(res => {
                window.io.emit('request_contact_information', {
                    from: this.$root.profile,
                    to: this.targetContact,
                    note: this.reqNote
                })
                this.$parent.close()
                this.$buefy.dialog.alert('Business card request successfully sent. If user will accept it, you will get a noticiation.')
            })
        },

        requestInterview () {
            Axios.post(`${this.api}/webinars/invitetointerview`, {
                name: toLo(this.$root.profile.company),
                guest: this.targetContact
            }, {
                headers: {
                    authorization: localStorage.auth
                }
            }).then(res => {
                this.$parent.close()
                this.$buefy.dialog.alert('Interview request successfully sent. If user will accept it, you will get an email.')
            })
        }
    }
}
</script>
<style lang="scss">
    
</style>