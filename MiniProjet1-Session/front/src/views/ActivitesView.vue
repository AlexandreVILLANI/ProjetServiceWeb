<template>
  <div class="fullscreen-activities">
    <div class="activity-grid">
      <!-- Rangée du haut -->
      <div class="activity-row top-row">
        <button class="activity-card culture-card" @click="toggleActivite('Culture')">
          <img src="@/assets/activites/culture.jpg" alt="Culture">
          <div class="activity-label">{{ $t('ActivitésAccueil.culture-patrimoine') }}</div>
        </button>

        <div class="right-column">
          <button class="activity-card sport-card" @click="toggleActivite('Sport')">
            <img src="@/assets/activites/sport.jpg" alt="Sport">
            <div class="activity-label sport-label">{{ $t('ActivitésAccueil.sport') }}</div>
          </button>

          <button class="activity-card loisir-card" @click="toggleActivite('Loisir')">
            <img src="@/assets/activites/cinema.jpg" alt="Loisirs">
            <div class="activity-label">{{ $t('ActivitésAccueil.loisir-divertissement') }}</div>
          </button>
        </div>
      </div>

      <!-- Rangée du bas -->
      <div class="activity-row bottom-row">
        <button class="activity-card restauration-card" @click="toggleActivite('Restauration')">
          <img src="@/assets/activites/restaurant.jpg" alt="Restauration">
          <div class="activity-label">{{ $t('ActivitésAccueil.restauration') }}</div>
        </button>

        <router-link class="activity-card musique-card" to="musique">
          <img src="@/assets/activites/concert.jpg" alt="Musique">
          <div class="activity-label">{{ $t('ActivitésAccueil.musique-concert') }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'ActivitesView',
  components : {

  },

  data() {
    return {
    }
  },

  computed: {
  },

  methods: {
    ...mapActions('activite',['setCurrentTypeActivite']),

    toggleActivite(type){
      this.setCurrentTypeActivite(type)
      this.$router.push({
        name: "activite",
        });
    },
  },



  mounted() {
  },

}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.fullscreen-activities {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.activity-grid {
  display: flex;
  flex-direction: column;
  height: 50vh;
  gap: 0;
}

.activity-row {
  display: flex;
  flex: 1;
  width: 100%;
  gap: 0;
}

.top-row {
  height: 50vh;
}

.bottom-row {
  height: 50vh;
}

.right-column {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.activity-card {
  position: relative;
  flex: 1;
  border: none;
  overflow: hidden;
  cursor: pointer;
}

.activity-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: filter 1s ease;
  filter: brightness(40%);
}

.sport-card img {
  object-position: center 30%;
}

.activity-card:hover img {
  filter: brightness(100%);
}

.culture-card {
  flex: 2;
}

.sport-card, .loisir-card {
  flex: 1;
  height: 50%;
}

.restauration-card, .musique-card {
  flex: 1;
}

.activity-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: "Montserrat", "sans-serif";
  font-weight: bold;
  font-size: 2em;
  text-align: center;
  text-shadow: 5px 5px 5px black;
  width: 90%;
  z-index: 2;
}

.sport-label {
  margin-top: 4vh;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .activity-label {
    font-size: clamp(1.2rem, 2.5vw, 2rem);
  }
}

@media (max-width: 768px) {
  .activity-row {
    flex-direction: column;
    height: auto;
  }

  .top-row, .bottom-row {
    height: auto;
    flex: 1;
  }

  .right-column {
    flex-direction: row;
  }

  .culture-card {
    flex: 1;
    height: 40vh;
  }

  .sport-card, .loisir-card {
    height: 30vh;
    flex: 1;
  }

  .restauration-card, .musique-card {
    height: 30vh;
  }
}

@media (max-width: 480px) {
  .activity-label {
    font-size: 1.2rem;
  }

  .right-column {
    flex-direction: column;
  }

  .sport-card, .loisir-card {
    height: 25vh;
  }
}
</style>