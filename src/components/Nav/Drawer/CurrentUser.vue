<template>
  <v-list-item two-line @click="profilePage">
    <v-list-item-avatar>
      <img src="https://picsum.photos/200/300" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>X1Zeth2X</v-list-item-title>
      <v-list-item-subtitle>Logged In</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <v-icon>ion-ios-arrow-forward</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CurrentUser extends Vue {
  private profilePage() {
    this.$router.push({
      name: "profile",
      params: {
        username: "X1Zeth2X"
      }
    });
  }
}
</script>
