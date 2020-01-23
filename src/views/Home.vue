<template>
  <div id="homeView">
    <v-container fluid>
      <StandardLayout />

      <EditDialog v-if="showEdit" :show="showEdit" />
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";

import StandardLayout from "@/components/Home/StandardLayout.vue";
const EditDialog = () => import("@/components/EditDialog.vue");

@Component({
  components: {
    StandardLayout,
    EditDialog
  }
})
export default class Home extends Vue {
  // Bind "editDialog" boolean from home so that it can conditionally render it.
  @Getter("editDialog", { namespace: "dialog" }) private showEdit!: boolean;
}
</script>
