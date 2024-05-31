<template>
  <v-container>
     <!-- Confirmation Dialog -->
     <v-dialog v-model="showCurrentConfirmDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Removal</v-card-title>
        <v-card-text>
          Are you sure you want to remove the current planted item? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="removeCurrentPlanted">Remove</v-btn>
          <v-btn color="error" text @click="showCurrentConfirmDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12" >
        <v-card color="#DFF5FF">
          <v-card-title class="headline d-flex justify-center"
            >Current Planted</v-card-title
          >
          <v-card-text>
            <v-container>
              <v-row class="pa-7">
                <v-col cols="12" md="8" sm="6">
                  <img alt="Crop Image" :src="latestCropImage" style="width: 80%;" />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <p><strong>Crop Name:</strong> {{ latestCropName }}</p>
                  <p>
                    <strong>Crop Variation:</strong>
                    {{ latestCropVar }}
                  </p>
                  <p><strong>Required Temperature:</strong>  {{ tempMin }} - {{ tempMax }} °C</p>
                  <p><strong>Required Humidity:</strong>  {{ humidMin }} - {{ humidMax }} %</p>
                  <p><strong>Required PH Level:</strong>  {{ phMin }} -  {{ phMax }}</p>
                  <p><strong>Required TDS Level:</strong>  {{ tdsMin }} -  {{ tdsMax }}</p>
                  <p>
                    <strong>Required Water Temperature:</strong>
                    {{ waterTempMin }} -  {{ waterTempMax }} °C
                  </p>
                </v-col>
                <v-col cols="12">
                  <h3>Description</h3>
                  <br />
                  <p style="text-indent: 20px; text-align: justify"> {{ latestCropDesc }}</p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="showCurrentConfirmDialog = true">Remove current planted</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" sm="6">
        <v-card color="#DFF5FF">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                AIR TEMPERATURE
              </v-list-item-title>
              <!-- <v-list-item-subtitle>AIR TEMPERATURE</v-list-item-subtitle> -->
              <!-- <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestTemp
                }}<span style="font-size: 25px"> °C </span></v-list-item-title
              >
              <!-- <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ tempMin }} - {{ tempMax }}</v-list-item-subtitle
              > -->
            </v-list-item-content>
            <v-icon class="display-3" color="blue">mdi-thermometer-high</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card color="#DFF5FF">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                HUMIDITY
              </v-list-item-title>
              <!-- <v-list-item-subtitle>HUMIDITY</v-list-item-subtitle> -->
              <!-- <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestHumid }}
                <span style="font-size: 25px">%</span></v-list-item-title
              >
              <!-- <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ humidMin }} - {{ humidMax }}</v-list-item-subtitle
              > -->
            </v-list-item-content>
            <v-icon class="display-3" color="blue">mdi-weather-windy</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card color="#DFF5FF">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                <!-- {{ latestCropName }} - {{ latestCropVar }} -->
                PH LEVEL
              </v-list-item-title>
              <!-- <v-list-item-subtitle>PH</v-list-item-subtitle>
              <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestPh }} <span style="font-size: 25px">pH</span>
              </v-list-item-title>
              <!-- <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ phMin }} - {{ phMax }}</v-list-item-subtitle
              > -->
            </v-list-item-content>
            <v-icon class="display-3" color="blue">mdi-ph</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card color="#DFF5FF">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                <!-- {{ latestCropName }} - {{ latestCropVar }} -->
                TDS LEVEL
              </v-list-item-title>
              <!-- <v-list-item-subtitle>TDS</v-list-item-subtitle>
              <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestTds }}
                <span style="font-size: 25px">ppm</span></v-list-item-title
              >
              <!-- <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ tdsMin }} - {{ tdsMax }}</v-list-item-subtitle
              > -->
            </v-list-item-content>
            <v-icon class="display-3" color="blue">mdi-beaker</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card color="#DFF5FF">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                <!-- {{ latestCropName }} - {{ latestCropVar }} -->
                WATER TEMPERATURE
              </v-list-item-title>
              <!-- <v-list-item-subtitle>WATER TEMPERATURE</v-list-item-subtitle>
              <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestWaterTemp }}
                <span style="font-size: 25px">°C </span></v-list-item-title
              >
              <!-- <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ waterTempMin }} - {{ waterTempMax }}</v-list-item-subtitle
              > -->
            </v-list-item-content>
            <v-icon class="display-3" color="blue"
              >mdi-water-thermometer</v-icon
            >
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      showCurrentConfirmDialog: false,
      //for sensor values
      latestCropName: "",
      latestCropVar: "",
      latestCropImage: "",
      latestCropDesc: "",
      latestTemp: 0,
      latestHumid: 0,
      latestPh: 0,
      latestTds: 0,
      latestWaterTemp: 0,


      currentPlantedItem: {},
      items: [],

      //for reference values
      // tempReference: 0,
      // humidReference: 0,
      // phReference: 0,
      // tdsReference: 0,
      // waterTempReference: 0,

      tempMin: 0,
      tempMax: 0,
      humidMin: 0,
      humidMax: 0,
      phMin: 0,
      phMax: 0,
      tdsMin: 0,
      tdsMax: 0,
      waterTempMin: 0,
      waterTempMax: 0,
    };
  },
  methods: {

    //-----------------------------------------------------------------------------------------------

    //to fetch crop latest data
    async fetchLatestCropName() {
      try {
        const cropNameRef = firebase.database().ref("crop");
        const snapshot = await cropNameRef.once("value");
        const data = snapshot.val();
        if (data && data.name !== undefined) {
          this.latestCropName = data.name;
          this.latestCropDesc = data.description;
          this.latestCropImage = data.image;
        }
      } catch (error) {
        console.error("Error fetching latest cropname data:", error);
      }
    },

    async fetchLatestCropVar() {
      try {
        const cropVarRef = firebase.database().ref("crop");
        const snapshot = await cropVarRef.once("value");
        const data = snapshot.val();
        if (data && data.name !== undefined) {
          this.latestCropVar = data.variation;
        }
      } catch (error) {
        console.error("Error fetching latest cropname data:", error);
      }
    },

    //to fetch temperature latest data
    async fetchLatestTemp() {
      try {
        const tempRef = firebase.database().ref("temp");
        const snapshot = await tempRef.once("value");
        const data = snapshot.val();
        if (data && data.tempcurrent !== undefined) {
          this.latestTemp = data.tempcurrent;
        }
      } catch (error) {
        console.error("Error fetching latest temperature data:", error);
      }
    },

    //to fetch humid latest data
    async fetchLatestHumid() {
      try {
        const humidRef = firebase.database().ref("humid");
        const snapshot = await humidRef.once("value");
        const data = snapshot.val();
        if (data && data.humidcurrent !== undefined) {
          this.latestHumid = data.humidcurrent;
        }
      } catch (error) {
        console.error("Error fetching latest Humid data:", error);
      }
    },

    //to fetch ph latest data
    async fetchLatestPh() {
      try {
        const PhRef = firebase.database().ref("ph");
        const snapshot = await PhRef.once("value");
        const data = snapshot.val();
        if (data && data.pHcurrent !== undefined) {
          this.latestPh = parseFloat(data.pHcurrent.toFixed(1));
        }
      } catch (error) {
        console.error("Error fetching latest Ph data:", error);
      }
    },

    //to fetch tds latest data
    async fetchLatestTds() {
      try {
        const tdsRef = firebase.database().ref("tds");
        const snapshot = await tdsRef.once("value");
        const data = snapshot.val();
        if (data && data.tdscurrent !== undefined) {
          this.latestTds = parseFloat(data.tdscurrent.toFixed(1));
        }
      } catch (error) {
        console.error("Error fetching latest Tds data:", error);
      }
    },

    //to fetch water temp latest data
    async fetchLatestWaterTemp() {
      try {
        const waterTempRef = firebase.database().ref("watertemp");
        const snapshot = await waterTempRef.once("value");
        const data = snapshot.val();
        if (data && data.watercurrent !== undefined) {
          this.latestWaterTemp = parseFloat(data.watercurrent.toFixed(1));
        }
      } catch (error) {
        console.error("Error fetching latest water temp data:", error);
      }
    },


    async removeCurrentPlanted(){
      Promise.all([
        firebase.database().ref("crop").set({
          name: "",
          variation: "",
          image: "",
          description: "",
        }),
        firebase.database().ref("humid").set({
          humidmin: "0",
          humidmax: "0",
          humidcurrent: 0,
          humidmist: "0",
        }),
        firebase.database().ref("ph").set({
          pHmin: "0",
          pHmax: "0",
          pHcurrent: 0,
          pHpumpHigh: "0",
          pHpumpLow: "0",
        }),
        firebase.database().ref("tds").set({
          tdsmin: "0",
          tdsmax: "0",
          tdspumpA: "0",
          tdspumpB: "0",
          tdscurrent: 0,
          tdswaterpump: "0",
        }),
        firebase.database().ref("temp").set({
          tempmin: "0",
          tempmax: "0",
          tempcurrent: 0,
          tempmist: "0",
        }),
        firebase.database().ref("watertemp").set({
          watercurrent: 0,
          watermax: "0",
          watermin: "0",
        }),
      ]);

      this.showCurrentConfirmDialog = false;

      this.refTempMin();
    this.refTempMax();
    this.refHumidMin();
    this.refHumidMax();
    this.refPhMin();
    this.refPhMax();
    this.refTdsMin();
    this.refTdsMax();
    this.refWaterTempMin();
    this.refWaterTempMax();
    },

    //------------------------------------------------------------------------------------------------------------

    //for sensor data reference

    async refTempMin() {
      try {
        const temperatureRef = firebase.database().ref("temp");
        const snapshot = await temperatureRef.once("value");
        const data = snapshot.val();
        if (data && data.tempmin !== undefined) {
          this.tempMin = data.tempmin;
        }
      } catch (error) {
        console.error("Error fetching latest ref temp data:", error);
      }
    },
    async refTempMax() {
      try {
        const temperatureRef = firebase.database().ref("temp");
        const snapshot = await temperatureRef.once("value");
        const data = snapshot.val();
        if (data && data.tempmax !== undefined) {
          this.tempMax = data.tempmax;
        }
      } catch (error) {
        console.error("Error fetching latest ref temp data:", error);
      }
    },

    async refHumidMin() {
      try {
        const humidityRef = firebase.database().ref("humid");
        const snapshot = await humidityRef.once("value");
        const data = snapshot.val();
        if (data && data.humidmin !== undefined) {
          this.humidMin = data.humidmin;
        }
      } catch (error) {
        console.error("Error fetching latest ref humid data:", error);
      }
    },
    async refHumidMax() {
      try {
        const humidityRef = firebase.database().ref("humid");
        const snapshot = await humidityRef.once("value");
        const data = snapshot.val();
        if (data && data.humidmax !== undefined) {
          this.humidMax = data.humidmax;
        }
      } catch (error) {
        console.error("Error fetching latest ref humid data:", error);
      }
    },

    async refPhMin() {
      try {
        const PHRef = firebase.database().ref("ph");
        const snapshot = await PHRef.once("value");
        const data = snapshot.val();
        if (data && data.pHmin !== undefined) {
          this.phMin = data.pHmin;
        }
      } catch (error) {
        console.error("Error fetching latest ref ph data:", error);
      }
    },
    async refPhMax() {
      try {
        const PHRef = firebase.database().ref("ph");
        const snapshot = await PHRef.once("value");
        const data = snapshot.val();
        if (data && data.pHmax !== undefined) {
          this.phMax = data.pHmax;
        }
      } catch (error) {
        console.error("Error fetching latest ref ph data:", error);
      }
    },

    async refTdsMin() {
      try {
        const TDSRef = firebase.database().ref("tds");
        const snapshot = await TDSRef.once("value");
        const data = snapshot.val();
        if (data && data.tdsmin !== undefined) {
          this.tdsMin = data.tdsmin;
        }
      } catch (error) {
        console.error("Error fetching latest ref tds data:", error);
      }
    },
    async refTdsMax() {
      try {
        const TDSRef = firebase.database().ref("tds");
        const snapshot = await TDSRef.once("value");
        const data = snapshot.val();
        if (data && data.tdsmax !== undefined) {
          this.tdsMax = data.tdsmax;
        }
      } catch (error) {
        console.error("Error fetching latest ref tds data:", error);
      }
    },

    async refWaterTempMin() {
      try {
        const waterTempRef = firebase.database().ref("watertemp");
        const snapshot = await waterTempRef.once("value");
        const data = snapshot.val();
        if (data && data.watermin !== undefined) {
          this.waterTempMin = data.watermin;
        }
      } catch (error) {
        console.error("Error fetching latest ref water temp data:", error);
      }
    },
    async refWaterTempMax() {
      try {
        const waterTempRef = firebase.database().ref("watertemp");
        const snapshot = await waterTempRef.once("value");
        const data = snapshot.val();
        if (data && data.watermax !== undefined) {
          this.waterTempMax = data.watermax;
        }
      } catch (error) {
        console.error("Error fetching latest ref water temp data:", error);
      }
    },
  },
  mounted() {
    //sensor valuess
    // this.fetchLatestTemp();
    // this.fetchLatestHumid();
    // this.fetchLatestPh();
    // this.fetchLatestTds();
    // this.fetchLatestWaterTemp();
    // this.fetchLatestCropName();
    // this.fetchLatestCropVar();

    // Call each fetch function every second
    setInterval(this.fetchLatestTemp, 1000);
    setInterval(this.fetchLatestHumid, 1000);
    setInterval(this.fetchLatestPh, 1000);
    setInterval(this.fetchLatestTds, 1000);
    setInterval(this.fetchLatestWaterTemp, 1000);
    setInterval(this.fetchLatestCropName, 1000);
    setInterval(this.fetchLatestCropVar, 1000);

    //reference values
    this.refTempMin();
    this.refTempMax();
    this.refHumidMin();
    this.refHumidMax();
    this.refPhMin();
    this.refPhMax();
    this.refTdsMin();
    this.refTdsMax();
    this.refWaterTempMin();
    this.refWaterTempMax();

  },
};
</script>
  
  
  <style scoped>
</style>
  