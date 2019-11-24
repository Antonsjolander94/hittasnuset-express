/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router"
import App from './App.vue'

import ScrapeComponent from './components/ScrapeComponent'
import CreateUrlComponent from './components/CreateUrlComponent'
import PriceComponent from './components/PriceComponent'
import VueLodash from 'vue-lodash';


import Toasted from 'vue-toasted';
import BootstrapVue from 'bootstrap-vue'
import './scss/app.scss'


Vue.use(Toasted)
Vue.use(VueRouter)
Vue.use(VueLodash)
Vue.use(BootstrapVue)

const routes = [
  { path: "/", component: PriceComponent },
  { path: "/scrape", component: ScrapeComponent },
  { path: "/createurl", component: CreateUrlComponent },
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
