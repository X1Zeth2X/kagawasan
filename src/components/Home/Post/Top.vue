<template>
  <v-list-item>
    <v-list-item-avatar>
      <a href="#">
        <v-avatar size="45" class="primary">
          <v-icon dark>ion-md-person</v-icon>
        </v-avatar>
      </a>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="b">
        Zeth Leonardo
      </v-list-item-title>

      <v-list-item-subtitle>
        29th Jan, 2020
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>ion-md-more</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            Edit
          </v-list-item>

          <v-list-item>
            Delete
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-icon>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class PostTop extends Vue {}
</script>
