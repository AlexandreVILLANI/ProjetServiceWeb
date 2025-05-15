

<template>
  <div>
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <alert-dialog ref="alertDialog"></alert-dialog>

    <button class="button-menu2" @click="$emit('return')">Retourner aux Utilisateurs</button>
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
      <div v-if="this.user.id_role === 1" class="information">
        <label>Point de fidélité :</label>
        <input v-model="point" :disabled="pointDisabled === true" />
        <button @click="updatePoint()">Modifier</button>
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
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";

export default {
  name: 'ModifierUtilisateur',
  components: {
    AlertDialog,
    ConfirmDialogue
  },

  data() {
    return {
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
      user : null,
      point : null,
      pointDisabled : true
    

    }
  },
  props : ['userId'],

  computed: {
    ...mapState('user',['users']),
  },

  methods: {
    ...mapActions('user',['updateUtilisateur']),
    async updateNom(){
      if (this.user.nom === this.nom) {
        this.nomDisabled = false;
      }else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le nom ?',
          okButton: 'Confirmer',
        })
        if (ok){
          this.nomDisabled = true;
          await this.updateUtilisateur({id:this.user.id_utilisateur,nom:this.nom,prenom:this.user.prenom,mail:this.user.adresse_mail,password:this.user.mot_de_passe,point:this.user.point_fidelite})
        }
      }
    },
    async updatePrenom(){
      console.log(this.user.point_fidelite)
      if (this.user.prenom === this.prenom) {
        this.prenomDisabled = false;
      }else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le prenom ?',
          okButton: 'Confirmer',
        })
        if (ok){
          this.prenomDisabled = true;
          await this.updateUtilisateur({id:this.user.id_utilisateur,nom:this.user.nom,prenom:this.prenom,mail:this.user.adresse_mail,password:this.user.mot_de_passe,point:this.user.point_fidelite})
        }
      }
    },
    async updatePoint(){
      if (this.user.point_fidelite === this.point) {
        this.pointDisabled = false;
      }else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le nombre de point de fidelite  ?',
          okButton: 'Confirmer',
        })
        if (ok){
          this.pointDisabled = true;
          await this.updateUtilisateur({id:this.user.id_utilisateur,nom:this.user.nom,prenom:this.user.prenom,mail:this.user.adresse_mail,password:this.user.mot_de_passe,point:this.point})
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
      }else if (this.password === this.user.mot_de_passe && this.password2 === this.user.mot_de_passe){
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
            id: this.user.id_utilisateur,
            nom: this.user.nom,
            prenom: this.user.prenom,
            mail: this.user.adresse_mail,
            password: this.password,
            point:this.user.point_fidelite
          })
          this.modifyPassword = false;
        }
      }
    },
    async updateMail(){
      if (this.user.adresse_mail === this.mail) {
        this.mailDisabled = false;
      }else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: "Etes-vous sur de vouloir modifier l'adresse mail ?",
          okButton: 'Confirmer',
        })
        if (ok){
          this.mailDisabled = true;
          await this.updateUtilisateur({id:this.user.id_utilisateur,nom:this.user.nom,prenom:this.user.prenom,mail:this.mail,password:this.user.mot_de_passe,point:this.user.point_fidelite})
        }
      }
    },
    setChamps(){
      this.nom = this.user.nom;
      this.mail = this.user.adresse_mail;
      this.prenom = this.user.prenom;
      this.point = this.user.point_fidelite;

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

  },


  mounted() {
    console.log("caca")
    this.user = this.users.find(item => item.id_utilisateur === this.userId);
    this.setChamps()


  }
}
</script>

<style>

</style>