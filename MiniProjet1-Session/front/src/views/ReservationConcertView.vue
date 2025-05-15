<template>
  <div class="reservation-container">
    <div class="activity-container">
      <div>
        <h1 class="activity-title">
          {{ concert[0].nom_activite }}
        </h1>
        <img
            :src="getConcertImage(concert[0].image_activite)"
            :alt="concert[0].nom_activite"
            class="activity-image"
        >
        <p class="activity-description">
          {{ concert[0].description_activite }}
        </p>

        <div class="details-container">
          <p class="detail-item">
            <span class="detail-label">Type de concert : </span>
            <span class="detail-value">{{ concert[0].type_concert }}</span>
          </p>
          <p class="detail-item">
            <span class="detail-label">Prix de la place : </span>
            <span class="detail-value">{{ concert[0].prix_activite }}€</span>
          </p>
        </div>

        <h3 class="section-title">Choissisez la date du concert :</h3>
        <div class="custom-dropdown">
          <select v-model="selected">
            <option v-for="(concert, index) in concert" :key="index" :value="concert.id_creneau">
              {{ concert.date_activite }}
            </option>
          </select>
        </div>

        <img class="sold-out-image" v-if="getPlaceById(selected) === 0" src="@/assets/activites/sold_out.png" alt="image sold_out"/>

        <div v-if="reservationEnd === false && getPlaceById(selected) !== 0" class="booking-details">
          <p class="detail-item" v-if="selected!==null">
            Le concert aura lieu le : <span class="amount">{{ getDateById(selected) }}</span> de <span class="amount">{{ getHeureDebutById(selected) }}</span> à <span class="amount">{{ getHeureFinById(selected) }}</span>
          </p>
          <p class="detail-item" v-if="selected!==null">
            Il reste <span class="amount">{{ getPlaceById(selected) }}</span> places disponibles
          </p>
          <div class="detail-item">
            <label>Nombre de places à réserver :</label>
            <input v-model.number="nbReservation" type="number" class="places-input" min="1">
          </div>

          <div class="error-messages">
            <p v-if="reservationNull" class="error">Il faut réserver au moins une place</p>
            <p v-if="dateNull" class="error">Il faut choisir une date</p>
            <p v-if="reservationOver" class="error">Il ne reste plus assez de places</p>
          </div>

          <p class="summary" v-if="nbReservation!==null && nbReservation!==undefined && !isNaN(nbReservation) && nbReservation!==''">
            Vous réservez <span class="amount">{{ nbReservation }}</span> places pour un total de <span class="amount">{{ parseInt(nbReservation) * getPrixById(selected) }}</span>€
          </p>

          <confirm-dialog ref="confirmDialogue"></confirm-dialog>

          <div class="action-buttons">
            <button @click="ajouterPanier()" class="btn-primary">
              {{ $t('ReservationActivite.ajouterpanier') }}
            </button>
            <button @click="ajouterPanierPayer()" class="btn-secondary">
              {{ $t('ReservationActivite.ajouterpanierpayer') }}
            </button>
          </div>
        </div>

        <div class="confirmation" v-if="reservationEnd">
          <p class="success-message">{{ $t('ReservationActivite.ajouter') }} {{ nbReservation }} {{ $t('ReservationActivite.danspanier') }}</p>
          <button @click="showPanier()" class="button-reserver">{{ $t('ReservationActivite.panier') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>


import ConfirmDialog from '@/components/ConfirmDialog'

import {mapActions, mapState} from "vuex";


export default {
  name: 'ReservationConcertView',


  components : {
    ConfirmDialog
  },

  data() {
    return {
      selected: null,
      nbReservation: null,
      reservationNull : false,
      reservationEnd : false,
      reservationOver: false,
      showModal : false,
      dateNull : false,
      bon : 0,
      disabled5 : null,
      disabled10 : null,
      disabled20 : null,
    }
  },

  computed: {
    ...mapState('concert',['concert','currentConcertId']),
    ...mapState('user',['userCourant'])


  },

  methods: {
    ...mapActions("concert", ["getConcertById","updateNbPlaces"]),
    ...mapActions("panier",["addToPanierActivite"]),
    ...mapActions("user",['updateUtilisateur']),

    getDateById(id) {
      const result = this.concert.find(item => item.id_creneau === id);
      return result ? result.date_activite : null;
    },
    getPlaceById(id) {
      const result = this.concert.find(item => item.id_creneau === id);
      return result ? result.places_disponibles : null;
    },
    getHeureDebutById(id) {
      const result = this.concert.find(item => item.id_creneau === id);
      return result ? result.heure_debut : null;
    },
    getHeureFinById(id) {
      const result = this.concert.find(item => item.id_creneau === id);
      return result ? result.heure_fin : null;
    },
    getPrixById(id) {
      const result = this.concert.find(item => item.id_creneau === id);
      return result ? result.prix_activite : null;
    },
    async ajouterPanier() {
      this.dateNull = false;
      this.reservationNull = false;
      this.reservationOver = false;
      this.nbReservation = parseInt(this.nbReservation)
      if (this.selected === null) {
        this.dateNull = true;
        return;
      }
      if (isNaN(this.nbReservation) || this.nbReservation === 0) {
        this.reservationNull = true;
        return;
      } else if (this.nbReservation > this.getPlaceById(this.selected)) {
        this.reservationOver = true;
        return;
      }
      const ok = await this.$refs.confirmDialogue.show({
        title: this.$t('ReservationActivite.confirmer-reservation'),
        message: this.$t('ReservationActivite.appuyerpourconfirmer'),
        okButton: this.$t('ReservationActivite.confirmer'),
      })
      if (ok) {
        await this.addToPanierActivite({
          id_utilisateur: this.userCourant.id_utilisateur,
          id_creneau: this.selected,
          nombre_articles: this.nbReservation,
          prix: this.nbReservation * this.getPrixById(this.selected)
        })
        this.reservationEnd = true;
      }
    },
    async ajouterPanierPayer() {
      await this.ajouterPanier()
      let panier = {
        id_creneau: this.selected,
        nombre_articles: this.nbReservation,
        prix: this.nbReservation * this.getPrixById(this.selected)
      }
      await this.$router.push({
        name : "payer",
        params : {panier}
      })



    },
    showPanier(){
      let panier = true
      this.$router.push({
        name: "profil",
        params: {panier}
      })
    },

    // Obtenir l'image de l'activité
    getConcertImage(nom_image) {
      try {
        return require(`@/assets/static/${nom_image.toLowerCase().replace(/\s+/g, '_')}.jpg`);
      } catch {
        // Image par défaut si l'image n'est pas trouvée
        return require('@/assets/activites/billeterie.jpg');
      }
    }


  },

  async mounted() {
    await this.getConcertById(this.currentConcertId)
    console.log(this.concert)
  },

}
</script>


<style scoped>
.reservation-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.amount {
  font-weight: bold;
  color: #791c25;
  font-size: 1.1rem;
}

.activity-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-bottom: 30px;
}

.activity-title {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 15px;
  text-align: center;
}

.activity-description {
  font-size: 16px;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 25px;
  text-align: center;
}

.activity-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.details-container {
  text-align: center;
  margin-bottom: 25px;
}

.detail-item {
  margin: 0 15px;
  padding: 0;
  border-bottom: none
}

.detail-label {
  font-size: 18px;
  font-weight: 600;
  margin-right: 8px;
}

.detail-value {
  font-size: 24px;
  font-weight: 700;
  color: #791c25;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 15px;
  text-align: center;
}

.custom-dropdown {
  margin: 0 auto 20px;
  text-align: center;
  position: relative;
  width: 100%;
  max-width: 300px;
}

.custom-dropdown select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  font-size: 16px;
  color: #4a5568;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;
}

.custom-dropdown select:focus {
  outline: none;
  border-color: #791c25;
  box-shadow: 0 0 0 2px rgba(121, 28, 37, 0.1);
}

.sold-out-image {
  display: block;
  margin: 0 auto 25px;
  max-width: 300px;
}

.booking-details {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.booking-details .detail-item {
  padding: 10px 0;
  border-bottom: 1px solid #edf2f7;
}

.booking-details .detail-item:last-child {
  border-bottom: none;
}

.places-input {
  width: 60px;
  padding: 8px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  margin-left: 10px;
}

.places-input:focus {
  outline: none;
  border-color: #791c25;
}

.error-messages {
  margin: 15px 0;
}

.error {
  color: #e53e3e;
  font-size: 14px;
  margin: 5px 0;
}

.summary {
  text-align: center;
  font-size: 16px;
  margin: 20px 0;
  padding: 12px;
  background-color: #f0f5ff;
  border-radius: 6px;
  color: #2d3748;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.btn-primary {
  background-color: white;
  color: #791c25;
  padding: 12px 24px;
  border: 2px solid #791c25;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #f1c40f;
  color: #333;
  border: none;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #791c25;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #f1c40f;
  transform: translateY(-2px);
  color: #333;
}

.confirmation {
  text-align: center;
  margin-top: 25px;
}

.success-message {
  color: #38a169;
  font-weight: 500;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .activity-container {
    padding: 20px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .button-reserver {
    width: 100%;
  }
}
</style>