import Vue from 'vue'
import Vuex from 'vuex'
import {
    addToPanierActivite,
    deletePanierActivite,
    getPanierActivite,
    addToPanierArticle,
    deletePanierArticle,
    getPanierArticle,
    createAchat, getAchats
} from "@/services/panier.service";

Vue.use(Vuex)



export default {
    namespaced : true,
    state: () => ({
      panier_activite : null,
      panier_article : null,
        achats : [],

    }),

    mutations: {
        DELETE_PANIER_ACTIVTIE(state,id){
            state.panier_activite.filter(a => a.id_panier !== id)
        },
        DELETE_PANIER_ARTICLE(state,id){
            state.panier_article.filter(a => a.id_article !== id)
        },
        SET_PANIER_ACTIVITE(state,panier){
            state.panier_activite = panier
        },
        SET_PANIER_ARTICLE(state,panier){
            state.panier_article = panier
        },
        ADD_TO_PANIER_ACTIVITE(state,activite){
            state.panier_activite += activite
        },
        ADD_TO_PANIER_ARTICLE(state,article){
            state.panier_article+= article
        },
        CREATE_ACHAT(state,achat){
            state.achats+=achat
        },
        GET_ACHATS(state,achats){
            state.achats = achats
        }


    },

    actions: {
        async addToPanierActivite({commit},data){
            try {
                await addToPanierActivite(data);
                commit('ADD_TO_PANIER_ACTIVITE')
            } catch (err) {
                console.error("Error in addToPanier():", err);
            }
        },
        async getPanierActivite({commit},id){
            try {
                let result = await getPanierActivite(id);
                commit('SET_PANIER_ACTIVITE',result.data)
            } catch (err) {
                console.error("Error in addToPanier():", err);
            }
        },
        async deletePanierActivite({commit},id){
            try {
                await deletePanierActivite(id);
                commit('DELETE_PANIER_ACTIVTIE',id)
            } catch (err) {
                console.error("Error in addToPanier():", err);
            }
        },




        async addToPanierArticle({commit},data){
            try {
                const result = await addToPanierArticle(data);
                commit('ADD_TO_PANIER_ARTICLE',result)
                return result
            } catch (err) {
                console.error("Error in addToPanier():", err);
            }
        },
        async getPanierArticle({commit},id){
            try {
                let result = await getPanierArticle(id);
                commit('SET_PANIER_ARTICLE',result.data)
            } catch (err) {
                console.error("Error in addToPanier():", err);
            }
        },
        async deletePanierArticle({commit},id){
            try {
                await deletePanierArticle(id);
                commit('DELETE_PANIER_ARTICLE')
            } catch (err) {
                console.error("Error in addToPanier():", err);
            }
        },
        async createAchat({commit},data){
            try {
                const result = await createAchat(data);
                commit('CREATE_ACHAT',result.data)
            } catch (err) {
                console.error("Error in addToPanier():", err);
            }
        },
        async getAchats({commit},id){
            try {
                const result = await getAchats(id);
                commit('GET_ACHATS',result.data)
            } catch (err) {
                console.error("Error in addToPanier():", err);
            }
        },
    },
};