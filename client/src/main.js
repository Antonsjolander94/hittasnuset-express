/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router"
import App from './App.vue'
import VueLodash from 'vue-lodash';
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'
Vue.prototype.moment = moment
import store from "./store/index"
import "vue-loading-overlay/dist/vue-loading.css";
import './scss/app.scss'

// Routes
import Home from "./pages/Home"

Vue.use(VueRouter)
Vue.use(VueLodash)
Vue.use(BootstrapVue)

const routes = [
  { path: "/", component: Home }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app')
