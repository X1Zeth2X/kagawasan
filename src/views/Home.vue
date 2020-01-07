<template>
  <div id="homeView">
    <v-container fluid>
      <MasonryLayout v-if="masonryLayout"/>
      <StandardLayout v-else/>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";

import StandardLayout from "@/components/Home/StandardLayout.vue";

@Component({
  components: {
    StandardLayout,
    // Lazily import MasonryLayout.
    MasonryLayout: () => import("@/components/Home/MasonryLayout.vue"),
  }
})
export default class Home extends Vue {
  @Getter("masonryLayout", { namespace: "themeLayout" })
  private masonryLayout!: boolean;
}
</script>
