<template>
  <div id="app">
    <Navbar
        v-if = "!$route.meta['hideNavBar']">
    </Navbar>
    <router-view/>
    <Footer
        v-if="!$route.meta['hideFooter']">
    </Footer>
  </div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

*{
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}
html, body {
  height: 100vh;
}
</style>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Navbar,
    Footer
  },
  methods: {
    ...mapActions('user', ['fetchSessionFromCookies'])
  },
  mounted() {
    this.fetchSessionFromCookies();
  }
};
</script>