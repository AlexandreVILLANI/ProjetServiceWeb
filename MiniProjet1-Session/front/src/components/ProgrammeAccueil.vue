<template>
  <div class="programme-section">
    <h1 class="titre-section">{{ $t('programme.programme') }}</h1>

    <div class="activite">
      <div class="activite-image">
        <img src="@/assets/image-restauration.jpg" alt="Restauration" />
      </div>
      <div class="activite-texte">
        <h2>{{ $t('programme.restauration') }}</h2>
        <p>{{ $t('programme.presentation-programme') }}</p>
      </div>
    </div>

    <div class="activite reverse">
      <div class="activite-texte">
        <h2>{{ $t('programme.culture-patrimoine') }}</h2>
        <p>{{ $t('programme.presentation-programme2') }}</p>
      </div>
      <div class="activite-image">
        <img src="@/assets/image-citadelle.jpg" alt="Culture et Patrimoine" />
      </div>
    </div>

    <div class="activite">
      <div class="activite-image">
        <img src="@/assets/image-sport.png" alt="Activités sportives" />
      </div>
      <div class="activite-texte">
        <h2>{{ $t('programme.sport') }}</h2>
        <p>{{ $t('programme.presentation-programme3') }}</p>
      </div>
    </div>

    <div class="activite reverse">
      <div class="activite-texte">
        <h2>{{ $t('programme.musique-concert') }}</h2>
        <p>{{ $t('programme.presentation-programme4') }}</p>
      </div>
      <div class="activite-image">
        <img src="@/assets/image-concert.jpg" alt="Concerts et musique" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.programme-section {
  background-color: #F4F7FE;
  padding: 3rem clamp(1rem, 10vw, 300px)  ;
}

.titre-section {
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: bold;
  color: #333;
  margin-bottom: 3rem;
}

.activite {
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: center;
}

.activite-image {
  flex: 1;
}

.activite-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

.activite-texte {
  flex: 1;
}

.activite h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.activite p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

/* Version mobile */
@media (max-width: 900px) {
  .activite {
    flex-direction: column;
    gap: 1.5rem;
  }

  .activite.reverse {
    flex-direction: column;
  }

  .activite-image {
    width: 100%;
  }

  .activite h2 {
    font-size: 1.5rem;
  }

  .activite p {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .programme-section {
    padding: 2rem 1rem;
  }
}
</style>

<script setup>
//import {Utils, addFadeIn} from '@/assets/js/animation'
</script>