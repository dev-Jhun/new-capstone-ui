<template>
  <v-container class="bordered-container">
    <v-form @submit.prevent="submitForm">
      <!-- <p style="text-align: center">
        Keep your reference value within the min and max range to avoid errors.
        Thanks!
      </p> -->
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4" outlined elevation="5">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.cropName"
                  label="CROP NAME"
                  required
                  outlined
                  elevation="5"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.cropVariation"
                  label="CROP VARIATION"
                  outlined
                  elevation="5"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined elevation="5">
            <v-card-title class="d-flex justify-center align-center"
              >TEMPERATURE</v-card-title
            >
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.cropTempMin"
                  label="MIN"
                  required
                  type="number"
                  min="1"
                  max="50"
                  outlined
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.cropTempMax"
                  label="MAX"
                  required
                  type="number"
                  min="1"
                  max="50"
                  outlined
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field
                  v-model="formData.cropTempRef"
                  label="REFERENCE"
                  required
                  type="number"
                  min="1"
                  max="5"
                  outlined
                ></v-text-field>
              </v-col> -->
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined elevation="5">
            <v-card-title class="d-flex justify-center align-center"
              >HUMIDITY</v-card-title
            >
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.cropHumidMin"
                  label="MIN"
                  required
                  type="number"
                  min="1"
                  max="100"
                  outlined
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.cropHumidMax"
                  label="MAX"
                  required
                  type="number"
                  min="1"
                  max="100"
                  outlined
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field
                  v-model="formData.cropHumidRef"
                  label="REFERENCE"
                  required
                  type="number"
                  min="1"
                  max="100"
                  outlined
                ></v-text-field>
              </v-col> -->
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined elevation="5">
            <v-card-title class="d-flex justify-center align-center"
              >PH LEVEL</v-card-title
            >
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.cropPhMin"
                  label="MIN"
                  required
                  type="number"
                  min="1"
                  max="14"
                  outlined
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.cropPhMax"
                  label="MAX"
                  required
                  type="number"
                  min="1"
                  max="14"
                  outlined
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field
                  v-model="formData.cropPhRef"
                  label="REFERENCE"
                  required
                  type="number"
                  min="1"
                  max="14"
                  outlined
                ></v-text-field>
              </v-col> -->
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined elevation="5">
            <v-card-title class="d-flex justify-center align-center"
              >TDS LEVEL</v-card-title
            >
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.cropTdsMin"
                  label="MIN"
                  required
                  type="number"
                  min="1"
                  max="5000"
                  outlined
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.cropTdsMax"
                  label="MAX"
                  required
                  type="number"
                  min="1"
                  max="5000"
                  outlined
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field
                  v-model="formData.cropTdsRef"
                  label="REFERENCE"
                  required
                  type="number"
                  min="1"
                  max="5000"
                  outlined
                ></v-text-field>
              </v-col> -->
            </v-row>
          </v-card>
        </v-col>

        <!-- <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined elevation="5">
            <v-card-title class="d-flex justify-center align-center"
              >WATER TEMPERATURE</v-card-title
            >
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.cropWaterTempRef"
                  label="SUGGESTED"
                  required
                  type="number"
                  min="1"
                  max="50"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col> -->
      </v-row>

      <br />
      <br />

      <v-row>
        <v-spacer></v-spacer>
        <v-col>
          <v-spacer></v-spacer>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <v-btn type="submit" color="green" dark large>SAVE PRESET</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn to="/dashboard" color="red" dark large
                >CANCEL PRESET</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <br />
      <br />
      <br />
    </v-form>

    <!-- Display latest data -->
    <!-- <div v-if="latestUser">
      <h2>Latest Data</h2>
      <p>Crop Name: {{ latestUser.cropName }}</p>
      <p>Crop Variation: {{ latestUser.cropVariation }}</p>
      <p>Crop Temp: {{ latestUser.cropTemp }}</p>
      <p>Crop Humid: {{ latestUser.cropHumid }}</p>
      <p>Crop Ph: {{ latestUser.cropPh }}</p>
      <p>Crop Tds: {{ latestUser.cropTds }}</p>
      <p>Crop Water temp: {{ latestUser.cropWaterTemp }}</p>
    </div> -->

    <!-- SUCCESS SNACKBAR     -->
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

    <!-- ERROR SNACKBAR     -->
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
  data() {
    return {
      formData: {
        // Initialize form data with default values
        cropName: "",
        cropVariation: "",

        tempcurrent: 0,
        cropTempMin: "",
        cropTempMax: "",

        humidcurrent: 0,
        cropHumidMin: "",
        cropHumidMax: "",

        pHcurrent: 0,
        cropPhMin: "",
        cropPhMax: "",

        tdscurrent: 0,
        cropTdsMin: "",
        cropTdsMax: "",


        mistTemp: "0",
        mistHumid: "0",
        pumpPhLow: "0",
        pumpPhHigh: "0",
        pumpTdsA: "0",
        pumpTdsB: "0",
      },
      successSnackbar: false,
      errorSnackbar: false,
      textSuccess: "",
      textError: "",

      nameRules: [
        v => !!v || 'Field is required'
      ]
    };
  },
  mounted() {
    // Fetch preset data based on preset ID from Firebase
    // const presetId = this.$route.query.id;
    // if (presetId) {
    //   this.fetchPresetData(presetId);
    // }
  },
  methods: {
    // async fetchPresetData(presetId) {
    //   try {
    //     // Retrieve preset data from Firebase based on preset ID
    //     const snapshot = await firebase.database().ref(`crop/${presetId}`).once('value');
    //     const presetData = snapshot.val();
    //     if (presetData) {
    //       // If preset data exists, set the form data with preset values
    //       this.formData = {
    //         cropName: presetData.cropName || "",
    //         cropVariation: presetData.cropVariation || "",
    //         cropTempMin: presetData.cropTempMin || "25",
    //         cropTempMax: presetData.cropTempMax || "30",
    //         cropTempRef: presetData.cropTempRef || "28",
    //         cropHumidMin: presetData.cropHumidMin || "50",
    //         cropHumidMax: presetData.cropHumidMax || "55",
    //         cropHumidRef: presetData.cropHumidRef || "53",
    //         cropPhMin: presetData.cropPhMin || "5",
    //         cropPhMax: presetData.cropPhMax || "8",
    //         cropPhRef: presetData.cropPhRef || "7",
    //         cropTdsMin: presetData.cropTdsMin || "700",
    //         cropTdsMax: presetData.cropTdsMax || "1000",
    //         cropTdsRef: presetData.cropTdsRef || "800",
    //       };
    //     }
    //   } catch (error) {
    //     console.error("Error fetching preset data: ", error);
    //     // Optionally, display an error message to the user
    //   }
    // },
    async submitForm() {
      if (!this.formData.cropName || !this.formData.cropTempMin || !this.formData.cropTempMax || 
          !this.formData.cropHumidMin || !this.formData.cropHumidMax || 
          !this.formData.cropPhMin || !this.formData.cropPhMax || 
          !this.formData.cropTdsMin || !this.formData.cropTdsMax) {
        this.errorSnackbar = true;
        this.textError = "Please fill in all required fields!";
        return;
      }
      try {
        // Specify the path to the desired table
        const cropRef = firebase.database().ref("details");

        // Construct the data object
        const cropData = {
          name: this.formData.cropName,
          variation: this.formData.cropVariation,
          // watertemp: this.formData.cropWaterTempRef,
          temperature: {
            min: this.formData.cropTempMin,
            max: this.formData.cropTempMax,
            // ref: this.formData.cropTempRef,
            tempmist: this.formData.mistTemp,
            tempcurrent: this.formData.tempcurrent,
          },
          humidity: {
            min: this.formData.cropHumidMin,
            max: this.formData.cropHumidMax,
            // ref: this.formData.cropHumidRef,
            humidmist: this.formData.mistHumid,
            humidcurrent: this.formData.humidcurrent,
          },
          pH: {
            min: this.formData.cropPhMin,
            max: this.formData.cropPhMax,
            // ref: this.formData.cropPhRef,
            pHpumpHigh: this.formData.pumpPhHigh,
            pHpumpLow: this.formData.pumpPhLow,
            pHcurrent: this.formData.pHcurrent,
          },
          tds: {
            min: this.formData.cropTdsMin,
            max: this.formData.cropTdsMax,
            // ref: this.formData.cropTdsRef,
            tdspumpA: this.formData.pumpTdsA,
            tdspumpB: this.formData.pumpTdsB,
            tdscurrent: this.formData.tdscurrent,
          },
        };

        // Save the entire crop data object at once
        await cropRef.push(cropData);

        console.log("Data added successfully!");
        this.successSnackbar = true;
        this.textSuccess = "Presets Successfully Added!";
      } catch (error) {
        console.error("Error adding data: ", error);
        this.errorSnackbar = true;
        this.textError = "Failed to add presets!";
      }
    },
  },
};
</script>

<style>
.bordered-container {
  padding: 20px; /* Add padding to give some space between content and border */
  border-radius: 2px;
  background-color: #DDE6ED;
}
</style>
