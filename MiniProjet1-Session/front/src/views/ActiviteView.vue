<template>
  <div class="activities-container">
    <AlertDialog ref="alertDialog"></AlertDialog>
    <div class="page-content">
      <!-- Filtres -->
      <div class="filters-section">
        <div class="filter-card">
          <label for="price-filter">Prix maximum :</label>
          <input
              id="price-filter"
              type="number"
              v-model.number="maxPrice"
              placeholder="50"
              min="0"
              class="price-input"
          />
          <button @click="resetFilter" class="reset-btn">Réinitialiser</button>
        </div>
      </div>

      <!-- Activités -->
      <div class="activities-grid">
        <div
            v-for="(activite, index) in filteredActivites"
            :key="index"
            class="activity-card-wrapper"
        >
          <div
              class="activity-card"
              @click="toggleReservation(activite.id_activite, activite.type_activite)"
          >
            <h3 class="card-title">{{ activite.nom_activite }}</h3>
            <p class="card-description">{{ activite.description_activite }}</p>
            <img
                :src="getActivityImage(activite.image_activite)"
                :alt="activite.nom_activite"
                class="card-image"
            >
            <div class="card-footer">
              <div class="price-badge">
                <span class="from">À partir de</span>
                <span class="amount">{{ activite.prix_activite }}€</span>
              </div>
              <div class="star-rating">
                <span
                    v-for="star in 5"
                    :key="star"
                    :class="{ 'filled': star <= Math.round(MoyenneNote(activite.id_activite)) }"
                >★</span>
              </div>
            </div>
            <div class="hover-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AlertDialog from "@/components/AlertDialog.vue";

export default {
  name: "ActiviteView",
  components: {AlertDialog},

  data() {
    return {
      maxPrice: null,
      type: null
    };
  },

  computed: {
    ...mapState("activite", ["activites", "note", "currentTypeActivite"]),
    ...mapState("user", ["userCourant", 'isConnected']),

    filteredActivites() {
      if (this.maxPrice === null || this.maxPrice === "" || isNaN(this.maxPrice)) {
        return this.activites;
      }
      return this.activites.filter(
          (activite) => activite.prix_activite <= this.maxPrice
      );
    },
  },

  methods: {
    ...mapActions("activite", ["getAllActiviteByType", "getMoyenneNote", "setCurrentActiviteId"]),
    ...mapActions("user", ["updateVueActiviteStore"]),

    // Navigation vers la page de réservation
    toggleReservation(id) {
      if (!this.isConnected) {
        this.$router.push('/Login');
      } else if (id <= 0) {
        console.log("ID incorrect");
      } else if (this.userCourant.id_role === 2) {
        this.$refs.alertDialog.show({
          title: 'Erreur Utilisateur',
          message: "Vous devez être connecté en tant qu'utilisateur pour réserver une activité",
          okButton: 'Ok',
        });
      } else {
        this.setCurrentActiviteId(id);
        this.updateVueActiviteStore(id);  // Passe seulement l'id ici
        this.$router.push({ name: "reservation" });
      }
    },


    MoyenneNote(id) {
      const result = this.note.find(item => item.id_activite === id);
      return result ? parseFloat(result.avg).toFixed(2) : "non noté";
    },

    // Réinitialise le filtre
    resetFilter() {
      this.maxPrice = null;
    },

    // Obtenir l'image de l'activité
    getActivityImage(nom_image) {
      try {
        return require(`@/assets/static/${nom_image.toLowerCase().replace(/\s+/g, '_')}.jpg`);
      } catch {
        // Image par défaut si l'image n'est pas trouvée
        return require('@/assets/activites/billeterie.jpg');
      }
    }
  },

  mounted() {
    console.log("Current Type Activite:", this.currentTypeActivite);
    this.getAllActiviteByType(this.currentTypeActivite);
    this.getMoyenneNote();
    console.log("Notes après appel:", this.note);
  },
};

</script>

<style scoped>
.activities-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.page-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
}

.filters-section {
  position: sticky;
  top: 20px;
  align-self: start;
}

.filter-card {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.price-input {
  width: 100%;
  padding: 8px 12px;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
}

.price-input:focus {
  border-color: #791c25;
  box-shadow: 0 0 0 1px rgb(121, 28, 37, 0.6);
  outline: none;
}

.reset-btn {
  width: 100%;
  padding: 8px;
  font-weight: 500;
  background: #791c25;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.reset-btn:hover {
  background: #f1c40f;
  color: black;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.activity-card-wrapper {
  position: relative;
  height: 100%;
}

.activity-card {
  height: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.card-title {
  font-size: 1.2rem;
  color: #791c25;
  margin: 0 0 10px 0;
  font-weight: 700;
}

.card-description {
  color: #333333;
  margin: 0 0 15px 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.card-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 10px;
}

.price-badge {
  background: #f8f9fa;
  padding: 5px 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.from {
  font-size: 0.7rem;
  color: #6c757d;
}

.amount {
  font-weight: bold;
  color: #791c25;
  font-size: 1.1rem;
}

.star-rating {
  color: #ddd;
  font-size: 1.1rem;
}

.star-rating .filled {
  color: #f1c40f;
}

.hover-overlay {
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.activity-card:hover .hover-overlay {
  opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .page-content {
    grid-template-columns: 1fr;
  }

  .filters-section {
    position: static;
    margin-bottom: 20px;
  }

  .activity-card {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .activities-grid {
    grid-template-columns: 1fr;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .card-image {
    height: 140px;
  }
}
</style>