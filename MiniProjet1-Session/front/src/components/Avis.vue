<template>
  <div class="modal-overlay">
    <div class="avis-modal">
      <div class="modal-header">
        <h2>Donnez votre avis</h2>
      </div>

      <div class="modal-content">
        <div class="activity-info">
          <img :src="getActivityImage(activite[0].image_activite)" class="activity-thumbnail"
          alt="activite[0].nom_activite" />
          <div class="activity-details">
            <h3>{{ activite[0].nom_activite }}</h3>
            <p class="activity-description">{{ activite[0].description_activite }}</p>
          </div>
        </div>

        <div class="rating-section">
          <div class="rating-stars">
            <span v-for="star in 5"
                  :key="star"
                  @click="note = star"
                  :class="{ 'filled': star <= note }">★</span>
          </div>
          <span class="rating-label">Note: {{ note }}/5</span>
        </div>

        <div class="comment-section">
          <textarea v-model="commentaire"
                    placeholder="Décrivez votre expérience..."
                    class="comment-input"></textarea>
        </div>

        <confirm-dialog ref="confirmDialogue"></confirm-dialog>

        <button @click="avis()" class="submit-button">
          Poster l'avis
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import ConfirmDialog from '@/components/ConfirmDialog'

export default {
  name: 'Avis',
  components: {ConfirmDialog},


  props: ['id'],

  data() {
    return {
      note: null,
      commentaire: null,
      avisNull: false,
      avisEnd: false,
      avisOver: false,
    }
  },

  computed: {
    ...mapState("activite", ["activite"]),
    ...mapState('user', ['userCourant']),

  },

  methods: {
    ...mapActions("activite", ["getActiviteById"]),
    ...mapActions("avis", ["createAvis"]),

    async avis() {
      const ok = await this.$refs.confirmDialogue.show({
        title: 'Confirmer l’avis',
        message: 'Appuyer sur confirmer pour finaliser l’envoi.',
        okButton: 'Confirmer',
      })
      if (ok) {
        await this.createAvis({
          commentaire: this.commentaire,
          note: this.note,
          id_activite: this.id,
          id_utilisateur: this.userCourant.id_utilisateur,
        })
        this.avisEnd = true;
        this.$router.push({
          name: "reservation",
        });
      }
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
    this.getActiviteById(this.id);
  },
}

</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.avis-modal {
  width: 90%;
  max-width: 600px;
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  background-color: #791c25;
  color: white;
  padding: 20px;
  text-align: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.modal-content {
  padding: 30px;
}

.activity-info {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  align-items: center;
}

.activity-thumbnail {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.activity-details h3 {
  margin: 0 0 10px 0;
  color: #2d3748;
  font-size: 20px;
}

.activity-description {
  color: #4a5568;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.rating-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.rating-stars {
  font-size: 40px;
  line-height: 1;
  margin-bottom: 10px;
}

.rating-stars span {
  color: #e2e8f0;
  cursor: pointer;
  transition: color 0.2s;
}

.rating-stars span.filled {
  color: #f1c40f;
}

.rating-stars span:hover {
  color: #f1c40f;
}

.rating-label {
  font-size: 16px;
  font-weight: 600;
  color: #4a5568;
}

.comment-section {
  margin-bottom: 30px;
}

.comment-input {
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.2s;
}

.comment-input:focus {
  outline: none;
  border-color: #791c25;
  box-shadow: 0 0 0 2px rgba(121, 28, 37, 0.1);
}

.submit-button {
  width: 100%;
  padding: 15px;
  background-color: #791c25;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button:hover {
  background-color: #f1c40f;
  transform: translateY(-2px);
  color: #333;
}

@media (max-width: 600px) {
  .activity-info {
    flex-direction: column;
    text-align: center;
  }

  .activity-thumbnail {
    width: 100%;
    height: auto;
    max-height: 200px;
  }
}
</style>