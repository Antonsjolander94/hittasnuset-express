import Vue from "vue";
import Vuex from "vuex";
import urls from "./modules/urls"
import scraper from "./modules/scraper"
import prices from "./modules/prices"
import identifiers from "./modules/identifiers"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        a: urls,
        b: scraper,
        c: prices,
        d: identifiers
    },
})

export default store;