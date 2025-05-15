import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'; // Importation


Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App),
  store

}).$mount('#app')
