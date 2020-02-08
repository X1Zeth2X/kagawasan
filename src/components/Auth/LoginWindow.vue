<template>
  <v-row align="stretch" class="vh-100" id="LoginWindow">
    <v-col sm="12" md="5" cols="12">
      <v-container class="ph4">
        <div class="ph4-ns">
          <h1 class="f-subheadline fw8 mb0">
            Login
          </h1>
          <p>Welcome back, we're glad to see you again!</p>

          <ValidationObserver ref="observe">
            <ValidationProvider
              mode="lazy"
              rules="required|email"
              name="Email"
              v-slot="{ errors }"
            >
              <v-text-field
                outlined
                label="Email"
                v-model="email"
                :error-messages="errors[0]"
                @keyup.enter="validateFields"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              mode="lazy"
              rules="required|min:4"
              name="Password"
              v-slot="{ errors }"
            >
              <v-text-field
                outlined
                label="Password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'ion-ios-eye' : 'ion-ios-eye-off'"
                :error-messages="errors[0]"
                @click:append="showPassword = !showPassword"
                @keyup.enter="validateFields"
              ></v-text-field>
            </ValidationProvider>

            <v-alert
              v-if="loginErrorMsg"
              elevation="5"
              icon="ion-ios-warning"
              type="error"
              border="left"
              colored-border
            >
              {{ loginErrorMsg }}
            </v-alert>

            <v-btn
              block
              x-large
              rounded
              elevation="10"
              color="deep-purple"
              dark
              @click="validateFields"
              :loading="authenticating"
              >Login</v-btn
            >
          </ValidationObserver>

          <p class="pt3">
            Don't have an account?
            <a @click="$emit('register')" style="color: #B39DDB">Register</a>
          </p>
        </div>
      </v-container>
    </v-col>

    <v-col md="7" cols="12" class="right hidden-sm-and-down"></v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Action, Getter } from "vuex-class";
import { Emit } from "vue-property-decorator";

// Import validation stuff
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { ValidationObserver } from "vee-validate";

const namespace: string = "auth";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class LoginWindow extends Vue {
  @Getter("authenticating", { namespace }) private authenticating!: boolean;

  @Getter("loginErrorMsg", { namespace }) private loginErrorMsg!: string;
  /*
    Get Vuex state and watch for token changes.
    On token change, push to the home page.
  */
  @Action("login", { namespace }) private login!: Function;

  $refs!: {
    observe: InstanceType<typeof ValidationObserver>;
  };

  private email: string = "";
  private password: string = "";

  private showPassword: boolean = false;

  private async validateFields() {
    const isValid: boolean = await this.$refs.observe.validate();

    if (isValid) {
      const vuexResp = await this.login({
        email: this.email,
        password: this.password
      });

      // If the login was successful, push to Home.
      if (vuexResp) {
        this.$router.push({
          name: "home"
        });
      }
    }
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
