<template>
  <div class="auth-container">

    <transition name="fade" mode="out-in">

      <!-- Register Form -->
      <div class="register-page">

        <div class="register-card">
          <button class="button-menu2" @click="$emit('return')">Retourner aux Utilisateurs</button>

          <form class="auth-form" @submit.prevent="registerin()">
            <div class="input-group">
              <label for="role">Rôle</label>
              <select v-model.number="selectedRole" id="role" required>
                <option value="1">Utilisateur</option>
                <option value=2>Prestataire</option>
                <option value=3>Admin</option>
              </select>
            </div>
            <div class="input-group">
              <input v-model="prenom" type="text" placeholder="Prénom" required>
            </div>
            <div class="input-group">
              <input v-model="nom" type="text" placeholder="Nom" required>
            </div>
            <div class="input-group">
              <input v-model="mail2" type="email" placeholder="Adresse e-mail" required>
            </div>
            <div v-if="selectedRole===1" class="input-group">
              <input v-model.number="point" type="tel" placeholder="Point de fidélité" required @input="validateInput">
            </div>
            <div class="input-group password-group">
              <input v-model="password2" :type="passwordField2" placeholder="Mot de passe" required>
              <button type="button" @click="switchVisibility2" class="eye-toggle">
                <img :src="getImgUrl2()" alt="Visibilité mot de passe">
              </button>
            </div>
            <div class="input-group password-group">
              <input v-model="password3" :type="passwordField3" placeholder="Confirmer mot de passe" required>
              <button type="button" @click="switchVisibility3" class="eye-toggle">
                <img :src="getImgUrl3()" alt="Visibilité mot de passe">
              </button>
            </div>
            <button type="submit" class="auth-btn">Créer un compte</button>
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
      passwordField: "password",
      passwordField2: "password",
      passwordField3: "password",
      index: null,
      mail: null,
      password: null,
      prenom: null,
      nom: null,
      mail2: null,
      password2: null,
      password3: null,
      index2: null,
      selectedRole: 1,
      point: null
    }
  },

  computed: {
    ...mapState('user', ['users']),


  },

  methods: {
    ...mapActions('user', [ 'createUtilisateur']),
    switchVisibility2() {
      this.passwordField2 = this.passwordField2 === "password" ? "text" : "password";
      this.index2 = !this.index2;
    },
    switchVisibility3() {
      this.passwordField3 = this.passwordField3 === "password" ? "text" : "password";
      this.index3 = !this.index3;
    },
    getImgUrl2() {
      if (this.index2) {
        return require('@/assets/oeil.png');
      }
      return require('@/assets/oeil_barre.png');
    },
    getImgUrl3() {
      if (this.index3) {
        return require('@/assets/oeil.png');
      }
      return require('@/assets/oeil_barre.png');
    },
    validateInput() {
      this.point = this.point.replace(/[^0-9]/g, '');
    },





    async registerin() {
      if (!this.mail2 || !this.password2 || !this.nom || !this.prenom || !this.password3) {
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: 'Il faut remplir tous les champs',
          okButton: 'Ok',
        })
        return;
      }
      for (let i = 0; i < this.prenom.length; i++) {
        if (!isNaN(this.prenom[i])) {
          await this.$refs.alertDialog.show({
            title: 'Erreur champ',
            message: 'Le prenom doit uniquement contenir des lettres',
            okButton: 'Ok',
          })
          return;
        }
      }
      for (let i = 0; i < this.nom.length; i++) {
        if (!isNaN(this.nom[i])) {
          await this.$refs.alertDialog.show({
            title: 'Erreur champ',
            message: 'Le nom doit uniquement contenir des lettres',
            okButton: 'Ok',
          })
          return;
        }
      }
      let mail = false;
      for (let i = 0; i < this.mail2.length; i++) {
        if (this.mail2[i] === ("@")) {
          mail = true;
        }
      }
      if (mail === false) {
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "L'adresse mail n'est pas valide",
          okButton: 'Ok',
        })
        return;
      }
      if (this.password2 !== this.password3) {
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "Les mots de passe ne correspondent pas",
          okButton: 'Ok',
        })
        return;
      }
      if (this.selectedRole !==1){
        this.point = null;
      }
      const ok = await this.$refs.confirmDialog.show({
        title: 'Confirmer création',
        message: "Confirmer la création de compte",
        okButton: 'Ok',
      })
      if (ok){
        await this.createUtilisateur({
          nom: this.nom,
          prenom: this.prenom,
          mail: this.mail2,
          password: this.password2,
          point: this.point,
          id_role: this.selectedRole
        })
        this.$emit('return')
      }


    },

  },


  mounted() {

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