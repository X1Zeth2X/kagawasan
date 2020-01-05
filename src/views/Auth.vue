<template>
  <v-window v-model="window">
    <v-window-item>
      <LoginWindow v-on:register="toggleView" />
    </v-window-item>

    <v-window-item>
      <RegisterWindow v-on:login="toggleView" />
    </v-window-item>
  </v-window>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import LoginWindow from "@/components/Auth/LoginWindow.vue";
import RegisterWindow from "@/components/Auth/RegisterWindow.vue";

@Component({
  components: {
    LoginWindow,
    RegisterWindow
  }
})
export default class Auth extends Vue {
  private window: number = 0;

  private toggleView() {
    if (this.window === 0) {
      this.window = 1;
    } else {
      this.window = 0;
    }
  }
}
</script>

<style lang="scss">
#AuthView {
  .left-dark {
    background-image: linear-gradient(
      to left top,
      #5e3a59,
      #523659,
      #433359,
      #333158,
      #202e55
    );
  }
}
</style>
