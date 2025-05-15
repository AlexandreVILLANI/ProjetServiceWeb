
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import {createConcert, getAllConcert, getConcertById, updateConcert} from "@/services/concert";
import {updateNbPlaces} from "@/services/activite.service";


export default {
    namespaced : true,
    state: () => ({


        concerts : [],
        concert : [],
        currentConcertId:null


    }),

    mutations: {
        SET_CONCERTS(state, concerts) {
            state.concerts = concerts;
        },
        SET_CONCERT(state, concert) {
            state.concert = concert;
        },
        UPDATE_NB_PLACES(state, data){
            const result = state.concert.find(item => item.id_creneau === data.id)
            result.places_disponibles -= data.nb;
        },
        A_CHANGER(){
        },
        SET_CURRENT_CONCERT_ID(state, id) {
            state.currentConcertId = id
        }


    },

    actions: {
        async getConcertById({ commit },id) {
            try {
                const result = await getConcertById(id);
                if (Array.isArray(result.data)) {
                    commit('SET_CONCERT', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getConcertById():", err);
            }
        },
        async getAllConcert({ commit }) {
            try {
                const result = await getAllConcert();
                if (Array.isArray(result.data)) {
                    commit('SET_CONCERTS', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getAllConcert():", err);
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
        async updateConcert({commit},data){
            try {
                await updateConcert(data);
                commit('A_CHANGER')
            } catch (err) {
                console.error("Error in updateConcert():", err);
            }
        },
        async createConcert({commit},data){
            try {
                await createConcert(data)
                commit('A_CHANGER')
            } catch (err) {
                console.error("Error in updateConcert():", err);
            }
        },
        async setCurrentConcertId({ commit },id) {
            try {
                commit('SET_CURRENT_CONCERT_ID',id);
            } catch (err) {
                console.error("Error in getActiviteById():", err);
            }
        },


    },
};