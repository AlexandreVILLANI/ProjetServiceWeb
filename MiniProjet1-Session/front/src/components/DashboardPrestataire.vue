<template>
  <div class="container">
  <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
  <alert-dialog ref="alertDialog"></alert-dialog>

  <div class="container-gauche">
    <div class="titre-bienvenue">Bonjour {{ userCourant.prenom }}</div>
    <button class="button-disconnect" @click="logout()">Se déconnecter</button>
    <div class="container-button">
      <button class="button-menu" @click="showActivites()">Vos activités</button>
      <button class="button-menu" @click="showInformations()">Vos Informations</button>

    </div>
  </div>
  <div class="container-droit">
    <div v-if="showA" class="container-activites">
      <button @click="createActivite()" class="button-menu2">Créer une activité </button>
      <div class="container-reservations-filtre">
        <div v-for="(activite, i) in activites" :key="i" class="activite-box">
          <p>{{activite.nom_activite}}</p>
          <div v-if="activite.type_activite ==='Concert'">
            <p>{{activite.type_concert}}</p>
          </div>
                <p>{{activite.description_activite}}</p>
                <p>{{activite.prix_activite}} €</p>
          <p>Cette activité a {{ reservationsCount[i] }} reservations</p>
          <button @click="showActivite(activite.id_activite)">Voir activité</button>
          <button @click="showReservations(activite.id_activite)">Afficher réservations</button>
          <button @click="afficherCreneau(i)">Afficher créneaux</button>
          <button @click="modifierActivite(i)">Modifier</button>
          <button @click="supprimerActivite(i)">Supprimer</button>
          <div v-if="activites.length > 0">
            <LineChart :activites="activites" :reservations="reservationsCount"/>
          </div>
        </div>
      </div>
  </div>
  <div v-if="showCreneau">
      <AfficherCreneaux
          @return="showActivites"
          :idActivite="activites[indexActivite].id_activite"
          :idPrestataire="prestataire.id_prestataire"
      />
    </div>
    <div v-if="showModiferActivite">
      <ModifierActivite :index-activite=this.indexActivite @return="showActivites"></ModifierActivite>
    </div>
    <div v-if="informations">
      <InformationsActivite></InformationsActivite>
    </div>
    <div v-if="creerActivite">
      <CreerActivite @return="showActivites" :id-prestataire="this.prestataire.id_prestataire"></CreerActivite>
    </div>
    <div v-if="showReservation">
      <AfficherReservations @return="showActivites" :id-activite="this.idActivite"></AfficherReservations>
    </div>
  </div>
</div>



</template>

<script>

import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import ModifierActivite from "@/components/Prestataire/ModifierActivite.vue";
import InformationsActivite from "@/components/Prestataire/InformationsActivite.vue";
import AfficherCreneaux from "@/components/Prestataire/AfficherCreneaux.vue";
import CreerActivite from "@/components/Prestataire/CreerActivite.vue";
import AfficherReservations from "@/components/Prestataire/AfficherReservations.vue";
import LineChart from "@/components/LineChart.vue";  // Importation du composant


export default {
  name: 'DashboardUtilisateur',
  components: {
    CreerActivite,
    AfficherCreneaux,
    InformationsActivite,
    ModifierActivite,
    AlertDialog,
    ConfirmDialogue,
    AfficherReservations,
    LineChart,
  },

  data() {
    return {
      type : "",
      showA : false,
      informations : false,
      showModiferActivite:false,
      nomActivite:null,
      indexActivite : null,
      descriptionActivite: null,
      prixActivite:null,
      typeConcert:null,
      showModiferCreneau: false,
      showCreneau: false,
      indexCreneau : false,
      creerActivite: false,
      reservationsCount: [],
      showReservation : false,
      idActivite:null,
      activiteCourante: [],

    }
  },

  computed: {
    ...mapState('user',['userCourant','activites','prestataire']),
    ...mapState('concert',['concert']),
    ...mapState('activite',['activite','reservations'])


  },

  methods: {
    ...mapActions('user',['logoutUser','updateUtilisateur','deleteUtilisateur','getActivitesByPresta','getPrestataireByUserId']),
    ...mapActions('activite',['updateActivite','getActiviteById','updateCreneau','deleteActivite','getReservationsByActivite',]),
    ...mapActions("concert",['updateConcert','getConcertById']),
    async logout(){
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer Déconnexion',
        message: 'Etes-vous sur de vouloir vous déconnecter ?',
        okButton: 'Confirmer',
      })
      if (ok){
        await this.logoutUser()
        await this.$router.push({
          path : '/'
        })
      }
    },

    showInformations(){
      this.informations = true;
      this.showA = false;
      this.showCreneau = false;
      this.showModiferActivite = false;
      this.showModiferCreneau = false;
      this.creerActivite = false;
      this.showCreateCreneau = false;
      this.showReservation = false;



    },

    async showActivites(){
      await this.getActivitesByPresta(this.prestataire.id_prestataire)
      this.activites.forEach((activite, index) => {
        this.getNbReservations(index);
      });
      this.showA = true;
      this.showModiferActivite = false;
      this.informations = false;
      this.showCreneau = false;
      this.showModiferActivite = false;
      this.showModiferCreneau = false;
      this.creerActivite = false;
      this.showCreateCreneau = false;
      this.showReservation = false;




    },
    showActivite(id){
      this.$router.push({
        name: "reservation",
        params: {id},
      });
    },
    modifierActivite(index){
      this.indexActivite = index;
      this.showModiferActivite = true;
      this.showA = false;
    },
    async afficherCreneau(index){
      this.indexActivite = index;
      this.showA = false;
      if (this.activites[index].type_activite === "Concert"){
        await this.getConcertById(this.activites[index].id_activite)
      }else{
        await this.getActiviteById(this.activites[index].id_activite)
      }
      this.activiteCourante = this.concert
      this.showCreneau = true;
    },
    createActivite(){
      this.creerActivite = true
      this.informations = false;
      this.showA = false;
      this.showCreneau = false;
      this.showModiferActivite = false;
      this.showModiferCreneau = false;
    },
    async supprimerActivite(index){
      await this.deleteActivite({id:this.activites[index].id_activite})
      await this.getActivitesByPresta(this.prestataire.id_prestataire)

    },
    async getNbReservations(index){
      await this.getReservationsByActivite(this.activites[index].id_activite)
      let nb = 0;
      for (let i in this.reservations){
        nb += this.reservations[i].nombre_places
      }
      this.$set(this.reservationsCount, index, nb);
    },
    async showReservations(id){
      console.log(this.reservations)
      this.showA = false;
      this.showReservation = true;
      this.idActivite=id

    }


  },



  async mounted() {
    await this.getPrestataireByUserId(this.userCourant.id_utilisateur)
  }
}


</script>


<style>

.container{
  width: 100%;
  display: flex;
}

.container-gauche{
  flex-direction: column;
  display: flex;
  width: 25%;
  background-color: #cccccc;
}

.container-droit{
  width: 75%;
}



.button-menu{
  border: none;
  font-size: 22px;
  width: 350px;
  height: 70px;
  text-align: left;
  padding-left: 30px;
  background-color: #F4F7FE;
}

.button-menu:hover{
  background-color: #791c25;
}

.button-menu2{
  border: none;
  font-size: 22px;
  width: 100%;
  height: 70px;
  padding-left: 30px;
  background-color: #F4F7FE;
  text-align: center;
}

.button-menu2:hover{
  background-color: #791c25;
}

.container-button{
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  gap: 20px;
}

.button-disconnect{
  border: none;
  width: 350px;
  height: 50px;
  font-size: 26PX;
  align-self: center;

}

.button-disconnect:hover{
  background-color: #5e141b;
}



.container-button{
  display: flex;
}

.container-reservations-filtre{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.titre-bienvenue{
  margin: 30px 50px;
  font-size: 38px;
  text-shadow: 1px 1px 1px black;
}

.container-button-reservations{
  display: flex;
  width: 100%;
}

.container-button-reservations button{
  width: 100%;
  font-size: 20px;
  border-radius: 0;
  height: 50px;
  border-color: #cccccc;
}

.container-button-reservations button:hover{
  background-color: #791c25;
  color: white;
}

.activite-box{
  background-color: #F4F7FE;
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  box-shadow: 5px 5px 5px gray;
  justify-content: center;
}

.container-informations-form{
  background-color: #F4F7FE;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  box-shadow: 5px 5px 5px gray;
  width: 80%;
}

.container-informations{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.information{
  display: flex;

}
</style>