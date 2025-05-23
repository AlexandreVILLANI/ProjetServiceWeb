import axios from 'axios'

const API_URL = 'http://localhost:3000/auth/'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const register = (firstName, lastName, email, password) => {
  return api.post('signup', {
    firstName,
    lastName,
    emailId: email,
    password
  })
}

export const login = (email, password) => {
  return api.post('signin', {
    emailId: email,
    password
  })
}

export const setAuthToken = (token) => {
    console.log("caca")
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('token', token)
  } else {
    delete api.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
  }
}