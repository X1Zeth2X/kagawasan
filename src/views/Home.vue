<template>
  <div id="homeView">
    <v-container fluid>
      <StandardLayout />
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
    StandardLayout
  }
})
export default class Home extends Vue {
  @Getter("masonryLayout", { namespace: "settings" })
  private masonryLayout!: boolean;
}
</script>
