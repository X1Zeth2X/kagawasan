<template>
  <v-window-item>
    <v-textarea
      rows="2"
      auto-grow
      :solo-inverted="$vuetify.theme.dark"
      :solo="!$vuetify.theme.dark"
      v-model="content"
      @keyup="update(content)"
    ></v-textarea>
  </v-window-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";

@Component
export default class Writer extends Vue {
  private content: string = "";

  @Emit("update")
  private update(content: string): string {
    return content;
  }
}
</script>
