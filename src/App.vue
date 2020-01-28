<template>
  <v-app>
    <Navbar />

    <v-content>
      <v-slide-y-reverse-transition mode="out-in">
        <keep-alive max="2">
          <router-view :key="$route.fullPath"></router-view>
        </keep-alive>
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

  .b-card {
    border-radius: 1em;
  }

  .ml-negative {
    margin-left: -0.3em;
  }
}
</style>
