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
          v-model="updatedContent"
          @keyup.esc="$emit('cancel')"
          :error-messages="errors[0]"
        >
        </v-textarea>
      </ValidationProvider>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

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

  private updatedContent: string = this.content;
}
</script>
