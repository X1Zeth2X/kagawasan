<template>
  <div id="homeView">
    <v-container fluid>
      <StandardLayout />

      <EditDialog v-if="showEdit" :show="showEdit" />
      <SnackNotifier />
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";

import StandardLayout from "@/components/Home/StandardLayout.vue";
import SnackNotifier from "@/components/SnackNotifier.vue";
const EditDialog = () => import("@/components/EditDialog.vue");

const Prism = require("prismjs");

@Component({
  components: {
    StandardLayout,
    EditDialog,
    SnackNotifier
  }
})
export default class Home extends Vue {
  // Bind "editDialog" boolean from home so that it can conditionally render it.
  @Getter("editDialog", { namespace: "dialog" }) private showEdit!: boolean;

  @Getter("markdown", { namespace: "settings" }) private markdown!: boolean;

  private mounted() {
    this.$nextTick(() => {
      if (this.markdown) {
        Prism.highlightAll();
      }
    });
  } // Lifecycle
}
</script>
