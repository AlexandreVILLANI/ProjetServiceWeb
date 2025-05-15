<template>
  <div class="container">
    <h1>Gestion des Prestataires</h1>

    <!-- Liste des Prestataires -->
    <PrestataireList
        v-if="view === 'list'"
        :prestataires="prestataires"
        @edit-prestataire="editPrestataire"
        @delete-prestataire="deletePrestataire"
        @switch-view="switchView"
    />

    <!-- Formulaire d'Ajout/Modification -->
    <PrestataireForm
        v-else
        :currentPrestataire="currentPrestataire"
        :isEditing="isEditing"
        @switch-view="switchView"
        @save-prestataire="savePrestataire"
    />
  </div>
</template>

<script>
import PrestataireList from '../components/PrestataireList.vue';
import PrestataireForm from '../components/PrestataireForm.vue';
import axios from 'axios';

export default {
  data() {
    return {
      view: 'list', // Vue actuelle : 'list' ou 'add'
      isEditing: false, // Indique si on est en mode édition
      prestataires: [], // Liste des prestataires (provenant de la base de données)
      currentPrestataire: {
        id_prestataire: null,
        nom_societe: '',
        img_prestataire: '',
        id_utilisateur: null,
      },
    };
  },
  methods: {
    // Récupère les prestataires depuis l'API
    async fetchPrestataires() {
      try {
        const response = await axios.get('http://localhost:5000/prestataires');
        this.prestataires = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des prestataires :', error);
      }
    },

    // Change la vue active
    switchView(view) {
      this.view = view;
      if (view === 'add') {
        this.isEditing = false;
        this.resetForm();
      }
    },

    // Réinitialise le formulaire
    resetForm() {
      this.currentPrestataire = {
        id_prestataire: null,
        nom_societe: '',
        img_prestataire: '',
        id_utilisateur: null,
      };
    },

    // Sauvegarde un prestataire (ajout ou modification)
    async savePrestataire(prestataire) {
      try {
        if (this.isEditing) {
          // Mise à jour
          await axios.put(
              `http://localhost:5000/prestataires/${prestataire.id_prestataire}`,
              prestataire
          );
        } else {
          // Ajout
          await axios.post('http://localhost:5000/prestataires', prestataire);
        }
        this.fetchPrestataires(); // Rafraîchit la liste
        this.switchView('list');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du prestataire :', error);
      }
    },

    // Prépare l'édition d'un prestataire
    editPrestataire(prestataire) {
      this.isEditing = true;
      this.currentPrestataire = {...prestataire};
      this.switchView('add');
    },

    // Supprime un prestataire
    async deletePrestataire(id) {
      try {
        await axios.delete(`http://localhost:5000/prestataires/${id}`);
        this.fetchPrestataires(); // Rafraîchit la liste
      } catch (error) {
        console.error('Erreur lors de la suppression du prestataire :', error);
      }
    },
  },
  created() {
    this.fetchPrestataires(); // Récupère les prestataires à l'initialisation
  },
  components: {
    PrestataireList,
    PrestataireForm,
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