<template>
  <v-list-item two-line>
    <v-list-item-avatar>
      <img src="https://randomuser.me/api/portraits/lego/6.jpg" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>X1Zeth2X</v-list-item-title>
      <v-list-item-subtitle>Logged In</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <v-icon>ion-md-more</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CurrentUser extends Vue {}
</script>
