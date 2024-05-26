<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" sm="6">
        <v-card color="#F2F597">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                {{ latestCropName }} - {{ latestCropVar }}
              </v-list-item-title>
              <v-list-item-subtitle>AIR TEMPERATURE</v-list-item-subtitle>
              <v-divider></v-divider>
              <v-list-item-title class="display-2">{{
                latestTemp
              }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ tempMin }} - {{ tempMax }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="red"
              >mdi-temperature-celsius</v-icon
            >
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#AAD9BB">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                {{ latestCropName }} - {{ latestCropVar }}
              </v-list-item-title>
              <v-list-item-subtitle>HUMIDITY</v-list-item-subtitle>
              <v-divider></v-divider>
              <v-list-item-title class="display-2"
                >{{ latestHumid }}%</v-list-item-title
              >
              <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ humidMin }} -
                {{ humidMax }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="blue">mdi-weather-windy</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#86B6F6">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                {{ latestCropName }} - {{ latestCropVar }}
              </v-list-item-title>
              <v-list-item-subtitle>PH</v-list-item-subtitle>
              <v-divider></v-divider>
              <v-list-item-title class="display-2">{{
                latestPh
              }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ phMin }} - {{ phMax }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="yellow">mdi-thermometer</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#F3CCF3">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                {{ latestCropName }} - {{ latestCropVar }}
              </v-list-item-title>
              <v-list-item-subtitle>TDS</v-list-item-subtitle>
              <v-divider></v-divider>
              <v-list-item-title class="display-2"
                >{{ latestTds }}
              </v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ tdsMin }} - {{ tdsMax }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="green">mdi-water-percent</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#C6A969">
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                {{ latestCropName }} - {{ latestCropVar }}
              </v-list-item-title>
              <v-list-item-subtitle>WATER TEMPERATURE</v-list-item-subtitle>
              <v-divider></v-divider>
              <v-list-item-title class="display-2">{{
                latestWaterTemp
              }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold mb-1 text-center"
                >Required : {{ waterTempMin }} -
                {{ waterTempMax }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="red"
              >mdi-temperature-celsius</v-icon
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
      //for sensor values
      latestCropName: "",
      latestCropVar: "",
      latestTemp: 0,
      latestHumid: 0,
      latestPh: 0,
      latestTds: 0,
      latestWaterTemp: 0,

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
  