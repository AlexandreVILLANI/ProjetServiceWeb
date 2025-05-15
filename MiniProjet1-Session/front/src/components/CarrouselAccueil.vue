<template >
  <div class="container">
    <h1 class="titre-programme-container">{{ $t('prestataire') }}
    </h1>
      <carousel-3d :disable3d="true"  :space="380" :autoplay="true" :autoplayTimeout="3000" :controls-visible="true" :width="350" :height="350">
        <slide :index="0">
          <img src="@/assets/prestaitre_logo/territoire_de_befort.jpg">
        </slide>
        <slide :index="1">
          <img src="@/assets/prestaitre_logo/la_poudriere.jpg">
        </slide>
        <slide :index="2">
          <img src="@/assets/prestaitre_logo/delle_animation.jpg">
        </slide>
        <slide :index="3">
          <img src="@/assets/prestaitre_logo/pathe.jpg">
        </slide>
        <slide :index="4">
          <img src="@/assets/prestaitre_logo/kinepolis.jpg">
        </slide>
        <slide :index="5">
          <img src="@/assets/prestaitre_logo/grrranit.jpg">
        </slide>
        <slide :index="6">
          <img src="@/assets/prestaitre_logo/seine_zoo.jpg">
        </slide>
        <slide :index="7">
          <img src="@/assets/prestaitre_logo/universal_music_group.jpg">
        </slide>
        <slide :index="8">
          <img src="@/assets/prestaitre_logo/sony_music.jpg">
        </slide>
      </carousel-3d>
  </div>
</template>


<script>

import { Carousel3d , Slide} from 'vue-carousel-3d';

export default {
  name: 'CarrouselAccueil',

  components: {
    Carousel3d ,
    Slide
  },

  data() {
    return {}
  },

  computed: {

  },

  methods: {

  },

  mounted() {

  },
}
</script>


<style scoped>
.container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #ffffff;
  padding: 30px 220px 50px 220px;
}

.titre-programme-container{
  text-align: center;
  font-size: 45px;
  font-weight: bold;
  margin-bottom: 40px;
}

</style>