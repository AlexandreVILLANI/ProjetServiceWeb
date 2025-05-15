

<template>
  <div>
  <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <alert-dialog ref="alertDialog"></alert-dialog>

    <button class="button-menu2" @click="$emit('return')">Retourner aux activités</button>

  <div class="activite-box">
    <div v-if="activites[indexActivite].type_activite ==='Concert'" style="margin-top: 20px">
      <p>
        <label>Type de concert : </label>
        {{activites[indexActivite].type_concert}}
      </p>
      <div>
        <input v-model="typeConcert" />
        <button @click="updateTypeConcert()">Modifier</button>
      </div>
    </div>
    <div style="margin-top: 20px">
      <p>
        <label>Nom de l'activite : </label>
        {{activites[indexActivite].nom_activite}}
      </p>
      <div>
        <input v-model="nomActivite" />
        <button @click="updateNomActivite()">Modifier</button>
      </div>
    </div>
    <div style="margin-top: 20px">
      <p>
        <label>Description de l'activite : </label>
        {{activites[indexActivite].description_activite}}
      </p>
      <div>
        <textarea rows="3" cols="50" v-model="descriptionActivite" />
        <button @click="updateDescriptionActivite()">Modifier</button>
      </div>
    </div>
    <div style="margin-top: 20px">
      <p>
        <label>Prix de l'activite : </label>
        {{activites[indexActivite].prix_activite}}
      </p>
      <div>
        <input  v-model="prixActivite" />
        <button @click="updatePrixActivite()">Modifier</button>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";

export default {
  name: 'ModifierActiviter',
  components: {
    AlertDialog,
    ConfirmDialogue
  },

  data() {
    return {
      nomActivite:"",
      descriptionActivite: "",
      prixActivite:"",
      typeConcert:"",
      showModiferActivite:false,
      showA : false,

    }
  },
  props : ['indexActivite'],

  computed: {
    ...mapState('user',['userCourant','prestataire','activites']),
    ...mapState('concert',['concert']),
    ...mapState('activite',['activite'])
  },

  methods: {
    ...mapActions('user',['updateUtilisateur','updatePrestataire','getActivitesByPresta']),
    ...mapActions('activite',['updateActivite','getActiviteById']),
    ...mapActions("concert",['updateConcert','getConcertById']),
    async updateNomActivite(){
      if (this.nomActivite === ""){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le nom ?',
          okButton: 'Confirmer',
        })
        if (ok) {
          await this.updateActivite({
            id_activite: this.activites[this.indexActivite].id_activite,
            nom_activite: this.nomActivite,
            prix_activite: this.activites[this.indexActivite].prix_activite,
            description_activite: this.activites[this.indexActivite].description_activite
          })
          await this.getActivitesByPresta(this.prestataire.id_prestataire)
        }
      }
    },
    async updateTypeConcert(){
      if (this.typeConcert === ""){
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
          await this.updateConcert({
            id_activite: this.activites[this.indexActivite].id_activite,
            type_concert: this.typeConcert
          })
          await this.getActivitesByPresta(this.prestataire.id_prestataire)

        }
      }
    },
    async updatePrixActivite() {
      if (this.prixActivite === ""){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else{
        if (isNaN(this.prixActivite)){
          await this.$refs.alertDialog.show({
            title: 'Erreur champ',
            message: "Le prix doit contenir des chiffres",
            okButton: 'Ok',
          })
        }else{
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le prix ?',
          okButton: 'Confirmer',
        })
        if (ok) {
          await this.updateActivite({
            id_activite: this.activites[this.indexActivite].id_activite,
            nom_activite: this.activites[this.indexActivite].nom_activite,
            prix_activite: this.prixActivite,
            description_activite: this.activites[this.indexActivite].description_activite
          })
          await this.getActivitesByPresta(this.prestataire.id_prestataire)
        }
        }
      }
    },
    async updateDescriptionActivite(){
      if (this.descriptionActivite === ""){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Le champ est vide",
          okButton: 'Ok',
        })
      } else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier la description ?',
          okButton: 'Confirmer',
        })
        if (ok) {
          await this.updateActivite({
            id_activite: this.activites[this.indexActivite].id_activite,
            nom_activite: this.activites[this.indexActivite].nom_activite,
            prix_activite: this.activites[this.indexActivite].prix_activite,
            description_activite: this.descriptionActivite
          })
          await this.getActivitesByPresta(this.prestataire.id_prestataire)

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