<template>
  <v-app>
    <Navbar />

    <v-content>
      <v-slide-y-reverse-transition mode="out-in"
        ><router-view :key="$route.fullPath"></router-view>
      </v-slide-y-reverse-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Navbar from "@/components/Nav/Navbar.vue";

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Be Vietnam", sans-serif;

  a {
    text-decoration: none;
  }

  .b-card {
    border-radius: 1em;
  }
}
</style>
