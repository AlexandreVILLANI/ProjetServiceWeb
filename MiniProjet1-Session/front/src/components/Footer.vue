<template>
  <footer>
    <div class="footer-content">
      <div>
        <h3> {{ $t('footer.liens-rapide') }} </h3>
        <div class="footer-section">
          <router-link to="/">{{ $t('footer.accueil') }}</router-link>
          <router-link to="/activites">{{ $t('footer.activités') }}</router-link>
          <router-link to="/carte">{{ $t('footer.carte') }}</router-link>
          <router-link to="/boutique">{{ $t('footer.boutique') }}</router-link>
          <router-link to="">{{ $t('footer.histoire') }}</router-link>
        </div>
      </div>
      <div>
        <h3> {{ $t('footer.liens-utiles') }} </h3>
        <div class="footer-section">
          <router-link to="">{{ $t('footer.mentions-légales') }}</router-link>
          <router-link to="">{{ $t('footer.Politique') }}</router-link>
          <router-link to="">{{ $t('footer.Condition') }}</router-link>
          <router-link to="">{{ $t('footer.Contact') }}</router-link>
          <router-link to="">{{ $t('footer.Partenaire') }}</router-link>
        </div>
      </div>
      <div>
        <h3> {{ $t('footer.Newsletter') }} </h3>
        <div class="newsletter">
          <p>
            {{ $t('footer.abonner') }}
          </p>
          <form action="" method="post">
            <input type="text" placeholder="Email" name="email"/><br>
            <button type="submit">{{ $t('footer.sabonner') }}</button>
          </form>
        </div>
      </div>
    </div>
    <div class="bande">
      <div class="contenu-gauche">
        <p>&copy; 2024 Belforce - Tous droits réservés</p>
      </div>
      <div class="contenu-droite">
        <a href="https://www.facebook.com/belfort.tourisme.officiel/?locale=fr_FR" target="_blank">
          <i class="fi fi-brands-facebook bolder"></i>
        </a>
        <a href="https://x.com/belforttourisme" target="_blank">
          <i class="fi fi-brands-twitter bolder"></i>
        </a>
        <a href="https://www.instagram.com/belfort_tourisme/" target="_blank">
          <i class="fi fi-brands-instagram bolder"></i>
        </a>
        <a href="https://www.tiktok.com/@belforttourisme?lang=fr" target="_blank">
          <i class="fi fi-brands-tik-tok bolder"></i>
        </a>
        <a href="https://www.youtube.com/@Belfort-tourisme" target="_blank">
          <i class="fi fi-brands-youtube bolder"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://cdn-uicons.flaticon.com/2.6.0/uicons-brands/css/uicons-brands.css');

footer {
  --primary-color: #791c25;
  --secondary-color: #f1c40f;
  --dark-bg: #1d1d1d;
  --light-text: #ffffff;
  --transition-speed: 0.3s;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 3rem clamp(1rem, 10vw, 300px);
  margin-top: 6.25rem;
  min-height: 25rem;
  background-color: var(--dark-bg);
  color: var(--light-text);
}

.footer-content h3 {
  padding-top: 1.875rem;
  margin-bottom: 1.25rem;
  color: var(--secondary-color);
  font-size: 1.25rem;
  font-weight: 600;
}

.bande {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: var(--primary-color);
  padding: 1.25rem clamp(1rem, 10vw, 300px);
}

.contenu-gauche p {
  color: var(--light-text);
  font-style: italic;
  font-weight: 300;
  margin: 0;
}

.contenu-droite {
  display: flex;
  gap: 1.25rem;
}

.contenu-droite a {
  color: var(--light-text);
  text-decoration: none;
  transition: color var(--transition-speed) ease;
}

.contenu-droite a:hover,
.contenu-droite i:hover {
  color: var(--secondary-color);
}

.bolder {
  font-size: 1.25rem;
  font-weight: 700;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer-section a {
  position: relative;
  color: var(--light-text);
  text-decoration: none;
  font-size: 1.0625rem;
  padding: 0.625rem 0;
  width: fit-content;
  transition: color var(--transition-speed) ease;
}

.footer-section a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0.125rem;
  background-color: var(--secondary-color);
  transition: width var(--transition-speed) ease;
}

.footer-section a:hover {
  color: var(--secondary-color);
}

.footer-section a:hover::after {
  width: 100%;
}

.newsletter {
  padding-top: 10px;
}

.newsletter p {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.newsletter form {
  display: grid;
}

.newsletter input,
.newsletter button {
  padding: 0.9375rem;
  border: none;
  border-radius: 0.3125rem;
  font-size: 1rem;
  width: 100%;
  transition: all var(--transition-speed) ease;
}

.newsletter input {
  background-color: #f8f8f8;
}

.newsletter input:focus {
  outline: 0.125rem solid var(--secondary-color);
}

.newsletter button {
  background-color: var(--secondary-color);
  color: #000;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
}

.newsletter button:hover {
  background-color: var(--primary-color);
  color: var(--light-text);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    padding: 2rem 1.5rem;
    min-height: auto;
  }

  .bande {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .contenu-droite {
    margin-top: 0.5rem;
  }
}
</style>
<script setup lang="ts">



</script>

