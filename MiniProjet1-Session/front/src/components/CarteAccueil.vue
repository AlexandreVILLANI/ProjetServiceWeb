<template>
  <div class="carte-component">
    <div class="titre-container">
      <h1 class="titre-programme-container">{{ $t('carte.evenement') }}
      </h1>
    </div>
    <div class="map-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script>
import { initMap, loadMarkersOnMap, loadZonesOnMap } from '@/services/carte.service.js';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'CarteComponent',
  mounted() {
    initMap('map');
    loadMarkersOnMap();
    loadZonesOnMap();
  },
};
</script>

<style scoped>
.titre-container {
  text-align: center;
  margin-bottom: 20px;
}

.titre-programme-container {
  font-size: 45px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: #333;
}

.carte-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
}

.map-container {
  margin-top: 20px;
  width: 80%;
  max-width: 1500px;
  height: 500px;
  border: 3px solid black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 0;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
