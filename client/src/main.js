/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router"
import App from './App.vue'

import ScrapeComponent from './components/ScrapeComponent'
import PriceComponent from './components/PriceComponent'
import VueLodash from 'vue-lodash';

import BootstrapVue from 'bootstrap-vue'
import './scss/app.scss'

Vue.use(VueRouter)
Vue.use(VueLodash)
Vue.use(BootstrapVue)

const routes = [
  { path: "/scrape", component: ScrapeComponent },
  { path: "/", component: PriceComponent },
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
