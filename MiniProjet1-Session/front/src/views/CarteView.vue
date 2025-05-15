<template>
  <div class="carte">
    <div class="role-container">
      <button @click="changeRole('utilisateur')">Utilisateur</button>
      <button @click="changeRole('prestataire')">Prestataire</button>
      <button @click="changeRole('admin')">Admin</button>
    </div>
    <div v-if="!isPrestataireMode && !checkZonesAvailability" class="message">
      <p>Aucune zone définie par l'administrateur. Vous ne pouvez pas ajouter de prestation.</p>
    </div>

    <div v-if="isPrestataireMode" class="prestataire-actions">
      <button @click="startAddingPrestation">Ajouter une prestation</button>
    </div>
    <div v-if="isAdminMode" class="admin-actions">
      <div v-if="isAddingZone === false" class="bouton-zone">
        <button @click="startAddingPrestation">Ajouter une prestation</button>
        <button @click="toggleAddZone">Ajouter une zone</button>
      </div>
      <div v-if="isAddingZone" class="annulation">
        <button @click="toggleAddZone">Annuler</button>
      </div>
    </div>

    <div v-if="isAddingPrestation" class="message">
      <p>Cliquez sur un point sur la carte pour ajouter une prestation.</p>
    </div>

    <div v-if="showForm" class="form-popup">
      <h3>Ajouter une prestation</h3>
      <label for="prestationName">Nom :</label>
      <input id="prestationName" v-model="prestationName" placeholder="Nom de la prestation" />

      <label for="prestationDescription">Description :</label>
      <textarea id="prestationDescription" v-model="prestationDescription" placeholder="Description"></textarea>

      <button @click="addPrestation">Valider</button>
      <button @click="cancelAddingPrestation">Annuler</button>
    </div>


    <div class="map-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { initMap, addDrawingTools, removeDrawingTools, drawnItems } from '@/services/carte.service.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
export default {
  name: 'CarteView',
  data() {
    return {
      isAddingZone: false,
      prestationName: 'Stand de Hot Dog',
      prestationDescription: 'Venez déguster de délicieux Hot Dogs',
    };
  },
  computed: {
    ...mapState('carte', ['isAdminMode', 'isAddingPrestation', 'showForm','isPrestataireMode']),
  },
  watch: {
    isAdminMode() {
      this.updatePopups();
    }
  },
  methods: {
    ...mapActions('carte', ['addMarker', 'resetState']),
    toggleAddZone() {
      this.isAddingZone = !this.isAddingZone;

      if (this.isAddingZone) {
        addDrawingTools();
      } else {
        removeDrawingTools(); // Désactive les outils de dessin
        import('@/services/carte.service.js').then(({ loadZonesOnMap }) => {
          loadZonesOnMap(); // Recharge les zones après désactivation
        });
      }
    },
    toggleDrawingMode(isAddingZone) {
      if (isAddingZone) {
        this.$store.commit('carte/SET_ADMIN_MODE', true);
        addDrawingTools(); // Active les outils de dessin
      } else {
        removeDrawingTools(); // Désactive les outils de dessin
      }
    },
    updatePopups() {
      import('@/services/carte.service').then(({ updateMarkerPopups }) => {
        updateMarkerPopups();
      });
    },
    changeRole(role) {
      const isAdmin = role === 'admin';
      const isPrestataire = role === 'prestataire';

      this.$store.commit('carte/SET_ADMIN_MODE', isAdmin);
      this.$store.commit('carte/SET_PRESTATAIRE_MODE', isPrestataire);

      this.isAddingZone = false; // Désactiver l'ajout de zones
      this.$store.commit('carte/TOGGLE_ADD_PRESTATION', false); // Désactiver l'ajout de prestations

      if (!isAdmin) {
        removeDrawingTools();
      }

      import('@/services/carte.service.js').then(({ loadMarkersOnMap, loadZonesOnMap }) => {
        loadMarkersOnMap();
        loadZonesOnMap();
      });

      console.log(`Rôle changé : ${role}`);
    },


    startAddingPrestation() {
      if (this.$store.state.carte.isAdminMode || this.checkZonesAvailability()) {
        this.$store.commit('carte/TOGGLE_ADD_PRESTATION', true);
      } else {
        alert("Vous devez être dans une zone définie par l'administrateur pour ajouter une prestation.");
      }
    },
    checkZonesAvailability() {
      const layers = drawnItems.getLayers();
      return layers.some(layer => layer instanceof L.Polygon);
    },
    addPrestation() {
      const latLng = this.$store.state.carte.tempLatLng;
      if (!this.prestationName || !this.prestationDescription || !latLng) {
        alert('Veuillez remplir tous les champs !');
        return;
      }

      this.addMarker({
        latLng,
        name: this.prestationName,
        description: this.prestationDescription,
        status: this.isAdminMode ? 'valide' : 'en_attente',
      });

      console.log('Prestation ajoutée:', this.prestationName, this.prestationDescription);
      this.resetState();
    },
    cancelAddingPrestation() {
      this.$store.commit('carte/SHOW_FORM', false);
      this.$store.commit('carte/RESET_STATE');
    }


  },
  mounted() {
    this.$store.dispatch('carte/loadMarkers');
    this.$store.dispatch('carte/loadZones');
    initMap('map');
  },
};
</script>


<style scoped>

.carte{
  min-height: 920px;
}


.map-container {
  border: solid;
  border-color: black;
  width: 1720px;
  margin-left: 100px;
  height: 700px;
  margin-top: 20px;
}

.map {
  width: 100%;
  height: 100%;
  z-index: 0;
}

.role-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
}

.role-container button {
  background-color: #791c25;
  color: white;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

.role-container button:hover {
  background-color: #f1c40f;
  color: black;
}

.admin-actions {
  text-align: center;
  margin: 20px;
}

.admin-actions button {
  background-color: #008cba;
  color: white;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.admin-actions button:hover {
  background-color: #005f8a;
}

.prestataire-actions {
  text-align: center;
  margin: 20px;
}

.prestataire-actions button {
  background-color: #008cba;
  color: white;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.prestataire-actions button:hover {
  background-color: #005f8a;
}
.message {
  text-align: center;
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
  color: #791c25;
}

.form-popup {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  background-color: white;
  border: solid 2px black;
  padding: 20px;
  z-index: 1001;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
}

.form-popup h3 {
  margin-bottom: 10px;
}

.form-popup label {
  font-weight: bold;
  display: block;
  margin: 10px 0 5px;
}

.form-popup input,
.form-popup textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-popup button {
  background-color: #008cba;
  color: white;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.form-popup button:hover {
  background-color: #005f8a;
}
</style>
