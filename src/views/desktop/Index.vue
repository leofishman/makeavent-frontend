<template>
  <div style="margin-left: 0px;" id="home">

    <!-- Live Feed -->
    <Livefeed v-if="false" />

    <!-- Stories -->
    <Stories v-if="false" />
    
    <div class="container" v-if="!joinMeeting && ready">
      
      <!-- Top row -->
      <section class="section section-top">
        <Toprow />
      </section>

      <!-- Main Sponsor -->
      <section class="section section-main">
        <Main data="0"/><!-- Kaspersky -->
      </section>

      <!-- GOLD Sponsor -->
      <section class="section section-gold">
        <Gold data="2"/><!-- IOVLabs -->
      </section>

      <!-- SILVER Sponsors but with gold syle -->
      <section class="section section-silver">
        <div class="columns">
          <div class="column is-one-fifth is-offset-one-fifth">
            <div class="tile is-vertical">
              <div class="tile is-parent">
                <Gold data="1"/><!-- STO -->
              </div>
              <div class="tile is-parent">
                <Gold data="4"/><!-- Crypttp -->
              </div>
            </div>
          </div>

          <div v-on:click="$root.joinStage('eworkshop')" class="column is-one-fifth">
            <Eworkshop />
          </div>

          <div class="column is-one-fifth">
            <div class="tile is-vertical">
              <div class="tile is-parent">
                <Gold data="5"/><!-- fas -->
              </div>
              <div class="tile is-parent">
                <Gold data="3"/><!-- Mohr & Wolfe -->
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BRONZE Sponsors -->
      <section class="section section-bronze">
        <div class="column">
          <div class="columns">
            <div class="column">
              <Bronze data="6"/><!-- Decred -->
            </div>

            <div class="column">
              <Bronze data="7"/><!-- Quantia -->
            </div>

            <div class="column">
              <Bronze data="8"/><!-- Money on change -->
            </div>

            <div class="column">
              <Bronze data="9"/><!-- name -->
            </div>

            <div class="column">
              <Bronze data="10"/><!-- Dash -->
            </div>
          </div>
        </div>
      </section>
      <section class="section section-bronze">

        <div v-on:click="$root.navToPage('mediahall')" class="box flex-middle media-hall click">
          <div class="has-text-centered fix-width">
            <h3>Media Hall</h3>
          </div>
        </div>

      </section>

      <!-- STARTUPS -->
      <section class="section section-basic">
        <div class="columns has-text-centered">

          <div class="column basic-a is-one-third">
            <div class="columns is-multiline">
              <div class="column is-one-third">
                <Basic data="11"/><!-- decrypto -->
              </div>
              <div class="column is-one-third">
                <Basic data="17"/><!-- altvesto -->
              </div>
              <div class="column is-one-third">
                <Basic data="12"/><!-- sensitrust -->
              </div>
              <div class="column is-one-third">
                <Basic data="16"/><!-- block sdk -->
              </div>
              <div class="column is-one-third">
                <Basic data="13"/><!-- ebakus -->
              </div>
            </div>
          </div>

          <div class="column basic-b">
            <div v-on:click="$root.navToPage('sip')" class="tile box flex-middle startups click">
              <div class="has-text-centered fix-width">
                <h3>Startups demo day</h3>
              </div>
            </div>
          </div>

          <div class="column basic-c is-one-third">
            <div class="columns is-multiline">
              <div class="column is-one-third">
                <Basic data="18"/><!-- copyrage -->
              </div>
              <div class="column is-one-third">
                <Basic data="19"/><!-- fuse -->
              </div>
              <div class="column is-one-third">
                <Basic data="21"/><!-- algotrader -->
              </div>
              <div class="column is-one-third">
                <Basic data="14"/><!-- makeAvent -->
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- STANDARS -->
      <section class="section section-basic-bottom">
        <div class="columns">
          <div class="column is-1">
            <Basic data="15"/><!-- lotech lab -->
          </div>
          <div class="column is-1">
            <Basic data="20"/><!-- LairEast -->
          </div>
          <div class="column is-1">
            <Basic data="22"/><!-- Homebloc -->
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  import {host} from '../../env'

  import Stories from '@/components/Stories.vue'
  import Livefeed from '@/components/Livefeed.vue'
  import Toprow from '@/components/Toprow.vue'
  import Main from '@/components/Sponsors/Main.vue'
  import Platinum from '@/components/Sponsors/Platinum.vue'
  import Gold from '@/components/Sponsors/Gold.vue'
  import Silver from '@/components/Sponsors/Silver.vue'
  import Bronze from '@/components/Sponsors/Bronze.vue'
  import Basic from '@/components/Sponsors/Basic.vue'
  import Eworkshop from '@/components/Eworkshop.vue'

  export default {
    name: "desktop",
    components: {
      Stories,
      Livefeed,
      Toprow,
      Main,
      Platinum,
      Gold,
      Silver,
      Bronze,
      Basic,
      Eworkshop
    },
    methods: {
      metting () {
        Axios.post(host + "/webinars/create_webinar", {
          name: "Test"
        })
      },
    },
    data() {
      this.$root.check('Sponsors').then(_ => {
        this.ready = true
      }).catch(e => console.log(`${e} inaccessible`))

      return {
        joinMeeting: false,
        host: host,

        ready: false,
      }
    },
  }
</script>