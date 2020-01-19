<template>
  <v-window-item>
    <ValidationObserver ref="observe">
      <ValidationProvider
        mode="lazy"
        rules="required|min:1|max:1600"
        name="content"
        v-slot="{ errors }"
      >
        <v-textarea
          rows="2"
          auto-grow
          outlined
          filled
          v-model="content"
          :error-messages="errors[0]"
          @keyup="update(content)"
        ></v-textarea>
      </ValidationProvider>
    </ValidationObserver>
  </v-window-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";

import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { ValidationObserver } from "vee-validate";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class Writer extends Vue {
  private content: string = "";

  $refs!: {
    observe: InstanceType<typeof ValidationObserver>;
  };

  @Emit("update")
  private update(content: string): string {
    return content;
  }

  public async checkValidity() {
    const isValid = await this.$refs.observe.validate();

    return isValid;
  }

  public resetValidator() {
    this.$refs.observe.reset();
  }
}
</script>
