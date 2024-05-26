<template>
  <div>
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this preset?
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="deleteItemConfirmed"
            >Yes</v-btn
          >
          <v-btn color="primary" text @click="deleteDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Your DataTable -->
    <br />
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-toolbar-title>Presets Table</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <!-- Table row for each item -->
          <td>{{ item.cropName }}</td>
          <!-- Display data for each column -->
          <td>{{ item.cropVariation }}</td>
          <td>{{ item.cropTempRef }}</td>
          <td>{{ item.cropHumidRef }}</td>
          <td>{{ item.cropPhRef }}</td>
          <td>{{ item.cropTdsRef }}</td>
          <td>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn color="green" @click="plantItem(item)" dark>Plant</v-btn>
            <!-- Plant button -->
            <v-btn color="primary" @click="editItem(item)">Edit</v-btn>
            <!-- Edit button -->
            <v-btn color="error" @click="showDeleteDialog(item)">Delete</v-btn>
            <!-- Delete button -->
          </td>
        </tr>
      </template>
    </v-data-table>

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
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      headers: [
        { text: "Crop Name", value: "cropName" },
        { text: "Crop Variation", value: "cropVariation" },
        { text: "Suggested Temperature", value: "cropTempRef" },
        { text: "Suggested Humidity", value: "cropHumidRef" },
        { text: "Suggested Ph Level", value: "cropPhRef" },
        { text: "Suggested Tds Level", value: "cropTdsRef" },
        { text: "Actions", sortable: false }, // Actions column for edit and delete buttons
      ],
      items: [], // Array to hold your data
      deleteDialog: false, // Flag to control the delete confirmation dialog
      deleteItem: null, // Store the item to be deleted
      successSnackbar: false,
      errorSnackbar: false,
      textSuccess: "",
      textError: "",

      // mistTemp: "0",
      // mistHumid: "0",
      // pumpPhLow: "0",
      // pumpPhHigh: "0",
      // pumpTdsA: "0",
      // pumpTdsB: "0",
    };
  },

  created() {
    // Fetch data from Firebase Realtime Database
    firebase
      .database()
      .ref("details")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const item = {
            // cropName: childSnapshot.key, // Set cropName based on the key of the details node
            cropName: childSnapshot.val().name,
            cropVariation: childSnapshot.val().variation,

            cropTempRef: childSnapshot.val().temperature.ref,
            mintemp: childSnapshot.val().temperature.min,
            maxtemp: childSnapshot.val().temperature.max,
            mistTemp: childSnapshot.val().temperature.tempmist,
            currentTemp: childSnapshot.val().temperature.tempcurrent,

            cropHumidRef: childSnapshot.val().humidity.ref,
            minhumid: childSnapshot.val().humidity.min,
            maxhumid: childSnapshot.val().humidity.max,
            mistHumid: childSnapshot.val().humidity.humidmist,
            currentHumid: childSnapshot.val().humidity.humidcurrent,

            cropPhRef: childSnapshot.val().pH.ref,
            minph: childSnapshot.val().pH.min,
            maxph: childSnapshot.val().pH.max,
            maxph: childSnapshot.val().pH.max,
            pHpumpHigh: childSnapshot.val().pH.pHpumpHigh,
            pHpumpLow: childSnapshot.val().pH.pHpumpLow,
            pHcurrent: childSnapshot.val().pH.pHcurrent,

            cropTdsRef: childSnapshot.val().tds.ref,
            mintds: childSnapshot.val().tds.min,
            maxtds: childSnapshot.val().tds.max,
            tdspumpA: childSnapshot.val().tds.tdspumpA,
            tdspumpB: childSnapshot.val().tds.tdspumpB,
            tdscurrent: childSnapshot.val().tds.tdscurrent,

            waterrefer: childSnapshot.val().watertemp,

            id: childSnapshot.key, // Include key as id
          };
          this.items.push(item);
        });
        console.log("Fetched Items:", this.items); // Log fetched items
      });
  },

  methods: {
    async editItem(item) {
      try {
        // Navigate to the edit page and pass item ID as a query parameter
        this.$router.push({ name: "edit", query: { id: item.id } });
      } catch (error) {
        console.error("Error navigating to edit page: ", error);
        // Optionally, display an error message to the user
      }
    },

    showDeleteDialog(item) {
      // Show the delete confirmation dialog
      this.deleteItem = item;
      this.deleteDialog = true;
    },

    async deleteItemConfirmed() {
      // Delete the item from Firebase and local data
      if (this.deleteItem) {
        // Delete item from Firebase
        firebase.database().ref("details").child(this.deleteItem.id).remove();
        // Remove item from local data
        this.items = this.items.filter((i) => i.id !== this.deleteItem.id);
        // Close the delete confirmation dialog
        this.deleteDialog = false;
      }
    },

    async plantItem(item) {
      try {
        // Extract data from the item object
        const {
          cropName,
          cropVariation,

          minhumid,
          maxhumid,
          cropHumidRef,

          minph,
          maxph,
          cropPhRef,

          mintds,
          maxtds,
          cropTdsRef,
          

          mintemp,
          maxtemp,
          cropTempRef,

          waterrefer,
        } = item;

        // Save data to different nodes in the Firebase hierarchy
        await Promise.all([
          firebase.database().ref("crop").set({
            name: cropName,
            variation: cropVariation,
          }),
          firebase.database().ref("humid").set({
            humidmin: minhumid,
            humidmax: maxhumid,
            humidref: cropHumidRef,
            humidcurrent: 0,
            humidmist: "0",
          }),
          firebase.database().ref("ph").set({
            pHmin: minph,
            pHmax: maxph,
            pHref: cropPhRef,
            pHcurrent: 0,
            pHpumpHigh: "0",
            pHpumpLow: "0",
          }),
          firebase.database().ref("tds").set({
            tdsmin: mintds,
            tdsmax: maxtds,
            tdsref: cropTdsRef,
            tdspumpA : "0",
            tdspumpB : "0",
            tdscurrent: 0,
            tdswaterpump: "0",
          }),
          firebase.database().ref("temp").set({
            tempmin: mintemp,
            tempmax: maxtemp,
            tempref: cropTempRef,
            tempcurrent: 0,
            tempmist: "0",
          }),
          firebase.database().ref("watertemp").set({
            waterref: waterrefer,
            watercurrent: 0,
            watermax: "0",
            watermin: "0",
          }),
        ]);

        console.log("Data planted successfully!");
        // Toggle the success snackbar
        this.textSuccess = "Crop planted successfully!";
        this.successSnackbar = true;
      } catch (error) {
        console.error("Error planting data: ", error);
        // Optionally, display an error message to the user
        this.textError = "Failed to plant data!";
        this.errorSnackbar = true;
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
