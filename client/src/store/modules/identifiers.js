import IdentifierService from "../../services/IdentifierService"

const state = {
    identifiers: [],
    error: ""
};

const getters = {
    allIdentifiers: (state) => state.identifiers
};

const actions = {
    async fetchIdentifiers({ commit }) {
        const response = await IdentifierService.getIdentifiers();
        console.log({ priceRes: response })
        commit('setIdentifiers', response)
    },
    async addIdentifier({ commit }, payload) {
        try {
            commit("setError", "")
            console.log({ payload: payload })
            await IdentifierService.insertIdentifier(payload);
        } catch (error) {
            console.log({ asd: error })
        }
    },
    async removeIdentifier({ commit }, payload) {
        try {
            commit("setError", "")
            await IdentifierService.deleteIdentifier(payload);
        } catch (error) {
            console.log({ "Error - Kan inte ta bort Identifier": error })
        }
    }
};

const mutations = {
    setIdentifiers: (state, identifiers) => (state.identifiers = identifiers),
    setError: (state, err) => (state.error = err),
};

export default {
    state,
    getters,
    actions,
    mutations
}