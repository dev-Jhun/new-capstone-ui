<template>
  <v-container class="bordered-container" >

    
    <br>
    <v-row justify="center" align="center">
      <v-btn color="blue" dark large @click="dialog = true">
        ADD PRESET
      </v-btn>
    </v-row>
    <br>
    

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title class="headline">Add New Preset</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
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
                  <v-card-title class="d-flex justify-center align-center">
                    TEMPERATURE
                  </v-card-title>
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
                  <v-card-title class="d-flex justify-center align-center">
                    HUMIDITY
                  </v-card-title>
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
                  <v-card-title class="d-flex justify-center align-center">
                    PH LEVEL
                  </v-card-title>
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
                  <v-card-title class="d-flex justify-center align-center">
                    TDS LEVEL
                  </v-card-title>
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
            </v-row>
            <br /><br />

            <v-row>
              <v-spacer></v-spacer>
              <v-col>
                <v-spacer></v-spacer>
                <v-row justify="center" align="center">
                  <v-col cols="auto">
                    <v-btn type="submit" color="green" dark large>
                      SAVE PRESET
                    </v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn @click="dialog = false" color="red" dark large>
                      CANCEL PRESET
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <br /><br /><br />
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    

    <br>

    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
          class="mt-2"
          align="center"
          justify="center"
        >
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>

    <br>
    <br>
    <br>
    <br>
    <v-row>
      <v-card>
        <p>hellooooooooooo</p>
      </v-card>
    </v-row>

    

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
      dialog: false,
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
        (v) => !!v || "Field is required",
      ],



      itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'name',
        keys: [
          'Name',
          'Variation',
          'Required Temp',
          'Required Humid',
          'Required pH',
          'Required TDS',
          'Required Water Temp',
        ],
        items: [
          {
            name: 'Lettuce',
            variation: "Dabi",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
          {
            name: 'Lettuce',
            variation: "Romaine",
            temp: "25-28",
            humid: "50-55",
            ph: "4-7",
            tds: "700-800",
            waterTemp: "25-28",
          },
        ],

    };
  },
  computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
  mounted() {
    // Fetch preset data based on preset ID from Firebase
    // const presetId = this.$route.query.id;
    // if (presetId) {
    //   this.fetchPresetData(presetId);
    // }
  },
  methods: {

    nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
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
      if (
        !this.formData.cropName ||
        !this.formData.cropTempMin ||
        !this.formData.cropTempMax ||
        !this.formData.cropHumidMin ||
        !this.formData.cropHumidMax ||
        !this.formData.cropPhMin ||
        !this.formData.cropPhMax ||
        !this.formData.cropTdsMin ||
        !this.formData.cropTdsMax
      ) {
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
        this.dialog = false; // Close the dialog after successful submission
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
