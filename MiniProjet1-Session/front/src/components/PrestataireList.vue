<template>
  <div class="container-haut">
    <div
        v-for="prestataire in prestataires"
        :key="prestataire.id_prestataire"
        class="card"
    >
      <div class="card-content">
        <h3>{{ prestataire.nom_societe }}</h3>
        <p>ID Utilisateur : {{ prestataire.id_utilisateur }}</p>
      </div>
      <div class="card-actions">
        <button @click="editPrestataire(prestataire)">Modifier</button>
        <button @click="deletePrestataire(prestataire.id_prestataire)">Supprimer</button>
      </div>
    </div>
    <button @click="switchView('add')">Ajouter un Prestataire</button>
  </div>
</template>

<script>
export default {
  props: {
    prestataires: Array, // Liste des prestataires
  },
  methods: {
    // Émet un événement pour passer à la vue 'add' (ajout de prestataire)
    switchView(view) {
      this.$emit("switch-view", view);
    },

    // Émet un événement pour éditer un prestataire
    editPrestataire(prestataire) {
      this.$emit("edit-prestataire", prestataire);
    },

    // Émet un événement pour supprimer un prestataire
    deletePrestataire(id) {
      this.$emit("delete-prestataire", id);
    },
  },
};
</script>

<style scoped>
.container-haut {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  margin-bottom: 16px;
}

.card-actions button {
  margin-right: 8px;
}

.card-actions button:hover {
  background-color: #0056b3;
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
