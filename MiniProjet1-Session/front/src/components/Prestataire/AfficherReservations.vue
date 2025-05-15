

<template>
  <div>
  <button class="button-menu2" @click="$emit('return')">Retourner aux activités</button>

  <div class="container-reservations-filtre" >
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <div
        v-for="(r, i) in reservations"
        :key="i"
        class="activite-box"
    >
      <p>
        Nom :
        {{r.nom}}
      </p>
      <p>
        Prenom :
        {{r.prenom}}
      </p>
      <p>
        Adresse mail :
        {{r.adresse_mail}}
      </p>
      <p>
        Nombre de places réservées :
        {{r.nombre_places}}
      </p>
      <h3>Créneau réservé</h3>
      <p>
        Date :
        {{r.date_activite}}
      </p>
      <p>
        Heure de début :
        {{r.heure_debut}}
      </p>
      <p>
      Heure de fin :
      {{r.heure_fin}}
      </p>




      <button @click="supprimerReservation(i)">Supprimer</button>

    </div>


  </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";



export default {
  name: 'AfficherReservations',
  components: {
    ConfirmDialogue,

  },

  data() {
    return {


    }
  },
  props : ['idActivite'],

  computed: {
    ...mapState('activite',['reservations'])

  },

  methods: {
    ...mapActions('activite',['getReservationsByActivite','deleteReservation']),
   async supprimerReservation(i){
     await this.deleteReservation({id:this.reservations[i].id_reservation})
     await this.getReservations(this.idActivite)
   },
    async getReservations(id){
      await this.getReservationsByActivite(id)
    }

  },


  mounted() {
    this.getReservations(this.idActivite)

  }
}
</script>

<style>

</style>