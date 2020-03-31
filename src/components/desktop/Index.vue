<template>
  <div>
    <b-row>
      <b-col :md="hallWidth">
        <!-- Stages -->
        <b-row class="justify-content-md-center" style="padding-top:50px;">
          <b-col md="2">
            <div v-on:click="navToWaitPage()" class="hall-block" style="line-height:90px; background:#c0eac6">
              <strong>
                Information<br>Desk
              </strong>
              <img class="absolute-bg-image stage" src="../../assets/img/info.png" alt="">
            </div>
          </b-col>
          <b-col md="2">
            <div v-on:click="navToWaitPage()" class="hall-block" style="line-height:90px; background:#b8bfe6">
              <img class="main-logo" src="../../assets/logo.svg" alt="">
              <strong class="stage-title">
                STAGE
              </strong>
              <img class="absolute-bg-image stage" src="../../assets/img/stage.png" alt="">
            </div>
          </b-col>
          <b-col md="3">
            <img class="main-logo" src="../../assets/logo.svg" alt="">
          </b-col>
          <b-col md="2">
            <div v-on:click="navToWaitPage()" class="hall-block" style="line-height:90px; background:#b8bfe6">
              <img class="main-logo" src="../../assets/logo.svg" alt="">
              <strong class="stage-title">
                STAGE
              </strong>
              <img class="absolute-bg-image stage" src="../../assets/img/stage.png" alt="">
            </div>
          </b-col>
          <b-col md="2">
            <div v-on:click="navToWaitPage('viproom')" class="hall-block vip" style="line-height:40px">
              <strong>
                VIP e-MEETING ROOM<br>
              </strong>
              <img class="absolute-bg-image vip" src="../../assets/img/vip.png" alt="">
            </div>
          </b-col>
        </b-row>
        
        <b-container fluid="lg" style="padding-top:30px;">
          <!-- Main, Gold, Silver sponsors -->
          <b-row>

            <div v-on:click="navToWaitPage()" class="percent-col c15" style="padding:65px 30px 0px 30px">
              <div class="hall-block small-margin gold-sponsor">Gold sponsor</div>
            </div>

            <div v-on:click="navToWaitPage()" class="percent-col c20" style="padding:20px 30px 0px 30px">
              <div class="hall-block small-margin platinum-sponsor">Platinum sponsor</div>
            </div>

            <div v-on:click="navToWaitPage()" class="percent-col c40" style="padding: 0px 30px;">
              <div>
                <div style="margin:0px" class="hall-block main-sponsor">Main sponsor</div>
              </div>
            </div>

            <div class="percent-col c20" style="padding:20px 30px 0px 30px">
              <div v-on:click="navToWaitPage()" class="hall-block small-margin platinum-sponsor">Platinum sponsor</div>
              <div style="height:50px">
              </div>
            </div>

            <div v-on:click="navToWaitPage()" class="percent-col c15" style="padding:65px 30px 0px 30px">
              <div class="hall-block small-margin gold-sponsor">Gold sponsor</div>
            </div>
          </b-row>

          <b-row class="justify-content-md-center">
            <b-col>
              <div style="margin: auto; left: -10%; top: -25%;" class="hall-block small-margin gold-sponsor wide">Gold sponsor</div>
            </b-col>
            <b-col>
              <div style="margin: auto; right: -10%; top: -25%;" class="hall-block small-margin gold-sponsor wide">Gold sponsor</div>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <div v-on:click="navToWaitPage('STO MANAGERS')" class="hall-block small-margin silver-sponsor fullsize-image-block">
                <img class="fullsize-image sponsor-image" src="../../assets/img/sponsors/STO MANAGERS/STO MANAGERS.png" alt="">
              </div>
            </b-col>
            <b-col>
              <div v-on:click="navToWaitPage('crypttp')" class="hall-block small-margin silver-sponsor margin-15">
                <img class="sponsor-image" src="../../assets/img/sponsors/CRYPTTP/CRYPTTP.png" alt="">
              </div>
            </b-col>
            <b-col class="hall-block">
              e-WORKSHOP
            </b-col>
            <b-col>
              <div v-on:click="navToWaitPage('fas')" class="hall-block small-margin silver-sponsor margin-15">
                <img class="sponsor-image" src="../../assets/img/sponsors/FAS/FAS.png" alt="">
              </div>
            </b-col>
            <b-col>
              <div v-on:click="navToWaitPage('')" class="hall-block small-margin silver-sponsor margin-15">
                Silver sponsor
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <div v-on:click="navToWaitPage('')" style="left:-10%; top:-40%;" class="hall-block small-margin silver-sponsor">
                Silver sponsor
              </div>
            </b-col>
            <b-col>
              <div v-on:click="navToWaitPage('')" style="right:-10%; top:-40%;" class="hall-block small-margin silver-sponsor">
                Silver sponsor
              </div>
            </b-col>
          </b-row>

          <div style="margin-bottom:100px;">
            <!-- <img class="doors" src="../../assets/img/doors.png" alt=""> -->
          </div>

          <!-- bronse sponsors -->
          <div class="justify-content-md-center bronze-sponsor-row">
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor">
              Bronze sponsor
            </b-col>
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor">
              Bronze sponsor
            </b-col>
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor">
              Bronze sponsor
            </b-col>
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor">
              Bronze sponsor
            </b-col>
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor">
              Bronze sponsor
            </b-col>
          </div>

          <div class="justify-content-md-center bronze-sponsor-row" style="margin-top:0px">
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
              Bronze sponsor
            </b-col>
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
              Bronze sponsor
            </b-col>
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
              Bronze sponsor
            </b-col>
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
              Bronze sponsor
            </b-col>
            <b-col v-on:click="navToWaitPage()" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
              Bronze sponsor
            </b-col>
          </div>

          <b-row class="justify-content-md-center">
            <b-col style="margin-right:50px;">
              <b-row class="justify-content-md-center">
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
              </b-row>
              <b-row class="justify-content-md-center">
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
              </b-row>
            </b-col>
            <b-col style="margin-left:50px;">
              <b-row class="justify-content-md-center">
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
              </b-row>
              <b-row class="justify-content-md-center">
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row class="justify-content-md-center" style="margin-top:20px">
            <b-col style="margin-right:50px;">
              <b-row class="justify-content-md-center">
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
              </b-row>
              <b-row class="justify-content-md-center">
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
              </b-row>
            </b-col>
            <b-col style="margin-left:50px;">
              <b-row class="justify-content-md-center">
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
              </b-row>
              <b-row class="justify-content-md-center">
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
                <b-col v-on:click="navToWaitPage()" class="hall-block micro-sponsor"></b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row style="margin-top:50px" class="justify-content-md-center">
            <b-col>
              <b-row class="justify-content-md-center">
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row class="justify-content-md-center">
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row class="justify-content-md-center">
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
                <b-col class="hall-block nano-sponsor" v-on:click="navToWaitPage()"></b-col>
              </b-row>
            </b-col>
          </b-row>

        </b-container>
      </b-col>
      <b-col v-if="showChat" md="2" class="sticky-chat">
        <globalchat></globalchat>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "desktop",
  methods: {
    navToWaitPage (name) {
      if (name == "viproom") {
        this.$router.push({
          path: `/${this.$root.token}/vip`
        })
      }
      else {
        this.$router.push({
          path: `/${this.$root.token}/company`,
          query: {
            name: name
          }
        })
      }
    },
  },
  data() {
    this.showChat = false
    this.hallWidth = 12

    window.EventBus.$on('open_global_chat', () => {
      this.hallWidth = 10
      this.showChat = true
    })

    window.EventBus.$on('close_global_chat', () => {
      this.hallWidth = 12
      this.showChat = false
    })

    return {
      showChat: this.showChat,
      hallWidth: this.hallWidth
    }
  },
}
</script>
<style lang="css">
  .doors {
    position: relative;
    opacity: 1;
    width: 126%;
    margin: -28% 0% 0px -12%;
    display: block;
    pointer-events: none;
  }
  .fullsize-image {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
  }
  .margin-15 {
    margin-top:15px;
  }
</style>