<template>
  <v-window-item>
    <v-card flat>
      <v-card-text>
        Uploader will be unavailable for a bit since we will be re-implementing
        the upload system.

        <div>
          <v-icon class="mr1" small>ion-ios-information-circle-outline</v-icon>
          For now, use the markdown image syntax to attach external images.
        </div>
      </v-card-text>
    </v-card>
  </v-window-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Uploader extends Vue {}
</script>
