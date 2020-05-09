<template>
    <div id="registrationhall">
        <div class="container">
            <section class="section section-registrationhall">
                <div class="columns is-variable is-8">
                    <div class="column data-login">
                        <figure class="image">
                            <img src="@/assets/logo_dark.svg">
                        </figure>
                        
                        <div class="box">
                            <h1 class="is-size-3">{{content.title}}</h1>
                            <p>{{content.intro}}</p>
                            <form>
                                <b-field :label="content.email">
                                    <b-input v-model="email" type="email" :validation-message="content.emailValidation"></b-input>
                                </b-field>
                                <b-field :label="content.linkedin">
                                    <b-input type="url" :validation-message="content.urlValidation"></b-input>
                                </b-field>
                                <b-field :label="content.facebook">
                                    <b-input type="url" :validation-message="content.urlValidation"></b-input>
                                </b-field>
                                <b-field :label="content.telegram">
                                    <b-input type="url" :validation-message="content.urlValidation"></b-input>
                                </b-field>
                                <b-field :label="content.photo">
                                    <b-input type="file" :validation-message="content.urlValidation"></b-input>
                                </b-field>

                                <b-button :disabled="!inputsReady" type="is-secondary" size="is-medium">
                                    {{content.submit}}
                                </b-button>
                            </form>
                        </div>
                    </div>

                    <div class="column sponsors-login">
                        <div class="tile is-ancestor has-text-centered">
                            <div class="tile is-vertical">
                                <div class="tile is-parent ls-main">
                                    <!-- Main -->
                                    <div class="tile is-child box">
                                        <img src="@/assets/logo-RSK.png">
                                    </div>
                                </div>
                                <div class="tile is-vertical ls-platinum">
                                    <!-- Platinum A -->
                                    <div class="tile is-parent">
                                        <div class="tile is-child box">
                                            <img src="@/assets/logo-FAS.png">
                                        </div>
                                    </div>
                                    <!-- Platinum B -->
                                    <div class="tile is-parent">
                                        <div class="tile is-child box">
                                            <img src="@/assets/logo-CRYPTTP.png">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RegistrationHall",
        data () {

            return {
                content: this.$root.content.RegistrationHall
            }
        }
    }
</script>