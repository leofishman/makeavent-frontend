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
                            <p style="margin:10px 0px;">For the better experience our team recommends to use Google Chrome</p>
							<p style="margin-bottom:20px;">
                                <ResetPwd />
                            </p>
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
import Vue from 'vue'
import axios from 'axios'
import {AUTH} from '@/api/endpoints'

import Main from '@/components/Sponsors/Main.vue'
import SponsorsCol from '@/components/SponsorsCol'
import Content from '@/content/english.js'

export default {
    components: {
        SponsorsCol
    },
    data() {
        this.email = ''
        this.password = ''

        this.inputsReady = false

        return {
            email: this.email,
            password: this.password,
            inputsReady: this.inputsReady
        }
    },
    mounted () {
        let input = document.getElementById("login-password-input")
        let self = this
        input.addEventListener('keyup', function (event) {
            if (self.inputsReady) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    self.login()
                }
            }
        })
    },
    methods: {
        navToReg () {
            this.$router.push('/register')
        },

        login () {
            axios.post(AUTH.LOGIN, {
                email: this.email,
                password: this.password
            })
            .then(res => {
                const data = res.data
                
                if (data.redirect) {
                    this.$root.usertype = data.type
                    this.$root.profile = data.profile
                    this.$router.push(`/loginrtp`)
                }
                else {
                    this.$root.usertype = data.type
                    this.$root.profile = data.profile
                    localStorage.auth = res.headers.authorization

                    if (
                        !this.$root.profile.Linkedin &&
                        !this.$root.profile.Facebook &&
                        !this.$root.profile.Telegram &&
                        !this.$root.profile.photo
                    ) {
                        this.$router.push('/reghall')
                    }
                    else                    
                        this.$router.push(`/`)
                }
            })
            .catch(e => {
                console.log(e)
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
                        this.password = ""    
                    },
                    onConfirm: () => {
                        this.password = ""    
                    }
                })
            })
        },

        checkInputs () {
            if (this.email && this.password)
                return true
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
        }
    },
}
</script>
