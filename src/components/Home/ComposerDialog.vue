<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="40em" overlay-opacity=".8">
      <v-card class="b-card">
        <v-card-title>
          Create a post.

          <v-spacer></v-spacer>

          <v-btn icon @click="dialog = false">
            <v-icon>ion-ios-close</v-icon>
          </v-btn>
        </v-card-title>
        <Composer />
      </v-card>
    </v-dialog>

    <v-btn fab fixed bottom right class="teal" @click="toggleComposer">
      <v-icon>ion-md-create</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Composer from "./Composer.vue";

@Component({
  components: {
    Composer
  }
})
export default class ComposerDialog extends Vue {
  private dialog: boolean = false;

  private toggleComposer() {
    this.dialog = !this.dialog;
  }
}
</script>
