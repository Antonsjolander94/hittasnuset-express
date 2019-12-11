import Vue from "vue";
import Vuex from "vuex";
import urls from "./modules/urls"
import scraper from "./modules/scraper"
import prices from "./modules/prices"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        a: urls,
        b: scraper,
        c: prices,
    },
})

export default store;