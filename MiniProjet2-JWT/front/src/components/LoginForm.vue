<template>
  <div class="auth-container">
    <h1>{{ isLoginMode ? 'Welcome Back!' : 'Create Account' }}</h1>
    
    <form @submit.prevent="handleSubmit" class="auth-form">
      <!-- Email -->
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
      />

      <!-- Password -->
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />

      <!-- Name Fields (Register only) -->
      <div v-if="!isLoginMode" class="name-fields">
        <input
          type="text"
          v-model="firstName"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          v-model="lastName"
          placeholder="Last Name"
          required
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Processing...' : (isLoginMode ? 'Login' : 'Register') }}
      </button>
    </form>

    <p class="toggle-mode" @click="toggleMode">
      {{ isLoginMode ? 'Need an account? Register' : 'Already have an account? Login' }}
    </p>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { register, login, setAuthToken } from '@/services/api'

export default {
  name: 'LoginForm',
  data() {
    return {
      isLoginMode: true,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: '',
      loading: false
    }
  },
  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode
      this.resetForm()
    },
    resetForm() {
      this.error = ''
    },
    async handleSubmit() {
      this.loading = true
      this.error = ''

      try {
        if (this.isLoginMode) {
          // Login
          const response = await login(this.email, this.password)
          setAuthToken(response.data.accessToken)
          this.$router.push('/dashboard') // Vue 2 router access
        } else {
          // Register
          await register(this.firstName, this.lastName, this.email, this.password)
          alert('Registration successful! Please login.')
          this.toggleMode()
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'An error occurred'
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    // Redirect if already logged in
    if (localStorage.getItem('token')) {
      this.$router.push('/dashboard')
    }
  }
}
</script>
<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.name-fields {
  display: flex;
  gap: 1rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1; /* Makes inputs flexible in name-fields container */
}

button {
  padding: 0.75rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.toggle-mode {
  color: #42b983;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
}

.error {
  color: #ff4444;
  margin-top: 1rem;
}
</style>