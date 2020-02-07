<template>
  <v-app>
    <Navbar />

    <v-content :class="{ 'blue-grey lighten-5': !$vuetify.theme.dark }">
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

  .mb-negative {
    &-reply {
      margin-bottom: -1.2em;
    }

    &-comment {
      margin-bottom: -0.5em;
    }
  }

  scrollbar-color: #848484 #424242;
  scrollbar-width: thin;
}
</style>
