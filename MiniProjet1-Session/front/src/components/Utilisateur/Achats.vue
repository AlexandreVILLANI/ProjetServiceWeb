<template>
  <div >
    <div>
      <div class="container-reservations-filtre" >
        <div
            v-for="(p, i) in achats"
            :key="i"
            class="activite-box"
        >
          <p>
            {{p.nom_article}}
          </p>
          <p>
            {{p.nombre_articles}} unités
          </p>
          <p>
            En cours de livraison
          </p>
          <button @click="showArticle(p.id_article)">Voir article</button>




        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";



export default {
  name: 'Achats',
  components: {

  },

  data() {
    return {

    }
  },

  computed: {
    ...mapState('panier',["achats"]),
    ...mapState('user',["userCourant"])
  },

  methods: {
    showArticle(id){
      this.$router.push({
        name: "achatBoutique",
        params: {id},
      });
    },

    ...mapActions('panier', ["getAchats"]),

  },


  async mounted() {
    await this.getAchats(this.userCourant.id_utilisateur);

  }
}
</script>

<style>

</style>