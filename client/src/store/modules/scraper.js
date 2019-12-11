import ScrapeService from "../../services/ScrapeService"

const state = {
    loading: false,
    scrapeData: []
};

const getters = {
    isScrapeLoading: (state) => state.loading,
    allScrapeData: (state) => state.scrapeData
};

const actions = {
    async scrapeUrls({ commit }, payload) {
        try {
            commit("setLoading", true)
            const response = await ScrapeService.scrapeUrls(payload);
            commit("setScrapeData", response)
            commit("setLoading", false)
        } catch (error) {
            commit("setLoading", false)
        }
    },
    async removeScrapedData({ commit }) {
        commit("setScrapeData", [])
    }
};

const mutations = {
    setScrapeLoading: (state, load) => (state.loading = load),
    setScrapeData: (state, data) => (state.scrapeData = data),
};

export default {
    state,
    getters,
    actions,
    mutations
}