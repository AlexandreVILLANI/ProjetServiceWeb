import Vue from 'vue';
import Vuex from 'vuex';
import {reloadMapMarkers} from "@/services/carte.service";


Vue.use(Vuex);

export default {
    namespaced: true,
    state: () => ({
        markers: [],
        zones: [], // Tableau pour les zones
        isAdminMode: false,
        isPrestataireMode: false,
        isAddingPrestation: false,
        showForm: false,
        tempLatLng: null,
    }),


    mutations: {
        VALIDATE_MARKER(state, index) {
            if (state.markers[index]) {
                state.markers[index].status = 'valide'; // Change le statut en validé
            }
        },
        REMOVE_ZONE(state, index) {
            state.zones.splice(index, 1); // Supprime la zone à l'index donné
        },
        SET_ZONES(state, zones) {
            state.zones = zones;
        },
        ADD_ZONE(state, zone) {
            state.zones.push(zone);
        },
        SET_MARKERS(state, markers) {
            state.markers = markers;
        },
        ADD_MARKER(state, marker) {
            state.markers.push(marker);
        },
        DELETE_MARKER(state, index) {
            state.markers.splice(index, 1);
        },
        SET_ADMIN_MODE(state, isAdmin) {
            state.isAdminMode = isAdmin;
        },
        SET_PRESTATAIRE_MODE(state, isPrestataire) {
            state.isPrestataireMode = isPrestataire;
        },
        TOGGLE_ADD_PRESTATION(state, isAdding) {
            state.isAddingPrestation = isAdding;
        },
        SHOW_FORM(state, show) {
            state.showForm = show;
        },
        SET_TEMP_LATLNG(state, latlng) {
            state.tempLatLng = latlng;
        },
        RESET_STATE(state) {
            state.isAddingPrestation = false;
            state.showForm = false;
            state.tempLatLng = null;
        },
    },

    actions: {
        loadZones({ commit }) {
            const savedZones = JSON.parse(localStorage.getItem('zones')) || [];
            commit('SET_ZONES', savedZones);
        },
        saveZones({ state }) {
            localStorage.setItem('zones', JSON.stringify(state.zones));
        },
        addZone({ commit, dispatch }, zone) {
            commit('ADD_ZONE', zone);
            dispatch('saveZones');
        },
        loadMarkers({ commit }) {
            const savedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
            commit('SET_MARKERS', savedMarkers);
        },
        saveMarkers({ state }) {
            localStorage.setItem('markers', JSON.stringify(state.markers));
        },
        addMarker({ commit, dispatch }, marker) {
            commit('ADD_MARKER', marker);
            dispatch('saveMarkers');
            reloadMapMarkers();
        },
        validateMarker({ commit, dispatch }, index) {
            commit('VALIDATE_MARKER', index); // Met à jour le statut dans le state
            dispatch('saveMarkers');   // Sauvegarde les modifications
        },
        deleteMarker({ commit, dispatch }, index) {
            commit('DELETE_MARKER', index);
            dispatch('saveMarkers');
            reloadMapMarkers();
        },
        resetState({ commit }) {
            commit('RESET_STATE');
            reloadMapMarkers();
        },
    },
};
