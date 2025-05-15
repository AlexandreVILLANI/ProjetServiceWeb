<!-- src/components/LineChart.vue -->

<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


export default {
  name: "LineChart",
  components: {
    Line
  },
  props: {
    activites: Array,
    reservations: Array
  },
  data() {
    return {
      chartData: {
        labels: this.activites.map(activite => activite.nom_activite), // Utilise le nom des activités comme labels
        datasets: [
          {
            label: "Nombre de vues par activité",
            data: this.reservations, // Utilise le nombre de vues (ou réservations)
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  },
  watch: {
    activites: {
      immediate: true,
      handler() {
        this.chartData.labels = this.activites.map(activite => activite.nom_activite);
        this.chartData.datasets[0].data = this.reservations;
      }
    },
    reservations: {
      immediate: true,
      handler() {
        this.chartData.datasets[0].data = this.reservations;
      }
    }
  }
};
</script>

<style scoped>
/* Tu peux ajouter un style spécifique pour ton graphique ici */
</style>
