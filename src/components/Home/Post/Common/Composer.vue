<template>
  <div id="commentComposer" class="mh3 mt3">
    <ValidationObserver ref="observe">
      <ValidationProvider
        mode="lazy"
        rules="required|min:1|max:1600"
        name="content"
        v-slot="{ errors }"
        spellcheck="false"
      >
        <v-textarea
          :placeholder="placeholder"
          class="b-card"
          rows="2"
          auto-grow
          solo
          outlined
          v-model="submitData.content"
          :error-messages="errors[0]"
          filled
        >
          <template v-slot:append>
            <v-btn icon class="info mb3 ml1" elevation="2" dark small>
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
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class CommentReplyComposer extends Vue {
  @Prop() placeholder!: string;

  $refs!: {
    observe: InstanceType<typeof ValidationObserver>;
  };

  private submitData: object = {
    content: "",
    imageId: ""
  };

  private async validateFields() {
    const isValid: boolean = await this.$refs.observe.validate();

    if (isValid) {
      // Return data if valid.
      return this.submitData;
    }

    return false;
  }
}
</script>
