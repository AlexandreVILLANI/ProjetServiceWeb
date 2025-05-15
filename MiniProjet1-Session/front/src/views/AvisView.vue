<template>
  <div class="avis-view-container">
    <div class="background-layer"></div>
    <div class="content-layer">
      <Avis :id="parseInt($route.params.id, 10)"/>
    </div>
  </div>
</template>

<script>

import Avis from '@/components/Avis.vue'

export default {
  name : 'AvisView',
  components: {
    Avis,
  },
  mounted() {

    const id_activite = parseInt(this.$route.params.id, 10);
    if (!isNaN(id_activite)) {
      this.getActiviteById(id_activite);
    } else {
      console.error("L'ID passé dans les paramètres de la route est invalide.");
    }
  },
};

</script>

<style scoped>
.avis-view-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img_login.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(4px);
  transform: scale(1.02);
  z-index: 1;
}

.content-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>