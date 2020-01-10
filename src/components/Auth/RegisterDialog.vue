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
        <v-row align="start" justify="space-between">
          <v-col cols="12" md="5">
            <h4 class="mb2">1. LOGIN INFO</h4>
            <v-text-field
              outlined
              label="Username"
              append-icon="ion-ios-person"
            ></v-text-field>
            <v-text-field
              outlined
              label="Email"
              append-icon="ion-ios-mail"
            ></v-text-field>
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

            <v-text-field
              outlined
              label="Full Name"
              append-icon="ion-ios-person"
            >
            </v-text-field>
          </v-col>

          <v-divider vertical></v-divider>

          <v-col cols="12" md="5">
            <h4 class="mb2">3. CREDENTIALS</h4>
            <v-text-field outlined label="Password"></v-text-field>

            <v-text-field outlined label="Confirm Password"></v-text-field>

            <v-divider class="mv2"></v-divider>
            <h4 class="mb2">4. Entry Key</h4>
            <v-alert
              type="info"
              icon="ion-ios-information-circle"
              border="left"
              colored-border
            >
              Entry Keys help prevents random users from entering the instance.
              Ask the owner for one.
            </v-alert>

            <v-text-field outlined label="Entry Key" append-icon="ion-ios-key">
            </v-text-field>

            <v-btn x-large class="float-right" rounded color="teal" dark>
              Register
            </v-btn>
          </v-col>
        </v-row>
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

const namespace: string = "dialog";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class RegisterDialog extends Vue {
  @Getter("registerDialog", { namespace }) show!: boolean;

  @Action("toggleRegisterDialog", { namespace })
  toggleRegisterDialog!: Function;

  private mode: number = 0;
}
</script>
