<template>
    <b-container fluid="lg" style="padding-top:30px;">
      <b-row style="margin: 0px -50px;" class="justify-content-md-center">
        <b-col md="2">
          <div v-on:click="navToWaitPage()" class="hall-block" style="line-height:90px; background:#b8bfe6">
            <strong>
              MAIN STAGE<br>
              DIAMOND SPONSOR
            </strong>
            <img class="absolute-bg-image stage" src="../../assets/img/stage.png" alt="">
          </div>
        </b-col>
        <b-col md="2">
          <div v-on:click="navToWaitPage()" class="hall-block coffee" style="line-height:90px">
            <strong>
              e-COFFEE BREAK<br>
              DIAMOND SPONSOR
            </strong>
            <img class="absolute-bg-image" src="../../assets/img/coffee.png" alt="">
          </div>
        </b-col>
        <b-col md="3">
          <img class="main-logo" src="../../assets/logo.png" alt="">
        </b-col>
        <b-col md="2">
          <div v-on:click="navToWaitPage()" class="hall-block" style="line-height:90px; background:#c0eac6">
            <strong>
              SECOND STAGE<br>
              DIAMOND SPONSOR
            </strong>
            <img class="absolute-bg-image stage" src="../../assets/img/stage.png" alt="">
          </div>
        </b-col>
        <b-col md="2">
          <div v-on:click="navToWaitPage()" class="hall-block vip" style="line-height:90px">
            <strong>
              VIP e-MEETING ROOM<br>
              DIAMOND SPONSOR
            </strong>
            <img class="absolute-bg-image vip" src="../../assets/img/vip.png" alt="">
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-row>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
            <b-col v-on:click="navToWaitPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
          </b-row>
          <b-row>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
          </b-row>
          <b-row>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
          </b-row>
        </b-col>
        <b-col style="margin-top: 35px;">
          <b-row>
            <span class="sponsor-type-bg">GOLD Sponsors</span>
            <b-col>
              <div v-on:click="navToWaitPage()" style="margin-top:10px;" class="hall-block">
                <img class="sponsor-image" src="" alt="">
              </div>
            </b-col>
            <b-col>
              <div v-on:click="navToWaitPage()" style="margin-top:10px;" class="hall-block">
                <img class="sponsor-image" src="" alt="">
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
            <b-col v-on:click="navToWaitPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
          </b-row>
          <b-row>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
          </b-row>
          <b-row>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row>
        <b-col style="padding-right:20px">
          <b-row>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
            <b-col v-on:click="navToWaitPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
          </b-row>
          <b-row>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
          </b-row>
          <b-row>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
          </b-row>
        </b-col>
        <b-col style="padding-top: 20px;">
          <span class="sponsor-type-bg" style="line-height:30px">SILVER Sponsors</span>
          <b-row style="margin: 0px -15px 0px -15px">
            <b-col v-on:click="navToWaitPage()" md="4">
              <div class="hall-block small-margin">
                <img class="sponsor-image" src="../../assets/img/sponsors/fas.png" alt="">
              </div>
            </b-col>
            <b-col v-on:click="navToWaitPage()" md="4">
              <div class="hall-block small-margin">
                <img class="sponsor-image" src="" alt="">
              </div>
            </b-col>
            <b-col v-on:click="navToWaitPage()" md="4">
              <div class="hall-block small-margin">
                <img class="sponsor-image" src="../../assets/img/sponsors/crypttp.png" alt="">
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col style="padding-left:20px">
          <b-row>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
            <b-col v-on:click="navToWaitPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
          </b-row>
          <b-row>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
          </b-row>
          <b-row>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block small-margin small-sponsor"></b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-row>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
            <b-col v-on:click="navToWaitPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
          </b-row>
          <b-row style="margin-top:20px">
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
            <b-col v-on:click="navToWaitPage()" md="6" class="hall-block wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
            <b-col v-on:click="navToWaitPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToWaitPage()" md="3"></b-col>
          </b-row>
          <b-row style="margin-top:20px">
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
</template>
<script>
export default {
    name: "desktop",
    methods: {
        navToWaitPage () {
            this.$router.push(`/${this.$router.currentRoute.params.id}/wait`)
        },
    },
}
</script>