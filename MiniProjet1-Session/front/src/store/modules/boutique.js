import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import {getArticleById,getAllArticle} from "@/services/boutique.service";

export default {
    namespaced : true,
    state: () => ({
        boutique : null,
        article: null
    }),

    mutations: {
        SET_BOUTIQUE(state, boutique) {
            state.boutique = boutique
        },
        SET_ARTICLE(state, article) {
            state.article = article
        },
    },

    actions: {
        async getAllArticle({ commit }) {
            try {
                const result = await getAllArticle();
                if (Array.isArray(result.data)) {
                    commit('SET_BOUTIQUE', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getArticleStore():", err);
            }
        },

        async getArticleById({ commit },id) {
            try {
                const result = await getArticleById(id);
                if (result.data !== null) {
                    commit('SET_ARTICLE', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getArticleById():", err);
            }
        },
    },
};