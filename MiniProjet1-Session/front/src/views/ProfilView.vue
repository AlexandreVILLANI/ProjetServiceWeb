
<template>
  <div>
    <div v-if="this.userCourant.id_role===1"><dashboard-utilisateur></dashboard-utilisateur></div>
    <div v-if="this.userCourant.id_role===2"><dashboard-prestataire></dashboard-prestataire></div>
    <div v-if="this.userCourant.id_role===3"><dashboard-admin></dashboard-admin></div>
  </div>

</template>




<script>

import {mapState} from "vuex";
import DashboardUtilisateur from "@/components/DashboardUtilisateur.vue";
import DashboardPrestataire from "@/components/DashboardPrestataire.vue";
import DashboardAdmin from "@/components/DashboardAdmin.vue";

export default {
  name: 'ProfilView',
  components: {
    DashboardUtilisateur,
    DashboardPrestataire,
    DashboardAdmin
  },

  data() {
    return {}
  },

  computed: {
    ...mapState('user',['userCourant'])
  },

  methods: {},


  mounted() {

  }
}


</script>

<style scoped>

</style>