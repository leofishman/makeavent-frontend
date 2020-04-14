<template>
  <div>
    <div v-if="!joinMeeting && ready">
      <!-- Stages -->
      <b-row class="justify-content-md-center" style="padding-top:50px;">
        <b-col md="2">
          <div v-on:click="navToPage()" class="hall-block" style="line-height:90px; background:#c0eac6">
            <img v-if="getSponsorSlot('1').logo" class="main-logo" :src="host + getSponsorSlot('1').logo" alt="">
            <img v-else src="../../assets/logo_dark.svg" class="main-logo" alt="">
            <strong>
              Information Desk
            </strong>
            <img class="absolute-bg-image stage" src="../../assets/img/info.png" alt="">
          </div>
        </b-col>
        <b-col md="2">
          <div v-on:click="joinStage('stage1')" class="hall-block" style="line-height:90px; background:#b8bfe6">
            <img v-if="getSponsorSlot('2').logo" class="main-logo" :src="host + getSponsorSlot('2').logo" alt="">
            <img v-else src="../../assets/logo_dark.svg" class="main-logo" alt="">
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
          <div v-on:click="joinStage('stage2')" class="hall-block" style="line-height:90px; background:#b8bfe6">
            <img v-if="getSponsorSlot('3').logo" class="main-logo" :src="host + getSponsorSlot('3').logo" alt="">
            <img v-else src="../../assets/logo_dark.svg" class="main-logo" alt="">
            <strong class="stage-title">
              STAGE
            </strong>
            <img class="absolute-bg-image stage" src="../../assets/img/stage.png" alt="">
          </div>
        </b-col>
        <b-col md="2">
          <div v-on:click="navToPage('vip')" class="hall-block vip" style="line-height:40px">
            <img v-if="getSponsorSlot('4').logo" class="main-logo" :src="host + getSponsorSlot('4').logo" alt="">
            <img v-else src="../../assets/logo_dark.svg" class="main-logo" alt="">
            <strong>
              {{$root.content.vipMeetingRoom}}
            </strong>
            <img class="absolute-bg-image vip" src="../../assets/img/vip.png" alt="">
          </div>
        </b-col>
      </b-row>
      
      <b-container fluid="lg" style="padding-top:30px;">
        <!-- Main, Gold, Silver sponsors -->
        <b-row>

          <div v-on:click="navToPage(getSponsorSlot('5').name)" class="percent-col c15" style="padding:65px 30px 0px 30px">
            <div class="hall-block small-margin gold-sponsor">
              Gold sponsor
              <img v-if="getSponsorSlot('5').name" class="sponsor-image" :src="host + getSponsorSlot('5').logo" alt="">
            </div>
          </div>

          <div v-on:click="navToPage(getSponsorSlot('6').name)" class="percent-col c20" style="padding:20px 30px 0px 30px">
            <div class="hall-block small-margin platinum-sponsor">
              Platinum sponsor
              <img v-if="getSponsorSlot('6').name" class="sponsor-image" :src="host + getSponsorSlot('6').logo" alt="">
            </div>
          </div>

          <div v-on:click="navToPage(getSponsorSlot('7').name)" class="percent-col c40" style="padding: 0px 30px;">
            <div>
              <div style="margin:0px" class="hall-block main-sponsor">
                Main sponsor
                <img v-if="getSponsorSlot('7').name" class="sponsor-image" :src="host + getSponsorSlot('7').logo" alt="">
              </div>
            </div>
          </div>

          <div class="percent-col c20" style="padding:20px 30px 0px 30px">
            <div v-on:click="navToPage(getSponsorSlot('8').name)" class="hall-block small-margin platinum-sponsor">
              Platinum sponsor
              <img v-if="getSponsorSlot('8').name" class="sponsor-image" :src="host + getSponsorSlot('8').logo" alt="">
            </div>
            <div style="height:50px">
            </div>
          </div>

          <div v-on:click="navToPage(getSponsorSlot('9').name)" class="percent-col c15" style="padding:65px 30px 0px 30px">
            <div class="hall-block small-margin gold-sponsor fullsize-image-block">
              <img v-if="getSponsorSlot('9').name" class="fullsize-image sponsor-image" :src="host + getSponsorSlot('9').logo" alt="">
            </div>
          </div>
        </b-row>

        <b-row class="justify-content-md-center">
          <b-col>
            <div v-on:click="navToPage(getSponsorSlot('10').name)" style="margin: auto; left: -10%; top: -25%;" class="hall-block small-margin gold-sponsor wide fullsize-image-block">
              Gold sponsor
              <img v-if="getSponsorSlot('10').name" class="fullsize-image sponsor-image" :src="host + getSponsorSlot('10').logo" alt="">
            </div>
          </b-col>
          <b-col>
            <div v-on:click="navToPage(getSponsorSlot('11').name)" style="margin: auto; right: -10%; top: -25%;" class="hall-block small-margin gold-sponsor wide fullsize-image-block">
              Gold sponsor
              <img v-if="getSponsorSlot('11').name" class="fullsize-image sponsor-image" :src="host + getSponsorSlot('11').logo" alt="">
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div v-on:click="navToPage(getSponsorSlot('12').name)" class="hall-block small-margin silver-sponsor fullsize-image-block">
              <img v-if="getSponsorSlot('12').name" class="fullsize-image sponsor-image" :src="host + getSponsorSlot('12').logo" alt="">
            </div>
          </b-col>
          <b-col>
            <div v-on:click="navToPage(getSponsorSlot('13').name)" class="hall-block small-margin silver-sponsor margin-15">
              <img v-if="getSponsorSlot('13').name" class="sponsor-image" :src="host + getSponsorSlot('13').logo" alt="">
            </div>
          </b-col>
          <b-col v-on:click="navToPage('wa')" class="hall-block">
            e-WORKSHOP
          </b-col>
          <b-col>
            <div v-on:click="navToPage(getSponsorSlot('14').name)" class="hall-block small-margin silver-sponsor margin-15">
              <img v-if="getSponsorSlot('14').name" class="sponsor-image" :src="host + getSponsorSlot('14').logo" alt="">
            </div>
          </b-col>
          <b-col>
            <div v-on:click="navToPage(getSponsorSlot('15').name)" class="hall-block small-margin silver-sponsor margin-15">
              Silver sponsor
              <img v-if="getSponsorSlot('15').name" class="sponsor-image" :src="host + getSponsorSlot('15').logo" alt="">
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div v-on:click="navToPage(getSponsorSlot('16').name)" style="left:-10%; top:-40%;" class="hall-block small-margin silver-sponsor">
              Silver sponsor
              <img v-if="getSponsorSlot('16').name" class="sponsor-image" :src="host + getSponsorSlot('16').logo" alt="">
            </div>
          </b-col>
          <b-col>
            <div v-on:click="navToPage(getSponsorSlot('17').name)" style="right:-10%; top:-40%;" class="hall-block small-margin silver-sponsor">
              Silver sponsor
              <img v-if="getSponsorSlot('17').name" class="sponsor-image" :src="host + getSponsorSlot('17').logo" alt="">
            </div>
          </b-col>
        </b-row>

        <div style="margin-bottom:100px;">
          <!-- <img class="doors" src="../../assets/img/doors.png" alt=""> -->
        </div>

        <!-- bronse sponsors -->
        <div class="justify-content-md-center bronze-sponsor-row">
          <b-col v-on:click="navToPage(getSponsorSlot('18').name)" class="percent-col c15 hall-block bronze-sponsor">
            <img v-if="getSponsorSlot('18').name" class="sponsor-image" :src="host + getSponsorSlot('18').logo" alt="">
          </b-col>
          <b-col v-on:click="navToPage(getSponsorSlot('19').name)" class="percent-col c15 hall-block bronze-sponsor">
            <img v-if="getSponsorSlot('19').name" class="sponsor-image" :src="host + getSponsorSlot('19').logo" alt="">
          </b-col>
          <b-col v-on:click="navToPage(getSponsorSlot('20').name)" class="percent-col c15 hall-block bronze-sponsor">
            Bronze sponsor
            <img v-if="getSponsorSlot('20').name" class="sponsor-image" :src="host + getSponsorSlot('20').logo" alt="">
          </b-col>
          <b-col v-on:click="navToPage(getSponsorSlot('21').name)" class="percent-col c15 hall-block bronze-sponsor">
            Bronze sponsor
            <img v-if="getSponsorSlot('21').name" class="sponsor-image" :src="host + getSponsorSlot('21').logo" alt="">
          </b-col>
          <b-col v-on:click="navToPage(getSponsorSlot('22').name)" class="percent-col c15 hall-block bronze-sponsor">
            Bronze sponsor
            <img v-if="getSponsorSlot('22').name" class="sponsor-image" :src="host + getSponsorSlot('22').logo" alt="">
          </b-col>
        </div>

        <div class="justify-content-md-center bronze-sponsor-row" style="margin-top:0px">
          <b-col v-on:click="navToPage(getSponsorSlot('23').name)" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
            Bronze sponsor
            <img v-if="getSponsorSlot('23').name" class="sponsor-image" :src="host + getSponsorSlot('23').logo" alt="">
          </b-col>
          <b-col v-on:click="navToPage(getSponsorSlot('24').name)" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
            Bronze sponsor
            <img v-if="getSponsorSlot('24').name" class="sponsor-image" :src="host + getSponsorSlot('24').logo" alt="">
          </b-col>
          <b-col v-on:click="navToPage(getSponsorSlot('25').name)" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
            Bronze sponsor
            <img v-if="getSponsorSlot('25').name" class="sponsor-image" :src="host + getSponsorSlot('25').logo" alt="">
          </b-col>
          <b-col v-on:click="navToPage(getSponsorSlot('26').name)" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
            Bronze sponsor
            <img v-if="getSponsorSlot('26').name" class="sponsor-image" :src="host + getSponsorSlot('26').logo" alt="">
          </b-col>
          <b-col v-on:click="navToPage(getSponsorSlot('27').name)" class="percent-col c15 hall-block bronze-sponsor" style="width:18%">
            Bronze sponsor
            <img v-if="getSponsorSlot('27').name" class="sponsor-image" :src="host + getSponsorSlot('27').logo" alt="">
          </b-col>
        </div>

        <b-row class="justify-content-md-center" style="margin-top:20px">
          <b-col style="margin-right:50px;">
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('28').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('28').name" class="sponsor-image" :src="host + getSponsorSlot('28').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('29').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('29').name" class="sponsor-image" :src="host + getSponsorSlot('29').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('30').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('30').name" class="sponsor-image" :src="host + getSponsorSlot('30').logo" alt="">
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('31').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('31').name" class="sponsor-image" :src="host + getSponsorSlot('31').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('32').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('32').name" class="sponsor-image" :src="host + getSponsorSlot('32').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('33').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('33').name" class="sponsor-image" :src="host + getSponsorSlot('33').logo" alt="">
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('34').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('34').name" class="sponsor-image" :src="host + getSponsorSlot('34').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('35').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('35').name" class="sponsor-image" :src="host + getSponsorSlot('35').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('36').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('36').name" class="sponsor-image" :src="host + getSponsorSlot('36').logo" alt="">
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('37').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('37').name" class="sponsor-image" :src="host + getSponsorSlot('37').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('38').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('38').name" class="sponsor-image" :src="host + getSponsorSlot('38').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('39').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('39').name" class="sponsor-image" :src="host + getSponsorSlot('39').logo" alt="">
              </b-col>
            </b-row>
          </b-col>

          <b-col>
            <div style="margin-left:auto; margin-right:auto;" class="hall-block media-hall" v-on:click="navToPage('mediahall')">
              Media hall
            </div>
            <div style="margin-left:auto; margin-right:auto;" class="hall-block startups-hall" v-on:click="navToPage('sip')">
              Startups Demo Day
            </div>
          </b-col>

          <b-col style="margin-left:50px;">
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('40').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('40').name" class="sponsor-image" :src="host + getSponsorSlot('40').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('41').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('41').name" class="sponsor-image" :src="host + getSponsorSlot('41').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('42').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('42').name" class="sponsor-image" :src="host + getSponsorSlot('42').logo" alt="">
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('43').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('43').name" class="sponsor-image" :src="host + getSponsorSlot('43').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('44').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('44').name" class="sponsor-image" :src="host + getSponsorSlot('44').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('45').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('45').name" class="sponsor-image" :src="host + getSponsorSlot('45').logo" alt="">
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('46').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('46').name" class="sponsor-image" :src="host + getSponsorSlot('46').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('47').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('47').name" class="sponsor-image" :src="host + getSponsorSlot('47').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('48').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('48').name" class="sponsor-image" :src="host + getSponsorSlot('48').logo" alt="">
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('49').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('49').name" class="sponsor-image" :src="host + getSponsorSlot('49').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('50').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('50').name" class="sponsor-image" :src="host + getSponsorSlot('50').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('51').name)" class="hall-block micro-sponsor">
                <img v-if="getSponsorSlot('51').name" class="sponsor-image" :src="host + getSponsorSlot('51').logo" alt="">
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row style="margin-top:50px" class="justify-content-md-center">
          <b-col>
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('52').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('52').name" class="sponsor-image" :src="host + getSponsorSlot('52').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('53').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('53').name" class="sponsor-image" :src="host + getSponsorSlot('53').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('54').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('54').name" class="sponsor-image" :src="host + getSponsorSlot('54').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('55').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('55').name" class="sponsor-image" :src="host + getSponsorSlot('55').logo" alt="">
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('56').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('56').name" class="sponsor-image" :src="host + getSponsorSlot('56').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('57').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('57').name" class="sponsor-image" :src="host + getSponsorSlot('57').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('58').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('58').name" class="sponsor-image" :src="host + getSponsorSlot('58').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('59').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('59').name" class="sponsor-image" :src="host + getSponsorSlot('59').logo" alt="">
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="justify-content-md-center">
              <b-col v-on:click="navToPage(getSponsorSlot('60').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('60').name" class="sponsor-image" :src="host + getSponsorSlot('60').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('61').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('61').name" class="sponsor-image" :src="host + getSponsorSlot('61').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('62').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('62').name" class="sponsor-image" :src="host + getSponsorSlot('62').logo" alt="">
              </b-col>
              <b-col v-on:click="navToPage(getSponsorSlot('63').name)" class="hall-block nano-sponsor">
                <img v-if="getSponsorSlot('63').name" class="sponsor-image" :src="host + getSponsorSlot('63').logo" alt="">
              </b-col>
            </b-row>
          </b-col>
        </b-row>

      </b-container>

      <b-button v-on:click="metting()">
        test
      </b-button>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import {host} from '../../env'

export default {
  name: "desktop",
  components: {},
  methods: {
    metting () {
      Axios.post(host + "/webinars/create_webinar", {
        name: "Test"
      })
    },

    joinStage (name) {
      this.$root.getWebinar(name).then(webinar => {
        this.$root.joinWebinar(webinar.zoomWebinarId, "")
      })
    },

    navToPage (name) {
      switch(name) {
        case "vip" :
        case "mediahall" :
        case "sip" :
        case "wa" : 
          this.$router.push({
            path: `/${this.$root.token}/${name}`
          })
        break;

        default :
          this.$router.push({
            path: `/${this.$root.token}/company`,
            query: {
              name: name.toLowerCase()
            }
          })
      }
    },

    getSponsorSlot (id) {
      return this.$root.Sponsors[id]
    },
  },
  data() {
    this.$root.check('Sponsors').then(_ => {
      this.ready = true
    })

    return {
      joinMeeting: false,
      host: host,

      ready: false
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
  .media-hall {
    max-width: 250px;
    width: 100%;
    height: 250px;
    background: aqua;
  }
  .startups-hall {
    max-width: 250px;
    width: 100%;
    height: 250px;
    margin-top: 50px;
    background: #db84ff;
  }
</style>