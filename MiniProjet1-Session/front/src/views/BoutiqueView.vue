<template>
  <div class="boutique-container">
    <div class="page-content">
      <!-- Filtres -->
      <div class="filters-section">
        <div class="filter-card">
          <label for="price-filter">{{ $t('boutique.prixmax') }}</label>
          <input
              id="price-filter"
              type="number"
              v-model.number="maxPrice"
              placeholder="50"
              min="0"
              class="price-input"
          />

          <label for="typeArticle-filter">{{ $t('boutique.typearticle') }}</label>
          <select
              id="typeArticle-filter"
              v-model="typeArticle"
              class="type-select"
          >
            <option value="" disabled selected>{{ $t('boutique.choixtype') }}</option>
            <option value="Porte clé">{{ $t('boutique.porteclé') }}</option>
            <option value="Peluche">{{ $t('boutique.peluche') }}</option>
            <option value="Stickers">Stickers</option>
            <option value="Gourde">{{ $t('boutique.gourde') }}</option>
            <option value="Sac">{{ $t('boutique.sac') }}</option>
            <option value="T-shirt">T-shirt</option>
            <option value="PureTech 1.2">PureTech 1.2</option>
          </select>

          <button @click="resetSelect" class="reset-btn">{{ $t('boutique.réinitialiser') }}</button>
        </div>
      </div>

      <!-- Articles -->
      <div class="boutique-grid">
        <div v-if="filteredAll.length === 0" class="no-results">
          <img src="@/assets/activites/sold_out.png" alt="Aucun article trouvé" class="no-results-image" />
          <p>{{ $t('boutique.aucunarticle') }}</p>
        </div>

        <div
            v-for="(boutique, index) in filteredAll"
            :key="index"
            class="boutique-card-wrapper"
        >
          <div
              class="boutique-card"
              @click="toogleAchat(boutique.id_article, boutique.type_article)"
          >
            <h3 class="card-title">{{ boutique.nom_article }}</h3>
            <p class="card-description">{{ boutique.description_article }}</p>
            <img
                :src="getArticleImage(boutique.image_article)"
                :alt="boutique.nom_article"
                class="card-image"
            >
            <div class="article-type">
              <span>{{ boutique.type_article }}</span>
            </div>
            <div class="card-footer">
              <div class="price-badge">
                <span class="from">{{ $t('boutique.àpartirde') }}</span>
                <span class="amount">{{ boutique.prix_article }}€</span>
              </div>
              <div class="point-fidelite-badge">
                <span class="from">ou <span class="amount">{{ boutique.prix_article_point }}</span> points de fidélités</span>
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
import {mapActions, mapState} from "vuex";

export default {
  name: 'BoutiqueView',
  data() {
    return {
      maxPrice: null,
      typeArticle: "",
    };
  },
  computed: {
    ...mapState("boutique", ["boutique"]),
    ...mapState("user",["userCourant"]),
    filteredAll() {
      return this.boutique.filter((boutique) => {
        const matchesPrice =
            this.maxPrice === null || this.maxPrice === "" || isNaN(this.maxPrice)
                ? true
                : boutique.prix_article <= this.maxPrice;
        const matchesType =
            this.typeArticle === null || this.typeArticle === ""
                ? true
                : boutique.type_article === this.typeArticle;
        return matchesPrice && matchesType;
      });
    },
  },
  methods: {
    ...mapActions("boutique", ["getAllArticle"]),
    toogleAchat(id) {
      if (this.userCourant.id_role !== 1){
        this.$router.push('/Login')
      }
      else if  (id <= 0) {
        console.log("ID incorrect");
      } else {
        this.$router.push({
          name: "achatBoutique",
          params: {id},
        });
      }
    },
    resetSelect(){
      this.maxPrice = null;
      this.typeArticle = "";
    },

    // Obtenir l'image de l'activité
    getArticleImage(nom_image) {
      try {
        return require(`@/assets/static/${nom_image.toLowerCase().replace(/\s+/g, '_')}.jpg`);
      } catch {
        // Image par défaut si l'image n'est pas trouvée
        return require('@/assets/activites/billeterie.jpg');
      }
    }
  },
  async mounted() {
    await this.getAllArticle();
  },
};
</script>

<style scoped>
.boutique-container {
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
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.price-input, .type-select {
  width: 100%;
  padding: 8px 12px;
  margin: 5px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;

}

.type-select {
  width: 100%;
  padding: 10px 35px 10px 15px;
  margin: 5px 0;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  color: #333333;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 1.2em;
}

.type-select:focus {
  outline: none;
  border-color: #791c25;
  box-shadow: 0 0 0 2px rgba(121, 28, 37, 0.7);
}

.type-select option {
  padding: 10px;
  background: #fff;
  color: #333333;
  transition: background-color 0.2s;
}

.type-select option:hover {
  background-color: #791c25;
  color: #fff;
}

.type-select option:checked {
  background-color: rgba(241, 196, 15, 0.1);
  font-weight: 500;
}

.type-select option[disabled] {
  color: #999;
  font-style: italic;
}

.reset-btn {
  width: 100%;
  padding: 8px;
  background: #791c25;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 5px;
}

.reset-btn:hover {
  background: #f1c40f;
  color: black;
}

.boutique-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.boutique-card-wrapper {
  position: relative;
  height: 100%;
}

.boutique-card {
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

.boutique-card:hover {
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

.article-type {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 15px;
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

.point-fidelite-badge {
  background: #f8f9fa;
  padding: 5px 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(121, 28, 37, 0.85);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-weight: bold;
  border-radius: 8px;
  pointer-events: none;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
}

.no-results-image {
  max-width: 200px;
  margin-bottom: 20px;
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

  .boutique-card {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .boutique-grid {
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