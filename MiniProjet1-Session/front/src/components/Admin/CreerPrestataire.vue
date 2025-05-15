<template>
  <div class="auth-container">

    <transition name="fade" mode="out-in">

      <!-- Register Form -->
      <div class="register-page">

        <div class="register-card">
          <button class="button-menu2" @click="$emit('return')">Retourner aux Prestataires</button>

          <form class="auth-form" @submit.prevent="registerin()">

            <div class="input-group">
              <input v-model="nomSociete" type="text" placeholder="Nom de société" required>
            </div>
            <div class="input-group">
            <select v-model="selectedUserId" required>
              <option value="" disabled selected>Choisir un utilisateur</option>
              <option v-for="utilisateur in listUsers" :key="utilisateur.id_utilisateur" :value="utilisateur.id_utilisateur">
                {{ utilisateur.nom }} {{ utilisateur.prenom }}
              </option>
            </select>
            </div>

            <button type="submit" class="auth-btn">Créer un prestataire</button>
          </form>

        </div>
      </div>
    </transition>
    <AlertDialog ref="alertDialog"></AlertDialog>
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>

  </div>
</template>

<script>


import AlertDialog from "@/components/AlertDialog.vue";
import {mapActions, mapState} from "vuex";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: 'CreerUtilisateur',
  components: {
    AlertDialog,
    ConfirmDialog
  },

  data() {
    return {

      nomSociete: null,
      listUsers: null,
      selectedUserId: '',

    }
  },

  computed: {
    ...mapState('user', ['users']),


  },

  methods: {
    ...mapActions('user', [ 'createPrestataire']),

    async registerin() {
      if (!this.nomSociete) {
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: 'Il faut remplir tous les champs',
          okButton: 'Ok',
        })
        return;
      }

      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer création',
        message: "Confirmer la création de compte",
        okButton: 'Ok',
      })
      if (ok){
        await this.createPrestataire({
          nom_societe: this.nomSociete,
          id_utilisateur: this.selectedUserId
        })
        this.$emit('return')
      }


    },

  },


  mounted() {
    console.log(this.users)
    this.listUsers = this.users.filter(u =>
        u.id_role === 2 && u.isprestataire === null)
    console.log(this.listUsers)
  },

}

</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}


.auth-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}


.register-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  padding-left: 200px;
  align-items: center;
  background: #f5f7fa;
  overflow: auto; /* Permet le scroll si le formulaire est trop long */
}

.register-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f7fa;
  z-index: 0;
}

/* Cartes de formulaire */
.login-card, .register-card {
  position: relative;
  z-index: 1;
  max-height: 95vh;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}


/* Typographie */
h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

/* Formulaires */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  position: relative;
}

input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

input:focus {
  border-color: #791c25;
  box-shadow: 0 0 0 1px rgb(121, 28, 37, 0.6);
  outline: none;
}

.password-group {
  margin-bottom: 5px;
}

.eye-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.eye-toggle img {
  width: 20px;
  height: auto;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.eye-toggle:hover img {
  opacity: 1;
}

/* Boutons */
.auth-btn {
  width: 100%;
  padding: 14px;
  background: #791c25;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.auth-btn:hover {
  background: #f1c40f;
  color: #000;
}

/* Liens de switch */
.switch-text {
  text-align: center;
  margin-top: 25px;
  color: #7f8c8d;
  font-size: 15px;
}

.switch-btn {
  background: none;
  border: none;
  color: #791c25;
  cursor: pointer;
  padding: 0 5px;
  font-size: 15px;
}

.switch-btn:hover {
  color: #f1c40f;
  text-decoration: underline;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .login-page::before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(4px);
  }

  .login-card, .register-card {
    padding: 25px;
    max-width: 90%;
    max-height: 90vh;
  }
}

@media (max-height: 700px) {
  .login-card, .register-card {
    transform: scale(0.95);
    max-height: 85vh;
  }
}

h2 {
  font-size: 24px;
  margin-bottom: 25px;
}

.auth-form {
  gap: 15px;
}

input {
  padding: 12px 14px;
}

.login-page::before {
  filter: blur(2px);
}

.input-group select {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
</style>