<template>
  <div id="settingsView">
    <v-container>
      <v-row align="start" justify="start">
        <v-col cols="12">
          <div class="f1 fw7 mb4">
            Settings
          </div>

          <Layout />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Layout from "@/components/Settings/Layout.vue";

@Component({
  components: {
    Layout
  }
})
export default class Settings extends Vue {}
</script>
