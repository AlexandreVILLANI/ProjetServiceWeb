import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import {
    createReservation,
    getActiviteById,
    updateNbPlaces,
    getAllActiviteByType,
    getMoyenneNote,
    updateActivite,
    updateCreneau,
    createActivite,
    deleteActivite,
    deleteCreneau,
    createCreneau, getReservationsByActivite, deleteReservation,

} from "@/services/activite.service";


export default {
    namespaced : true,
    state: () => ({

        activite : [],
        activites: [],
        note:null,
        new_activite:null,
        reservations: [],
        currentActiviteId:null,
        currentTypeActivite: null

    }),

    mutations: {
        SET_ACTIVITES(state, activites) {
            state.activites = activites;
        },
        SET_ACTIVITE(state, activite) {
            state.activite = activite;
        },
        UPDATE_NB_PLACES(state, data){
            const result = state.activite.find(item => item.id_creneau === data.id)
            result.places_disponibles -= data.nb;
        },
        A_CHANGER(){

        },
        SET_MOYENNE_NOTE(state,data){
            state.note = data;
        },
        SET_NEW_ACTIVITE(state,data){
            state.new_activite = data
        },
        SET_RESERVATIONS(state,data){
            state.reservations = data
        },
        SET_CURRENT_ACTIVITE_ID(state,id){
            state.currentActiviteId = id
        },
        SET_CURRENT_TYPE_ACTIVITE(state,type){
            state.currentTypeActivite = type
        }



    },

    actions: {
        async getAllActiviteByType({ commit },type) {
            try {
                const result = await getAllActiviteByType(type);
                if (Array.isArray(result.data)) {
                    commit('SET_ACTIVITES', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getActiviteById():", err);
            }
        },
        async getActiviteById({ commit },id) {
            try {
                const result = await getActiviteById(id);
                if (Array.isArray(result.data)) {
                    commit('SET_ACTIVITE', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getActiviteById():", err);
            }
        },
        async updateNbPlaces({commit},{id,nb}){
            try {
                await updateNbPlaces({id,nb});
                commit('UPDATE_NB_PLACES',{id,nb})
            } catch (err) {
                console.error("Error in updateNbPlaces():", err);
            }
        },

        async updateActivite({commit},data){
            try {
                await updateActivite(data);
                commit('A_CHANGER')
            } catch (err) {
                console.error("Error in updateActivite():", err);
            }
        },
        async updateCreneau({commit},data){
            try {
                await updateCreneau(data);
                commit('A_CHANGER')
            } catch (err) {
                console.error("Error in updateCreneau():", err);
            }
        },
        async createReservation({commit},{id_utilisateur,id_creneau,nb}){
            try {
                await createReservation({id_utilisateur,id_creneau,nb});
                commit('A_CHANGER')
            } catch (err) {
                console.error("Error in updateNbPlaces():", err);
            }
        },
        async createActivite({commit},data){
            try {
                const result = await createActivite(data);
                commit('SET_NEW_ACTIVITE', result[0]);
            } catch (err) {
                console.error("Error in createActivite():", err);
            }
        },
        async getMoyenneNote({commit}) {
            try {
                const result = await getMoyenneNote();
                if (Array.isArray(result.data)) {
                    commit('SET_MOYENNE_NOTE', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getMoyenneNote():", err);
            }
        },
        async deleteActivite({commit},data){
            try {
                await deleteActivite(data);
                commit('A_CHANGER');
            } catch (err) {
                console.error("Error in createActivite():", err);
            }
        },
        async deleteCreneau({commit},data){
            try {
                await deleteCreneau(data);
                commit('A_CHANGER');
            } catch (err) {
                console.error("Error in createCreneau():", err);
            }
        },
        async createCreneau({commit},data){
            try {
                await createCreneau(data);
                commit('A_CHANGER');
            } catch (err) {
                console.error("Error in createActivite():", err);
            }
        },
        async getReservationsByActivite({ commit },id) {
            try {
                const result = await getReservationsByActivite(id);
                if (Array.isArray(result.data)) {
                    commit('SET_RESERVATIONS', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getActiviteById():", err);
            }
        },
        async deleteReservation({ commit },id) {
            try {
                await deleteReservation(id);
                    commit('A_CHANGER');
            } catch (err) {
                console.error("Error in getActiviteById():", err);
            }
        },

        async setCurrentActiviteId({ commit },id) {
            try {
                commit('SET_CURRENT_ACTIVITE_ID',id);
            } catch (err) {
                console.error("Error in getActiviteById():", err);
            }
        },
        async setCurrentTypeActivite({ commit },type) {
            try {
                commit('SET_CURRENT_TYPE_ACTIVITE',type);
            } catch (err) {
                console.error("Error in getActiviteById():", err);
            }
        },




    },
};