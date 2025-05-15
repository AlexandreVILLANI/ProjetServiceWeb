<template>
  <div class="dashboard" :style="{ backgroundImage: backgroundUrl }">
    <header class="dashboard-header">
      <h1 class="dashboard-title">👋 Hello, {{ user.firstName }}</h1>
      <button @click="handleLogout" class="logout-btn">Logout</button>
    </header>

    <main class="dashboard-main">
      <div class="glass-card">
        <h2>👤 Your Profile</h2>
        <div class="user-info">
          <p><strong>Full Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>User ID:</strong> {{ user.id }}</p>
        </div>
      </div>
    </main>

    <footer class="dashboard-footer">
      <p>✨ Created with ❤️ by <span>Alexandre VILLANI</span> & <span>Alexis MARICHY</span></p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import bgImage from '@/assets/windows-xp.jpg'

export default {
  name: 'DashboardView',
  data() {
    return {
      user: {
        id: '',
        firstName: '',
        lastName: '',
        email: ''
      },
      backgroundUrl: `url(${bgImage})`
    }
  },
  mounted() {
    this.fetchUserData()
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          this.$router.push('/')
          return
        }

        const response = await axios.get('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.user = {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        this.$router.push('/')
      }
    },
    handleLogout() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap');

.dashboard {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #fff;
  font-family: 'Rubik', sans-serif;
  position: relative;
  padding: 2rem;
}

.dashboard::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  z-index: 0;
}

.dashboard > * {
  position: relative;
  z-index: 1;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: 600;
}

.logout-btn {
  padding: 0.6rem 1.2rem;
  background: #ff4c60;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;
}

.logout-btn:hover {
  background: #e43a4f;
  transform: scale(1.05);
}

.dashboard-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  color: #fff;
}

.user-info p {
  margin: 0.8rem 0;
}

.dashboard-footer {
  text-align: center;
  margin-top: 2rem;
  color: #ccc;
  font-size: 0.9rem;
}

.dashboard-footer span {
  color: #7fdbff;
  font-weight: bold;
}
</style>
