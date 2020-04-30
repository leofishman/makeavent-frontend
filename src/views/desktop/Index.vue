<template>
  <div id="home">

    <!-- Live Feed -->
    <Livefeed />

    <!-- Stories -->
    <Stories />
    
    <div class="container" v-if="!joinMeeting && ready">
       <!-- Top row -->
      <section class="section section-top">
        <Toprow />
      </section>

      <!-- Main Sponsor -->
      <section class="section section-main">
        <div class="tile is-ancestor">
          <div class="tile">
            <!-- Platinum Sponsor -->
            <div class="tile is-parent">
              <Platinum data="5"/>
            </div>
          </div>

          <!-- Main Sponsor -->
          <div class="tile is-parent help-420">
            <Main data="6"/>
          </div>

          <div class="tile">
            <!-- Platinum Sponsor -->
            <div class="tile is-parent">
              <Platinum data="7"/>
            </div>
          </div>
        </div>
      </section>

      <!-- Silver Sponsors -->
      <section class="section section-silver">
        <div class="tile is-ancestor">
          <!-- Silver Sponsor -->
          <div class="tile is-vertical">
            <Silver data="8"/>
            <Silver data="9"/>
            <Silver data="10"/>
          </div>

          <!-- Gold Sponsor -->
          <div class="tile is-vertical">
            <div class="tile is-parent">
              <Gold data="11"/>
            </div>
            <div class="tile is-parent">
              <Gold data="12"/>
            </div>
          </div>

          <div class="tile is-parent help-420">
            <Eworkshop />
          </div>
          
          <!-- Gold Sponsor -->
          <div class="tile is-vertical">
            <div class="tile is-parent">
              <Gold data="13"/>
            </div>
            <div class="tile is-parent">
              <Gold data="14"/>
            </div>
          </div>
          <!-- Silver Sponsor -->
          <div class="tile is-vertical">
            <Silver data="15"/>
            <Silver data="16"/>
            <Silver data="17"/>
          </div>
        </div>
      </section>

      <!-- Bronze Sponsors -->
      <section class="section section-bronze">
        <div class="columns is-multiline">
          <div class="column is-one-fifth">
            <Bronze data="18"/>
          </div>
          
          <div class="column is-one-fifth">
            <Bronze data="19"/>
          </div>
          
          <div class="column is-one-fifth">
            <Bronze data="20"/>
          </div>
          
          <div class="column is-one-fifth">
            <Bronze data="21"/>
          </div>
          
          <div class="column is-one-fifth">
            <Bronze data="22"/>
          </div>

          <div class="column is-one-fifth">
            <Bronze data="23"/>
          </div>

          <div class="column is-one-fifth">
            <Bronze data="24"/>
          </div>

          <div class="column is-one-fifth">
            <Bronze data="25"/>
          </div>

          <div class="column is-one-fifth">
            <Bronze data="26"/>
          </div>

          <div class="column is-one-fifth">
            <Bronze data="27"/>
          </div>
        </div>
      </section>

      <!-- Basic Sponsor -->
      <section class="section section-basic">
        <div class="columns has-text-centered">

          <!-- Basic-a -->
          <div class="column basic-a">
            <div class="columns is-multiline">
              <div class="column is-one-third">
                <Basic data="28"/>
              </div>
              <div class="column is-one-third">
                <Basic data="29"/>
              </div>
              <div class="column is-one-third">
                <Basic data="30"/>
              </div>

              <div class="column is-one-third">
                <Basic data="31"/>
              </div>
              <div class="column is-one-third">
                <Basic data="32"/>
              </div>
              <div class="column is-one-third">
                <Basic data="33"/>
              </div>

              <div class="column is-one-third">
                <Basic data="34"/>
              </div>
              <div class="column is-one-third">
                <Basic data="35"/>
              </div>
              <div class="column is-one-third">
                <Basic data="36"/>
              </div>

              <div class="column is-one-third">
                <Basic data="37"/>
              </div>
              <div class="column is-one-third">
                <Basic data="38"/>
              </div>
              <div class="column is-one-third">
                <Basic data="39"/>
              </div>

              <div class="column is-one-third">
                <Basic data="40"/>
              </div>
              <div class="column is-one-third">
                <Basic data="41"/>
              </div>
              <div class="column is-one-third">
                <Basic data="42"/>
              </div>
            </div>
          </div>

          <!-- Basic-b -->
          <div class="column basic-b">
            <div class="tile is-vertical">
              <div v-on:click="$root.navToPage('mediahall')" class="tile box flex-middle media-hall click">
                <div class="has-text-centered fix-width">
                  <h3>Media Hall</h3>
                </div>
              </div>
              <div v-on:click="$root.navToPage('sip')" class="tile box flex-middle startups click">
                <div class="has-text-centered fix-width">
                  <h3>Startups demo day</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Basic-c -->
          <div class="column basic-c">
            <div class="columns is-multiline">
              <div class="column is-one-third">
                <Basic data="43"/>
              </div>
              <div class="column is-one-third">
                <Basic data="44"/>
              </div>
              <div class="column is-one-third">
                <Basic data="45"/>
              </div>

              <div class="column is-one-third">
                <Basic data="46"/>
              </div>
              <div class="column is-one-third">
                <Basic data="47"/>
              </div>
              <div class="column is-one-third">
                <Basic data="48"/>
              </div>

              <div class="column is-one-third">
                <Basic data="49"/>
              </div>
              <div class="column is-one-third">
                <Basic data="50"/>
              </div>
              <div class="column is-one-third">
                <Basic data="51"/>
              </div>

              <div class="column is-one-third">
                <Basic data="52"/>
              </div>
              <div class="column is-one-third">
                <Basic data="53"/>
              </div>
              <div class="column is-one-third">
                <Basic data="54"/>
              </div>

              <div class="column is-one-third">
                <Basic data="55"/>
              </div>
              <div class="column is-one-third">
                <Basic data="56"/>
              </div>
              <div class="column is-one-third">
                <Basic data="57"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import {host} from '../../env'

import Stories from '@/components/Stories.vue';
import Livefeed from '@/components/Livefeed.vue';
import Toprow from '@/components/Toprow.vue';
import Main from '@/components/Sponsors/Main.vue';
import Platinum from '@/components/Sponsors/Platinum.vue';
import Gold from '@/components/Sponsors/Gold.vue';
import Silver from '@/components/Sponsors/Silver.vue';
import Bronze from '@/components/Sponsors/Bronze.vue';
import Basic from '@/components/Sponsors/Basic.vue';
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
    })

    return {
      joinMeeting: false,
      host: host,

      ready: false
    }
  },
}
</script>