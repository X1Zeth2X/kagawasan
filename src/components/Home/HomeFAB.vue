<template>
  <v-speed-dial
    bottom
    right
    transition="slide-y-reverse-transition"
    fixed
    v-model="fab"
  >
    <template v-slot:activator>
      <v-btn fab>
        <v-icon v-if="fab">ion-ios-close</v-icon>
        <v-icon v-else>ion-md-more</v-icon>
      </v-btn>
    </template>

    <v-btn fab color="teal" @click="highlight">
      <v-icon>ion-ios-color-wand</v-icon>
    </v-btn>

    <v-btn fab color="accent" @click="scrollUp">
      <v-icon>ion-ios-arrow-up</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const Prism = require("prismjs");

@Component
export default class HomeFAB extends Vue {
  private fab: boolean = false;

  private highlight() {
    Prism.highlightAll();
  }

  private scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}
</script>
