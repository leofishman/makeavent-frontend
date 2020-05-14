<template>
    <div id="login">
		<div class="container">
			<section class="section section-login">
				<div class="columns is-variable is-8">
					<div class="column data-login">
						<figure class="image">
							<img src="@/assets/logo_dark.svg">
						</figure>
						
						<div class="box">
							<p style="margin-bottom:20px;">{{$root.content.loginWithTicket}}</p>
							<section>
								<b-field :label="$root.content.email" >
									<b-input v-model="email" type="email" validation-message="This email is invalid" :placeholder="$root.content.emailPlaceholder"></b-input>
								</b-field>

								<b-field :label="$root.content.password">
									<b-input id="login-password-input" v-model="password" type="password" :placeholder="$root.content.passwordPlaceholderFromEmail" password input></b-input>
								</b-field>
                                <div class="tile">
                                    <div>
                                        <b-button :disabled="!inputsReady" v-on:click="login()" type="is-primary" size="is-medium">
                                            {{$root.content.submit}}
                                        </b-button>
                                    </div>
                                    <div @click="navToReg()" class="click column">
                                        {{$root.content.common.noAccount}}
                                    </div>
                                </div>
							</section>
						</div>
					</div>
                    <div class="column sponsors-login">
                        <SponsorsCol />
                    </div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { host } from '@/env'
import Main from '@/components/Sponsors/Main.vue';
import SponsorsCol from '@/components/SponsorsCol'

export default {
    components: {
        SponsorsCol
    },
    data() {
        this.email = ''
        this.password = ''

        this.tg = ""
        this.fb = ""
        this.ln = ""

        this.tgswitch = false
        this.fbswitch = false
        this.lnswitch = false

        this.inputsReady = false

        return {
            email: this.email,
            password: this.password,
            inputsReady: this.inputsReady,

            tg: this.tg,
            fb: this.fb,
            ln: this.ln,

            tgswitch: this.tgswitch,
            fbswitch: this.fbswitch,
            lnswitch: this.lnswitch,
        }
    },
    mounted () {
        let input = document.getElementById("login-password-input")
        let self = this
        input.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.login()
            }
        })
    },
    methods: {
        navToReg () {
            this.$router.push('/register')
        },

        login () {
            axios.post(`${host}/login`, {
                email: this.email,
                password: this.password
            })
            .then(res => {
                const data = res.data

                if (data.redirect) {
                    this.$root.usertype = data.type
                    this.$root.token = data.accessLink
                    this.$root.profile = data.profile
                    this.$router.push(`/loginrtp?access=${this.$root.token}`)
                }
                else {
                    this.$root.usertype = data.type
                    this.$root.token = data.accessLink
                    this.$root.profile = data.profile
                    localStorage.auth = res.headers.authorization
                    
                    this.$router.push(`${this.$root.token}/home`)
                }
            })
            .catch(e => {
                this.$buefy.dialog.alert({
                    title: this.$root.content.error,
                    message: this.$root.content.wrongPassTitle,
                    type: 'is-danger',
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true,
                    canCancel: true,
                    onCancel: () => {
                        this.email = ""
                        this.password = ""    
                    },
                    onConfirm: () => {
                        this.email = ""
                        this.password = ""    
                    }
                })
            })
        },

        checkInputs () {
            if (this.email && this.password) {
                if (!this.tgswitch && !this.fbswitch && !this.lnswitch)
                    return true
                    
                else {
                    let tg = "noneed"
                    let fb = "noneed"
                    let ln = "noneed"
    
                    if (this.tgswitch)
                        if (this.tg)
                            tg = true
                        else 
                            tg = false
    
                    if (this.lnswitch)
                        if (this.ln)
                            ln = true
                        else 
                            ln = false
    
                    if (this.fbswitch)
                        if (this.fb)
                            fb = true
                        else
                            fb = false
    
                    if (
                        (tg === true || tg == "noneed") &&
                        (fb === true || fb == "noneed") &&
                        (ln === true || ln == "noneed")
                    )
                        return true
                    else 
                        return false
                }
            }
            else
                return false
        },
    },
    watch: {
        email: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },

        password: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        tg: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        tgswitch: function () {
            if (!this.tgswitch) {
                this.tg = ""
                if (this.checkInputs())
                    this.inputsReady = true
                else
                    this.inputsReady = false
            }
            else if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        ln: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        lnswitch: function () {
            if (!this.lnswitch) {
                this.ln = ""
                if (this.checkInputs())
                    this.inputsReady = true
                else
                    this.inputsReady = false
            }
            else if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        fb: function () {
            if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
        fbswitch: function () {
            if (!this.fbswitch) {
                this.fb = ""
                if (this.checkInputs())
                    this.inputsReady = true
                else
                    this.inputsReady = false
            }
            else if (this.checkInputs())
                this.inputsReady = true
            else
                this.inputsReady = false
        },
    },
}
</script>