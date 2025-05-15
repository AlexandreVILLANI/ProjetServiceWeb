
<template>
  <div>
    <div class="container">
      <img class="img-avis" src="@/assets/img_login.jpg"/>
      <Payer :panier="$route.params.panier"/>
    </div>
  </div>

</template>




<script>



import Payer from "@/components/Payer.vue";

export default {
  name: 'PayerView',
  components: {
    Payer

  },


  data() {
    return {}
  },

  computed: {

  },

  methods: {},


  mounted() {
  }
}


</script>

<style>

.img-avis{
  width: 1920px;
  display: block;
  filter: blur(4px);

}

</style>