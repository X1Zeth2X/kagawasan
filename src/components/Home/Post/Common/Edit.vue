<template>
  <div>
    <ValidationObserver ref="observe">
      <ValidationProvider
        mode="lazy"
        rules="required|min:1|max:1600"
        name="content"
        v-slot="{ errors }"
        spellcheck="false"
      >
        <v-textarea
          class="b-card"
          rows="1"
          auto-grow
          outlined
          filled
          hint="Use `Alt + Enter` to submit content."
          v-model="updatedContent"
          @keyup.esc="$emit('cancel')"
          @keyup.alt.enter="validateFields"
          :error-messages="errors[0]"
        >
          <template v-slot:append>
            <v-btn
              icon
              class="teal mb3 ml1 hidden-md-and-up"
              elevation="2"
              dark
              small
              @click="validateFields"
            >
              <v-icon small>ion-ios-send</v-icon>
            </v-btn>
          </template>
        </v-textarea>
      </ValidationProvider>
    </ValidationObserver>
  </div>
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
export default class Edit extends Vue {
  @Prop() content!: string;

  $refs!: {
    observe: InstanceType<typeof ValidationObserver>;
  };

  private updatedContent: string = this.content;

  @Emit("submit")
  private submit(updatedContent: string) {
    return updatedContent;
  }

  public resetFields() {
    this.$refs.observe.reset();

    this.updatedContent = "";
  }

  private async validateFields() {
    const isValid: boolean = await this.$refs.observe.validate();

    if (isValid && this.updatedContent !== this.content) {
      this.submit(this.updatedContent);
    }
  }
}
</script>
