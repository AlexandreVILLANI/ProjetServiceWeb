import Vue from 'vue';
import Vuex from 'vuex';



import user from './modules/user.js';

import concert from "@/store/modules/concert";
import carte from "@/store/modules/carte";
import activite from "@/store/modules/activite";
import avis from "@/store/modules/avis";
import panier from "@/store/modules/Panier";
import boutique from "@/store/modules/boutique";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    user,
    concert,
    carte,
    avis,
    activite,
    boutique,
    panier,


  },
  plugins: [createPersistedState()],
});