<template>
  <div id="masonryLayout">
    <ComposerDialog />
    <masonry
      :cols="{
        default: 3, 1264:
        2, 960:
        1
      }"
      gutter="10"
    >
      <PostMain />

      <v-card class="mb2 b-card">
        <v-card-title>
          <v-icon class="mr2">ion-ios-calendar</v-icon>
          Event
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, voluptates.
          <ul>
            <li>Lorem, ipsum.</li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-btn block rounded color="primary darken-1">
            Going
          </v-btn>
        </v-card-actions>

      </v-card>

      <PostMain />
      <PostMain />
      <PostMain />
    </masonry>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import VueMasonry from "vue-masonry-css";
import PostMain from "./Post/Main.vue";
import ComposerDialog from "./ComposerDialog.vue";

Vue.use(VueMasonry);

@Component({
  components: {
    PostMain,
    ComposerDialog
  }
})
export default class MasonryLayout extends Vue {}
</script>
