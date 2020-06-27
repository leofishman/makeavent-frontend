<template>
    <div id="login">
		<div class="container">
			<section class="section section-login">
				<div class="columns">
					<div class="column is-half is-offset-one-quarter data-login">
						<figure class="image">
							<img v-if="$root.project.logo" :src="$root.api + $root.project.logo">
						</figure>
						
						<div class="box">
                            <p style="margin:10px 0px;">{{content.hint}}</p>
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
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {AUTH} from '@/api/endpoints'

export default {
    data() {
        this.email = ''
        this.password = ''

        this.inputsReady = false

        return {
            content: this.$root.content.Login,
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
