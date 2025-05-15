
<template>
  <div>
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <alert-dialog ref="alertDialog"></alert-dialog>

    <div class="activite-box">
      <h1>Nouvelle activité</h1>
      <div class="champ">
        <label>Nom de l'activité:</label>
        <input v-model="nomActivite" placeholder="Nom activité">
      </div>
      <div class="champ">
        <label>Type d'activité:</label>
        <select v-model="selected" @change="onSelect($event)">
          <option value="Restauration">Restauration</option>
          <option value="Sport">Sport</option>
          <option value="Loisir">Loisir</option>
          <option value="Culture">Culture</option>
          <option value="Concert">Concert</option>
        </select>
      </div>
      <div v-if="showTypeConcert" class="champ">
        <label>Type de concert:</label>
        <input v-model="typeConcert" placeholder="Type de concert">
      </div>
      <div class="champ">
        <label>Image de l'activité:</label>
        <input v-model="imageActivite" placeholder="Image de l'activité">
      </div>
      <div class="champ">
        <label>Description de l'activité:</label>
        <input v-model="descriptionActivite" placeholder="Description de l'activité">
      </div>
      <div class="champ">
        <label>Prix de l'activité:</label>
        <input v-model="prixActivite" placeholder="Prix de l'activité">
      </div>
      <button @click="creerActivite()">Créer l'activité</button>
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
      nomActivite : "",
      showTypeConcert : false,
      typeConcert: "",
      imageActivite:"",
      prixActivite:"",
      descriptionActivite:"",
      select: null

    }
  },
  props : ['idPrestataire'],

  computed: {
    ...mapState('activite',['new_activite'])

  },

  methods: {
    ...mapActions('activite',['createActivite']),
    ...mapActions('concert',["createConcert"]),
    onSelect(event){
      this.showTypeConcert = event.target.value === "Concert";
    },
    async creerActivite(){
      if (this.nomActivite === "" || this.prixActivite === "" || this.descriptionActivite === "" || this.imageActivite === "" || this.selected === undefined || (this.selected === "Concert" && this.typeConcert === "")){
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Tous les champs doivent être remplis",
          okButton: 'Ok',
            })
      }else{
        if(isNaN(this.prixActivite)) {
          await this.$refs.alertDialog.show({
            title: 'Erreur champ',
            message: "Le prix doit contenir des chiffres",
            okButton: 'Ok',
          })
        }else{
          await this.createActivite({nom_activite:this.nomActivite,type_activite:this.selected,prix_activite:this.prixActivite,image_activite:this.imageActivite,description_activite:this.descriptionActivite,id_prestataire: this.idPrestataire})
          if (this.selected === "Concert"){
            await this.createConcert({id_activite:this.new_activite.id_activite,type_concert:this.typeConcert})
          }
          this.$emit('return')
        }

      }
    }
  },


  mounted() {
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