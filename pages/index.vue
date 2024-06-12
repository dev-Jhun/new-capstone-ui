<template>
  <v-container fluid>
    <v-img src="/tic-logo.png" style="width: 80px; height: 80px;position: absolute; top: 0;"></v-img>
    <v-row justify="center" align="center" style="height: 100vh">
      
      
      <v-col cols="12" md="6" class="d-none d-md-flex align-center justify-center">
        
        <v-list style="background-color: transparent; margin-left: 100px;" dark>
          <h1 style="text-align: center; margin-top: 0px;">The Internet Of Crops: Web-Based Monitoring for Smart Hydroponics</h1>
          <br>
          <br>
        <p style="text-align: center;">"The Internet of Crops: Web-Based Monitoring for Smart Hydroponics.". The title describes a prototype that automates, monitors, and manually controls web-based crop planting.</p>
        </v-list>
        
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card class="mt-5 pa-3" style="width: 350px; height: 450px;border-radius: 20px;" elevation="5" color="#36454F" dark>
          
          <v-col class="d-flex flex-column align-center justify-center">
            <!-- <v-icon class="display-3" color="green">mdi-login</v-icon> -->
            <v-img src="/tic-logo.png" style="width: 150px; height: 150px;"></v-img>
            <!-- <v-card-title class="login-title" style="font-size: 1.7rem;">LOGIN</v-card-title> -->
          </v-col>

          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                :rules="nameRules"
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                outlined
                :type="show1 ? 'text' : 'password'"
                dense
                :rules="nameRules"
                @click:append="show1 = !show1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              ></v-text-field>
              <v-btn type="submit" color="success" block>LOGIN</v-btn>
            </v-form>
            <br>
            <div class="text-center mt-3">
              Don't have an account?
              <router-link to="/registration" style="color: white"
                >Register here</router-link
              >
            </div>
          </v-card-text>
        </v-card>
        <!-- <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">{{ snackbar.message }}</v-snackbar> -->
      </v-col>
    </v-row>
    <!-- SUCCESS SNACKBAR -->
    <v-snackbar color="green" v-model="successSnackbar">
      {{ textSuccess }}
      <template v-slot:action="{ attrs }">
        <v-btn
          plain
          color="white"
          v-bind="attrs"
          @click="successSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- ERROR SNACKBAR -->
    <v-snackbar color="red" v-model="errorSnackbar">
      {{ textError }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="errorSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  layout: "login",
  data() {
    return {
      show1: false,
      layout: "login",
      username: "",
      password: "",
      successSnackbar: false,
      errorSnackbar: false,
      textSuccess: "",
      textError: "",
      nameRules: [
        v => !!v || 'Field is required'
      ]
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.errorSnackbar = true;
        this.textError = "Username and password cannot be empty";
        return;
      }

      try {
        const snapshot = await firebase
          .database()
          .ref("UsernamePassword")
          .once("value");
        const userData = snapshot.val();

        if (
          userData.username === this.username &&
          userData.password === this.password
        ) {
          // Login successful
          // Redirect user to dashboard or another page
          this.$router.push("/dashboard");
          this.successSnackbar = true;
          this.textSuccess = "Successfully logged in";
        } else {
          // Username or password is incorrect
          console.error("Invalid username or password");
          this.errorSnackbar = true;
          this.textError = "Invalid username or password";
        }
      } catch (error) {
        // Handle login error
        console.error("Error logging in:", error.message);
        this.errorSnackbar = true;
        this.textError = "Error logging in. Please try again later.";
      }
    },
  },
};
</script>

<style scoped>
.login-title {
  font-size: 16px;
  text-align: center;
  justify-content: center;
}
</style>
