<template>
  <v-app-bar
    app
    fixed
    v-if="$route.meta.showNav"
    :color="$vuetify.theme.dark ? '' : 'grey lighten-1'"
  >
    <v-toolbar-title>
      Title
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn>
        Yes.
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Navbar extends Vue {}
</script>
