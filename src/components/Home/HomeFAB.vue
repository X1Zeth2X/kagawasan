<template>
  <v-speed-dial
    bottom
    right
    transition="slide-y-reverse-transition"
    fixed
    v-model="fab"
  >
    <template v-slot:activator>
      <v-btn fab color="info">
        <v-icon v-if="fab">ion-ios-close</v-icon>
        <v-icon v-else>ion-md-more</v-icon>
      </v-btn>
    </template>

    <v-btn fab color="green" @click="highlight" :disabled="!markdown" small dark>
      <v-icon>ion-ios-color-wand</v-icon>
    </v-btn>

    <v-btn fab color="indigo" @click="scrollUp" small dark>
      <v-icon>ion-ios-arrow-up</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from 'vuex-class';

const Prism = require("prismjs");

@Component
export default class HomeFAB extends Vue {
  @Getter("markdown", { namespace: "settings" }) private markdown!: boolean;

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
