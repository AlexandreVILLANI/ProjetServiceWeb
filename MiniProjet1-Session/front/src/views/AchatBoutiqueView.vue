<template>
  <div>
    <div class="container">
      <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
      <div>
        <p class="titre-activite">
          {{ article.nom_article }}
        </p>
        <p class="description-activite">
          {{ article.description_article }}
        </p>
        <img src="../assets/activites/grotte_cravanche.jpg"/>
        <p style="font-size: 20px">
          <u class="nombre-stock">
            {{ article.nombre_article === 0 ? 'Cet article est en rupture de stock' : 'Nombre d\'articles en stock :' }}
          </u>
          <span v-if="article.nombre_article !== 0">{{ article.nombre_article }}</span>
        </p>
        <div v-if="article.nombre_article > 0">
          <label for="quantite">Quantités que vous voulez acheter :</label>
          <select id="quantite" v-model="quantite" @change="updateTotalPrice">
            <option v-for="n in article.nombre_article" :key="n" :value="n">
            </option>
          </select>
          <br>
          <label for="payment">Moyen de payement utilisé :</label>
          <select v-model.number="selectedPayment" id="payment" required>
            <option value="1">Argent</option>
            <option value="2">Point de fidélité</option>
          </select>
          <div v-if="selectedPayment===2">Vous avez {{this.userCourant.point_fidelite}} points de fidélités</div>

          <p v-if="selectedPayment===1" style="font-size: 20px; font-weight: bold">
            <u>Prix de l'article : {{ article.prix_article }} €</u>
            <span v-if="quantite !== 1">, Total : {{ totalPrix }} € </span>
          </p>
          <p v-if="selectedPayment===2" style="font-size: 20px; font-weight: bold">
            <u>Prix de l'article : {{ article.prix_article_point }} point</u>
            <span v-if="quantite !== 1">, Total : {{ this.quantite*article.prix_article_point }} point</span>
          </p>

          <div v-if="!reservationEnd">
          <button @click="ajouterPanier" class="button-reserver">
            Ajouter au panier
          </button>
          <button @click="ajouterPanierPayer" class="button-reserver">
            Ajouter au panier et payer
          </button>
          </div>
          <button v-if="reservationEnd" class="button-reserver" @click="goToPanier"> Panier</button>
        </div>
      </div>
    </div>
  </div>


</template>


<script>

import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";


export default {
  name: 'AchatBoutiqueView',


  components: {
    ConfirmDialogue
  },

  data() {
    return {
      selected: null,
      showModal: false,
      reservationEnd : false,
      quantite: 1, // Par défaut, 1 article sélectionné
      totalPrix: 0,

      selectedPayment : 1
    }
  },

  computed: {
    ...mapState('boutique', ['boutique','article']),
    ...mapState('user', ['userCourant','reservations'])


  },

  methods: {
    ...mapActions("boutique", ["getArticleById"]),
    ...mapActions("panier", ["addToPanierArticle"]),



    updateTotalPrice() {
      this.totalPrix = this.quantite * this.article.prix_article;
    },


    async ajouterPanier() {
      let prix = 0
      if (this.selectedPayment ===1){
        prix = this.article.prix_article
      }else{
        prix = this.article.prix_article_point

      }
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer reservation',
        message: "Appuyer sur confirmer pour finaliser l'ajout au panier.",
        okButton: 'Confirmer',
      })
      if (ok) {
        await this.addToPanierArticle({
          id_utilisateur: this.userCourant.id_utilisateur,
          id_panier: this.article.id_panier,
          id_article : this.article.id_article,
          nombre_articles: this.quantite,
          prix: this.quantite * prix,
          payment: this.selectedPayment
        })
        this.reservationEnd = true;
      }
    },
    async ajouterPanierPayer() {
      let prix = 0
      if (this.selectedPayment ===1){
        prix = this.article.prix_article
      }else{
        prix = this.article.prix_article_point

      }
      const result = await this.addToPanierArticle({
        id_utilisateur: this.userCourant.id_utilisateur,
        id_panier: this.article.id_panier,
        id_article : this.article.id_article,
        nombre_articles: this.quantite,
        prix: this.quantite * prix,
        payment:this.selectedPayment
      })
      let panier = [{
        id_utilisateur: this.userCourant.id_utilisateur,
        id_panier: result.id_panier,
        id_article : this.article.id_article,
        nombre_articles: this.quantite,
        prix: this.quantite * prix,
        payment:this.selectedPayment

      }]
      await this.$router.push({
        name : "payer",
        params : {panier}
      })
    },
    goToPanier(){
      this.$router.push({
        name : "profil",
      })
    }
  },

  async mounted() {
    const id = parseInt(this.$route.params.id, 10);
    if (!isNaN(id)) {
      await this.getArticleById(id);
      this.updateTotalPrice();


    } else {
      console.error("L'ID passé dans les paramètres de la route est invalide.");
    }
  },

}
</script>


<style scoped>

.container {
  width: auto;
  background-color: #F4F7FE;
  display: flex;
  margin: 40px 450px 40px 450px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  box-shadow: 5px 5px 5px gray;
  justify-content: center;
  padding-bottom: 20px;
}



.titre-activite {
  font-weight: bold;
  font-size: 52px;
  padding-bottom: 30px;
  padding-top: 30px;
}


.description-activite {
  font-size: 18px;
  text-align: justify;
  text-align: center;
  padding-bottom: 20px;

}

img {
  padding-bottom: 20px;
}

u {
  text-decoration: none;
}

p {
  font-size: 20px;
}


.button-reserver {
  background-color: #791c25;
  color: white;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  text-decoration: none;
}




.button-reserver:hover {
  color: #f1c40f;
}



.custom-dropdown select {
  background-color: #791c25;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: .5em;
  padding-right: 2.5em;
  border: 0;
  margin: 0;
  border-radius: 3px;
  text-indent: 0.01px;
  text-overflow: '';
  -webkit-appearance: button; /* hide default arrow in chrome OSX */
}



.custom-dropdown select[disabled] {
  color: rgba(0, 0, 0, .3);
}

.custom-dropdown select[disabled]::after {
  color: rgba(0, 0, 0, .1);
}



input {
  border-radius: 0px;
  text-decoration: none;
}

.button-reserver {
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

.button-reserver:hover {
  color: #f1c40f;
}

select {
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 10px;
}
</style>