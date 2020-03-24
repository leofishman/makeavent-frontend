<template>
    <div>
        <img class="logo" src="../assets/logo.svg" alt="">
        <div class="center">
            <div class="title">
                {{$root.content.loginWithTicket}}
            </div>
            <b-form-group
                :label="$root.content.email"
            >
                <b-form-input v-model="email" :placeholder="$root.content.emailPlaceholder"></b-form-input>
            </b-form-group>

            <b-form-group
                label="Password"
            >
                <b-form-input type="password" v-model="password" :placeholder="$root.content.passwordPlaceholder"></b-form-input>
            </b-form-group>

            <b-form-group>
                <b-button v-on:click="login()" variant="primary">
                    {{$root.content.submit}}
                </b-button>
            </b-form-group>

            <div class="bottom">
                {{$root.content.contactSupport}} support@blockconf.digital
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { host } from '../env'

export default {
    data() {
        this.email = ''
        this.password = ''

        return {
            email: this.email,
            password: this.password,
        }
    },
    methods: {
        login () {
            if (this.email && this.password) 
                axios.post(`${host}/login`, {
                    email: this.email,
                    password: this.password
                })
                .then(res => {
                    const data = res.data
                    
                    this.$root.profile = data.profile[0]
                    this.$root.usertype = data.type
                    this.$root.token = data.accessLink
                    
                    localStorage.auth = res.headers.authorization

                    this.$router.push(`${data.accessLink}/home?auth=true`)
                })
                .catch(e => {
                    this.$bvModal.msgBoxOk(this.$root.content.wrongPassTitle, {
                        title: this.$root.content.error,
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                    })
                    .then(() => {
                        this.email = ""
                        this.password = ""
                    })
                })
            else if (!this.email) {

            }
        }
    },
}
</script>
<style lang="css">
    .center {
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 50%;
        height: 50%;
        display: block;
        position: absolute;
        padding: 50px;
        background: white;
        border-radius: 20px;
    }
    .title {
        font-size:30px;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }
    .logo {
        width:50%;
        max-width: 300px;
        position: relative;
        margin: 50px auto 0px auto;
        display: block;
    }
    .bottom {
        position: absolute;
        bottom: 20px;
        text-align: center;
    }
</style>