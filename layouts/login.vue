<template>
    <v-app class="background">
      <v-main>
        <Nuxt />
      </v-main>
    </v-app>
  </template>
  
  <style scoped>
  .background {
    background-image: url("https://www.treehugger.com/thmb/uHRjV9zEL2a-g1N5gaHxJiqpU3Q=/2121x1414/filters:fill(auto,1)/GettyImages-1194451296-46ea81725e834c9bbffea37679624336.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    position: relative; /* Ensure the pseudo-element is positioned relative to this element */
    width: 100%;
    height: 100%;
  }
  
  .background::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6); /* Darkish transparent overlay */
    z-index: 1; /* Ensure the overlay is above the background */
  }
  
  .v-main {
    position: relative;
    z-index: 2; /* Ensure the main content is above the overlay */
  }
  </style>
  