<template>
    <div id="profile-booth">
        <navbar></navbar>

        <div class="container">
            <Pagetitle :data="content.title"/>

            <section class="section section-profile-company">
                <div class="columns is-variable is-5">
                    <div class="column is-two-fifths">
                        <div class="columns">
                            <div class="column">
                                <div class="profile-top">

                                    <!-- Company logo -->
                                    <div>
                                        <img src="@/assets/logo-CRYPTTP.png">
                                    </div>

                                    <!-- Company contacts -->
                                    <ul class="list-network">
                                        <li><span><img src="@/assets/icon/icon-email.svg"></span> Website</li>
                                        <li><span><img src="@/assets/icon/icon-linkedin.svg"></span> Linked in</li>
                                        <li><span><img src="@/assets/icon/icon-facebook.svg"></span> Facebook</li>
                                        <li><span><img src="@/assets/icon/icon-telegram.svg"></span> Telegram</li>
                                        <li><span><img src="@/assets/icon/icon-twitter.svg"></span> Twitter</li>
                                        <li><span><img src="@/assets/icon/icon-instagram.svg"></span> Instagram</li>
                                        <li><span><img src="@/assets/icon/icon-youtube.svg"></span> YouTube</li>
                                    </ul>

                                    <p>Share and get 20% discount for business and VIP</p>
                                </div>


                                <!-- Profile top--
                                <div class="profile-top">

                                    <!-- Company logo --
                                    <div>
                                        <img :src="this.logo">
                                    </div>

                                    <!-- Company contacts --
                                    <ul class="list-network">
                                        <li v-if="website" v-on:click="openAndTrack(website)">
                                            <span>
                                                <img src="@/assets/icon/icon-email.svg">
                                            </span>
                                            {{commonContent.Website}}
                                        </li>
                                        <li v-for="(el, key, index) in socials" :key="index" v-on:click="openAndTrack(el)">
                                            <span>
                                                <img :src="require(`../../assets/icon/icon-${key.toLowerCase()}.svg`)">
                                            </span> 
                                            {{key}}
                                        </li>
                                    </ul>

                                    <div>
                                        <p>Share and get 20% discount for business and VIP</p>
                                    </div>
                                </div>-->
                            </div>
                            <div class="column">

                                <!-- Bio Members -->
                                <div class="tile is-ancestor">
                                    <div class="tile is-vertical">
                                        <div class="box member">
                                            <figure>
                                                <img src="@/assets/profile-valeriy.png">
                                            </figure>
                                            <h1>Bogdan <strong>Sizov</strong></h1>
                                            <h2>CEO</h2>
                                            <h3>bogdan@crypttp.com</h3>
                                            <nav>
                                                <img src="@/assets/icon/icon-facebook.svg">
                                                <img src="@/assets/icon/icon-linkedin.svg">
                                                <img src="@/assets/icon/icon-telegram.svg">
                                            </nav>
                                        </div>

                                        <div class="box member">
                                            <figure>
                                                <img src="@/assets/profile-valeriy.png">
                                            </figure>
                                            <h1>Bogdan <strong>Sizov</strong></h1>
                                            <h2>CEO</h2>
                                            <h3>bogdan@crypttp.com</h3>
                                            <nav>
                                                <img src="@/assets/icon/icon-facebook.svg">
                                                <img src="@/assets/icon/icon-linkedin.svg">
                                                <img src="@/assets/icon/icon-telegram.svg">
                                            </nav>
                                        </div>
                                    </div>

                                    <!--
                                    <div class="tile is-parent" v-for="(el, index) in contacts" :key="index">
                                        <div class="tile is-child">
                                            <Member :data="el"/>
                                        </div>
                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="screen"></div>
                    </div>
                </div>
            </section>
        </div>

    </div>
</template>

<script>
    import Member from '@/components/CompanyProfile/Member.vue';

    export default {
        name: "Booth",

        components: {
            Member,
        },
        data () {
            return {
                content: this.$root.content.Booth,   
            }
        }
    }
</script>

<style lang="scss">

</style>