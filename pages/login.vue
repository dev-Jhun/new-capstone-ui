<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="mt-5">
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="username" label="Email" outlined></v-text-field>
                <v-text-field v-model="password" label="Password" outlined type="password"></v-text-field>
                <v-btn type="submit" color="primary" block>Login</v-btn>
              </v-form>
              <div class="text-center mt-3">
                <router-link to="/registration">Don't have an account? Register here</router-link>
              </div>
            </v-card-text>
          </v-card>
          <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">{{ snackbar.message }}</v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import firebase from '~/plugins/firebase'
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        snackbar: {
          show: false,
          message: '',
          color: '',
          timeout: 3000 // 3 seconds
        }
      }
    },
    methods: {
      async login() {
        try {
          const snapshot = await firebase.database().ref('UsernamePassword').once('value')
          const userData = snapshot.val()
  
          if (userData.username === this.username && userData.password === this.password) {
            // Login successful
            // Redirect user to dashboard or another page
            this.$router.push('/dashboard')
            this.showSnackbar('Successfully logged in', 'success')
          } else {
            // Username or password is incorrect
            console.error('Invalid username or password')
            this.showSnackbar('Invalid username or password', 'error')
          }
        } catch (error) {
          // Handle login error
          console.error('Error logging in:', error.message)
          this.showSnackbar('Error logging in', 'error')
        }
      },
      showSnackbar(message, color) {
        this.snackbar.message = message
        this.snackbar.color = color
        this.snackbar.show = true
      }
    }
  }
  </script>
  