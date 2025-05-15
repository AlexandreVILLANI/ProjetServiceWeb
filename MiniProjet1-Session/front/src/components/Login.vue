<template>
  <div class="auth-container">
    <!-- Login Form -->
      <div v-if="login" class="login-page">
        <div class="login-card">
          <div class="logo-container">
            <router-link to="/">
              <img src="@/assets/logo.svg" alt="Logo de Belforce" class="logo">
            </router-link>
          </div>
          <h2>CONNEXION</h2>
          <form class="auth-form" @submit.prevent="signin()">
            <div class="input-group">
              <input v-model="mail" type="email" placeholder="Adresse e-mail" required>
            </div>
            <div class="input-group password-group">
              <input v-model="password" :type="passwordField" placeholder="Mot de passe" required>
              <button type="button" @click="switchVisibility" class="eye-toggle">
                <img :src="getImgUrl()" alt="Visibilité mot de passe">
              </button>
            </div>
            <button type="submit" class="auth-btn">Se connecter</button>
          </form>
          <div class="switch-text">
            Pas de compte ?
            <button @click="switchLogin()" class="switch-btn">Inscrivez-vous</button>
          </div>
        </div>
      </div>

      <!-- Register Form -->
      <div v-if="register" class="register-page">
        <div class="register-card">
          <div class="logo-container">
            <router-link to="/">
              <img src="@/assets/logo.svg" alt="Logo de Belforce" class="logo">
            </router-link>
          </div>
          <h2>INSCRIPTION</h2>
          <form class="auth-form" @submit.prevent="registerin()">
            <div class="input-group">
              <input v-model="prenom" type="text" placeholder="Prénom" required>
            </div>
            <div class="input-group">
              <input v-model="nom" type="text" placeholder="Nom" required>
            </div>
            <div class="input-group">
              <input v-model="mail2" type="email" placeholder="Adresse e-mail" required>
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
          <div class="switch-text">
            Vous avez un compte ?
            <button @click="switchLogin()" class="switch-btn">Connectez-vous</button>
          </div>
        </div>
      </div>
    <AlertDialog ref="alertDialog"></AlertDialog>
  </div>
</template>

<script>

import {getSession} from "@/services/login.services";
import {getUserFromSessionId} from "@/services/users.services"
import AlertDialog from "@/components/AlertDialog.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: 'Login',
  components: {
    AlertDialog
  },

  data() {
    return {
      login: true,
      register: false,
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
      index2: null
    }
  },

  computed: {
    ...mapState('user', ['userCourant']),
  },

  methods: {
    ...mapActions('user', ['loginUtilisateur', 'createUtilisateur']),
    switchVisibility() {
      this.passwordField = this.passwordField === "password" ? "text" : "password";
      this.index = !this.index;
    },
    switchVisibility2() {
      this.passwordField2 = this.passwordField2 === "password" ? "text" : "password";
      this.index2 = !this.index2;
    },
    switchVisibility3() {
      this.passwordField3 = this.passwordField3 === "password" ? "text" : "password";
      this.index3 = !this.index3;
    },
    getImgUrl() {
      if (this.index) {
        return require('@/assets/oeil.png');
      }
      return require('@/assets/oeil_barre.png');
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
    switchLogin() {
      this.mail = null;
      this.mail2 = null;
      this.nom = null;
      this.prenom = null;
      this.password = null;
      this.password2 = null;
      this.password3 = null;
      this.login = !this.login;
      this.register = !this.register;
    },
    async signin() {
      if (!this.mail || !this.password) {
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: 'Il faut remplir les deux champs',
          okButton: 'Ok',
        })
      }
      const session_id = await getSession(this.mail,this.password)
      this.$store.commit('user/SET_SESSION_ID',session_id.data)

      if (session_id.data.error === 1) {
        await this.$refs.alertDialog.show({
          title: 'Erreur champ',
          message: "L'adresse mail ou le mot de passe n'est pas bon",
          okButton: 'Ok',
        })
      } else {

        const user = await getUserFromSessionId();

        this.$store.commit('user/SET_USER', user.data)


        await this.$router.push({
          path: '/'
        })
      }


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
      await this.createUtilisateur({
        nom: this.nom,
        prenom: this.prenom,
        mail: this.mail2,
        password: this.password2,
        point: 0,
        id_role: 1
      })
      this.switchLogin()
    },
    //fonction du bouton temporaire

  },


  mounted() {

  },

}

</script>

<style scoped>
@import url('https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css');

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}


.auth-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}


.login-page, .register-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
}


.login-page::before {
  content: '';
  position: fixed;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)),
      url('@/assets/img_login.jpg') no-repeat center center/cover;
  background-attachment: fixed;
  filter: blur(8px);
  z-index: 0;
  transform: scale(1.02);
}

.register-page::before {
  content: '';
  position: fixed;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)),
  url('@/assets/img_login.jpg') no-repeat center center/cover;
  background-attachment: fixed;
  filter: blur(2px);
  z-index: 0;
  transform: scale(1.02);
}

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

h2 {
  margin-top: 0;
  text-align: center;
  margin-bottom: 25px;
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

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.logo {
  max-width: 120px;
  height: auto;
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

  .logo {
    max-width: 100px;
  }

  .logo-container {
    margin-bottom: 20px;
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
</style>