<template>
  <v-snackbar v-model="show" :color="snackNotifier.color" bottom multi-line>
    <span class="white--text fw5">
      {{ message }}
    </span>

    <v-btn icon text @click="show = false">
      <v-icon>ion-ios-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";
import { Watch } from "vue-property-decorator";

const namespace: string = "dialog";

interface SnackData {
  message: string;
  color: string;
}

@Component
export default class SnackNotifier extends Vue {
  @Getter("snackNotifier", { namespace }) private snackNotifier!: SnackData;

  private show: boolean = false;

  private message: string = "";

  @Watch("snackNotifier")
  private onSnackNotifierChange(newValue: object, oldValue: object) {
    if (this.snackNotifier.message !== null) {
      this.show = true;
      this.message = this.snackNotifier.message;
    }
  }
}
</script>
