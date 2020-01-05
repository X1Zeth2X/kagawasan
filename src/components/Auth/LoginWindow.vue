<template>
  <v-row align="stretch" class="vh-100" id="LoginWindow">
    <v-col md="5" cols="12">
      <v-container class="ph4">
        <div class="ph4-ns">
          <h1 class="f-subheadline fw8 mb0">
            Login
          </h1>
          <p>Welcome back, we're glad to see you again!</p>

          <v-text-field outlined label="Email"></v-text-field>

          <v-text-field outlined label="Password"></v-text-field>

          <v-btn block x-large rounded elevation="10" color="deep-purple" dark>
            Login
          </v-btn>

          <p class="pt3">
            Don't have an account?
            <a @click="register" style="color: #B39DDB">Register</a>
          </p>
        </div>
      </v-container>
    </v-col>

    <v-col md="7" cols="12" class="right"> </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Emit } from "vue-property-decorator";

@Component
export default class LoginWindow extends Vue {
  /*
    Get Vuex state and watch for token changes.
    On token change, push to the home page.
  */

  @Emit("register")
  private register(): boolean {
    return true;
  }
}
</script>

<style lang="scss">
#LoginWindow {
  .right {
    background-image: url(https://source.unsplash.com/1vuXf7ta_PU/1000x1000/);
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
