<template>
  <div>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Crops</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.cropName }}</td>
              <td>{{ item.cropVariation }}</td>
              <td>{{ item.temperature }}</td>
              <td>{{ item.humidity }}</td>
              <td>{{ item.ph }}</td>
              <td>{{ item.tds }}</td>
              <td>{{ item.waterTemp }}</td>
              <td>
                <v-btn color="primary" @click="viewItem(item)">
                  View
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ selectedItem.cropName }} - {{ selectedItem.cropVariation }}</span>
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
            <v-btn color="green darken-1" text @click="addPreset">Add Preset</v-btn>
            <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      search: "",
      selectedItem: {},
      headers: [
        { text: 'Crop Name', value: 'cropName' },
        { text: 'Crop Variation', value: 'cropVariation' },
        { text: 'Temperature', value: 'temperature' },
        { text: 'Humidity', value: 'humidity' },
        { text: 'pH', value: 'ph' },
        { text: 'TDS', value: 'tds' },
        { text: 'Water Temp', value: 'waterTemp' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      items: [
        { id: 1, cropName: 'Tomato', cropVariation: 'Cherry', temperature: '22°C', humidity: '60%', ph: '6.5', tds: '700 ppm', waterTemp: '20°C', image: '/v.png', description: 'Description for Cherry Tomato sajhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh' },
        { id: 2, cropName: 'Lettuce', cropVariation: 'Butterhead', temperature: '18°C', humidity: '70%', ph: '6.0', tds: '500 ppm', waterTemp: '18°C', image: '/path/to/image2.jpg', description: 'Description for Butterhead Lettuce' }
      ]
    }
  },
  methods: {
    viewItem(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
    addPreset() {
      // Add preset logic here
      console.log('Preset added for:', this.selectedItem.cropName, '-', this.selectedItem.cropVariation);
      this.dialog = false;
    }
  }
}
</script>

<style scoped>
</style>
