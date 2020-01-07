<template>
  <v-row align="start" justify="space-around">
    <v-col md="7">
      <div class="f3 fw7">Create</div>
      <p>What's on your mind?</p>
      <Composer />

      <v-divider class="mv4"></v-divider>

      <PostMain />
    </v-col>
    <v-col md="4">
      <div class="f2 fw2">Planning Board</div>
      <div class="f3 fw7">Standard Layout *</div>
      <p>
        Your usual social platform layout where the composer and feed is in the
        middle, and other stuff on the right side, navigation drawer.
      </p>

      <div class="f3 fw7">Masonry Layout *</div>
      <p>
        Composer is a dialog and posts are shown in a masonry layout.
      </p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import PostMain from "./Post/Main.vue";
import Composer from "./Composer.vue";

@Component({
  components: {
    Composer,
    PostMain
  }
})
export default class StandardLayout extends Vue {}
</script>
