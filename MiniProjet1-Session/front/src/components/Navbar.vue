<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-logo">
        <router-link to="/" aria-label="Accueil">
          <img class="logo" src="@/assets/logo.svg" alt="Logo" loading="lazy"/>
        </router-link>
      </div>

      <ul class="navbar-links">
        <li><router-link to="/">{{ $t('navbar.accueil') }}</router-link></li>
        <li><router-link to="/activites">{{ $t('navbar.activites') }}</router-link></li>
        <li><router-link to="/carte">{{ $t('navbar.carte') }}</router-link></li>
        <li><router-link to="/boutique">{{ $t('navbar.boutique') }}</router-link></li>
      </ul>

      <div class="navbar-right">
        <button class="lang-switch" @click="toggleLang" aria-label="Changer la langue">
          <span><img src="@/assets/france.png" alt="drapeau de la France"></span> {{ $i18n.locale.toUpperCase() }}
        </button>
        <div class="profile-icon">
          <router-link v-if="userCourant.id_role === null" to="/Login" aria-label="Connexion">
            <img src="@/assets/login.png" alt="Login"/>
            <span>Se connecter</span>
          </router-link>
          <router-link v-else to="/profil" aria-label="Profil">
            <img src="@/assets/profil-de-lutilisateur.png" alt="Profil"/>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  height: 80px;
  background-color: #791c25;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo .logo {
  width: 60px;
  height: auto;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-links a {
  color: #fff;
  margin: 20px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  font-family: "Montserrat", "sans-serif";
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
}

.navbar-links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #f1c40f;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.navbar-links a:hover {
  color: #f1c40f;
}

.navbar-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.lang-switch {
  background: none;
  border: none;
  color: #fff;
  font-family: "Montserrat", "sans-serif";
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  padding: 0.5rem;
}

.lang-switch:hover {
  color: #f1c40f;
}
.lang-switch img {
  width: 17px;
  height: auto;
}

.profile-icon a {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.profile-icon img {
  width: 40px;
  height: 40px;
}

.profile-icon span {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 550;
  color: #fff;
}

.profile-icon:hover span {
  color: #f1c40f;
}

/* Responsive */
@media (max-width: 1200px) {
  .navbar-content {
    padding: 0 1.5rem;
  }

  .navbar-links {
    gap: 1rem;
  }

  .navbar-links a {
    font-size: 1rem;
  }
}

@media (max-width: 992px) {
  .navbar-content {
    padding: 0 1rem;
  }

  .navbar-links {
    gap: 0.8rem;
  }

  .navbar-right {
    gap: 1rem;
  }


}
</style>

<script>
import { mapState } from "vuex";

export default {
  name: 'Navbar',
  computed: {
    ...mapState('user', ['userCourant'])
  },
  methods: {
    toggleLang() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    }
  }
}
</script>
