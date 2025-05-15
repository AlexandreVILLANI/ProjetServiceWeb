<template>
  <div >
    <confirm-dialogue ref="confirmDialog"></confirm-dialogue>
    <AlertDialog ref="alertDialog"></AlertDialog>

    <div>
      <h2 v-if="showPanierArticle">Panier article</h2>
      <h2 v-if="!showPanierArticle">Aucun article dans le panier</h2>
      Vous avez {{this.userCourant.point_fidelite}} points de fidélité
      <div class="container-reservations-filtre" >
        <div
            v-for="(p, i) in panier_article"
            :key="i"
            class="activite-box"
        >
          <p>
            {{p.nom_article}}
          </p>
          <p>
            {{p.nombre_articles}} unités
          </p>
          <div>
            <div style="display: flex;justify-content: center;gap: 5px">{{p.prix}}<p v-if="p.payment===1"> €</p> <p v-if="p.payment ===2"> point</p></div>
          </div>

          <button @click="payerArticle(i)">Payer</button>
          <button @click="supprimerPanierArticle(i)">Supprimer</button>

        </div>

      </div>
    </div>
    <hr />

    <div>
      <h2 v-if="showPanierActivite">Panier activité</h2>
      <h2 v-if="!showPanierActivite">Aucune activité dans le panier</h2>

      <div class="container-reservations-filtre" >
        <div
            v-for="(p, i) in panier_activite"
            :key="i"
            class="activite-box"
        >
          <p>
            {{p.nom_activite}}
          </p>
          <p>
            {{p.nombre_articles}} places
          </p>
          <p>
            {{p.prix}} €
          </p>

          <button @click="payerActivite(i)">Payer</button>
          <button @click="supprimerPanierActivite(i)">Supprimer</button>

        </div>
      </div>
      <button v-if="showPanierActivite || showPanierArticle" @click="payerToutActivite">Payer tout</button>
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import ConfirmDialogue from "@/components/ConfirmDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";



export default {
  name: 'Panier',
  components: {
    AlertDialog,
    ConfirmDialogue,

  },

  data() {
    return {
      showPanierActivite: true,
      showPanierArticle: true,
    }
  },

  computed: {
    ...mapState('panier',["panier_activite","panier_article"]),
    ...mapState('user',["userCourant"])
  },

  methods: {

    ...mapActions('panier',["getPanierActivite","deletePanierActivite","getPanierArticle","deletePanierArticle","createAchat"]),
    ...mapActions('user',['updateUtilisateur']),

    async supprimerPanierActivite(i){
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer la supression',
        message: 'Confirmer la supression ?',
        okButton: 'Confirmer',
      })
      if (ok) {
        await this.deletePanierActivite(this.panier_activite[i].id_panier)
        await this.getPanierActivite(this.userCourant.id_utilisateur)
      }
    },

    async supprimerPanierArticle(i){
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer la supression',
        message: 'Confirmer la supression ?',
        okButton: 'Confirmer',
      })
      if (ok) {
        await this.deletePanierArticle(this.panier_article[i].id_panier)
        await this.getPanierArticle(this.userCourant.id_utilisateur)
      }
    },
    payerActivite(i){
      let panier = [this.panier_activite[i]]
      this.$router.push({
            name: "payer",
            params : {panier}
          }
      )
    },

    async payerArticle(i){
      let panier = [this.panier_article[i]]
      if (panier[0].payment ===2){
        if (this.userCourant.point_fidelite < panier[0].prix){
          await this.$refs.alertDialog.show({
            title: 'Erreur prix',
            message: "Vous n'avez pas assez de point de fidélité pour effectuer cette achat",
            okButton: 'Ok',
          })
          return
        }
        const ok = await this.$refs.confirmDialog.show({
          title: "Confirmer l'achat",
          message:  "Confirmer l'achat",
          okButton: 'Confirmer',
        })
        if (ok) {
          await this.createAchat({
            id_utilisateur: this.userCourant.id_utilisateur,
            id_article: panier[0].id_article,
            nom_article: panier[0].nom_article,
            nombre_articles: panier[0].nombre_articles
          })
          await this.deletePanierArticle(panier[0].id_panier)
          await this.getPanierArticle(this.userCourant.id_utilisateur)
          await this.updateUtilisateur({
            id: this.userCourant.id_utilisateur,
            nom: this.userCourant.nom,
            prenom: this.userCourant.prenom,
            mail: this.userCourant.adresse_mail,
            password: this.userCourant.mot_de_passe,
            point: this.userCourant.point_fidelite - panier[0].prix
          })
        }
      }else {
        this.$router.push({
              name: "payer",
              params: {panier}
            }
        )
      }
    },
    payerToutActivite(){
      let panier = this.panier_activite
      this.$router.push({
            name: "payer",
            params : {panier}
          }
      )
    },


  },


  async mounted() {
    await this.getPanierActivite(this.userCourant.id_utilisateur);
    await this.getPanierArticle(this.userCourant.id_utilisateur);
    console.log(this.panier_article)

    if (!this.panier_activite || this.panier_activite.length === 0) {
      this.showPanierActivite = false;
    }

    if (!this.panier_article || this.panier_article.length === 0) {
      this.showPanierArticle = false;
    }
  }
}
</script>

<style>

</style>