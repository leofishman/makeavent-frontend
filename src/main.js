import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'

import router from './router'
import Content from './content'

import Navbar from './components/Navbar.vue'
import Desktop from './components/desktop/Index.vue'
import Mobile from './components/mobile/Index.vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component('navbar', Navbar)
Vue.component('desktop', Desktop)
Vue.component('mobile', Mobile)

const EventBus = new Vue();
window.EventBus = EventBus

new Vue({
  router,
  render: h => h(App),
  data() {
    let selectedLanguage = localStorage.selectedLanguage
    if (!selectedLanguage || selectedLanguage === undefined)
      selectedLanguage = "EN"

    return {
      content: Content[selectedLanguage]
    }
  },
}).$mount('#app')
