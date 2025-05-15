

<template>
  <div  class="container-informations">
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <alert-dialog ref="alertDialog"></alert-dialog>


    <div class="container-informations-form">
      <p style="font-size: 28px;padding-top: 30px">Vos informations personnelles</p>
      <div class="informations-list">
        <div class="information">
          <p>Nom de société : </p>
          <input v-model="nomSociete" :disabled="nomSocieteDisabled === true" />
          <button @click="updateNomSociete()">Modifier</button>
        </div>
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
</template>

<script>
import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";

export default {
  name: 'InformationsActivite',
  components: {
    AlertDialog,
    ConfirmDialogue
  },

  data() {
    return {
      mailDisabled: true,
      nomDisabled:true,
      prenomDisabled:true,
      prenom: "",
      nom: "",
      mail: "",
      modifyPassword:false,
      passwordField: "password",
      passwordField2: "password",
      index: null,
      password: "",
      password2: "",
      index2: null,
      nomSociete: "",
      nomSocieteDisabled:true,

    }
  },
  props : [''],

  computed: {
    ...mapState('user',['userCourant','prestataire','activites']),
    ...mapState('concert',['concert']),
    ...mapState('activite',['activite'])
  },

  methods: {
    ...mapActions('user',['updateUtilisateur','updatePrestataire','getActivitesByPresta']),
    ...mapActions('activite',['updateActivite','getActiviteById']),
    ...mapActions("concert",['updateConcert','getConcertById']),

    async updateNom(){
      if (this.nom === ""){
        this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
      if (this.userCourant.nom === this.nom) {
        this.nomDisabled = false;
      }else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le nom ?',
          okButton: 'Confirmer',
        })
        if (ok) {
          this.nomDisabled = true;
          await this.updateUtilisateur({
            id: this.userCourant.id_utilisateur,
            nom: this.nom,
            prenom: this.userCourant.prenom,
            mail: this.userCourant.adresse_mail,
            password: this.userCourant.mot_de_passe
          })
          this.nomDisabled = false;

        }
      }
      }
    },
    async updateNomSociete(){
      if (this.nomSociete === ""){
        this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
        if (this.prestataire.nom_societe === this.nomSociete) {
          this.nomSocieteDisabled = false;
        } else {
          const ok = await this.$refs.confirmDialog.show({
            title: 'Confirmer modification',
            message: 'Etes-vous sur de vouloir modifier le nom ?',
            okButton: 'Confirmer',
          })
          if (ok) {
            this.nomSocieteDisabled = true;
            await this.updatePrestataire({
              id_prestataire: this.prestataire.id_prestataire,
              nom_societe: this.nomSociete
            })
          }
        }
      }
    },
    async updatePrenom(){
      if (this.prenom === ""){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
      if (this.userCourant.prenom === this.prenom) {
        this.prenomDisabled = false;
      }else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le prenom ?',
          okButton: 'Confirmer',
        })
        if (ok) {
          this.prenomDisabled = true;
          await this.updateUtilisateur({
            id: this.userCourant.id_utilisateur,
            nom: this.userCourant.nom,
            prenom: this.prenom,
            mail: this.userCourant.adresse_mail,
            password: this.userCourant.mot_de_passe
          })

        }
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
            password: this.password
          })
          this.modifyPassword = false;
        }
      }
    },
    async updateMail(){
      if (this.mail === ""){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
        if (this.userCourant.adresse_mail === this.mail) {
          this.mailDisabled = false;
        } else {
          const ok = await this.$refs.confirmDialog.show({
            title: 'Confirmer modification',
            message: "Etes-vous sur de vouloir modifier l'adresse mail ?",
            okButton: 'Confirmer',
          })
          if (ok) {
            this.mailDisabled = true;
            await this.updateUtilisateur({
              id: this.userCourant.id_utilisateur,
              nom: this.userCourant.nom,
              prenom: this.userCourant.prenom,
              mail: this.mail,
              password: this.userCourant.mot_de_passe,
              point: this.userCourant.point_fidelite
            })

          }
        }
      }
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
    setChamps(){
      this.nom = this.userCourant.nom;
      this.mail = this.userCourant.adresse_mail;
      this.prenom = this.userCourant.prenom;
      this.nomSociete = this.prestataire.nom_societe

    },
  },


  mounted() {
    this.setChamps()

  }
}
</script>

<style>

</style>