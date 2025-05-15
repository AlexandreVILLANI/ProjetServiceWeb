import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {
    getAllUsers,
    createUser,
    getAllReservations,
    updateUtilisateur,
    deleteUtilisateur,
    updatePrestataire,
    getActivitesByPrestataire,
    getUserFromSessionId,
    getPrestataireByUserId,
    createPrestataire,
    deletePrestataire,
    getVueActiviteById,
    updateVueActivite
} from "@/services/users.services";

import { getSessionCookies, logout } from "@/services/login.services";
import { getAllPrestataires } from "@/services/users.services";

export default {
    namespaced: true,
    state: () => ({
        userCourant: {
            session_id: null,
            id_role: null,
        },
        users: [],
        isConnected: false,
        reservations: [],
        prestataire: null,
        prestataires: null,
        activites: null,
        activityViewsData: null,
    }),
    getters: {
        getSessionId: state => state.userCourant.session_id,
        getUserCourant: state => state.userCourant
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        CREATE_USER(state, data) {
            state.users.push(data);
        },
        CREATE_PRESTATAIRE(state, data) {
            state.prestataires.push(data);
        },
        CHANGE_ROLE(state, role) {
            state.userCourant.id_role = role;
        },
        SET_RESERVATIONS(state, data) {
            state.reservations = data;
        },
        SET_USER(state, user) {
            state.userCourant = user;
            state.isConnected = true;
        },
        LOGOUT_USER(state) {
            state.userCourant = { session_id: null, id_role: null };
            state.isConnected = false;
        },
        UPDATE_USER(state, user) {
            if (user.id_utilisateur === state.userCourant.id_utilisateur) {
                state.userCourant = user;
            }
        },
        UPDATE_PRESTATAIRE(state, presta) {
            state.prestataire = presta;
        },
        DELETE_UTILISATEUR(state, user) {
            if (state.userCourant.id_utilisateur === user.id_utilisateur) {
                state.userCourant = { session_id: null, id_role: null };
                state.isConnected = false;
            }
        },
        DELETE_PRESTATAIRE(state, id) {
            state.prestataires = state.prestataires.filter(p => p.id_prestataire !== id);
        },
        SET_PRESTATAIRE(state, prestataire) {
            state.prestataire = prestataire;
        },
        SET_PRESTATAIRES(state, prestataires) {
            state.prestataires = prestataires;
        },
        SET_ACTIVITES(state, activites) {
            state.activites = activites;
        },
        SET_SESSION_ID(state, session_id) {
            state.userCourant.session_id = session_id;
            state.isConnected = true;
        },
        UPDATE_VUE_ACTIVITE(state, { id_activite, vue_activite }) {
            console.log("Mutation triggered with:", id_activite, vue_activite);
            if (!state.vues_activites) {
                state.vues_activites = {};
            }
            state.vues_activites[id_activite] = vue_activite; // Met à jour avec la valeur retournée par l'API
        },

        SET_ACTIVITY_VIEWS_DATA(state, data) {
            state.activityViewsData = data;
        },
    },
    actions: {
        async getVueActiviteById({ commit }, id) {
            try {
                const result = await getVueActiviteById(id);

                if (!result || result.length === 0) {
                    throw new Error('Aucune donnée de vue trouvée pour cette activité');
                }

                // Formatage des données pour le graphique
                const formattedData = {
                    id: result[0].id_activite,
                    name: result[0].nom_activite,
                    views: result[0].vue_activite,
                    providerId: result[0].id_prestataire,
                    type: result[0].type_activite
                };

                commit('SET_ACTIVITY_VIEWS_DATA', formattedData);
                return formattedData;

            } catch (error) {
                console.error('Erreur dans getVueActiviteById:', error);
                commit('SET_ACTIVITY_VIEWS_DATA', null);
                throw error;
            }
        },

        async updateVueActiviteStore({ commit }, id_activite) {
            try {
                const result = await updateVueActivite(id_activite);
                if (result.data) {
                    commit('UPDATE_VUE_ACTIVITE', result.data);
                }
            } catch (err) {
                console.error("Erreur lors de la mise à jour de la vue de l'activité :", err);
            }
        },

        async getAllUsers({ commit }) {
            try {
                const result = await getAllUsers();
                if (Array.isArray(result.data)) {
                    commit('SET_USERS', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getUsersStore():", err);
            }
        },
        async getAllPrestataires({ commit }) {
            try {
                const result = await getAllPrestataires();
                if (result.data !== null) {
                    commit('SET_PRESTATAIRES', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getUsersStore():", err);
            }
        },
        async getPrestataireByUserId({ commit }, id) {
            try {
                const result = await getPrestataireByUserId(id);
                if (result.data !== null) {
                    commit('SET_PRESTATAIRE', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getUsersStore():", err);
            }
        },
        async createUtilisateur({ commit }, data) {
            try {
                await createUser(data);
                commit('CREATE_USER', data);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },
        async createPrestataire({ commit }, data) {
            try {
                await createPrestataire(data);
                commit('CREATE_PRESTATAIRE', data);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },
        async changeRoleStore({ commit }, id) {
            commit('CHANGE_ROLE', id);
        },
        async getAllReservations({ commit }, id) {
            try {
                const result = await getAllReservations(id);
                if (Array.isArray(result.data)) {
                    commit('SET_RESERVATIONS', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getAllReservationStore():", err);
            }
        },
        async loginUtilisateur({ commit }, data) {
            commit('SET_USER', data);
        },
        async logoutUser({ commit }) {
            await logout();
            commit('LOGOUT_USER');
        },
        async updateUtilisateur({ commit }, data) {
            try {
                const result = await updateUtilisateur(data);
                commit('UPDATE_USER', result[0]);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },
        async updatePrestataire({ commit }, data) {
            try {
                const result = await updatePrestataire(data);
                commit('UPDATE_PRESTATAIRE', result[0]);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },
        async deleteUtilisateur({ commit }, id) {
            try {
                const result = await deleteUtilisateur(id);
                commit('DELETE_UTILISATEUR', result[0]);
            } catch (err) {
                console.error("Error in deleteUser():", err);
            }
        },
        async deletePrestataire({ commit }, id) {
            try {
                await deletePrestataire(id);
                commit('DELETE_PRESTATAIRE', id);
            } catch (err) {
                console.error("Error in deleteUser():", err);
            }
        },
        async getActivitesByPresta({ commit }, id) {
            try {
                const result = await getActivitesByPrestataire(id);
                if (Array.isArray(result.data)) {
                    commit('SET_ACTIVITES', result.data);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getUsersStore():", err);
            }
        },
        async fetchSessionFromCookies({ commit }) {
            try {
                const response = await getSessionCookies();
                if (response && response.data !== "Pas de session trouvée") {
                    const user = await getUserFromSessionId(response);
                    commit("SET_SESSION_ID", response);
                    commit("SET_USER", user.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la session :", error);
            }
        }
    }
};
