

<template>
  <div>
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <alert-dialog ref="alertDialog"></alert-dialog>

    <button class="button-menu2" @click="$emit('return')">Retourner aux Prestataires</button>
    <div class="informations-list">

      <div class="information">
        <p>Nom de société : </p>
        <input v-model="nomSociete" :disabled="nomSocieteDisabled === true" />
        <button @click="updateNomSociete()">Modifier</button>
      </div>





    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";

export default {
  name: 'ModifierPrestataire',
  components: {
    AlertDialog,
    ConfirmDialogue
  },

  data() {
    return {

      nomSocieteDisabled: true,
      nomSociete: null,


    }
  },
  props: ['userId'],

  computed: {
    ...mapState('user', ['prestataire']),
  },

  methods: {
    ...mapActions('user', ['updatePrestataire']),
    async updateNomSociete() {

      if (this.prestataire.nom_societe === this.nomSociete) {
        this.nomSocieteDisabled = false;
      } else {
        const ok = await this.$refs.confirmDialog.show({
          title: 'Confirmer modification',
          message: 'Etes-vous sur de vouloir modifier le nom de société ?',
          okButton: 'Confirmer',
        })
        if (ok) {
          this.nomSocieteDisabled = true;
          await this.updatePrestataire({
            id_prestataire: this.prestataire.id_prestataire,
            nom_societe: this.nomSociete,
          })
        }
      }
    },


    setChamps() {
      this.nomSociete = this.prestataire.nom_societe;


    },
  },


    mounted() {
      console.log(this.prestataire.nom_societe)
      this.setChamps()



  }
}

</script>

<style>

</style>