
<template>
  <div>
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <alert-dialog ref="alertDialog"></alert-dialog>

    <div class="activite-box">
      <h1>Nouveau créneau</h1>
      <div class="champ">
        <label>Nom de l'activité:</label>
        <input type="date" v-model="dateActivite">
      </div>
      <div class="champ">
        <label>Heure de début:</label>
        <input type="time" v-model="heureDebut">
      </div>
      <div class="champ">
        <label>Heure de fin:</label>
        <input type="time" v-model="heureFin">
      </div>
      <div class="champ">
        <label>Nombre de places:</label>
        <input v-model="places">
      </div>
      <button @click="creerCreneau()">Ajouter le créneau</button>
    </div>

  </div>
</template>

<script>
import ConfirmDialogue from "@/components/ConfirmDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import {mapActions, mapState} from "vuex";



export default {
  name: 'CreerActivite',
  components: {
    AlertDialog,
    ConfirmDialogue,

  },

  data() {
    return {
      dateActivite : "",
      heureDebut:"",
      heureFin:"",
      places:"",

    }
  },
  props : ['idActivite'],

  computed: {
    ...mapState('activite',['activite']),
    ...mapState('concert',['concert']),
    ...mapState('user',['activites'])

  },

  methods: {
    ...mapActions('activite',['createCreneau','getActiviteById']),
    ...mapActions('concert',['getConcertById']),

    async creerCreneau(){
      if (this.dateActivite === "" || this.heureFin === "" || this.heureDebut === "" || this.places === ""){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Tous les champs doivent être remplis",
          okButton: 'Ok',
        })
      }else{
        if(isNaN(this.places)) {
          await this.$refs.alertDialog.show({
            title: 'Erreur champ',
            message: "Le champ places doit contenir des chiffres",
            okButton: 'Ok',
          })
        }else{
          if (this.heureDebut > this.heureFin || this.heureFin === this.heureDebut){
            await this.$refs.alertDialog.show({
              title: 'Erreur champ',
              message: "Les horaires ne sont pas bons",
              okButton: 'Ok',
            })
          }
          else{
            console.log(this.activite)
            console.log(this.idActivite)
            await this.createCreneau({id_activite:this.activites[this.idActivite].id_activite,date_activite:this.dateActivite,heure_debut:this.heureDebut,heure_fin:this.heureFin,places_disponibles:this.places})
            this.$emit('return')
          }

        }

      }
    }
  },


  mounted() {
    console.log(this.activites)
  }
}
</script>

<style>

.champ{
  display: flex;
  margin-top: 20px;
  gap: 10px;
  justify-content: center;
}

</style>