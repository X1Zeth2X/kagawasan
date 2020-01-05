<template>
  <v-row align="stretch" class="vh-100" id="RegisterWindow">
    <v-col md="5" cols="12">
      <v-container class="ph4">
        <div class="ph4-ns">
          <h1 class="f-subheadline fw8 mb0">
            Register
          </h1>
          <p>Join the free (as in freedom) social platform.</p>

          <v-text-field outlined label="Username"></v-text-field>

          <v-text-field outlined label="Email"></v-text-field>

          <v-btn block x-large rounded elevation="10" color="pink" dark>
            Continue
            <v-icon class="pt1">mdi-menu-right</v-icon>
          </v-btn>

          <p class="pt3">
            Already have an account?
            <a @click="login" style="color: #B39DDB">Sign In</a>
          </p>
        </div>
      </v-container>
    </v-col>

    <v-col md="7" class="right" cols="12">
      <v-container> </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Emit } from "vue-property-decorator";

interface RegistrationData {
  username: string;
  email: string;
}

@Component
export default class RegisterWindow extends Vue {
  /*
    1. User fills up Username and Email
    2. Shows dialog for full registration form
    3. Register -> Get Token and user info

    Get Vuex state and watch for token changes.
    On token change, push to the home page.
  */

  private registrationData: RegistrationData = {
    username: "",
    email: ""
  };

  @Emit("login")
  private login(): boolean {
    return true;
  }
}
</script>

<style lang="scss">
#RegisterWindow {
  .right {
    background-image: url(https://source.unsplash.com/bBiuSdck8tU/1000x1000/);
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
