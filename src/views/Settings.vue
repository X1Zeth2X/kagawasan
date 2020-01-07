<template>
  <div id="settingsView">
    <v-container>
      <v-row align="start" justify="start">
        <v-col cols="12">
          <div class="f1 fw7">
            Settings
          </div>
          <p>Adjust application and user settings.</p>

          <v-expansion-panels focusable>
            <Layout />
            <Content />
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Layout from "@/components/Settings/Layout.vue";
import Content from "@/components/Settings/Content.vue";

@Component({
  components: {
    Layout,
    Content
  }
})
export default class Settings extends Vue {}
</script>
