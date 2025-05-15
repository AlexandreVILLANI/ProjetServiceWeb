import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import {getAllAvis,createAvis, deleteAvis} from "@/services/avis.service";

export default {
    namespaced : true,
    state: () => ({
        avis : [],
        avisCourant: {
            id_avis: null,
        },
    }),

    mutations: {
        SET_AVIS(state, avis) {
            state.avis = avis;
        },
        DELETE_AVIS(state,id){
            state.avis.filter(a => a.id_avis !== id)
        },
    },

    actions: {
        async getAllAvis({ commit },id) {
            try {
                const result = await getAllAvis(id);
                if (Array.isArray(result.data)) {
                    commit('SET_AVIS', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getAllAvis():", err);
            }
        },
        async createAvis({commit},{commentaire, note, id_activite, id_utilisateur}){
            try {
                await createAvis({commentaire, note, id_activite, id_utilisateur});
                commit('A_CHANGER')
            } catch (err) {
                console.error("Error in updateAvis():", err);
            }
        },
        async deleteAvis({commit},id_avis){
            try {
                await deleteAvis({id_avis : id_avis});
                commit('DELETE_AVIS',id_avis)
            } catch (err) {
                console.error("Error in updateAvis():", err);
            }
        },
    },
};