import Vue from 'vue'
import VueRouter from 'vue-router'
import activitesView from "@/views/ActivitesView.vue";

import AccueilView from "@/views/AccueilView.vue";
import ReservationConcertView from "@/views/ReservationConcertView.vue";
import ConcertView from "@/views/ConcertView.vue";
import CarteView from "@/views/CarteView.vue";
import ProfilView from "@/views/ProfilView.vue";
import ActiviteView from "@/views/ActiviteView.vue";
import ReservationActiviteView from "@/views/ReservationActiviteView.vue";
import LoginView from "@/views/LoginView.vue";
import PayerView from "@/views/PayerView.vue";
import AvisView from "@/views/AvisView.vue";
import BoutiqueView from "@/views/BoutiqueView.vue";
import CalendrierView from "@/components/Prestataire/Calendrier.vue"
import AchatBoutiqueView from "@/views/AchatBoutiqueView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: AccueilView

  },

  {
    path: '/carte',
    name: 'carte',
    component: CarteView,
    meta: {hideFooter: true}
  },
  {
    path: '/calendrier',
    name: 'calendrier',
    component: CalendrierView
  },
  {
    path: '/activites',
    name: 'activites',
    component: activitesView,
    meta: {hideFooter: true}
  },
  {
    path: '/reservationConcert',
    name: 'reservationConcert',
    component: ReservationConcertView,
    meta: {hideFooter: true}
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: ReservationActiviteView,
    meta: {hideFooter: true}
  },
  {
    path: '/musique',
    name: 'musique',
    component: ConcertView,
    meta: {hideFooter: true}
  },
  {
    path: '/activite',
    name: 'activite',
    component: ActiviteView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {hideFooter: true}
  },
  {
    path: '/profil',
    name: 'profil',
    component: ProfilView,
    meta: {hideFooter: true}
  },
  {
  path: '/avis',
    name: 'avis',
    component: AvisView,
    meta: {hideFooter: true}
  },
  {
    path: '/boutique',
    name: 'boutique',
    component: BoutiqueView
  },
  {
    path: '/achatBoutique',
    name: 'achatBoutique',
    component: AchatBoutiqueView
  },
  {
    path: '/payer',
    name: 'payer',
    component: PayerView,
    meta: {hideFooter: true}
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
