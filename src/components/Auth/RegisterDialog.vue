<template>
  <v-dialog
    persistent
    :value="show"
    max-width="37em"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title class="fw9">
          Join Konishi
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn icon @click="toggleRegisterDialog">
            <v-icon>ion-ios-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <ValidationObserver ref="observe" v-slot="{ valid }">
          <v-row align="start" justify="space-between">
            <v-col cols="12" md="5">
              <h4 class="mb2">1. LOGIN INFO</h4>

              <ValidationProvider
                mode="lazy"
                rules="required|alpha_num|min:4|max:15"
                v-slot="{ errors }"
                name="Username"
              >
                <v-text-field
                  outlined
                  label="Username"
                  append-icon="ion-ios-person"
                  v-model="registerData.username"
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
                  append-icon="ion-ios-mail"
                  v-model="registerData.email"
                  :error-messages="errors[0]"
                ></v-text-field>
              </ValidationProvider>

              <v-divider class="mv2"></v-divider>

              <h4 class="mb2">2. PERSONAL</h4>
              <v-alert
                type="warning"
                icon="ion-ios-information-circle"
                border="left"
                colored-border
              >
                We respect user privacy therefore full name is optional, but it
                helps people easily identify who you are in the instance.
              </v-alert>

              <ValidationProvider
                mode="lazy"
                rules="alpha_spaces|min:2|max:50"
                v-slot="{ errors }"
                name="first name"
              >
                <v-text-field
                  outlined
                  label="Full Name"
                  append-icon="ion-ios-person"
                  v-model="registerData.full_name"
                  :error-messages="errors[0]"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col cols="12" md="5">
              <h4 class="mb2">3. CREDENTIALS</h4>

              <ValidationProvider
                mode="lazy"
                rules="required|confirmed:confirmation|min:8|max:255"
                v-slot="{ errors }"
                name="password"
              >
                <v-text-field
                  outlined
                  label="Password"
                  type="password"
                  v-model="registerData.password"
                  :error-messages="errors[0]"
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                mode="lazy"
                vid="confirmation"
                v-slot="{ errors }"
                name="confirm password"
              >
                <v-text-field
                  outlined
                  label="Confirm Password"
                  type="password"
                  v-model="confirmPassword"
                  :error-messages="errors[0]"
                ></v-text-field>
              </ValidationProvider>

              <v-divider class="mv2"></v-divider>
              <h4 class="mb2">4. Entry Key</h4>
              <v-alert
                type="info"
                icon="ion-ios-information-circle"
                border="left"
                colored-border
              >
                Entry Keys help prevents random users from entering the
                instance. Ask the owner for one.
              </v-alert>

              <ValidationProvider
                mode="lazy"
                rules="required"
                v-slot="{ errors }"
                name="Entry key"
              >
                <v-text-field
                  outlined
                  label="Entry Key"
                  append-icon="ion-ios-key"
                  v-model="registerData.entry_key"
                  :error-messages="errors[0]"
                ></v-text-field>
              </ValidationProvider>

              <v-alert
                v-if="registerErrorMsg"
                elevation="5"
                icon="ion-ios-warning"
                type="error"
                border="left"
                colored-border
                dismissible
              >
                {{ registerErrorMsg }}
              </v-alert>

              <v-btn
                x-large
                class="float-right"
                rounded
                color="teal"
                dark
                @click="validateFields"
                :disabled="!valid"
                :loading="registering"
                >Register</v-btn
              >
            </v-col>
          </v-row>
        </ValidationObserver>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Getter, Action } from "vuex-class";
import { Prop } from "vue-property-decorator";

import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { ValidationObserver } from "vee-validate";

import { RegisterData } from "@/services/auth.service";

const namespace: string = "dialog";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class RegisterDialog extends Vue {
  @Prop() email!: string;
  @Prop() username!: string;

  @Getter("registerDialog", { namespace })
  private show!: boolean;

  @Getter("registering", { namespace: "auth" })
  private registering!: boolean;

  @Getter("registerErrorMsg", { namespace: "auth" })
  private registerErrorMsg!: string;

  @Action("toggleRegisterDialog", { namespace })
  toggleRegisterDialog!: Function;

  @Action("register", { namespace: "auth" })
  private register!: Function;

  $refs!: {
    observe: InstanceType<typeof ValidationObserver>;
  };

  private mode: number = 0;
  private confirmPassword: string = "";

  private registerData: RegisterData = {
    email: this.email,
    username: this.username,
    full_name: "",
    password: "",
    entry_key: ""
  };

  private async validateFields() {
    const isValid = await this.$refs.observe.validate();

    if (isValid) {
      const vuexResp = await this.register(this.registerData);

      // If registration succeeded, push to home.
      if (vuexResp) {
        this.$router.push({
          name: "home"
        });
      }
    }
  }
}
</script>
