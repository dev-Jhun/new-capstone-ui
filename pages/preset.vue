<template>
  <v-container class="bordered-container">
    <!-- Confirmation Dialog -->
    <v-dialog v-model="plantDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Preset</v-card-title>
        <v-card-text> Are you sure you want to add this preset? </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="addPresetConfirmed"
            >Yes</v-btn
          >
          <v-btn color="primary" text @click="plantDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <br />
    <v-row justify="center" align="center">
      <v-btn color="succes" dark large @click="dialog = true">
        ADD PRESET
      </v-btn>
    </v-row>
    <br />

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title class="headline d-flex justify-center" r
          >Add new preset</v-card-title
        >
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

              <v-col cols="12" sm="6">
                <v-card class="pa-4" outlined elevation="5">
                  <v-card-title class="d-flex justify-center align-center">
                    WATER TEMPERATURE
                  </v-card-title>
                  <v-row dense>
                    <v-col cols="6">
                      <v-text-field
                        v-model="formData.cropWaterMin"
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
                        v-model="formData.cropWaterMax"
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
              <v-col>
                <v-row justify="center" align="center">
                  <v-col cols="auto">
                    <v-btn
                      @click="openConfirmationDialog"
                      color="green"
                      dark
                      large
                    >
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
            </v-row>
            <br /><br /><br />
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <br />

    <v-card elevation="6">
      <v-card-title>
        Crop Information
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :search="search">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.cropName }}</td>
              <td>{{ item.cropVariation }}</td>
              <td>{{ item.mintemp }} - {{ item.maxtemp }}</td>
              <td>{{ item.minhumid }} - {{ item.maxhumid }}</td>
              <td>{{ item.minph }} - {{ item.maxph }}</td>
              <td>{{ item.mintds }} - {{ item.maxtds }}</td>
              <td>{{ item.minWaterTemp }} - {{ item.maxWaterTemp }}</td>
              <td>
                <v-btn color="primary" @click="viewItem(item)"> View </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>

      <v-dialog v-model="dialogItem" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline"
              >{{ selectedItem.cropName }} -
              {{ selectedItem.cropVariation }}</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-img :src="selectedItem.image" aspect-ratio="1"></v-img>
                </v-col>
                <v-col cols="12">
                  <p>{{ selectedItem.description }}</p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="savePresetFromTable" color="success">
              SAVE PRESET
            </v-btn>

            <v-btn color="error darken-1" @click="dialogItem = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    <br>
    <br>
    <br>
    <br>
   

    <h3>This is a brief explanation of the basic values, nutrients, and temperature required for crop planting in hydroponics farming.</h3>
    <br>

    <p style="text-align:justify; text-indent:40px">Hydroponics is a growing technology that has been widely used in agriculture worldwide. It involves the use of hydroponic systems to grow crops, which are designed to maintain optimal environmental conditions such as temperature, humidity, and nutrient levels. This is particularly important in tropical climates where temperatures can be high. Samarakoon and Weerasinghe emphasize the importance of managing the production environment to maximize crop yield and quality. They suggest that hydroponic growers can create a conducive environment for sustained crop growth and mitigate potential challenges associated with tropical climates. The Food and Agriculture Organization (FAO) emphasizes the importance of nutrient management, environmental control, and crop selection for optimizing hydroponic systems' performance. Rodriguez-Delfin's 2008 study on hydroponic cultivation in Peru provides valuable insights into the practical application of hydroponics in tropical settings. This research serves as a reference for hydroponic growers in similar environments, enabling them to make informed decisions regarding crop selection and cultivation practices to maximize yield and profitability.</p>

    <h4>Reference:</h4>

    <p>https://generalhydroponics.com/resources/flora-series-feedcharts/</p>
    <p>https://aggie-hort.tamu.edu/greenhouse/hydroponics/solutions.html</p>
   

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

        watercurrent: 0,
        cropWaterMin: "",
        cropWaterMax: "",

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

      nameRules: [(v) => !!v || "Field is required"],

      plantDialog: false,

      search: "",
      dialogItem: false,
      selectedItem: {},
      headers: [
        { text: "Crop Name", value: "cropName" },
        { text: "Crop Variation", value: "cropVariation" },
        { text: "Temperature", value: "temperature" },
        { text: "Humidity", value: "humidity" },
        { text: "pH", value: "ph" },
        { text: "TDS", value: "tds" },
        { text: "Water Temp", value: "waterTemp" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [
        {
          id: 1,
          cropName: "Lettuce",
          cropVariation: "Dabi",
          mintemp: "15",
          maxtemp: "20",
          minhumid: "60",
          maxhumid: "80",
          minph: "5.5",
          maxph: "6.5",
          mintds: "700",
          maxtds: "900",
          minWaterTemp: "20",
          maxWaterTemp: "25",
          image: "/lettuce-dabi.jpg",
          description:
            "Dabi is a curly lettuce, Lollo Green type, fast growing and resistant to aphids. Salad is large, with fine light green leaves. It is recommended for spring and autumn crops.",
        },
        {
          id: 2,
          cropName: "Lettuce",
          cropVariation: "Romaine",
          mintemp: "15",
          maxtemp: "24",
          minhumid: "50",
          maxhumid: "70",
          minph: "5.5",
          maxph: "6.5",
          mintds: "560",
          maxtds: "840",
          minWaterTemp: "20",
          maxWaterTemp: "24",
          image: "/lettuce-romaine.jpg",
          description:
            "Romaine lettuce leaves are long and taper toward the root of the lettuce. The upper part of the leaves is a deeper green color and more flimsy than the lower leaves. Toward the bottom of the lettuce, the leaves become sturdier and have thick, white ribs that contain a slightly bitter fluid.",
        },
        {
          id: 3,
          cropName: "Lettuce",
          cropVariation: "Butterhead",
          mintemp: "15",
          maxtemp: "24",
          minhumid: "50",
          maxhumid: "70",
          minph: "5.5",
          maxph: "6.5",
          mintds: "560",
          maxtds: "840",
          minWaterTemp: "20",
          maxWaterTemp: "24",
          image: "/lettuce-butterhead.jpeg",
          description: "Butterhead lettuce is a variety of lettuce known for its loose, round-shaped heads with tender, buttery-textured leaves. It's characterized by its soft, buttery taste and delicate texture, making it a popular choice for salads and sandwiches. The leaves of butterhead lettuce are typically pale green to yellow-green in color and have a mild, slightly sweet flavor.",
        },
        {
          id: 4,
          cropName: "Spinach",
          cropVariation: "Savoy",
          mintemp: "16",
          maxtemp: "24",
          minhumid: "70",
          maxhumid: "80",
          minph: "6.0",
          maxph: "7.0",
          mintds: "1050",
          maxtds: "1400",
          minWaterTemp: "18",
          maxWaterTemp: "24",
          image: "/spinach-savoy.jpg",
          description: "Savoy spinach, also known as curly spinach, is a type of spinach that is unique for its crinkled, curly leaves. This variety of spinach is popular in Mediterranean cuisine and is used in a variety of dishes from salads to soups.",
        },
        {
          id: 5,
          cropName: "Basil",
          cropVariation: "Sweet",
          mintemp: "18",
          maxtemp: "30",
          minhumid: "60",
          maxhumid: "80",
          minph: "5.5",
          maxph: "6.5",
          mintds: "700",
          maxtds: "1120",
          minWaterTemp: "22",
          maxWaterTemp: "25",
          image: "/basil-sweet.jpg",
          description: "also called common basil, is the most common and well-known variety of basil. sweet basil plants grow upright and can reach up to 2 feet in height. Small white flowers may bloom if the plant is allowed to bolt. This type of basil has a versatile sweet flavor that is perfect for many culinary uses. It works well in Italian dishes, pesto, salad dressings, sandwiches, and more. Sweet basil also pairs nicely with tomatoes, garlic, and mozzarella.",
        },
        {
          id: 6,
          cropName: "Kale",
          cropVariation: "Curly",
          mintemp: "18",
          maxtemp: "24",
          minhumid: "50",
          maxhumid: "60",
          minph: "5.5",
          maxph: "6.5",
          mintds: "1050",
          maxtds: "1400",
          minWaterTemp: "18",
          maxWaterTemp: "24",
          image: "/kale-curly.png",
          description: "This is the type of kale you usually see in the grocery store. It’s a pale to deep green with large, frilly-edged leaves and long stems. It’s often sold as loose leaves bound together, even though it grows as a loose head.",
        },
        {
          id: 7,
          cropName: "Tomatoes",
          cropVariation: "Cherry",
          mintemp: "18",
          maxtemp: "25",
          minhumid: "70",
          maxhumid: "80",
          minph: "5.5",
          maxph: "6.5",
          mintds: "1400",
          maxtds: "3500",
          minWaterTemp: "20",
          maxWaterTemp: "25",
          image: "/tomatoes-cherry.jpg",
          description: "Cherry tomatoes are a small variety of tomato that is named for its shape which resembles a cherry. Sometimes sold on the vine, the vegetable can range from a little smaller than a cherry to about twice the size, and can be red (the most common color), yellow, orange, green, or almost black. These tomatoes are prized by chefs for their juiciness and thin skin, which causes the fruits to pop in your mouth when eaten. Like all tomatoes, cherry tomatoes are best in the summer, but because of their small size, they can also be grown in a greenhouse while still maintaining much of their flavor and texture.",
        },
        {
          id: 8,
          cropName: "Cucumbers",
          cropVariation: "Slicing",
          mintemp: "18",
          maxtemp: "24",
          minhumid: "70",
          maxhumid: "90",
          minph: "5.5",
          maxph: "6.0",
          mintds: "1190",
          maxtds: "1750",
          minWaterTemp: "20",
          maxWaterTemp: "24",
          image: "/cucumbers-slicing.jpg",
          description: "A slicing cucumber is a variety of cucumber that is typically longer and has a thinner skin. It is commonly used in salads, sandwiches, and as a refreshing snack due to its crisp texture and mild flavor.",
        },
        {
          id: 9,
          cropName: "Bell Peppers",
          cropVariation: "Green",
          mintemp: "20",
          maxtemp: "25",
          minhumid: "60",
          maxhumid: "70",
          minph: "6.0",
          maxph: "6.5",
          mintds: "1400",
          maxtds: "3500",
          minWaterTemp: "20",
          maxWaterTemp: "25",
          image: "/bellpepper-green.jpeg",
          description: "Bell peppers (Capsicum annuum) are berries by botanical classification but are used mostly as culinary vegetables or culinary ingredients, just like tomatoes. The fact that they are produced from a flowering plant and contain seeds makes them fruits, technically speaking. These fruits or peppers are shaped like bells and are usually three to six inches long. They have thick flesh that is juicy and crunchy when eaten raw.",
        },
        {
          id: 10,
          cropName: "Peppermint",
          cropVariation: "Mint",
          mintemp: "18",
          maxtemp: "24",
          minhumid: "60",
          maxhumid: "70",
          minph: "5.5",
          maxph: "6.0",
          mintds: "1260",
          maxtds: "1610",
          minWaterTemp: "18",
          maxWaterTemp: "22",
          image: "/peppermint-mint.jpg",
          description: "Peppermint, (Mentha ×piperita), strongly aromatic perennial herb of the mint family (Lamiaceae). Peppermint has a strong sweetish odour and a warm pungent taste with a cooling aftertaste. The leaves are typically used fresh as a culinary herb, and the flowers are dried and used to flavour candy, desserts, beverages, salads, and other foods.",
        },
      ],

      savedPresets: [], // Array to store saved presets
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
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
    viewItem(item) {
      this.selectedItem = item;
      this.dialogItem = true;
    },

    async savePresetFromTable() {
      if (!this.selectedItem) {
        this.errorSnackbar = true;
        this.textError = "No item selected!";
        return;
      }

      // Populate form fields with selected item's data
      this.formData.cropName = this.selectedItem.cropName;
      this.formData.cropVariation = this.selectedItem.cropVariation;
      this.formData.cropTempMin = this.selectedItem.mintemp;
      this.formData.cropTempMax = this.selectedItem.maxtemp;
      this.formData.cropHumidMin = this.selectedItem.minhumid;
      this.formData.cropHumidMax = this.selectedItem.maxhumid;
      this.formData.cropPhMin = this.selectedItem.minph;
      this.formData.cropPhMax = this.selectedItem.maxph;
      this.formData.cropTdsMin = this.selectedItem.mintds;
      this.formData.cropTdsMax = this.selectedItem.maxtds;
      this.formData.cropWaterMin = this.selectedItem.minWaterTemp;
      this.formData.cropWaterMax = this.selectedItem.maxWaterTemp;

      // Open the dialog
      this.dialog = true;
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

    openConfirmationDialog() {
      // Open the confirmation dialog
      this.plantDialog = true;
    },

    async addPresetConfirmed() {
      try {
        // Call the submitForm method to add the preset
        await this.submitForm();

        // Close the dialog after successful submission
        this.plantDialog = false;
      } catch (error) {
        console.error("Error adding preset: ", error);
        // Optionally, display an error message to the user
        // Close the dialog in case of an error
        this.plantDialog = false;
      }
    },

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
        !this.formData.cropTdsMax ||
        !this.formData.cropWaterMin ||
        !this.formData.cropWaterMax
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
          watertemp: {
            min: this.formData.cropWaterMin,
            max: this.formData.cropWaterMax,
            watercurrent: this.formData.watercurrent,
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
  /* background-color: #DD
  E6ED; */
  
}

h3{
  text-align:center;
}
</style>
