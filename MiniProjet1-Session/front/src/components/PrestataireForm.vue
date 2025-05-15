<template>
  <div class="container-haut-droite">
    <h2>{{ isEditing ? "Modifier le Prestataire" : "Ajouter un Prestataire" }}</h2>
    <form @submit.prevent="savePrestataire">
      <div class="filtre-box">
        <label for="nom_societe">Nom de la Société</label>
        <input
            type="text"
            v-model="formPrestataire.nom_societe"
            id="nom_societe"
            placeholder="Nom du prestataire"
            required
        />

        <label for="img_prestataire">URL de l'image</label>
        <input
            type="url"
            v-model="formPrestataire.img_prestataire"
            id="img_prestataire"
            placeholder="Lien vers l'image"
        />

        <label for="id_utilisateur">ID de l'Utilisateur</label>
        <input
            type="number"
            v-model="formPrestataire.id_utilisateur"
            id="id_utilisateur"
            placeholder="ID utilisateur associé"
            required
        />

        <button class="button-reserver" type="submit">
          {{ isEditing ? "Mettre à jour" : "Ajouter" }}
        </button>
        <button
            class="button-reset"
            @click="switchView('list')"
            type="button"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    currentPrestataire: Object, // Le prestataire à modifier ou un prestataire vide pour l'ajout
    isEditing: Boolean, // Si on est en mode édition
  },
  data() {
    return {
      // Crée une copie locale de la prop currentPrestataire pour éviter de la modifier directement
      formPrestataire: { ...this.currentPrestataire },
    };
  },
  watch: {
    // Lorsque currentPrestataire change, mettre à jour la copie locale
    currentPrestataire(newVal) {
      this.formPrestataire = { ...newVal };
    },
  },
  methods: {
    // Émet l'événement pour sauvegarder le prestataire (ajout ou mise à jour)
    savePrestataire() {
      this.$emit("save-prestataire", this.formPrestataire);
    },

    // Émet un événement pour revenir à la vue liste
    switchView(view) {
      this.$emit("switch-view", view);
    },
  },
};
</script>

<style scoped>
.filtre-box label {
  margin-top: 10px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
