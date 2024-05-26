import colors from "vuetify/es5/util/colors";

const lightTheme = {
  primary: "#283593",
  succes: "#4CAF50",
  warning: "#ffb22a",
  default: "#563dea",
  background: "#ECEFF1",
};
const darkTheme = {
  primary: "#283593",
  succes: "#4CAF50",
  warning: "#ffb22a",
  default: "#563dea",
};

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // server: {
  //     port: 3000,
  //     host: '192.168.1.6', // Listen on all network interfaces
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - CAPSTONE",
    title: "4A",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/v.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      options: {
        customProperties: true,
      },
      dark: false,
      themes: {
        dark: darkTheme,
        light: lightTheme,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
