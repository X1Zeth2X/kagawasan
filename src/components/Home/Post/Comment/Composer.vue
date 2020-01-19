<template>
  <div id="commentComposer" class="mh3 mt3">
    <v-textarea
      rows="2"
      placeholder="Write a comment..."
      auto-grow
      class="b-card"
      solo
      filled
    >
      <template v-slot:append>
        <v-btn icon class="teal mb3 ml1" elevation="2" dark>
          <v-icon>ion-ios-image</v-icon>
        </v-btn>
        <v-btn icon class="teal mb3 ml1" elevation="2" dark>
          <v-icon>ion-ios-send</v-icon>
        </v-btn>
      </template>
    </v-textarea>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CommentComposer extends Vue {}
</script>
