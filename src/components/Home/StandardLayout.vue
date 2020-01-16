<template>
  <v-row align="start" justify="space-around">
    <v-col md="7">
      <div class="f3 fw7">Create</div>
      <p>What's on your mind?</p>
      <Composer />

      <v-divider class="mv4"></v-divider>

      <PostMain />
    </v-col>
    <v-col md="4" v-if="$vuetify.breakpoint.mdAndUp">
      <div class="f3 fw7">Announcements</div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
        cumque?
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
