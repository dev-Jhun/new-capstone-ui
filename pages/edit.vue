<template>
  <v-container>
    <!-- Plant Confirmation Dialog -->
    <v-dialog v-model="plantDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Plant</v-card-title>
        <v-card-text> Are you sure you want to update this crop? </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="updateItemConfirmed"
            >Yes</v-btn
          >
          <v-btn color="primary" text @click="plantDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined elevation="5"
            ><v-text-field
              v-model="formData.cropName"
              label="CROP NAME"
              required
              outlined
              elevation="5"
              :rules="nameRules"
            ></v-text-field
          ></v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined elevation="5"
            ><v-text-field
              v-model="formData.cropVariation"
              label="CROP VARIATION"
              outlined
              elevation="5"
              :rules="nameRules"
            ></v-text-field
          ></v-card>
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
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined elevation="5">
            <v-card-title class="d-flex justify-center align-center"
              >WATER TEMP</v-card-title
            >
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="formData.cropWaterMin"
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
                  v-model="formData.cropWaterMax"
                  label="MAX"
                  required
                  type="number"
                  min="1"
                  max="50"
                  outlined
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <br />
      <br />

      <v-row>
        <v-spacer></v-spacer>
        <v-col>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="green" dark large>UPDATE PRESET</v-btn>
          <v-btn to="/table" color="red" dark large>CANCEL PRESET</v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <br />
      <br />
      <br />
    </v-form>

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
  data() {
    return {
      formData: {
        cropName: "",
        cropVariation: "",
        cropTempMin: "",
        cropTempMax: "",
        cropTempMist: 0,
        tempcurrent: 0,
        cropHumidMin: "",
        cropHumidMax: "",
        cropHumidMist: 0,
        humidcurrent: 0,
        cropPhMin: "",
        cropPhMax: "",
        pumpPhHigh: 0,
        pumpPhLow: 0,
        pHcurrent: 0,
        cropTdsMin: "",
        cropTdsMax: "",
        cropTdsPumpA: 0,
        cropTdsPumpB: 0,
        tdscurrent: 0,
        cropWaterMin: "",
        cropWaterMax: "",
        watercurrent: 0,
      },
      successSnackbar: false,
      errorSnackbar: false,
      textSuccess: "",
      textError: "",
      plantDialog: false,
      nameRules: [(v) => !!v || "Field is required"],
    };
  },
  mounted() {
    const presetId = this.$route.query.id;
    if (presetId) {
      this.fetchPresetData(presetId);
    }
  },
  methods: {
    async fetchPresetData(presetId) {
      try {
        const snapshot = await firebase
          .database()
          .ref(`details/${presetId}`)
          .once("value");
        const presetData = snapshot.val();

        if (presetData) {
          this.formData = {
            cropName: this.trimQuotes(presetData.name),
            cropVariation: this.trimQuotes(presetData.variation),
            cropTempMin: this.trimQuotes(presetData.temperature?.min),
            cropTempMax: this.trimQuotes(presetData.temperature?.max),
            cropTempMist: 0,
            tempcurrent: 0,
            cropHumidMin: this.trimQuotes(presetData.humidity?.min),
            cropHumidMax: this.trimQuotes(presetData.humidity?.max),
            cropHumidMist: 0,
            humidcurrent: 0,
            cropPhMin: this.trimQuotes(presetData.pH?.min),
            cropPhMax: this.trimQuotes(presetData.pH?.max),
            pumpPhHigh: 0,
            pumpPhLow: 0,
            pHcurrent: 0,
            cropTdsMin: this.trimQuotes(presetData.tds?.min),
            cropTdsMax: this.trimQuotes(presetData.tds?.max),
            cropTdsPumpA: 0,
            cropTdsPumpB: 0,
            tdscurrent: 0,
            cropWaterMin: this.trimQuotes(presetData.watertemp?.min),
            cropWaterMax: this.trimQuotes(presetData.watertemp?.max),
            watercurrent: 0,
          };
        } else {
          this.textError = "No data available for this preset ID.";
          this.errorSnackbar = true;
        }
      } catch (error) {
        console.error("Error fetching preset data:", error);
        this.textError = "An error occurred while fetching preset data.";
        this.errorSnackbar = true;
      }
    },
    trimQuotes(str) {
      return typeof str === "string" ? str.replace(/['"]+/g, "") : str;
    },
    submitForm() {
      this.plantDialog = true;
    },
    async updateItemConfirmed() {
      const presetId = this.$route.query.id;
      if (!presetId) {
        this.textError = "Invalid preset ID.";
        this.errorSnackbar = true;
        return;
      }

      try {
        await firebase
          .database()
          .ref(`details/${presetId}`)
          .update({
            name: this.formData.cropName,
            variation: this.formData.cropVariation,
            temperature: {
              min: this.formData.cropTempMin,
              max: this.formData.cropTempMax,
            },
            humidity: {
              min: this.formData.cropHumidMin,
              max: this.formData.cropHumidMax,
            },
            pH: {
              min: this.formData.cropPhMin,
              max: this.formData.cropPhMax,
            },
            tds: {
              min: this.formData.cropTdsMin,
              max: this.formData.cropTdsMax,
            },
            water: {
              min: this.formData.cropWaterMin,
              max: this.formData.cropWaterMax,
            },
          });

        this.textSuccess = "Crop updated successfully!";
        this.successSnackbar = true;
        this.plantDialog = false;
      } catch (error) {
        console.error("Error updating crop:", error);
        this.textError = "An error occurred while updating the crop.";
        this.errorSnackbar = true;
        this.plantDialog = false;
      }
    },
  },
};
</script>
