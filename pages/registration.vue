<template>
  <v-container fluid>
    <v-img src="/tic-logo.png" style="width: 80px; height: 80px; position: absolute; top: 0;"></v-img>
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" md="6" class="d-none d-md-flex align-center justify-center">
        <v-list style="background-color: transparent; margin-left: 100px;" dark>
          <h1 style="text-align: center; margin-top: 0px;">The Internet Of Crops: Web-Based Monitoring for Smart Hydroponics</h1>
          <br><br>
          <p style="text-align: center;">"The Internet of Crops: Web-Based Monitoring for Smart Hydroponics.". The title describes a prototype that automates, monitors, and manually controls web-based crop planting.</p>
        </v-list>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card class="mt-5 pa-3" style="width: 350px; height: 450px; border-radius: 20px;" elevation="5" color="#36454F" dark>
          <v-col class="d-flex flex-column align-center justify-center">
            <v-img src="/tic-logo.png" style="width: 150px; height: 150px;"></v-img>
          </v-col>
          <v-card-text>
            <v-form @submit.prevent="confirmRegistration">
              <v-text-field v-model="username" label="Username" outlined dense></v-text-field>
              <v-text-field v-model="password" label="Password" outlined :type="show1 ? 'text' : 'password'" dense @click:append="show1 = !show1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"></v-text-field>
              <v-btn type="submit" color="success" block>Register</v-btn>
            </v-form>
            <br>
            <div class="text-center mt-3">
              Already have an account? <router-link to="/" style="color: white">Login here</router-link>
            </div>
          </v-card-text>
        </v-card>
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">{{ snackbar.message }}</v-snackbar>
      </v-col>
    </v-row>
    <!-- SUCCESS SNACKBAR -->
    <!-- <v-snackbar color="green" v-model="successSnackbar">
      {{ textSuccess }}
      <template v-slot:action="{ attrs }">
        <v-btn plain color="white" v-bind="attrs" @click="successSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar> -->
    <!-- ERROR SNACKBAR -->
    <!-- <v-snackbar color="red" v-model="errorSnackbar">
      {{ textError }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="errorSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar> -->
    <!-- CONFIRMATION DIALOG -->
    <v-dialog v-model="confirmationDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">Confirm Registration</v-card-title>
        <v-card-text>Are you sure you want to save this information?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="register">Yes</v-btn>
          <v-btn color="red darken-1" text @click="confirmationDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  layout: 'login',
  data() {
    return {
      show1: false,
      username: '',
      password: '',
      snackbar: {
        show: false,
        message: '',
        color: '',
        timeout: 3000 // 3 seconds
      },
      confirmationDialog: false,
    }
  },
  methods: {
    confirmRegistration() {
      this.confirmationDialog = true;
    },
    async register() {
      try {
        this.confirmationDialog = false;

        // Save user data directly to Firebase Realtime Database
        await firebase.database().ref("UsernamePassword").set({
          username: this.username,
          password: this.password,
          // Add other user data if needed
        });

        // Inform user of successful registration
        this.showSnackbar('Registration successful.', 'success');
      } catch (error) {
        // Handle registration error
        console.error('Error registering user:', error);

        // Provide detailed error message
        const errorMessage = error.message || 'Error registering user.';
        this.showSnackbar(errorMessage, 'error');
      }
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    }
  }
}
</script>




<style scoped>
.login-title {
  font-size: 16px;
  text-align: center;
  justify-content: center;
}
</style>
