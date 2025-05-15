<template>
  <div id="app">
    <header class="header">
      <div class="hero">
        <img class="hero-image" alt="banniere" src="@/assets/bg.jpg" />
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">{{ $t('header.title') }}</h1>
          <p class="hero-subtitle">{{ $t('header.subtitle') }}</p>
        </div>
        <svg class="hero-wave" viewBox="0 0 1920 214" preserveAspectRatio="none">
          <path fill="white" d="M93 120C183.5 120 142.001 54.4995 324 65.9996C435.51 73.0455 500 148.901 656.5 86.9503C813 24.9996 894 130 958 120C1022 110 1016 60.0006 1120.5 44.5C1225 28.9994 1206 183.45 1536.5 86.9503C1600.18 68.3565 1724.39 122.598 1768.5 110C1953.33 57.2141 1927.5 0 1927.5 0V214.5H-4.49951L-35 13.5007C-35 13.5007 2.5 120 93 120Z"/>
        </svg>
      </div>
    </header>
    <div class="welcome-container">
      <div class="welcome-content">
        <p class="welcome-message">
          {{ $t('welcome.message') }}<strong>{{ $t('welcome.message2') }}</strong>{{ $t('welcome.message3') }}<strong>{{ $t('welcome.message4') }}</strong>{{ $t('welcome.message5') }}<strong>{{ $t('welcome.message6') }}</strong>{{ $t('welcome.message7') }}<strong>{{ $t('welcome.message8') }}</strong>{{ $t('welcome.message9') }}{{ $t('welcome.message10') }}<strong>{{ $t('welcome.message11') }}</strong>{{ $t('welcome.message12') }}<strong>{{ $t('welcome.message13') }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
};

</script>

<style scoped>
/* Styles de base */
.header {
  position: relative;
  width: 100%;
}

.hero {
  position: relative;
  height: 700px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  z-index: 2;
}

.hero-title {
  font-size: 40px;
  line-height: 1.4;
  font-weight: bold;
  margin-bottom: 25px;
}

.hero-subtitle {
  font-size: 30px;
  text-align: center;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  z-index: 2;
}

/* Section bienvenue */
.welcome-container {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.welcome-content {
  max-width: 1200px;
  margin: 50px 0 100px 0;
}

.welcome-message {
  font-size: 28px;
  text-align: center;
  line-height: 1.5;
}

.welcome-message strong {
  color: #791c25;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    height: 500px;
  }

  .hero-title {
    font-size: 32px;
    margin-bottom: 15px;
  }

  .hero-subtitle {
    font-size: 24px;
  }

  .welcome-message {
    font-size: 28px;
  }

  .welcome-container {
    padding: 20px;
  }

  .welcome-content {
    margin: 30px 0 60px 0;
  }
}
</style>