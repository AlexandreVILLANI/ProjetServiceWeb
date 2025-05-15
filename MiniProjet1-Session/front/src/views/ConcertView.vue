<template>
  <div class="concerts-container">
    <div class="page-content">
      <!-- Filtres -->
      <div class="filters-section">
        <div class="filter-card">
          <label for="price-filter">Prix maximum :</label>
          <input
              id="price-filter"
              type="number"
              v-model.number="maxPrice"
              placeholder="Exemple : 50"
              min="0"
              class="price-input"
          />
          <button @click="resetFilter" class="reset-btn">Réinitialiser</button>
        </div>
      </div>

      <!-- Concerts -->
      <div class="concerts-grid">
        <div
            v-for="(concert, index) in filteredConcerts"
            :key="index"
            class="concert-card-wrapper"
        >
          <div
              class="concert-card"
              @click="toogleReservation(concert.id_activite)"
          >
            <h3 class="card-title">{{ concert.nom_activite }}</h3>
            <p class="card-description">{{ concert.description_activite }}</p>
            <img
                :src="getActivityImage(concert.image_activite)"
                :alt="concert.nom_activite"
                class="card-image"
            >
            <div class="concert-type">
              <span>Type : </span>
              <strong>{{ concert.type_concert }}</strong>
            </div>
            <div class="card-footer">
              <div class="price-badge">
                <span class="from">À partir de</span>
                <span class="amount">{{ concert.prix_activite }}€</span>
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

export default {
  name: "ConcertView",

  data() {
    return {
      maxPrice: null,
    };
  },

  computed: {
    ...mapState("concert", ["concerts"]),
    ...mapState("user",["userCourant","isConnected"]),

    filteredConcerts() {
      if (this.maxPrice === null || this.maxPrice === "" || isNaN(this.maxPrice)) {
        return this.concerts;
      }
      return this.concerts.filter(
          (concert) => concert.prix_concert <= this.maxPrice
      );
    },
  },

  methods: {
    ...mapActions("concert", ["getAllConcert"]),
    ...mapActions("concert",["setCurrentConcertId"]),

    toogleReservation(id) {
      console.log(this.isConnected)
      if (!this.isConnected ){
        this.$router.push('/Login')
      }
      else if  (id <= 0) {
        console.log("ID incorrect");
      } else if (this.userCourant.id_role === 2){
        this.$refs.alertDialog.show({
          title: 'Erreur Utilisateur',
          message: "Vous devez être connecter en tant qu'utilisateur pour reserver une activité",
          okButton: 'Ok',
        })
      }else {
        this.setCurrentConcertId(id)
        this.$router.push({
          name: "reservationConcert",
        });

      }
    },

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
    this.getAllConcert();
    console.log(this.concerts);
  },
};
</script>

<style scoped>
.concerts-container {
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
  background: white;
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
  font-weight: 500;
  padding: 8px;
  background: #791c25;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.reset-btn:hover {
  background: #f1c40f;
  color: black;
}

.concerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.concert-card-wrapper {
  position: relative;
  height: 100%;
}

.concert-card {
  height: 100%;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.concert-card:hover {
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

.concert-type {
  font-size: 0.95rem;
  color: #333333;
  margin-bottom: 15px;
}

.concert-type strong {
  color: #791c25;
}

.card-footer {
  display: flex;
  justify-content: flex-start;
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

.hover-overlay {
  transition: opacity 0.3s ease;
  pointer-events: none;
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

  .concert-card {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .concerts-grid {
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
