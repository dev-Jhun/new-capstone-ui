<template>
  <v-container class="background" fluid>
    <!-- Confirmation Dialog -->
    <v-dialog v-model="showCurrentConfirmDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Removal</v-card-title>
        <v-card-text>
          Are you sure you want to remove the current planted item? This action
          cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="removeCurrentPlanted"
            >Remove</v-btn
          >
          <v-btn color="error" text @click="showCurrentConfirmDialog = false"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-btn color="error" text @click="showCurrentConfirmDialog = true">Remove current planted</v-btn> -->

    <v-row>
      <v-col cols="12" md="4" sm="6">

        <v-card color="#36454F" dark>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold mb-5 text-center">
                {{ latestCropName }} - {{ latestCropVar }}
              </v-list-item-title>
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="9" class="crop-image-container d-flex justify-center align-center">
                  <v-dialog v-model="dialogImg" max-width="600px">
                    <template v-slot:activator="{ on }">
                      <img
                        alt="Crop Image"
                        :src="latestCropImage || '/v.png'"
                        class="crop-image"
                        v-on="on"
                        style="border: 2px solid white"
                      />
                    </template>
                    <v-card>
                      <v-img
                        :src="latestCropImage || '/v.png'"
                        max-width="600px"
                      ></v-img>
                    </v-card>
                  </v-dialog>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#36454F" dark>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold mb-5 ml-12 text-center"
              >
                AIR TEMPERATURE
              </v-list-item-title>
              <!-- <v-list-item-subtitle>AIR TEMPERATURE</v-list-item-subtitle> -->
              <!-- <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestTemp
                }}<span style="font-size: 25px"> °C </span></v-list-item-title
              >

              <v-list-item-subtitle
                class="font-weight-bold mb-1 ml-12 text-center"
                >Required : {{ tempMin }} - {{ tempMax }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="blue">mdi-thermometer-high</v-icon>
          </v-list-item>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#36454F" dark>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold mb-5 ml-12 text-center"
              >
                HUMIDITY
              </v-list-item-title>
              <!-- <v-list-item-subtitle>HUMIDITY</v-list-item-subtitle> -->
              <!-- <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestHumid }}
                <span style="font-size: 25px">%</span></v-list-item-title
              >
              <v-list-item-subtitle
                class="font-weight-bold mb-1 ml-12 text-center"
                >Required : {{ humidMin }} -
                {{ humidMax }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="blue">mdi-weather-windy</v-icon>
          </v-list-item>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#36454F" dark>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold mb-5 ml-12 text-center"
              >
                <!-- {{ latestCropName }} - {{ latestCropVar }} -->
                PH LEVEL
              </v-list-item-title>
              <!-- <v-list-item-subtitle>PH</v-list-item-subtitle>
              <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestPh }} <span style="font-size: 25px">pH</span>
              </v-list-item-title>
              <v-list-item-subtitle
                class="font-weight-bold mb-1 ml-12 text-center"
                >Required : {{ phMin }} - {{ phMax }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="blue">mdi-ph</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#36454F" dark>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold mb-5 ml-12 text-center"
              >
                <!-- {{ latestCropName }} - {{ latestCropVar }} -->
                TDS LEVEL
              </v-list-item-title>
              <!-- <v-list-item-subtitle>TDS</v-list-item-subtitle>
              <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestTds }}
                <span style="font-size: 25px">ppm</span></v-list-item-title
              >
              <v-list-item-subtitle
                class="font-weight-bold mb-1 ml-12 text-center"
                >Required : {{ tdsMin }} - {{ tdsMax }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="blue">mdi-beaker</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-card color="#36454F" dark>
          <v-list-item two-line class="d-flex justify-center align-center">
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold mb-5 ml-12 text-center"
              >
                <!-- {{ latestCropName }} - {{ latestCropVar }} -->
                WATER TEMPERATURE
              </v-list-item-title>
              <!-- <v-list-item-subtitle>WATER TEMPERATURE</v-list-item-subtitle>
              <v-divider></v-divider> -->
              <v-list-item-title class="display-2 mb-5"
                >{{ latestWaterTemp }}
                <span style="font-size: 25px">°C </span></v-list-item-title
              >
              <v-list-item-subtitle
                class="font-weight-bold mb-1 ml-12 text-center"
                >Required : {{ waterTempMax }} -
                {{ waterTempMin }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="display-3" color="blue"
              >mdi-water-thermometer</v-icon
            >
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="2" sm="6">
        <v-card color="#36454F" dark class="pa-4">
          <h4 class="d-flex justify-center align-center">MISTING</h4>
          <v-icon
            class="display-1 d-flex justify-center align-center"
            color="green"
            >{{ iconTemp }}</v-icon
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-card color="#36454F" dark class="pa-4">
          <h4 class="d-flex justify-center align-center">PH UP</h4>
          <v-icon
            class="display-1 d-flex justify-center align-center"
            color="green"
            >{{ iconPhUp }}</v-icon
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-card color="#36454F" dark class="pa-4">
          <h4 class="d-flex justify-center align-center">PH DOWN</h4>
          <v-icon
            class="display-1 d-flex justify-center align-center"
            color="green"
            >{{ iconPhDown }}</v-icon
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-card color="#36454F" dark class="pa-4">
          <h4 class="d-flex justify-center align-center">SOLUTION A</h4>
          <v-icon
            class="display-1 d-flex justify-center align-center"
            color="green"
            >{{ iconTdsA }}</v-icon
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-card color="#36454F" dark class="pa-4">
          <h4 class="d-flex justify-center align-center">SOLUTION B</h4>
          <v-icon
            class="display-1 d-flex justify-center align-center"
            color="green"
            >{{ iconTdsB }}</v-icon
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-card color="#36454F" dark class="pa-4">
          <h4 class="d-flex justify-center align-center">WATERPUMP</h4>
          <v-icon
            class="display-1 d-flex justify-center align-center"
            color="green"
            >{{ iconTdsWater }}</v-icon
          >
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="12" md="6">
        <v-card color="#36454F" dark height="400">
          <br>
          <br>
          <v-card-title class="display-1 d-flex justify-center align-center"> TIME </v-card-title>
          <br>
          <v-card-text class="display-4 d-flex justify-center align-center">
            {{ time }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="same-size" color="#36454F" dark>
          <v-card-text>
            <v-row align="center" justify="space-between">
              <v-card-title> Calendar </v-card-title>
              <v-spacer></v-spacer>
              <v-col cols="4">
                <v-select
                  v-model="selectedMonth"
                  :items="months"
                  label="Select Month"
                  @change="changeMonth"
                ></v-select>
              </v-col>
            </v-row>
            <v-sheet height="300" dark>
              <v-calendar
                v-model="focus"
                color="primary"
              ></v-calendar>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>


<script>
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      focus: new Date().toISOString().substr(0, 10),
      selectedMonth: new Date().getMonth(),
      months: monthNames.map((month, index) => ({
        text: month,
        value: index,
      })),

      time: this.formatTime(new Date()),

      dialogImg: false,
      iconValue: null,
      iconPhUpValue: null,
      iconPhDownValue: null,
      iconSolAValue: null,
      iconSolBValue: null,
      iconWaterValue: null,

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
  computed: {
    iconTemp() {
      return this.iconValue === "1"
        ? "mdi-circle-slice-8"
        : "mdi-circle-outline";
    },
    iconPhUp() {
      return this.iconPhUpValue === "1"
        ? "mdi-circle-slice-8"
        : "mdi-circle-outline";
    },
    iconPhDown() {
      return this.iconPhDownValue === "1"
        ? "mdi-circle-slice-8"
        : "mdi-circle-outline";
    },
    iconTdsA() {
      return this.iconSolAValue === "1"
        ? "mdi-circle-slice-8"
        : "mdi-circle-outline";
    },
    iconTdsB() {
      return this.iconSolBValue === "1"
        ? "mdi-circle-slice-8"
        : "mdi-circle-outline";
    },
    iconTdsWater() {
      return this.iconWaterValue === "1"
        ? "mdi-circle-slice-8"
        : "mdi-circle-outline";
    },
  },
  methods: {
    changeMonth(monthIndex) {
      const date = new Date(new Date().getFullYear(), monthIndex, 1);
      this.focus = date.toISOString().substr(0, 10);
    },

    formatTime(date) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    updateTime() {
      setInterval(() => {
        this.time = this.formatTime(new Date());
      }, 60000); // Update every minute
    },

    fetchTempIcon() {
      const db = firebase.database();
      db.ref("temp/tempmist").on("value", (snapshot) => {
        this.iconValue = snapshot.val();
      });
    },
    fetchPhUp() {
      const db = firebase.database();
      db.ref("ph/pHpumpHigh").on("value", (snapshot) => {
        this.iconPhUpValue = snapshot.val();
      });
    },
    fetchPhDown() {
      const db = firebase.database();
      db.ref("ph/pHpumpLow").on("value", (snapshot) => {
        this.iconPhDownValue = snapshot.val();
      });
    },
    fetchSolA() {
      const db = firebase.database();
      db.ref("tds/tdspumpA").on("value", (snapshot) => {
        this.iconSolAValue = snapshot.val();
      });
    },
    fetchSolB() {
      const db = firebase.database();
      db.ref("tds/tdspumpB").on("value", (snapshot) => {
        this.iconSolBValue = snapshot.val();
      });
    },
    fetchSolWater() {
      const db = firebase.database();
      db.ref("tds/tdswaterpump").on("value", (snapshot) => {
        this.iconWaterValue = snapshot.val();
      });
    },
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
          this.latestTds = parseFloat(data.tdscurrent.toFixed(0));
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

    async removeCurrentPlanted() {
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
          this.waterTempMax = data.watermax; //baliktad sa water temp min sa max
        }
      } catch (error) {
        console.error("Error fetching latest ref water temp data:", error);
      }
    },
  },
  mounted() {
    this.updateTime();

    this.fetchTempIcon();
    this.fetchPhUp();
    this.fetchPhDown();
    this.fetchSolA();
    this.fetchSolB();
    this.fetchSolWater();
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
.crop-image-container {
  position: relative;
}
.crop-image {
  width: 95px;
  height: 95px;
  border: 2px solid white;
  border-radius: 3px;
}
.background {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://www.treehugger.com/thmb/uHRjV9zEL2a-g1N5gaHxJiqpU3Q=/2121x1414/filters:fill(auto,1)/GettyImages-1194451296-46ea81725e834c9bbffea37679624336.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    width: 100%;
    height: 100%;
}



</style>
  