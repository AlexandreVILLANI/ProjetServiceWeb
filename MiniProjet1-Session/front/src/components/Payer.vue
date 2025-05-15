
<template>
  <div class="container">
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <div class="activite-box">
      <h1 style="align-self: center;margin: 0px 20px 30px 20px;font-size: 38px">Informations de paiement</h1>
      <p style="font-size: 20px;margin-bottom: 20px">Le montant à payer est de : {{ prix }}€</p>
      <p style="font-size: 20px;margin-bottom: 20px">Cet achat vous rapportera {{Math.round(prix * 0.8) }} points de fidélités</p>

      <div class="container-champ">
        <div>
          <label for="cnn">Numéro de carte</label>
          <input id="cnn" maxlength="19" @input="updateCardNumber" />
        </div>
        <div>
          <label for="name">Nom</label>
          <input id="name" @input="updateName" />
        </div>
        <div class="row">
          <div>
            <label for="date">Date d'expiration (mm/aa)</label>
            <input id="date" maxlength="5" @input="updateExpirationDate" />
          </div>
          <div>
            <label for="cvv">CVV</label>
            <input id="cvv" maxlength="3" @input="updateCVV" />
          </div>
        </div>
      </div>
      <button class="button-payer" :disabled='!isFormValid' @click="reserver()">Payer</button>
    </div>
  </div>
</template>


<script>


import IMask from "imask";
import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";



export default {
  name: 'Payer',
  components: {ConfirmDialogue},

  props: ["panier"],


  data() {
    return {
      cardNumber: "",
      name: "",
      expirationDate: "",
      cvv: "",
      prix: 0
    }
  },

  computed: {
    ...mapState("user",['userCourant']),
    isFormValid() {
      const cardNumberValid = /^\d{4} \d{4} \d{4} \d{4}$/.test(this.cardNumber);
      const nameValid = this.name.trim().length > 0;
      const expirationDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expirationDate);
      const cvvValid = /^\d{3}$/.test(this.cvv);

      return cardNumberValid && nameValid && expirationDateValid && cvvValid;
    },
  },

  methods: {
    ...mapActions('activite',['createReservation']),
    ...mapActions('panier',['deletePanierActivite','createAchat','deletePanierArticle']),
    ...mapActions("user",['updateUtilisateur']),

    cardInfo() {

      const cardnumber = document.getElementById('cnn');
      const expirationdate = document.getElementById('date');
      const securitycode = document.getElementById('cvv');

      new IMask(cardnumber, {
        mask: [
          {
            mask: '0000 0000 0000 0000',
            regex: '^4\\d{0,15}',
            cardtype: 'visa'
          },
        ],
        dispatch: function (appended, dynamicMasked) {
          var number = (dynamicMasked.value + appended).replace(/\D/g, '');

          for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
            let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
            if (number.match(re) != null) {
              return dynamicMasked.compiledMasks[i];
            }
          }
        }
      });

      new IMask(expirationdate, {
        mask: 'MM{/}YY',
        blocks: {
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
          },
          YY: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 99,
          }
        }
      });

      new IMask(securitycode, {
        mask: '000',
      });


    },
    updateCardNumber(event) {
      this.cardNumber = event.target.value;
    },
    updateName(event) {
      this.name = event.target.value;
    },
    updateExpirationDate(event) {
      this.expirationDate = event.target.value;
    },
    updateCVV(event) {
      this.cvv = event.target.value;
    },
    async reserver(){
      console.log(this.panier[0].id_article)
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer le paiement',
        message: 'Confirmer le paiement ?',
        okButton: 'Confirmer',
      })
      if (ok) {
        if (this.panier[0].id_article !== undefined){
          for (let i = 0; i<this.panier.length;i++)
          {
            await this.createAchat({
              id_utilisateur: this.userCourant.id_utilisateur,
              id_article: this.panier[i].id_article,
              nom_article: this.panier[i].nom_article,
              nombre_articles: this.panier[i].nombre_articles
            })
            await this.deletePanierArticle(this.panier[i].id_panier)
            await this.updateUtilisateur({id:this.userCourant.id_utilisateur,nom:this.userCourant.nom,prenom:this.userCourant.prenom,mail:this.userCourant.adresse_mail,password:this.userCourant.mot_de_passe,point:this.userCourant.point_fidelite+Math.round(this.prix*0.8)})
          }
          await this.$router.push({
            path: "/profil"
          })
        }else{

          for (let i = 0; i<this.panier.length;i++)
          {
            await this.createReservation({
              id_utilisateur: this.userCourant.id_utilisateur,
              id_creneau: this.panier[i].id_creneau,
              nb: this.panier[i].nombre_articles
            })
            await this.deletePanierActivite(this.panier[i].id_panier)
            await this.updateUtilisateur({id:this.userCourant.id_utilisateur,nom:this.userCourant.nom,prenom:this.userCourant.prenom,mail:this.userCourant.adresse_mail,password:this.userCourant.mot_de_passe,point:this.userCourant.point_fidelite+Math.round(this.prix*0.8)})
          }
          await this.$router.push({
            path: "/profil"
          })
        }
      }

    },
    getPrixPanier(){
      if (this.panier.length ===1){
        this.prix= this.panier[0].prix
      }else {
        for (let i = 0; i < this.panier.length; i++) {
          this.prix += this.panier[i].prix
        }
      }
    },
  },



  mounted() {
    this.cardInfo()
    this.getPrixPanier()
    console.log(this.panier)
  }
}

</script>


<style scoped>

.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}


.activite-box{
  background-color: #F4F7FE;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 5px 5px 5px gray;

}

.row{
  display: flex;
  flex-direction: row;
  gap: 60px;
}

input{
  width: 100%;
  height: 40px;
  padding-left: 10px;
  font-size: 17px;
}

.container-champ{
  text-align: left;
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 50%;
  gap: 20px;
}


.button-payer {
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
  width: 15%;
  align-self: center;
  margin-top: 30Px;
}

.button-payer:disabled {
  background-color: #ccc;
  cursor: not-allowed;

}




</style>