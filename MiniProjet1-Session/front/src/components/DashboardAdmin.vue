
<template>
  <div class="container">
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <alert-dialog ref="alertDialog"></alert-dialog>

    <div class="container-gauche">
      <div class="titre-bienvenue">Bonjour {{ userCourant.prenom }}</div>
      <button class="button-disconnect" @click="logout()">Se déconnecter</button>
      <div class="container-button">

        <button class="button-menu" @click="showInformations()">Vos Informations</button>
        <button class="button-menu" @click="showHandleUsers()">Gérer Utilisateurs</button>
        <button class="button-menu" @click="showHandlePresta()">Gérer Prestataires</button>





      </div>
    </div>
    <div class="container-droit">

      <div v-if="usersToogle">
        <button class="button-menu2" @click="createUser()">Créer un utilisateur</button>

        <table >
          <thead>
          <tr>
            <th >Nom</th>
            <th >Prénom</th>
            <th >Adresse Mail</th>
            <th >Points de Fidélité</th>
            <th >Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in listUsers" :key="user.id" >
            <td >{{ user.nom }}</td>
            <td >{{ user.prenom }}</td>
            <td >{{ user.adresse_mail }}</td>
            <td >{{ user.point_fidelite }}</td>
            <td>
              <button @click="editUser(user.id_utilisateur)">Modifier</button>
              <button @click="deleteSpecificUser(user.id_utilisateur)">Supprimer</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
        <ModifierUtilisateur v-if="showModifierUser" :user-id=this.userId @return="showHandleUsers()"></ModifierUtilisateur>
      <ModifierPrestataire v-if="showModifierPresta"  @return="showHandlePresta()"></ModifierPrestataire>
      <CreerPrestataire v-if="showCreatePresta" @return="showHandlePresta()"></CreerPrestataire>

        <CreerUtilisateur v-if="showCreateUser" @return="showHandleUsers()"></CreerUtilisateur>


      <div v-if="prestaToogle">
        <button class="button-menu2" @click="createPrestataire()">Créer un prestataire</button>

        <table >
          <thead>
          <tr>
            <th >Nom société</th>
            <th >Adresse mail</th>
            <th >Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="presta in listPresta" :key="presta.id" >
            <td >{{ presta.nom_societe }}</td>
            <td >{{ presta.adresse_mail }}</td>
            <td>
              <button @click="editPresta(presta.id_utilisateur)">Modifier</button>
              <button @click="deleteSpecificPresta(presta.id_prestataire)">Supprimer</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="informations" class="container-informations">
        <div class="container-informations-form">
          <p style="font-size: 28px;padding-top: 30px">Vos informations personnelles</p>
          <div class="informations-list">

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
              <button @click="updatePassword()">Changer mot de passe</button>
            </div>
            <button @click="deleteUser()">SUPPRIMER LE COMPTE</button>

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
import ModifierUtilisateur from "@/components/Admin/ModifierUtilisateur.vue";
import CreerUtilisateur from "@/components/Admin/CreerUtilisateur.vue";
import ModifierPrestataire from "@/components/Admin/ModifierPrestataire.vue";
import CreerPrestataire from "@/components/Admin/CreerPrestataire.vue";

export default {
  name: 'DashboardAdmin',
  components: {
    CreerPrestataire,
    ModifierPrestataire,
    ModifierUtilisateur,
    AlertDialog,
    ConfirmDialogue,
    CreerUtilisateur

  },

  data() {
    return {
      type : "",
      usersToogle : false,
      prestaToogle: false,
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
      listUsers : null,
      showModifierUser: false,
      userId: null,
      listPresta: null,
      showModifierPresta : false,
      showCreateUser : false,
      showCreatePresta : false




    }
  },

  computed: {
    ...mapState('user',['userCourant','users','prestataires']),
  },

  methods: {
    ...mapActions('user',['logoutUser','updateUtilisateur','deleteUtilisateur','getAllUsers','getAllPrestataires','getPrestataireByUserId','deletePrestataire']),
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
      this.usersToogle = false;
      this.prestaToogle = false;
      this.showModifierUser = false
      this.showModifierPresta = false;
      this.showCreatePresta = false;
      this.showCreateUser = false;



    },
    async showHandleUsers(){
      await this.getAllUsers()
      this.informations = false;
      this.usersToogle = true;
      this.prestaToogle = false;
      this.showCreateUser = false;
      this.showModifierPresta = false;
      this.showModifierUser= false;

      this.showCreatePresta = false;


      this.listUsers = this.users


    },
    async showHandlePresta(){
      await this.getAllPrestataires()
      this.showModifierUser = false;
      this.informations = false;
      this.usersToogle = false;
      this.prestaToogle = true;
      this.showModifierPresta = false;
      this.showCreatePresta = false;
      this.showCreateUser = false;



      this.listPresta = this.prestataires

    },

    async updatePrenom(){
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
        await this.$router.push({
          path:'/'
        })
      }
    },
    async deleteSpecificUser(id){
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer suppression',
        message: "Etes-vous sur de vouloir supprimer ce compte ?",
        okButton: 'Confirmer',
      })
      if (ok){
        await this.deleteUtilisateur({id :id})
        this.listUsers = this.listUsers.filter(item => item.id_utilisateur !== id)
      }
    },
    async deleteSpecificPresta(id){
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer suppression',
        message: "Etes-vous sur de vouloir supprimer ce prestataire ?",
        okButton: 'Confirmer',
      })
      if (ok){
        await this.deletePrestataire({id :id})
        this.listPresta = this.listPresta.filter(item => item.id_prestataire !== id)
      }
    },
    async editUser(id){
      this.userId = id
      this.showModifierUser = true;
      this.usersToogle = false;
    },
    async editPresta(id){
      await this.getPrestataireByUserId(id)
      this.showModifierPresta = true;
      this.prestaToogle = false;
    },
    createUser(){
      this.showCreateUser = true;
      this.usersToogle = false;
    },
    createPrestataire(){
      this.showCreatePresta = true;
      this.prestaToogle = false;
    }



  },


  mounted() {
    this.setChamps()
    this.getAllUsers()
    this.getAllPrestataires()

  }
}


</script>


<style scoped>

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



.titre-bienvenue{
  margin: 30px 50px;
  font-size: 38px;
  text-shadow: 1px 1px 1px black;
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