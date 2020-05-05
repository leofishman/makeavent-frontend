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
                            <h1 class="is-size-3">Registration hall</h1>
                            <p>
                                Please fill in the information that you would like to include in your virtual business card. This business card is the "request only" and will be available only to people whose requests you confirmed. BlockConf Digital will not use this information for any other purposes.
                            </p>
                            <p>
                                You can still change this information in the "profile" section.
                            </p>
                            <form>
                                <b-field label="Bussiness email">
                                    <b-input type="email" validation-message="This email is invalid" placeholder="Email address"></b-input>
                                </b-field>
                                <b-field label="Linkedin">
                                    <b-input type="url" validation-message="This url is invalid" placeholder="Linkedin profile url"></b-input>
                                </b-field>
                                <b-field label="Facebook">
                                    <b-input type="url" validation-message="This url is invalid" placeholder="Facebook profile url"></b-input>
                                </b-field>
                                <b-field label="Telegram">
                                    <b-input type="url" validation-message="This url is invalid" placeholder="Telegram profile"></b-input>
                                </b-field>
                                <b-field label="Photo">
                                    <b-input type="file" validation-message="This url is invalid" placeholder="Telegram profile"></b-input>
                                </b-field>

                                <b-button type="is-secondary" size="is-medium">
                                    Submit
                                </b-button>

                                <!-- [YD] The dynamic form maybe like this?
                                <b-field :label="$root.content.bussinessemail">
                                    <b-input v-model="email" type="email" validation-message="This email is invalid" :placeholder="$root.content.emailPlaceholder"></b-input>
                                </b-field>
                                <b-field :label="$root.content.linkedin">
                                    <b-input type="url" validation-message="This url is invalid" :placeholder="$root.content.linkedinPlaceholder"></b-input>
                                </b-field>
                                <b-field :label="$root.content.facebook">
                                    <b-input type="url" validation-message="This url is invalid" :placeholder="$root.content.facebookPlaceholder"></b-input>
                                </b-field>
                                <b-field :label="$root.content.telegram">
                                    <b-input type="url" validation-message="This url is invalid" :placeholder="$root.content.telegramPlaceholder"></b-input>
                                </b-field>
                                <b-field :label="$root.content.photo">
                                    <b-input type="file" validation-message="This url is invalid" :placeholder="$root.content.photoPlaceholder"></b-input>
                                </b-field>

                                <b-button :disabled="!inputsReady" type="is-secondary" size="is-medium">
                                    {{$root.content.submit}}
                                </b-button>
                                -->
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
    }

</script>