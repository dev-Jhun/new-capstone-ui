<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card color="#CDE8E5" elevation="2" class="switch-card" light>
          <!-- Switch to toggle mode -->
          <v-row justify="center">
            <v-col cols="auto">
              <v-switch
                v-model="autoMode"
                label="AUTOMATIC MODE"
                @change="updateMode"
                class="switch-large"
                style="color: white; font-weight: bold"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#F2F597" class="pa-4" style="height:332px">
          <v-card-title class="d-flex justify-center">
            MISTING
          </v-card-title>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-subtitle>AIR TEMPERATURE</v-list-item-subtitle>
              <v-list-item-title class="display-2">{{ latestTemp }}</v-list-item-title>
            </v-list-item-content>

            <v-divider vertical></v-divider>

            <v-list-item-content>
              <v-list-item-subtitle style="padding-left: 1rem;">HUMIDITY</v-list-item-subtitle>
              <v-list-item-title class="display-2" style="padding-left: 1rem;">{{ latestHumid }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <br>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <v-switch
                v-model="isMistingRunningTemp"
                label="ON"
                @change="toggleMistingTemp"
                :disabled="autoMode"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#86B6F6" class="pa-4">
          <v-card-title class="d-flex justify-center"> PH PUMPS </v-card-title>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-subtitle>PH LEVEL</v-list-item-subtitle>
              <v-divider></v-divider>
              <v-list-item-title class="display-2">{{ latestPh }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <v-switch
                v-model="isPhPumpUpRunning"
                label="UP ON"
                @change="togglePhUpPump"
                :disabled="autoMode"
              />
              <v-switch
                v-model="isPhPumpDownRunning"
                label="DOWN ON"
                @change="togglePhDownPump"
                :disabled="autoMode"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#F3CCF3" class="pa-4">
          <v-card-title class="d-flex justify-center"> TDS PUMPS </v-card-title>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-subtitle>TDS LEVEL</v-list-item-subtitle>
              <v-divider></v-divider>
              <v-list-item-title class="display-2">{{ latestTds }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <v-switch
                v-model="isTdsPumpARunning"
                label="A ON"
                @change="toggleTdsAPump"
                :disabled="autoMode"
              />
              <v-switch
                v-model="isTdsPumpBRunning"
                label="B ON"
                @change="toggleTdsBPump"
                :disabled="autoMode"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#FDE49E" class="pa-4">
          <v-card-title class="d-flex justify-center">
            WATER PUMP
          </v-card-title>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-subtitle>WATER TEMPERATURE</v-list-item-subtitle>
              <v-divider></v-divider>
              <v-list-item-title class="display-2">{{ latestWaterTemp }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-row justify="center" align="center">
            <v-col cols="auto">
              <v-switch
                v-model="isTdsWaterPumpRunning"
                label="ON"
                @change="toggleTdsWaterPump"
                :disabled="autoMode"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar for success message -->
    <v-snackbar
      v-model="successSnackbar"
      color="green"
      bottom
      :timeout="snackbarTimeout"
    >
      {{ successMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="successSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Snackbar for error message -->
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      bottom
      :timeout="snackbarTimeout"
    >
      {{ errorMessage }}
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
      autoMode: false, // Default to manual mode
      snackbarTimeout: 5000, // Duration for the snackbar to remain visible (in milliseconds)

      // Snackbar properties
      successSnackbar: false,
      errorSnackbar: false,
      successMessage: "",
      errorMessage: "",

      //sensor values
      latestTemp: "0",
      latestHumid: "0",
      latestPh: "0",
      latestTds: "0",
      latestWaterTemp: "0",

      isMistingRunningTemp: false, // Flag to indicate if misting is running
      isPhPumpUpRunning: false, // Flag to indicate if phup is running
      isPhPumpDownRunning: false, // Flag to indicate if ph down is running
      isTdsPumpARunning: false, // Flag to indicate if solution a is running
      isTdsPumpBRunning: false, // Flag to indicate if solution b is running
      isTdsWaterPumpRunning: false, // Flag to indicate if water pump is running
    };
  },

  methods: {
    updateMode() {
      // Update mode value in Firebase
      firebase
        .database()
        .ref("mode/auto")
        .set(this.autoMode ? "1" : "0")
        .then(() => {
          // If mode update is successful, show success snackbar
          this.successSnackbar = true;
          this.successMessage = "Mode updated successfully";

          // If mode is switched to manual (mode 0), turn off all pumps
          if (!this.autoMode) {
            this.successSnackbar = true;
            this.successMessage = "All pumps stopped!";
            this.turnOffAllPumps();
          }
        })
        .catch((error) => {
          // If an error occurs during mode update, show error snackbar
          console.error("Error updating mode:", error);
          this.errorSnackbar = true;
          this.errorMessage = "Error updating mode";
        });
    },

    turnOffAllPumps() {
      // Turn off all pumps by calling each turn off method
      this.turnOffMistingTemp();
      this.turnOffPhUpPump();
      this.turnOffPhDownPump();
      this.turnOffTdsAPump();
      this.turnOffTdsBPump();
      this.turnOffTdsWaterPump();
    },

    // Toggle methods
    toggleMistingTemp() {
      this.isMistingRunningTemp
        ? this.turnOnMistingTemp()
        : this.turnOffMistingTemp();
    },

    togglePhUpPump() {
      this.isPhPumpUpRunning
        ? this.turnOnPhUpPump()
        : this.turnOffPhUpPump();
    },

    togglePhDownPump() {
      this.isPhPumpDownRunning
        ? this.turnOnPhDownPump()
        : this.turnOffPhDownPump();
    },

    toggleTdsAPump() {
      this.isTdsPumpARunning
        ? this.turnOnTdsAPump()
        : this.turnOffTdsAPump();
    },

    toggleTdsBPump() {
      this.isTdsPumpBRunning
        ? this.turnOnTdsBPump()
        : this.turnOffTdsBPump();
    },

    toggleTdsWaterPump() {
      this.isTdsWaterPumpRunning
        ? this.turnOnTdsWaterPump()
        : this.turnOffTdsWaterPump();
    },

    // Methods to turn on and off each pump
    turnOnMistingTemp() {
      this.updatePumpStatus("temp/tempmist", "1", "Misting turned on");
      this.updatePumpStatus("humid/humidmist", "1", "Misting turned on");
    },

    turnOffMistingTemp() {
      this.updatePumpStatus("temp/tempmist", "0", "Misting turned off");
      this.updatePumpStatus("humid/humidmist", "0", "Misting turned off");
    },

    turnOnPhUpPump() {
      this.updatePumpStatus("ph/pHpumpHigh", "1", "PH Up Pump turned on");
    },

    turnOffPhUpPump() {
      this.updatePumpStatus("ph/pHpumpHigh", "0", "PH Up Pump turned off");
    },

    turnOnPhDownPump() {
      this.updatePumpStatus("ph/pHpumpLow", "1", "PH Down Pump turned on");
    },

    turnOffPhDownPump() {
      this.updatePumpStatus("ph/pHpumpLow", "0", "PH Down Pump turned off");
    },

    turnOnTdsAPump() {
      this.updatePumpStatus("tds/tdspumpA", "1", "TDS Pump A turned on");
    },

    turnOffTdsAPump() {
      this.updatePumpStatus("tds/tdspumpA", "0", "TDS Pump A turned off");
    },

    turnOnTdsBPump() {
      this.updatePumpStatus("tds/tdspumpB", "1", "TDS Pump B turned on");
    },

    turnOffTdsBPump() {
      this.updatePumpStatus("tds/tdspumpB", "0", "TDS Pump B turned off");
    },

    turnOnTdsWaterPump() {
      this.updatePumpStatus("tds/tdswaterpump", "1", "Water Pump turned on");
    },

    turnOffTdsWaterPump() {
      this.updatePumpStatus("tds/tdswaterpump", "0", "Water Pump turned off");
    },

    updatePumpStatus(refPath, status, successMessage) {
      firebase
        .database()
        .ref(refPath)
        .set(status)
        .then(() => {
          // If pump status update is successful, show success snackbar
          this.successSnackbar = true;
          this.successMessage = successMessage;
        })
        .catch((error) => {
          // If an error occurs during pump status update, show error snackbar
          console.error(`Error updating ${refPath}:`, error);
          this.errorSnackbar = true;
          this.errorMessage = `Error updating pump status`;
        });
    },


    




  },

  mounted() {
    // Firebase listeners to update sensor values in real-time
    firebase.database().ref("temp/tempcurrent").on("value", (snapshot) => {
      this.latestTemp = snapshot.val();
    });

    firebase.database().ref("humid/humidcurrent").on("value", (snapshot) => {
      this.latestHumid = snapshot.val();
    });

    firebase.database().ref("ph/pHcurrent").on("value", (snapshot) => {
      this.latestPh = snapshot.val();
    });

    firebase.database().ref("tds/tdscurrent").on("value", (snapshot) => {
      this.latestTds = snapshot.val();
    });

    firebase.database().ref("watertemp/watercurrent").on("value", (snapshot) => {
      this.latestWaterTemp = snapshot.val();
    });


    // setInterval(this.toggleMistingTemp, 1000);
    // setInterval(this.togglePhUpPump, 1000);
    // setInterval(this.togglePhDownPump, 1000);
    // setInterval(this.toggleTdsAPump, 1000);
    // setInterval(this.toggleTdsBPump, 1000);
    // setInterval(this.toggleTdsWaterPump, 1000);


  },
};
</script>

<style>
.switch-card {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.switch-large .v-input--selection-controls__ripple {
  height: 34px;
  width: 34px;
}
</style>
