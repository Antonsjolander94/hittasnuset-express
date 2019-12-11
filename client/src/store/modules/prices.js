import PriceService from "../../services/PriceService"

const state = {
    prices: []
};

const getters = {
    allPrices: (state) => state.prices
};

const actions = {
    async fetchPrices({ commit }) {
        const response = await PriceService.getPrices();
        console.log({ priceRes: response })
        commit('setPrices', response)
    },


};

const mutations = {
    setPrices: (state, prices) => (state.prices = prices),
};

export default {
    state,
    getters,
    actions,
    mutations
}