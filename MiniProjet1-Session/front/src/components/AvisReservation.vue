<template>
  <div class="avis-container">
    <div
        v-for="(avis, index) in avisToDisplay"
        :key="index"
        class="avis-card"
    >
      <div class="avis-header">
        <div class="user-avatar" :style="{ backgroundColor: getRandomColor(index) }">
          {{ getInitials(avis.prenom, avis.nom) }}
        </div>
        <div class="user-info">
          <span class="user-name">{{ avis.prenom }} {{ avis.nom }}</span>
          <div class="rating">
            <span
                v-for="star in 5"
                :key="star"
                class="star"
                :class="{ 'filled': star <= avis.note }"
            >★</span>
          </div>
        </div>
        <button
            v-if="userCourant.id_role === 3"
            @click="supprimerAvis(avis.id_avis)"
            class="delete-btn"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>

      <p class="avis-comment">{{ avis.commentaire }}</p>
    </div>

    <button @click="toggleShowAll" class="toggle-btn">
      {{ showAll ? "Masquer les avis" : "Afficher tous les avis" }}
      <svg viewBox="0 0 24 24" width="16" height="16">
        <polyline :points="showAll ? '18 15 12 9 6 15' : '6 9 12 15 18 9'"/>
      </svg>
    </button>
  </div>
</template>


<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AvisView",



  data() {
    return {
      showAll: false,
    };
  },

  computed: {
    ...mapState("avis", ["avis"]),
    ...mapState("user", ["userCourant"]),
    ...mapState("activite",["currentActiviteId"]),

    avisToDisplay() {
      return this.showAll ? this.avis : this.avis.slice(0, 3);
    },
  },

  methods: {
    ...mapActions("avis", ["getAllAvis","deleteAvis"]),

    toggleShowAll() {
      this.showAll = !this.showAll;
    },
    async supprimerAvis(id){
      await this.deleteAvis(id)
      await this.getAllAvis(this.currentActiviteId);
      console.log(this.avis)

    },

    getInitials(prenom, nom) {
      return `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase()
    },

    getRandomColor(index) {
      const colors = ['#791c25', '#f1c40f', '#9f7aea', '#38b2ac', '#f56565', '#4a5568']
      return colors[index % colors.length]
    },
  },

  async mounted() {
    console.log("caca")
    await this.getAllAvis(this.currentActiviteId);
    console.log(this.avis)
  },
};
</script>

<style scoped>
.avis-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.avis-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
}

.avis-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.user-info {
  flex-grow: 1;
  min-width: 0;
}

.user-name {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rating {
  line-height: 1;
}

.star {
  color: #e2e8f0;
  font-size: 1rem;
  margin-right: 0.125rem;
}

.star.filled {
  color: #f1c40f;
}

.avis-comment {
  color: #4a5568;
  line-height: 1.5;
  margin: 0;
  padding-left: 3.25rem;
  font-size: 15px;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #791c25;
  color: #fff;
}

.delete-btn svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem auto 0;
  background: transparent;
  border: none;
  color: #791c25;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background-color: #f8f8f8;
}

.toggle-btn svg {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s;
}

@media (max-width: 768px) {
  .avis-container {
    padding: 0.75rem;
  }

  .avis-card {
    padding: 1rem;
  }

  .user-avatar {
    width: 2.25rem;
    height: 2.25rem;
  }

  .avis-comment {
    padding-left: 2.75rem;
    font-size: 0.875rem;
  }
}
</style>