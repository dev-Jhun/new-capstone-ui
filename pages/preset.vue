<template>
  <v-container fluid>
    <!-- Edit Confirmation Dialog -->
    <v-dialog v-model="editConfirmationDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Save</v-card-title>
        <v-card-text>Are you sure you want to save the changes?</v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="saveEditedPreset"
            >Yes</v-btn
          >
          <v-btn color="primary" text @click="editConfirmationDialog = false"
            >No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Plant Confirmation Dialog -->
    <v-dialog v-model="plantCrop" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Plant</v-card-title>
        <v-card-text> Are you sure you want to plant this crop? </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="plantItemConfirmed"
            >Yes</v-btn
          >
          <v-btn color="primary" text @click="plantCrop = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

    <!-- delete confirmation dialog -->
    <v-dialog v-model="deleteConfirmationDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Delete Confirmation</v-card-title>
        <v-card-text>
          Are you sure you want to delete this preset?
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="deletePresetConfirmed">Yes</v-btn>
          <v-btn color="primary" text @click="deleteConfirmationDialog = false"
            >No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="1200">
      <v-card>
        <v-card-title class="headline d-flex justify-center"
          >Edit Preset</v-card-title
        >
        <v-card-text>
          <br />
          <v-form @submit.prevent="saveEditedPreset">
            <!-- Crop Information -->
            <v-row>
              <!-- Image -->
              <v-col cols="12" md="8" sm="6">
                <v-img
                  :src="editSelectedItem.image"
                  alt="Crop Image"
                  contain
                ></v-img>
              </v-col>
              <!-- Details -->
              <v-col cols="12" md="4" sm="6" class="pa-4">
                <h2>{{ editSelectedItem.cropName }}</h2>
                <p>{{ editSelectedItem.cropVariation }}</p>
                <p>
                  <strong>Min Temperature:</strong>
                  {{ editSelectedItem.tempmin }} °C
                </p>
                <p>
                  <strong>Max Temperature:</strong>
                  {{ editSelectedItem.tempmax }} °C
                </p>
                <p>
                  <strong>Min Humidity:</strong>
                  {{ editSelectedItem.humidmin }} %
                </p>
                <p>
                  <strong>Max Humidity:</strong>
                  {{ editSelectedItem.humidmax }} %
                </p>
                <p><strong>Min PH:</strong> {{ editSelectedItem.pHmin }}</p>
                <p><strong>Max PH:</strong> {{ editSelectedItem.pHmax }}</p>
                <p><strong>Min TDS:</strong> {{ editSelectedItem.tdsmin }}</p>
                <p><strong>Max TDS:</strong> {{ editSelectedItem.tdsmax }}</p>
                <p>
                  <strong>Min Water Temperature:</strong>
                  {{ editSelectedItem.watermin }} °C
                </p>
                <p>
                  <strong>Max Water Temperature:</strong>
                  {{ editSelectedItem.watermax }} °C
                </p>
              </v-col>
              <v-col cols="12">
                <h3>Description</h3>
                <br />
                <p style="text-indent: 20px; text-align: justify">
                  {{ editSelectedItem.description }}
                </p>
              </v-col>
            </v-row>
            <br />
            <br />
            <br />
            <!-- Editable Fields -->
            <v-row justify="center" class="pa-5">
              <!-- Text Fields -->
              <v-row justify="center" class="pa-5">
                <!-- Text Fields -->
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.cropName"
                    label="Crop Name"
                    outlined
                    small
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.cropVariation"
                    label="Crop Variation"
                    outlined
                    small
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.tempmin"
                    type="number"
                    label="Min Temperature"
                    outlined
                    small
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.tempmax"
                    label="Max Temperature"
                    outlined
                    small
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.humidmin"
                    label="Min Humidity"
                    outlined
                    small
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.humidmax"
                    label="Max Humidity"
                    outlined
                    small
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.pHmin"
                    label="Min PH"
                    outlined
                    small
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.pHmax"
                    label="Max PH"
                    outlined
                    small
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.tdsmin"
                    label="Min TDS"
                    outlined
                    small
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.tdsmax"
                    label="Max TDS"
                    outlined
                    small
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.watermin"
                    label="Min Water Temperature"
                    outlined
                    small
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editSelectedItem.watermax"
                    label="Max Water Temperature"
                    outlined
                    small
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-row>
                  <v-col cols="12">
                    <v-btn
                      @click="editConfirmationDialog = true"
                      color="success"
                      >Save</v-btn
                    >
                    <v-btn color="error" @click="editDialog = false"
                      >Cancel</v-btn
                    >
                  </v-col>
                </v-row>
              </v-row>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <br />
    <v-row justify="center" align="center">
      <v-btn color="success" dark large @click="dialog = true"
        >ADD PRESET</v-btn
      >
    </v-row>
    <br />

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title class="headline d-flex justify-center"
          >ADD NEW PRESET</v-card-title
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
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.cropVariation"
                        label="CROP VARIATION"
                        outlined
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-card class="pa-4" outlined elevation="5">
                  <v-text-field
                    v-model="formData.imageUrl"
                    label="IMAGE URL"
                    readonly
                    outlined
                  ></v-text-field>
                  <input
                    type="file"
                    @change="handleFileUpload"
                    accept="image/*"
                  />
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-card class="pa-4" outlined elevation="5">
                  <v-textarea
                    v-model="formData.description"
                    label="DESCRIPTION"
                    required
                    outlined
                  ></v-textarea>
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
                    >WATER TEMPERATURE</v-card-title
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
                      >SAVE PRESET</v-btn
                    >
                  </v-col>
                  <v-col cols="auto">
                    <v-btn @click="dialog = false" color="red" dark large
                      >CANCEL PRESET</v-btn
                    >
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
              <td>{{ item.tempmin }} - {{ item.tempmax }}</td>
              <td>{{ item.humidmin }} - {{ item.humidmax }}</td>
              <td>{{ item.pHmin }} - {{ item.pHmax }}</td>
              <td>{{ item.tdsmin }} - {{ item.tdsmax }}</td>
              <td>{{ item.watermin }} - {{ item.watermax }}</td>
              <td>
                <v-btn color="success" @click="viewItem(item)">Plant</v-btn>
                <v-btn color="error" @click="openDeleteConfirmation(item)"
                  >Delete</v-btn
                >
                <v-btn color="primary" @click="editPreset(item)">Edit</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogItem" max-width="800px">
      <v-card>
        <v-card-title class="headline d-flex justify-center">{{
          selectedItem.cropName
        }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="8" sm="6">
                <img
                  :src="selectedItem.image"
                  alt="Crop Image"
                  style="width: 100%"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <p><strong>Crop Name:</strong> {{ selectedItem.cropName }}</p>
                <p>
                  <strong>Crop Variation:</strong>
                  {{ selectedItem.cropVariation }}
                </p>
                <p>
                  <strong>Temperature:</strong> {{ selectedItem.tempmin }} -
                  {{ selectedItem.tempmax }} °C
                </p>
                <p>
                  <strong>Humidity:</strong> {{ selectedItem.humidmin }} -
                  {{ selectedItem.humidmax }} %
                </p>
                <p>
                  <strong>PH Level:</strong> {{ selectedItem.pHmin }} -
                  {{ selectedItem.pHmax }}
                </p>
                <p>
                  <strong>TDS Level:</strong> {{ selectedItem.tdsmin }} -
                  {{ selectedItem.tdsmax }}
                </p>
                <p>
                  <strong>Water Temperature:</strong>
                  {{ selectedItem.watermin }} - {{ selectedItem.watermax }} °C
                </p>
              </v-col>
              <v-col cols="12">
                <h3>Description</h3>
                <br />
                <p style="text-indent: 20px; text-align: justify">
                  {{ selectedItem.description }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="plantCrop = true">Plant</v-btn>
          <v-btn color="error" text @click="dialogItem = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      successSnackbar: false,
      errorSnackbar: false,
      textSuccess: "",
      textError: "",

      editDialog: false, // Edit dialog visibility
      editSelectedItem: {}, // Currently selected item for editing

      deleteConfirmationDialog: false,
      itemToDelete: null,
      dialog: false,
      plantDialog: false,
      plantCrop: false,
      dialogItem: false,
      editConfirmationDialog: false,
      search: "",

      formData: {
        cropName: "",
        cropVariation: "",
        cropTempMin: "",
        cropTempMax: "",
        cropHumidMin: "",
        cropHumidMax: "",
        cropPhMin: "",
        cropPhMax: "",
        cropTdsMin: "",
        cropTdsMax: "",
        cropWaterMin: "",
        cropWaterMax: "",
        imageUrl: "", // Changed from image to imageUrl
        description: "",
      },
      selectedItem: {},
      items: [],
      headers: [
        { text: "CROP NAME", value: "cropName" },
        { text: "CROP VARIATION", value: "cropVariation" },
        { text: "TEMPERATURE (°C)", value: "temperature" },
        { text: "HUMIDITY (%)", value: "humidity" },
        { text: "PH LEVEL", value: "ph" },
        { text: "TDS LEVEL", value: "tds" },
        { text: "WATER TEMPERATURE (°C)", value: "waterTemp" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],
      nameRules: [
        (v) => !!v || "This field is required",
        (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
      ],
    };
  },
  created() {
    this.fetchData();
    this.addPreSavedData();
  },
  methods: {
    async plantItemConfirmed() {
      try {
        await firebase
          .database()
          .ref("currentPlantedCrop")
          .set(this.selectedItem); // Changed to firebase.database()

        Promise.all([
          firebase.database().ref("crop").set({
            name: this.selectedItem.cropName,
            variation: this.selectedItem.cropVariation,
            image: this.selectedItem.image,
            description: this.selectedItem.description,
          }),
          firebase.database().ref("humid").set({
            humidmin: this.selectedItem.humidmin,
            humidmax: this.selectedItem.humidmax,
            humidcurrent: 0,
            humidmist: this.selectedItem.humidmist,
          }),
          firebase.database().ref("ph").set({
            pHmin: this.selectedItem.pHmin,
            pHmax: this.selectedItem.pHmax,
            pHcurrent: 0,
            pHpumpHigh: this.selectedItem.pHpumpHigh,
            pHpumpLow: this.selectedItem.pHpumpLow,
          }),
          firebase.database().ref("tds").set({
            tdsmin: this.selectedItem.tdsmin,
            tdsmax: this.selectedItem.tdsmax,
            tdspumpA: this.selectedItem.tdspumpA,
            tdspumpB: this.selectedItem.tdspumpB,
            tdscurrent: 0,
            tdswaterpump: this.selectedItem.tdswaterpump,
          }),
          firebase.database().ref("temp").set({
            tempmin: this.selectedItem.tempmin,
            tempmax: this.selectedItem.tempmax,
            tempcurrent: 0,
            tempmist: this.selectedItem.tempmist,
          }),
          firebase.database().ref("watertemp").set({
            watercurrent: 0,
            watermax: this.selectedItem.watermin,
            watermin: this.selectedItem.watermax,
          }),
        ]);

        this.textSuccess = "Crop successfully planted!";
        this.successSnackbar = true;
        this.dialogItem = false;
        this.plantCrop = false;

        console.log("Crop planted:", this.selectedItem);
      } catch (error) {
        console.error("Error planting crop: ", error);
        this.textError = "Crop failed to plant!";
        this.errorSnackbar = true;
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];

      if (!file) {
        // No file was selected, exit the function
        return;
      }

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child("images/" + file.name).put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          console.error("Error uploading image: ", error);
        },
        () => {
          // Upload completed successfully, get download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.formData.imageUrl = downloadURL;
          });
        }
      );
    },

    editPreset(item) {
      // Open the dialog for editing and populate with selected item's data
      this.editSelectedItem = { ...item };
      this.editDialog = true;
    },

    async saveEditedPreset() {
      try {
        await firebase
          .database()
          .ref("crops")
          .child(this.editSelectedItem.id) // Change this.selectedItem to this.editSelectedItem
          .update(this.editSelectedItem); // Change this.selectedItem to this.editSelectedItem
        console.log("Preset updated:", this.editSelectedItem);
        this.dialog = false; // Close the dialog after saving
        this.fetchData(); // Refresh the data table
        this.textSuccess = "Preset successfully updated!";
        this.successSnackbar = true;
        this.editDialog = false;
      } catch (error) {
        console.error("Error updating preset: ", error);
        this.textError = "Error updating preset";
        console.log(this.editSelectedItem.id);
        this.errorSnackbar = true;
      }
      this.editConfirmationDialog = false; // Close the confirmation dialog after saving
    },

    // Existing methods...
    async addPresetConfirmed() {
      // Check if required fields are empty
      if (
        !this.formData.cropName ||
        !this.formData.cropVariation ||
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
        this.textError = "Please fill in all required fields";
        this.errorSnackbar = true;
        return; // Stop execution if any required field is empty
      }
      const newPreset = {
        cropName: this.formData.cropName,
        cropVariation: this.formData.cropVariation,

        tempmin: this.formData.cropTempMin,
        tempmax: this.formData.cropTempMax,
        tempmist: "0",
        tempcurrent: 0,

        humidmin: this.formData.cropHumidMin,
        humidmax: this.formData.cropHumidMax,
        humidmist: "0",
        humidcurrent: 0,

        pHmin: this.formData.cropPhMin,
        pHmax: this.formData.cropPhMax,
        pHpumpHigh: "0",
        pHpumpLow: "0",
        pHcurrent: 0,

        tdsmin: this.formData.cropTdsMin,
        tdsmax: this.formData.cropTdsMax,
        tdspumpA: "0",
        tdspumpB: "0",
        tdscurrent: 0,
        tdswaterpump: "0",

        watermin: this.formData.cropWaterMin,
        watermax: this.formData.cropWaterMax,
        watercurrent: 0,

        image: this.formData.imageUrl, // Changed to imageUrl
        description: this.formData.description,
      };

      try {
        const newPresetRef = firebase.database().ref("crops").push(); // Changed to firebase.database()
        await newPresetRef.set(newPreset);
        this.items.push({ ...newPreset, id: newPresetRef.key });
        this.plantDialog = false;
        this.fetchData();
        this.dialog = false;
        this.textSuccess = "Data successfully added!";
        this.successSnackbar = true;

        // Clear the formData object
        this.formData = {
          cropName: "",
          cropVariation: "",
          cropTempMin: "",
          cropTempMax: "",
          cropHumidMin: "",
          cropHumidMax: "",
          cropPhMin: "",
          cropPhMax: "",
          cropTdsMin: "",
          cropTdsMax: "",
          cropWaterMin: "",
          cropWaterMax: "",
          imageUrl: "",
          description: "",
        };
      } catch (error) {
        console.error("Error adding document: ", error);
        this.textError = "Error saving data";
        this.errorSnackbar = true;
      }
    },

    async fetchData() {
      try {
        const snapshot = await firebase.database().ref("crops").once("value");
        const cropsData = snapshot.val();
        this.items = Object.keys(cropsData).map((key) => ({
          id: key, // Use the Firebase key as the id
          ...cropsData[key],
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },

    openDeleteConfirmation(item) {
      this.itemToDelete = item;
      this.deleteConfirmationDialog = true;
    },
    async deletePresetConfirmed() {
      if (this.itemToDelete) {
        try {
          // Retrieve the image URL from the item being deleted
          const imageUrlToDelete = this.itemToDelete.image;

          // Delete the item from the database
          await firebase
            .database()
            .ref("crops")
            .child(this.itemToDelete.id)
            .remove();

          // Remove the item from the local items array
          this.items = this.items.filter(
            (item) => item.id !== this.itemToDelete.id
          );

          // Delete the image file from Firebase Storage
          if (imageUrlToDelete) {
            const storageRef = firebase.storage().refFromURL(imageUrlToDelete);
            await storageRef.delete();
          }

          // Close the delete confirmation dialog and reset itemToDelete
          this.deleteConfirmationDialog = false;
          this.itemToDelete = null;

          // Show success snackbar
          this.textSuccess = "Data successfully deleted!";
          this.successSnackbar = true;
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
        this.deleteConfirmationDialog = false;
      }
    },

    openConfirmationDialog() {
      this.plantDialog = true; // Set plantDialog to true to open the confirmation dialog
    },

    viewItem(item) {
      this.selectedItem = item;
      this.dialogItem = true; // Open the dialog to view the item details
    },

    // async plantSelectedItem() {
    //   try {
    //     await firebase
    //       .database()
    //       .ref("currentPlantedCrop")
    //       .set(this.selectedItem); // Changed to firebase.database()
    //     console.log("Crop planted:", this.selectedItem);
    //   } catch (error) {
    //     console.error("Error planting crop: ", error);
    //   }
    //   this.dialogItem = false;
    // },

    async addPreSavedData() {
      // Pre-saved data with images and descriptions
      const preSavedData = [
        {
          cropName: "Tomato",
          cropVariation: "Cherry",

          tempmin: "18",
          tempmax: "25",
          tempcurrent: 0,
          tempmist: "0",

          humidmin: "70",
          humidmax: "80",
          humidcurrent: 0,
          humidmist: "0",

          pHmin: "5",
          pHmax: "6",
          pHcurrent: 0,
          pHpumpHigh: "0",
          pHpumpLow: "0",

          tdsmin: "1400",
          tdsmax: "3500",
          tdscurrent: 0,
          tdspumpA: "0",
          tdspumpB: "0",
          tdswaterpump: "0",

          watermin: "20",
          watermax: "25",
          watercurrent: 0,

          image:
            "https://tse1.mm.bing.net/th?id=OIP.7BlQ5cKEulARP8-pIJlWtgFNC7&pid=Api&P=0&h=220",
          description:
            "Cherry tomatoes are a small variety of tomato that is named for its shape which resembles a cherry. Sometimes sold on the vine, the vegetable can range from a little smaller than a cherry to about twice the size, and can be red (the most common color), yellow, orange, green, or almost black. These tomatoes are prized by chefs for their juiciness and thin skin, which causes the fruits to pop in your mouth when eaten. Like all tomatoes, cherry tomatoes are best in the summer, but because of their small size, they can also be grown in a greenhouse while still maintaining much of their flavor and texture. The affordable veggie can be eaten as is after a quick rinse and doesn't require peeling, seeding, or even chopping.",
        },
        {
          cropName: "Lettuce",
          cropVariation: "Butterhead",

          tempmin: "15",
          tempmax: "24",
          tempcurrent: 0,
          tempmist: "0",

          humidmin: "50",
          humidmax: "70",
          humidcurrent: 0,
          humidmist: "0",

          pHmin: "5.5",
          pHmax: "6.5",
          pHcurrent: 0,
          pHpumpHigh: "0",
          pHpumpLow: "0",

          tdsmin: "560",
          tdsmax: "840",
          tdscurrent: 0,
          tdspumpA: "0",
          tdspumpB: "0",
          tdswaterpump: "0",

          watermin: "20",
          watermax: "24",
          watercurrent: 0,

          image:
            "https://auscrops.com.au/wp-content/uploads/2023/01/butterhead-lettuce.jpg",
          description:
            "Butterhead lettuce is a type of lettuce with a soft texture and a mild flavor. It is named for its butter-like shape.This lettuce is mostly used in salads. It is soft and usually has a creamy texture. This green veggie can be harvested early for Butterhead salad or later for Butter leaf lettuce. Butterhead lettuce is available in both red and green varieties. The Butterhead lettuce is also referred to as Boston, Buttercrunch, and Butter.This lettuce has a mild flavor and is perfect for making salads or eating plain, out of hand. It is available year-round but peaks in the summer months from May through September.",
        },
        {
          cropName: "Lettuce",
          cropVariation: "Romaine",

          tempmin: "15",
          tempmax: "24",
          tempcurrent: 0,
          tempmist: "0",

          humidmin: "50",
          humidmax: "70",
          humidcurrent: 0,
          humidmist: "0",

          pHmin: "5.5",
          pHmax: "6.5",
          pHcurrent: 0,
          pHpumpHigh: "0",
          pHpumpLow: "0",

          tdsmin: "560",
          tdsmax: "840",
          tdscurrent: 0,
          tdspumpA: "0",
          tdspumpB: "0",
          tdswaterpump: "0",

          watermin: "20",
          watermax: "24",
          watercurrent: 0,

          image:
            "https://growincrazyacres.com/wp-content/uploads/2014/04/romaine-lettuce.jpg",
          description:
            "Romaine or cos lettuce (Lactuca sativa L. var. longifolia) is a variety of lettuce that grows in a tall head of sturdy dark green leaves with firm ribs down their centers. Unlike most lettuces, it is tolerant of heat. In North America, romaine is often sold as whole heads or as hearts that have had the outer leaves removed and are often packaged together.",
        },
        {
          cropName: "Spinach",
          cropVariation: "Savoy",

          tempmin: "16",
          tempmax: "24",
          tempcurrent: 0,
          tempmist: "0",

          humidmin: "70",
          humidmax: "80",
          humidcurrent: 0,
          humidmist: "0",

          pHmin: "6",
          pHmax: "7",
          pHcurrent: 0,
          pHpumpHigh: "0",
          pHpumpLow: "0",

          tdsmin: "1050",
          tdsmax: "1400",
          tdscurrent: 0,
          tdspumpA: "0",
          tdspumpB: "0",
          tdswaterpump: "0",

          watermin: "18",
          watermax: "24",
          watercurrent: 0,

          image:
            "https://i.etsystatic.com/23873817/r/il/6d3e64/2847588617/il_fullxfull.2847588617_7f91.jpg",
          description:
            "Savoy spinach is a variety of spinach known for its unique and distinctive appearance. It is characterized by its dark green, crinkly or wrinkled leaves that have a curly or savoyed texture. The term “savoyed” refers to the puckered or crinkled appearance of the leaves, which sets it apart from other spinach varieties.",
        },
        {
          cropName: "Cucumber",
          cropVariation: "Slicing",

          tempmin: "18",
          tempmax: "24",
          tempcurrent: 0,
          tempmist: "0",

          humidmin: "70",
          humidmax: "90",
          humidcurrent: 0,
          humidmist: "0",

          pHmin: "5",
          pHmax: "6",
          pHcurrent: 0,
          pHpumpHigh: "0",
          pHpumpLow: "0",

          tdsmin: "1190",
          tdsmax: "1750",
          tdscurrent: 0,
          tdspumpA: "0",
          tdspumpB: "0",
          tdswaterpump: "0",

          watermin: "20",
          watermax: "24",
          watercurrent: 0,

          image:
            "https://h2.commercev3.net/cdn.gurneys.com/images/500/61949.jpg",
          description:
            "A slicing cucumber is a general term for any cucumber that’s harvested when it’s around six to ten inches long. These cucumbers are bigger than pickling cucumbers. ",
        },
        // Add more pre-saved data entries here
      ];

      try {
        const updates = {};
        preSavedData.forEach((item, index) => {
          updates[`crops/${index}`] = item;
        });
        await firebase.database().ref().update(updates); // Changed to firebase.database()
        console.log("Pre-saved data added successfully");
      } catch (error) {
        console.error("Error adding pre-saved data: ", error);
      }
    },
  },
};
</script>