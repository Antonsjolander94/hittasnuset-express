import UrlService from "../../services/UrlService"

const state = {
    urls: [],
    res: "",
    error: "",
    loading: false
};

const getters = {
    allUrls: (state) => state.urls,
    isLoading: (state) => state.loading,
    isError: (state) => state.error,
};

const actions = {
    async fetchUrls({ commit }) {
        try {
            commit("setLoading", true)
            const response = await UrlService.getUrls();
            commit('setUrls', response)
            commit("setLoading", false)
        } catch (error) {
            commit("setLoading", false)
        }
    },
    async addUrl({ commit }, payload) {
        try {
            commit("setLoading", true)
            commit("setError", "")
            await UrlService.insertUrl(payload);
            commit("setLoading", false)
        } catch (error) {
            console.log({ asd: error })
            commit("setError", error.response.data.message)
            commit("setLoading", false)
            setTimeout(function () {
                commit("setError", "")
            }, 3000);
        }
    },
    async deleteUrl({ commit }, payload) {
        try {
            commit("setLoading", true)
            commit("setError", "")
            await UrlService.deleteUrl(payload);
            commit("setLoading", false)
        } catch (error) {
            commit("setError", error)
            commit("setLoading", false)
        }
    },

};

const mutations = {
    setUrls: (state, urls) => (state.urls = urls),
    setLoading: (state, load) => (state.loading = load),
    setAddUrlResponse: (state, res) => (state.res = res),
    setError: (state, err) => (state.error = err),
};

export default {
    state,
    getters,
    actions,
    mutations
}