
<template>
  <div>
    <PresentationAccueil/>
    <ProgrammeAccueil/>
    <CarteComponent/>
    <CarrouselAccueil/>
  </div>
</template>

<script>


import {mapState} from "vuex";
import ProgrammeAccueil from "@/components/ProgrammeAccueil.vue";
import PresentationAccueil from "@/components/PresentationAccueil.vue";
import CarrouselAccueil from "@/components/CarrouselAccueil.vue";
import CarteComponent from '@/components/CarteAccueil.vue';


export default {
  name: 'AccueilView',
  components : {
    CarrouselAccueil,
    ProgrammeAccueil,
    PresentationAccueil,
    CarteComponent

  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState('user',['userCourant'])

  },

  methods: {



  },


  mounted() {
  },

}
</script>


<style scoped>

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.role {
  display: flex;
  justify-content: space-around;
  width: 350px;
}

.role-container{
  width: auto;
  display: flex;
  justify-content: center;
  margin-top: 300px;
}

</style>