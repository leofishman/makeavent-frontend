<template>
    <div>
        <navbar></navbar>
        <navbar-profile></navbar-profile>
        <b-container style="margin-top:50px;" class="profile-box">
            <b-row>
                <b-col md="3">
                    <div class="centrify change-photo-background">
                        <img
                            v-if="ready"
                            :src="host + profile.photo"
                            class="contact-photo changable-photo"
                            style="width:100%; height:auto"
                        >
                        {{content.toChangePhoto}}
                    </div>
                </b-col>
                <b-col md="5" v-if="ready">
                    <b-row>
                        <b-col md="9">
                            <input
                                style="width:100%"
                                v-on:focus="changeClickedStatus('name')"
                                v-on:blur="changeClickedStatus('name')"
                                class="profile-details"
                                :value="profile.name"
                            >
                        </b-col>
                        <b-col
                            v-if="profileParamsFocus.name"
                            md="3"
                            class="save-profile-changes-button"
                        >
                            <div class="centrify">
                                {{$root.content.save}}
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import {host} from '../../env'

export default {
    data() {
        this.profile = undefined
        this.ready = false
        this.profileParamsFocus = {
            name: false
        }

        this.$root.check('profile').then(() => {
            this.profile = this.$root.profile

            this.ready = true
        })

        return {
            profileParamsFocus: this.profileParamsFocus,
            content: this.$root.content.ProfileComponent,
            host: host,
            ready: this.ready,
            profile: this.profile
        }
    },
    methods: {
        isClicked (name) {
            return this.profileParamsFocus[name]
        },

        changeClickedStatus (name) {
            console.log(this.profileParamsFocus[name])
            if (this.profileParamsFocus[name])
                this.profileParamsFocus[name] = false
            else
                this.profileParamsFocus[name] = true
        }
    },
}
</script>
<style lang="css">
    .profile-box {
        background:white;
        padding: 20px 40px;
    }
    .changable-photo:hover {
        cursor: pointer;
        z-index: 0;
        opacity:0.5;
    }
    .change-photo-background {
        z-index: 1;
        background-size: 60px;
        background-position-y: center;
        background-repeat: no-repeat;
        background-position-x: center;
        background-image: url('../../assets/img/photo.svg');
        width:100%;
        height:100%;
        padding:50px;
        text-align:center;
    }
    .profile-details {
        font-size: 21px;
        color: #1967d2;
        margin-bottom: 10px;
        border-top: none;
        border-left: none;
        border-right:none;
        background: none;
        border-bottom: 1px solid grey;
        padding: 10px;
        font-weight: 500;
        outline: none;
    }
    .profile-details:hover {
        cursor: pointer;
        background-image: url('../../assets/img/pencil.svg') !important;
        background-position-x: right !important;
        background-position-y: center !important;
        background-repeat: no-repeat !important;
        opacity: 0.7;
    }
    .save-profile-changes-button {
        
    }
    .save-profile-changes-button:hover {
        font-weight: 700;
        cursor: pointer;
    }
</style>