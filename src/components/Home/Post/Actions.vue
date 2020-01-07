<template>
  <v-card-actions>
    <v-btn icon @click="toggleKek">
      <v-icon :color="kekGiven ? 'red lighten-1' : ''">
        {{ kekGiven ? 'ion-ios-heart' : 'ion-ios-heart-empty' }}
      </v-icon>
    </v-btn>
    <span class="mb1 f6">19k</span>

    <v-btn icon>
      <v-icon>ion-ios-chatboxes</v-icon>
    </v-btn>
    <span class="mb1 f6">1</span>

    <v-btn icon>
      <v-icon>ion-ios-share-alt</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>ion-md-bookmark</v-icon>
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class PostActions extends Vue {
  private kekGiven: boolean = false;

  private toggleKek() {
    this.kekGiven = !this.kekGiven;
  }
}
</script>
