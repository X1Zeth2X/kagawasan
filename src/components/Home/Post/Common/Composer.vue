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
          rows="2"
          auto-grow
          outlined
          v-model="submitData.content"
          filled
          @keyup.alt.enter.exact="validateFields"
          :disabled="loading"
          :placeholder="placeholder"
          :error-messages="errors[0] || errorMsg"
          hint="Use `Alt + Enter` to submit the content."
        >
          <template v-slot:append>
            <v-btn icon class="info mb3 ml1" elevation="2" dark small disabled>
              <v-icon small>ion-ios-image</v-icon>
            </v-btn>

            <v-btn
              icon
              class="teal mb3 ml1"
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

import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { ValidationObserver } from "vee-validate";
import { Prop, Emit } from "vue-property-decorator";

type SubmitData = {
  content: string;
  imageId: string | null;
};

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class CommentReplyComposer extends Vue {
  @Prop() loading!: boolean;
  @Prop() placeholder!: string;
  @Prop() errorMsg!: string;

  $refs!: {
    observe: InstanceType<typeof ValidationObserver>;
  };

  private submitData: SubmitData = {
    content: "",
    imageId: null
  };

  @Emit("submit")
  private submit(data: SubmitData) {
    return data;
  }

  public resetFields() {
    this.$refs.observe.reset();

    this.submitData.content = "";
    this.submitData.imageId = null;
  }

  private async validateFields() {
    const isValid: boolean = await this.$refs.observe.validate();

    if (isValid) {
      // Emit a submit event with the submit data.
      this.submit(this.submitData);
    }
  }

  // Implement uploader.
}
</script>
