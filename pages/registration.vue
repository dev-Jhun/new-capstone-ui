<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="mt-5">
            <v-card-title class="text-center">Register</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field v-model="username" label="Username" outlined></v-text-field>
                <v-text-field v-model="password" label="Password" outlined type="password"></v-text-field>
                <v-btn type="submit" color="primary" block>Register</v-btn>
              </v-form>
              <div class="text-center mt-3">
                <router-link to="/login">Already have an account? Login here</router-link>
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
      async register() {
        try {
          // Register user with email and password
          await firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
  
          // Add user data to Firebase Realtime Database
          await firebase.database().ref('UsernamePassword').push({
            username: this.username,
            password: this.password,
            // Add other user data if needed
          })
  
          // Registration successful
          // Redirect user to dashboard or another page
          this.$router.push('/index')
          this.showSnackbar('Successfully registered', 'success')
        } catch (error) {
          // Handle registration error
          console.error('Error registering user:', error.message)
          this.showSnackbar('Error registering user', 'error')
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
  