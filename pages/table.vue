<template>
  <v-container fluid>
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text> Are you sure you want to delete this item? </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="deleteItemConfirmed"
            >Yes</v-btn
          >
          <v-btn color="primary" text @click="deleteDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Plant Confirmation Dialog -->
    <v-dialog v-model="plantDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Plant</v-card-title>
        <v-card-text> Are you sure you want to plant this crop? </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="plantItemConfirmed"
            >Yes</v-btn
          >
          <v-btn color="primary" text @click="plantDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold text-h4 basil--text">Crop Table</h1>
      </v-card-title>

      <v-tabs v-model="tab" grow background-color="transparent" color="basil">
        <v-tab class="custom-tab" color>Preset Table</v-tab>
        <v-tab class="custom-tab">Planted Crop</v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat color="basil">
              <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="10"
                class="elevation-1"
                :search="search"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field
                    
                  ></v-toolbar>
                </template>
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.cropName }}</td>
                    <td>{{ item.cropVariation }}</td>
                    <td>{{ item.mintemp }} - {{ item.maxtemp }}</td>
                    <td>{{ item.minhumid }} - {{ item.maxhumid }}</td>
                    <td>{{ item.minph }} - {{ item.maxph }}</td>
                    <td>{{ item.mintds }} - {{ item.maxtds }}</td>
                    <td>{{ item.minwater }} - {{ item.maxwater }}</td>
                    <td>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="success"
                        @click="showPlantDialog(item)"
                        :disabled="isCropPlanted(item)"
                        >Plant</v-btn
                      >
                      <v-btn color="primary" @click="editItem(item)"
                        >Edit</v-btn
                      >
                      <v-btn color="error" @click="showDeleteDialog(item)"
                        >Delete</v-btn
                      >
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-data-table
                :headers="plantedHeaders"
                :items="plantedItems"
                hide-default-footer
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat></v-toolbar>
                </template>
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.name }}</td>
                    <td>{{ item.variation }}</td>
                    <td>{{ item.tempmin }} - {{ item.tempmax }}</td>
                    <td>{{ item.humidmin }} - {{ item.humidmax }}</td>
                    <td>{{ item.pHmin }} - {{ item.pHmax }}</td>
                    <td>{{ item.tdsmin }} - {{ item.tdsmax }}</td>
                    <td>{{ item.watermin }} - {{ item.watermax }}</td>
                    <td>
                      <v-btn color="error" @click="showDeleteDialog(item)"
                        >Delete</v-btn
                      >
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>

    <!-- SUCCESS SNACKBAR -->
    <v-snackbar color="green" v-model="successSnackbar">
      {{ textSuccess }}
      <template v-slot:action="{ attrs }">
        <v-btn
          plain
          color="white"
          v-bind="attrs"
          @click="successSnackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>

    <!-- ERROR SNACKBAR -->
    <v-snackbar color="red" v-model="errorSnackbar">
      {{ textError }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="errorSnackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      tab: 0,
      headers: [
        { text: "Crop Name", value: "cropName" },
        { text: "Crop Variation", value: "cropVariation" },
        { text: "Required Temperature", value: "cropTempRef" },
        { text: "Required Humidity", value: "cropHumidRef" },
        { text: "Required Ph Level", value: "cropPhRef" },
        { text: "Required Tds Level", value: "cropTdsRef" },
        { text: "Required Water Temp", value: "cropWaterRef" },
        { text: "Actions", sortable: false },
      ],
      plantedHeaders: [
        { text: "Name", value: "name" },
        { text: "Variation", value: "variation" },
        { text: "Temperature", value: "tempmin" },
        { text: "Humidity", value: "humidmin" },
        { text: "Ph Level", value: "pHmin" },
        { text: "Tds Level", value: "tdsmin" },
        { text: "Water Temp", value: "watermin" },
        { text: "Actions", sortable: false },
      ],
      items: [],
      plantedItems: [],
      deleteDialog: false,
      plantDialog: false,
      deleteItem: null,
      plantItem: null,
      successSnackbar: false,
      errorSnackbar: false,
      textSuccess: "",
      textError: "",
      search: "",
    };
  },

  created() {
    this.fetchItems();
    this.fetchPlantedItems();
  },

  methods: {
    fetchItems() {
      firebase
        .database()
        .ref("details")
        .once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const item = {
              cropName: childSnapshot.val().name,
              cropVariation: childSnapshot.val().variation,
              mintemp: childSnapshot.val().temperature.min,
              maxtemp: childSnapshot.val().temperature.max,
              minhumid: childSnapshot.val().humidity.min,
              maxhumid: childSnapshot.val().humidity.max,
              minph: childSnapshot.val().pH.min,
              maxph: childSnapshot.val().pH.max,
              mintds: childSnapshot.val().tds.min,
              maxtds: childSnapshot.val().tds.max,
              minwater: childSnapshot.val().watertemp.min,
              maxwater: childSnapshot.val().watertemp.max,
              id: childSnapshot.key,
            };
            this.items.push(item);
          });
        });
    },

    fetchPlantedItems() {
      firebase
        .database()
        .ref("planted")
        .once("value", (snapshot) => {
          const plantedData = snapshot.val();
          if (plantedData) {
            const plantedItems = {
              name: plantedData.crop.name,
              variation: plantedData.crop.variation,
              tempmin: plantedData.temp.tempmin,
              tempmax: plantedData.temp.tempmax,
              humidmin: plantedData.humid.humidmin,
              humidmax: plantedData.humid.humidmax,
              pHmin: plantedData.ph.pHmin,
              pHmax: plantedData.ph.pHmax,
              tdsmin: plantedData.tds.tdsmin,
              tdsmax: plantedData.tds.tdsmax,
              watermin: plantedData.watertemp.watermin,
              watermax: plantedData.watertemp.watermax,
            };
            this.plantedItems = [plantedItems]; // Ensure only one item is in the list
          }
        });
    },

    async editItem(item) {
      try {
        this.$router.push({ name: "edit", query: { id: item.id } });
      } catch (error) {
        console.error("Error navigating to edit page: ", error);
      }
    },

    showDeleteDialog(item) {
      this.deleteItem = item;
      this.deleteDialog = true;

      // Dashboard planted

      Promise.all([
        firebase.database().ref("crop").set({
          name: "",
          variation: "",
        }),
        firebase.database().ref("humid").set({
          humidmin: 0,
          humidmax: 0,
          humidcurrent: 0,
          humidmist: "0",
        }),
        firebase.database().ref("ph").set({
          pHmin: 0,
          pHmax: 0,
          pHcurrent: 0,
          pHpumpHigh: "0",
          pHpumpLow: "0",
        }),
        firebase.database().ref("tds").set({
          tdsmin: 0,
          tdsmax: 0,
          tdspumpA: "0",
          tdspumpB: "0",
          tdscurrent: 0,
          tdswaterpump: "0",
        }),
        firebase.database().ref("temp").set({
          tempmin: 0,
          tempmax: 0,
          tempcurrent: 0,
          tempmist: "0",
        }),
        firebase.database().ref("watertemp").set({
          watercurrent: 0,
          watermax: "0",
          watermin: "0",
        }),
      ]);
    },

    async deleteItemConfirmed() {
      if (this.deleteItem) {
        if (this.tab === 0) {
          // Delete from presets
          await firebase
            .database()
            .ref("details")
            .child(this.deleteItem.id)
            .remove();
          this.items = this.items.filter((i) => i.id !== this.deleteItem.id);
        } else {
          // Delete from planted crop
          await firebase.database().ref("planted").remove();
          this.plantedItems = [];
        }
        this.deleteDialog = false;
      }
    },

    showPlantDialog(item) {
      this.plantItem = item;
      this.plantDialog = true;
    },

    async plantItemConfirmed() {
      this.plantDialog = false;
      try {
        const {
          cropName,
          cropVariation,
          minhumid,
          maxhumid,
          minph,
          maxph,
          mintds,
          maxtds,
          mintemp,
          maxtemp,
          minwater,
          maxwater,
        } = this.plantItem;

        // Clear existing planted data
        await firebase.database().ref("planted").remove();

        // Set new planted data
        await Promise.all([
          firebase.database().ref("planted/crop").set({
            name: cropName,
            variation: cropVariation,
          }),
          firebase.database().ref("planted/humid").set({
            humidmin: minhumid,
            humidmax: maxhumid,
          }),
          firebase.database().ref("planted/ph").set({
            pHmin: minph,
            pHmax: maxph,
          }),
          firebase.database().ref("planted/tds").set({
            tdsmin: mintds,
            tdsmax: maxtds,
          }),
          firebase.database().ref("planted/temp").set({
            tempmin: mintemp,
            tempmax: maxtemp,
          }),
          firebase.database().ref("planted/watertemp").set({
            watermin: minwater,
            watermax: maxwater,
          }),
        ]);

        // Update the planted items table
        this.fetchPlantedItems();

        this.textSuccess = "Crop planted successfully!";
        this.successSnackbar = true;
      } catch (error) {
        console.error("Error planting data: ", error);
        this.textError = "Failed to plant data!";
        this.errorSnackbar = true;
      }

      // Dashboard planted
      try {
        await Promise.all([
          firebase.database().ref("crop").set({
            name: this.plantItem.cropName,
            variation: this.plantItem.cropVariation,
          }),
          firebase.database().ref("humid").set({
            humidmin: this.plantItem.minhumid,
            humidmax: this.plantItem.maxhumid,
            humidcurrent: 0,
            humidmist: "0",
          }),
          firebase.database().ref("ph").set({
            pHmin: this.plantItem.minph,
            pHmax: this.plantItem.maxph,
            pHcurrent: 0,
            pHpumpHigh: "0",
            pHpumpLow: "0",
          }),
          firebase.database().ref("tds").set({
            tdsmin: this.plantItem.mintds,
            tdsmax: this.plantItem.maxtds,
            tdspumpA: "0",
            tdspumpB: "0",
            tdscurrent: 0,
            tdswaterpump: "0",
          }),
          firebase.database().ref("temp").set({
            tempmin: this.plantItem.mintemp,
            tempmax: this.plantItem.maxtemp,
            tempcurrent: 0,
            tempmist: "0",
          }),
          firebase.database().ref("watertemp").set({
            watercurrent: 0,
            watermax: this.plantItem.maxwater,
            watermin: this.plantItem.minwater,
          }),
        ]);

        this.textSuccess = "Crop planted successfully!";
        this.successSnackbar = true;
      } catch (error) {
        console.error("Error planting data: ", error);
        this.textError = "Failed to plant data!";
        this.errorSnackbar = true;
      }
    },

    isCropPlanted(item) {
      // Check if the item exists in the planted items list
      return this.plantedItems.some(
        (plantedItem) =>
          plantedItem.name === item.cropName &&
          plantedItem.variation === item.cropVariation
      );
    },
  },
};
</script>

<style>
.basil {
  background-color: #DFF5FF !important;
}
.basil--text {
  color: #356859 !important;
}
.custom-tab {
  font-size: 1.15rem; /* Adjust the size as needed */
}
</style>
