

<template>
  <div>
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <alert-dialog ref="alertDialog"></alert-dialog>

    <div class="activite-box">
      <div style="margin-top: 20px">
        <p>
          <label>Date de l'activité : </label>
          {{activite[indexCreneau].date_activite}}
        </p>
        <div>
          <input type="date" v-model="dateActivite" />
          <button @click="updateDateActivite()">Modifier</button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <p>
          <label>Heure de début : </label>
          {{activite[indexCreneau].heure_debut}}
        </p>
        <div>
          <input type="time" v-model="heureDebut" />
          <button @click="updateHeureDebut()">Modifier</button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <p>
          <label>Heure de fin : </label>
          {{activite[indexCreneau].heure_fin}}
        </p>
        <div>
          <input type="time"  v-model="heureFin" />
          <button @click="updateHeureFin()">Modifier</button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <p>
          <label>Places disponibles : </label>
          {{activite[indexCreneau].places_disponibles}}
        </p>
        <div>
          <input v-model="nombrePlaces" />
          <button @click="updateNombrePlaces()">Modifier</button>
        </div>
      </div>


      <div style="margin-top: 20px">
        <button @click="$emit('return')">Retourner aux creneaux</button>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";

export default {
  name: 'AfficherCreneaux',
  components: {
    AlertDialog,
    ConfirmDialogue
  },

  data() {
    return {
      nombrePlaces : null,
      dateActivite : null,
      heureDebut : null,
      heureFin : null,
      index : null

    }
  },
  props : ['indexCreneau','indexActivite'],

  computed: {
    ...mapState('user',['userCourant','prestataire','activites']),
    ...mapState('concert',['concert']),
    ...mapState('activite',['activite'])
  },

  methods: {
    ...mapActions('user',['updateUtilisateur','updatePrestataire','getActivitesByPresta']),
    ...mapActions('activite',['updateActivite','getActiviteById','updateCreneau']),
    ...mapActions("concert",['updateConcert','getConcertById']),
    async updateDateActivite(){
      if (this.dateActivite === null){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer modification',
        message: 'Etes-vous sur de vouloir modifier la date ?',
        okButton: 'Confirmer',
      })
      if (ok) {
        await this.updateCreneau({
          id_creneau: this.activite[this.indexCreneau].id_creneau,
          date_activite: this.dateActivite,
          heure_debut: this.activite[this.indexCreneau].heure_debut,
          heure_fin: this.activite[this.indexCreneau].heure_fin,
          places_disponibles: this.activite[this.indexCreneau].places_disponibles
        })
        await this.getConcertById(this.activites[this.indexActivite].id_activite)
        await this.getActiviteById(this.activites[this.indexActivite].id_activite)
        this.activite += this.concert
      }
      }
    },
    async updateHeureDebut(){
      if (this.heureDebut === null){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer modification',
        message: 'Etes-vous sur de vouloir modifier le type de concert ?',
        okButton: 'Confirmer',
      })
      if (ok) {
        await this.updateCreneau({
          id_creneau: this.activite[this.indexCreneau].id_creneau,
          date_activite: this.activite[this.indexCreneau].date_activite,
          heure_debut: this.heureDebut,
          heure_fin: this.activite[this.indexCreneau].heure_fin,
          places_disponibles: this.activite[this.indexCreneau].places_disponibles
        })
        await this.getConcertById(this.activites[this.indexActivite].id_activite)
        await this.getActiviteById(this.activites[this.indexActivite].id_activite)
        this.activite += this.concert
      }
      }
    },
    async updateHeureFin(){
      if (this.heureFin === null){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer modification',
        message: 'Etes-vous sur de vouloir modifier le prix ?',
        okButton: 'Confirmer',
      })
      if (ok) {
        await this.updateCreneau({
          id_creneau: this.activite[this.indexCreneau].id_creneau,
          date_activite: this.activite[this.indexCreneau].date_activite,
          heure_debut: this.activite[this.indexCreneau].heure_debut,
          heure_fin: this.heureFin,
          places_disponibles: this.activite[this.indexCreneau].places_disponibles
        })
        await this.getConcertById(this.activites[this.indexActivite].id_activite)
        await this.getActiviteById(this.activites[this.indexActivite].id_activite)
        this.activite += this.concert
      }
      }
    },
    async updateNombrePlaces(){
      if (this.nombrePlaces === ""){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
        if(isNaN(this.nombrePlaces)){
          await this.$refs.alertDialog.show({
            title: 'Erreur champ',
            message: "Le nombre de places doit contenir des chiffres",
            okButton: 'Ok',
          })
        }else {


          const ok = await this.$refs.confirmDialog.show({
            title: 'Confirmer modification',
            message: 'Etes-vous sur de vouloir modifier le nombre de places ?',
            okButton: 'Confirmer',
          })
          if (ok) {
            await this.updateCreneau({
              id_creneau: this.activite[this.indexCreneau].id_creneau,
              date_activite: this.activite[this.indexCreneau].date_activite,
              heure_debut: this.activite[this.indexCreneau].heure_debut,
              heure_fin: this.activite[this.indexCreneau].heure_fin,
              places_disponibles: this.nombrePlaces
            })
            await this.getConcertById(this.activites[this.indexActivite].id_activite)
            await this.getActiviteById(this.activites[this.indexActivite].id_activite)
            this.activite += this.concert

          }
        }
      }
    },
  },


  mounted() {
  }
}
</script>

<style>

</style>