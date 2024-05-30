<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="#0766AD"
      dark
      fixed
      app
    >
      <v-list-item two-line class="profile" dark>
        <v-list-item-avatar>
          <v-icon color="green">mdi-leaf</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title color="black">SMART HYDROPONICS</v-list-item-title>
          <!-- <v-list-item-subtitle>Logged In</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="blue" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon dark small @click="showLogoutDialog">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>

    <!-- Logout Confirmation Dialog -->
    <v-dialog v-model="logoutDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Logout</v-card-title>
        <v-card-text> Are you sure you want to logout? </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="logout">Yes</v-btn>
          <v-btn color="primary" text @click="logoutDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      logoutDialog: false, // Dialog visibility
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-pencil",
          title: "Override",
          to: "/override",
        },
        // {
        //   icon: "mdi-flower",
        //   title: "Plant Crop",
        //   to: "/plant",
        // },
        // {
        //   icon: "mdi-wrench",
        //   title: "Preset",
        //   to: "/presets",
        // },
        // {
        //   icon: "mdi-flower",
        //   title: "Plant Crop",
        //   to: "/table",
        // },
        {
          icon: "mdi-wrench",
          title: "Presets",
          to: "/preset",
        },
        // {
        //   icon: "mdi-wrench",
        //   title: "Sample",
        //   to: "/sample",
        // },
      //  {
      //     icon: "mdi-information",
      //     title: "Crop Page",
      //     to: "/cropInfo",
      //   }, 
      //   {
      //     icon: "mdi-information",
      //     title: "image",
      //     to: "/image",
      //   },
      ],
      title: "TIC : WEB-BASED MONITORING FOR SMART HYDROPONICS",
      miniVariant: false,
    };
  },
  methods: {
    showLogoutDialog() {
      this.logoutDialog = true;
    },
    logout() {
      this.logoutDialog = false;
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.profile {
  background: #232d3f;
}
</style>

