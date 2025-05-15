<template>
<div class="dashboard-container">
  <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
  <alert-dialog ref="alertDialog"></alert-dialog>

  <div class="container-gauche">
    <div class="titre-bienvenue">Bonjour {{ userCourant.prenom }}</div>
    <button class="button-disconnect" @click="logout()">Se déconnecter</button>
    <div class="container-button">
      <button class="button-menu" @click="showReservations()">Vos réservations</button>
      <button class="button-menu" @click="showInformations()">Vos Informations</button>
      <button class="button-menu" @click="showPanier()">Panier</button>
      <button class="button-menu" @click="showAchats()" >Vos achats</button>
    </div>
  </div>
  <div class="container-droit">
    <div v-if="panier">
      <Panier></Panier>
    </div>
    <Achats v-if="this.achats"></Achats>
    <div v-if="showR" class="container-reservations">
    <div class="container-button-reservations">
      <button @click="type='Culture'">Culture</button>
      <button @click="type='Concert'">Concert</button>
      <button @click="type='Loisir'">Loisir</button>
      <button @click="type='Restauration'">Restauration</button>
      <button @click="type='Sport'">Sport</button>
    </div>
    <div class="container-reservations-filtre">
      <div
          v-for="(reservation, index) in filteredReservation"
          :key="index"
          class="activite-box"
      >
        <div>
          <p style="font-size: 22px;font-weight: bold">
            {{ reservation.nom_activite }}
          </p>
          <p>
            {{ reservation.image_activite }}
          </p>
          <p >
            <u >Nombre de places : </u>
            <u  >{{ reservation.nombre_places }}
            </u>
          </p>
          <p >
            <u >Date : </u>
            <u >{{ reservation.date_activite }}
            </u>
          </p>
          <p >
            <u>Heure debut : </u>
            <u>{{ reservation.heure_debut }}
            </u>
          </p>
          <p>
            <u>Heure fin : </u>
            <u>{{ reservation.heure_fin }}
            </u>
          </p>
          <button @click="showActivite(reservation.id_activite)">Voir activité</button>
          <button @click="showAvis(reservation.id_activite)">Mettre un avis</button>

        </div>
      </div>
      </div>
    </div>
    <div v-if="informations" class="container-informations">
      <div class="container-informations-form">
        <p>Vos informations personnelles</p>
        <div class="informations-list">
          <div class="information">
            <p>Nom : </p>
            <input v-model="nom" :disabled="nomDisabled === true" />
            <button @click="updateNom()">Modifier</button>
          </div>
          <div class="information">
            <p>Prenom : </p>
            <input v-model="prenom" :disabled="prenomDisabled === true" />
            <button @click="updatePrenom()">Modifier</button>
          </div>
          <div class="information">
            <label>Adresse Mail : </label>
            <input v-model="mail" :disabled="mailDisabled === true" />
            <button @click="updateMail()">Modifier</button>
          </div>
          <div class="information"><p>Vous avez {{ this.userCourant.point_fidelite }} points de fidelite</p></div>

          <button @click="modifyPassword = !modifyPassword">Modifier mot de passe</button>
          <div v-if="modifyPassword">
            <div>
              <input class="champ" v-model="password2" :type="passwordField2" placeholder="Nouveau mot de passe">
              <button type="button" @click="switchVisibility2" class="eyemdp"><img style="width: 20px" :src="getImgUrl2()">
              </button>
            </div>
            <div>
              <input class="champ" v-model="password" :type="passwordField" placeholder="Confirmer mot de passe">
              <button type="button" @click="switchVisibility" class="eyemdp"><img style="width: 20px" :src="getImgUrl()">
              </button>
            </div>
            <button @click="updatePassword()" class="btn-secondary">Changer mot de passe</button>
          </div>
          <button @click="deleteUser()" class="btn-secondary">SUPPRIMER LE COMPTE</button>

        </div>
      </div>
    </div>
    </div>
</div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import Panier from "@/components/Utilisateur/Panier.vue";
import Achats from "@/components/Utilisateur/Achats.vue";

export default {
  name: 'DashboardUtilisateur',
  components: {
    Achats,
    Panier,
    AlertDialog,
    ConfirmDialogue

  },

  data() {
    return {
      type : "",
      showR : false,
      informations : false,
      mailDisabled: true,
      nomDisabled:true,
      prenomDisabled:true,
      prenom: null,
      nom: null,
      mail: null,
      modifyPassword:false,
      passwordField: "password",
      passwordField2: "password",
      index: null,
      password: null,
      password2: null,
      index2: null,
      panier : false,
      achats: false



    }
  },

  computed: {
    ...mapState('user',['reservations']),
    ...mapState('user',['userCourant']),
    filteredReservation() {
      return this.reservations.filter(
          (reservation) => reservation.type_activite === this.type
      );
    },

  },

  methods: {
    ...mapActions('user',['getAllReservations','logoutUser','updateUtilisateur','deleteUtilisateur']),
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
    showReservations(){
      this.showR = true;
      this.informations = false;
      this.panier = false;
      this.achats = false;


    },
    showAchats(){
      this.showR = false;
      this.informations = false;
      this.panier = false;
      this.achats = true;
    },
    showActivite(id){
      console.log(this.reservations)
      this.$router.push({
        name: "reservation",
        params: {id},
      });
    },
    showAvis(id){
      this.$router.push({
        name: "avis",
        params: {id},
      });
    },
    showInformations(){
      this.informations = true;
      this.showR = false;
      this.panier = false;
      this.achats = false;

    },
    showPanier(){
      this.showR = false;
      this.informations = false;
      this.panier = true;
      this.achats = false;

    },
    async updateNom(){
      if (this.userCourant.nom === this.nom) {
        this.nomDisabled = false;
      }else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le nom ?',
          okButton: 'Confirmer',
        })
        if (ok){
          this.nomDisabled = true;
          await this.updateUtilisateur({id:this.userCourant.id_utilisateur,nom:this.nom,prenom:this.userCourant.prenom,mail:this.userCourant.adresse_mail,password:this.userCourant.mot_de_passe,point:this.userCourant.point_fidelite})
        }
      }
    },
    async updatePrenom(){
      console.log(this.userCourant.point_fidelite)
      if (this.userCourant.prenom === this.prenom) {
        this.prenomDisabled = false;
      }else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le prenom ?',
          okButton: 'Confirmer',
        })
        if (ok){
          this.prenomDisabled = true;
          await this.updateUtilisateur({id:this.userCourant.id_utilisateur,nom:this.userCourant.nom,prenom:this.prenom,mail:this.userCourant.adresse_mail,password:this.userCourant.mot_de_passe,point:this.userCourant.point_fidelite})
        }
      }
    },
    async updatePassword(){
      if (!this.password || !this.password2){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: 'Il faut remplir tous les champs',
          okButton: 'Ok',
        })
        return;
      }else if (this.password2 !== this.password) {
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Les mots de passe ne correspondent pas",
          okButton: 'Ok',
        })
        return;
      }else if (this.password === this.userCourant.mot_de_passe && this.password2 === this.userCourant.mot_de_passe){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le mot de passe doit être différent de l'actuel",
          okButton: 'Ok',
        })
        return;
      } else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le mot de passe ?',
          okButton: 'Confirmer',
        })
        if (ok) {
         await this.updateUtilisateur({
            id: this.userCourant.id_utilisateur,
            nom: this.userCourant.nom,
            prenom: this.userCourant.prenom,
            mail: this.userCourant.adresse_mail,
            password: this.password,
            point:this.userCourant.point_fidelite
          })
          this.modifyPassword = false;
        }
      }
    },
    async updateMail(){
      if (this.userCourant.adresse_mail === this.mail) {
        this.mailDisabled = false;
      }else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: "Etes-vous sur de vouloir modifier l'adresse mail ?",
          okButton: 'Confirmer',
        })
        if (ok){
          this.mailDisabled = true;
          await this.updateUtilisateur({id:this.userCourant.id_utilisateur,nom:this.userCourant.nom,prenom:this.userCourant.prenom,mail:this.mail,password:this.userCourant.mot_de_passe,point:this.userCourant.point_fidelite})
        }
      }
    },
    setChamps(){
      this.nom = this.userCourant.nom;
      this.mail = this.userCourant.adresse_mail;
      this.prenom = this.userCourant.prenom;

    },
    switchVisibility() {
      this.passwordField = this.passwordField === "password" ? "text" : "password";
      this.index = !this.index;
    },
    switchVisibility2() {
      this.passwordField2 = this.passwordField2 === "password" ? "text" : "password";
      this.index2 = !this.index2;
    },
    getImgUrl() {
      if (this.index) {
        return require('@/assets/oeil.png');
      }
      return require('@/assets/oeil_barre.png');
    },
    getImgUrl2() {
      if (this.index2) {
        return require('@/assets/oeil.png');
      }
      return require('@/assets/oeil_barre.png');
    },
    async deleteUser(){
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer suppression',
        message: "Etes-vous sur de vouloir supprimer votre compte ?",
        okButton: 'Confirmer',
      })
      if (ok){
        await this.deleteUtilisateur({id :this.userCourant.id_utilisateur})
        await this.logoutUser()
        await this.$router.push({
          path:'/'
        })
      }
    }


  },


  mounted() {
    this.panier = this.$route.params.panier
    this.getAllReservations(this.userCourant.id_utilisateur)
    this.setChamps()
  }
}


</script>


<style scoped>
/* ===== BASE STYLES ===== */
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* ===== SIDEBAR SECTION ===== */
.container-gauche {
  width: 280px;
  background-color: #1d1d1d;
  color: #fff;
  padding: 2rem 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.titre-bienvenue {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  padding: 0 1rem;
  line-height: 1.3;
}

/* Sidebar Buttons */
.button-disconnect {
  width: 100%;
  padding: 0.75rem;
  background-color: #5e141b;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-disconnect:hover {
  background-color: #f1c40f;
  color: #333;
}

.button-disconnect:active {
  transform: scale(0.98);
}

.container-button {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.button-menu {
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.1rem;
  text-align: left;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button-menu:hover {
  background-color: #f1c40f;
  color: #333;
}

/* ===== MAIN CONTENT SECTION ===== */
.container-droit {
  flex: 1;
  padding: 2rem;
  background-color: #F4F7FE;
  min-width: 0; /* Prevents overflow issues */
}

/* Reservations Filter */
.container-button-reservations {
  display: flex;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.container-button-reservations button {
  flex: 1;
  padding: 0.75rem;
  background-color: #ffffff;
  border: none;
  color: #2d3748;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.container-button-reservations button:hover {
  background-color: #f1c40f;
  color: #333;
}

/* Activities Grid */
.container-reservations-filtre {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.activite-box {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e2e8f0;
}

.activite-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
}

.activite-box p {
  margin: 0.5rem 0;
  color: #4a5568;
  line-height: 1.5;
}

.activite-box p:first-child {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.activite-box button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #791c25;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.activite-box button:hover {
  background-color: #5e141b;
}

/* ===== INFORMATION FORM SECTION ===== */
.container-informations-form {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.container-informations-form > p {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.3;
}

.information {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.information p,
.information label {
  min-width: 120px;
  font-weight: 600;
  color: #4a5568;
  margin: 0;
}

.btn-secondary {
  background-color: #791c25;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #f1c40f;
  transform: translateY(-2px);
  color: #333;
}

.information input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.information input:focus {
  outline: none;
  border-color: #791c25;
}

.information button {
  padding: 0.5rem 1rem;
  background-color: #f1c40f;
  color: #333;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.information button:hover {
  background-color: #e6b800;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .container-gauche {
    width: 100%;
    padding: 1.5rem 1rem;
  }

  .container-droit {
    padding: 1.5rem;
  }

  .container-button-reservations {
    flex-wrap: wrap;
  }

  .container-button-reservations button {
    min-width: 120px;
    padding: 0.5rem;
  }

  .container-reservations-filtre {
    grid-template-columns: 1fr;
  }

  .container-informations-form {
    padding: 1.5rem;
  }

  .information {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .information p,
  .information label {
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .titre-bienvenue {
    font-size: 1.5rem;
  }

  .button-menu {
    padding: 0.75rem;
  }
}
</style>