<template>
    <div id="login">
        <b-loading :is-full-page="true" :active.sync="isGlobalLoaderOpen" :can-cancel="false"></b-loading>

		<div class="container">
			<section class="section section-login">
				<div class="columns">
					<div class="column is-half is-offset-one-quarter data-login">
						<figure class="image title-logo">
							<img v-if="$root.project.logo" :src="api + $root.project.logo">
						</figure>
						
						<div class="box">
                            <p style="margin:10px 0px;">{{content.hint}}</p>
							<section>
								<b-field :label="$root.content.email" >
									<b-input v-model="email" type="email" validation-message="This email is invalid" :placeholder="$root.content.emailPlaceholder"></b-input>
								</b-field>

								<b-field :label="$root.content.password">
									<b-input id="login-password-input" v-model="password" type="password" :placeholder="$root.content.passwordPlaceholderFromEmail" password input></b-input>
								</b-field>
                                <div class="tile">
                                    <div class="tile is-child">
                                        <b-button :disabled="!inputsReady" v-on:click="login()" type="is-primary" size="is-medium">
                                            {{$root.content.common.submit}}
                                        </b-button>
                                    </div>
                                    <div @click="navToReg()" style="padding: 19px 0px;" class="click tile is-child">
                                        {{$root.content.common.noAccount}}
                                    </div>
                                    <div style="text-align:right; padding: 30px 0px;" class="click tile is-child">
                                        <ResetPwd />
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
import './index.scss'

export default {
    props: {
        data: String
    },
    async mounted () {
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
        
        this.email = ''
        this.password = ''
        this.inputsReady = false
    },
    data() {
        this.forwardPath = this.data

        return {
            isGlobalLoaderOpen: false,
            content: this.$root.content.Login,

            email: this.email,
            password: this.password,
            inputsReady: this.inputsReady
        }
    },
    methods: {
        navToReg () {
            if ( this.forwardPath )
               this.$router.push(`/register?f=${this.forwardPath}`).catch(e => {})
            else
                this.$router.push('/register')
        },

        login () {
            this.isGlobalLoaderOpen = true

            axios.post(AUTH.LOGIN, {
                email: this.email,
                password: this.password
            })
            .then(res => {
                const response = res.data

                if (this.forwardPath.includes('confirm_invitation')) {
                    this.$root.usertype = response.type
                    this.$root.profile = response.profile
                    localStorage.auth = res.headers.authorization
                    
                    this.$router.push(this.forwardPath)
                }
                
                else if (response.redirect) {
                    this.$root.usertype = response.type
                    this.$root.profile = response.profile
                    this.$router.push(`/loginrtp`)
                }
                else {
                    this.$root.usertype = response.type
                    this.$root.profile = data.profile
                    localStorage.auth = res.headers.authorization
                    
                    this.$router.push(`/`)
                }
            })
            .catch(e => {
                console.log(e)
                this.isGlobalLoaderOpen = false
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
