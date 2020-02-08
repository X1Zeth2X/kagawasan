<template>
  <v-row align="stretch" class="vh-100" id="RegisterWindow">
    <v-col sm="12" md="5" cols="12">
      <v-container class="ph4">
        <div class="ph4-ns">
          <h1 class="f-subheadline fw8 mb0">
            Register
          </h1>
          <p>Join the free (as in freedom) social platform.</p>

          <ValidationObserver ref="observe">
            <ValidationProvider
              mode="lazy"
              rules="required|alpha_num|min:4|max:15"
              v-slot="{ errors }"
              name="Username"
            >
              <v-text-field
                outlined
                label="Username"
                v-model="username"
                :error-messages="errors[0]"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              mode="lazy"
              rules="required|email"
              v-slot="{ errors }"
              name="Email"
            >
              <v-text-field
                outlined
                label="Email"
                v-model="email"
                :error-messages="errors[0]"
              ></v-text-field>
            </ValidationProvider>
          </ValidationObserver>

          <v-btn
            block
            x-large
            rounded
            elevation="10"
            color="pink"
            dark
            @click="validateFields"
          >
            Continue
            <v-icon class="ml2">ion-ios-arrow-dropright</v-icon>
          </v-btn>

          <p class="pt3">
            Already have an account?
            <a @click="$emit('login')" style="color: #B39DDB">Sign In</a>
          </p>
        </div>
      </v-container>
    </v-col>

    <v-col md="7" cols="12" class="right hidden-sm-and-down">
      <RegisterDialog
        v-if="registerDialog"
        :username="username"
        :email="email"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Emit } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { ValidationObserver } from "vee-validate";

const RegisterDialog = () => import("./RegisterDialog.vue");

@Component({
  components: {
    RegisterDialog,
    ValidationObserver,
    ValidationProvider
  }
})
export default class RegisterWindow extends Vue {
  @Getter("registerDialog", { namespace: "dialog" })
  private registerDialog!: boolean;

  @Action("toggleRegisterDialog", { namespace: "dialog" })
  private toggleRegisterDialog!: Function;

  $refs!: {
    observe: InstanceType<typeof ValidationObserver>;
  };

  private email: string = "";
  private username: string = "";

  private async validateFields() {
    const isValid: boolean = await this.$refs.observe.validate();

    if (isValid) {
      this.toggleRegisterDialog();
    }
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
