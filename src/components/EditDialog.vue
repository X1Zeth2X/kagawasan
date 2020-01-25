<template>
  <v-dialog
    persistent
    max-width="45em"
    :value.sync="show"
    :overlay-opacity="0.9"
  >
    <v-card>
      <v-toolbar dense flat>
        <v-toolbar-title class="b">
          Edit post
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn icon @click="toggleEditDialog">
            <v-icon>
              ion-ios-close
            </v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <Top :author="currentUser" :postPublicId="null" />

      <ValidationObserver ref="observe">
        <ValidationProvider
          mode="lazy"
          rules="required|min:1|max:1600"
          name="content"
          v-slot="{ errors }"
          spellcheck="false"
        >
          <v-card-text>
            <v-textarea
              rows="2"
              auto-grow
              outlined
              filled
              v-model="updatedContent"
              :error-messages="errors[0]"
            ></v-textarea>
          </v-card-text>
        </ValidationProvider>
      </ValidationObserver>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text color="error" @click="toggleEditDialog">
          Cancel
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn color="teal" dark :loading="updating" @click="validateFields">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Getter, Action } from "vuex-class";
import { User } from "@/store/modules/auth/types";
import { Prop } from "vue-property-decorator";

// Import validation stuff
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { ValidationObserver } from "vee-validate";

import Top from "@/components/Home/Post/Top.vue";

const namespace: string = "dialog";

interface EditData {
  content: string;
  postPublicId: string;
}

@Component({
  components: {
    Top,
    ValidationProvider,
    ValidationObserver
  }
})
export default class Edit extends Vue {
  @Prop() show!: boolean;

  @Getter("currentUser", { namespace: "auth" }) private currentUser!: User;

  @Getter("editPost", { namespace }) private editData!: EditData;

  @Getter("requesting", { namespace: "post" }) private updating!: boolean;

  @Action("toggleEditDialog", { namespace })
  private toggleEditDialog!: Function;

  // Update the post from the API.
  @Action("update", { namespace: "post" }) private updatePostVuex!: Function;

  // Update the edited post in the feed.
  @Action("updateEditedPost", { namespace: "feed" })
  private updateEditedPost!: Function;

  $refs!: {
    observe: InstanceType<typeof ValidationObserver>;
  };

  private updatedContent: string = "";

  private mounted() {
    // If editData is not undefined update v-model value.
    if (this.editData) {
      this.updatedContent = this.editData.content;
    }
  }

  private async validateFields() {
    const isValid: boolean = await this.$refs.observe.validate();

    // If it's valid and changes were made then update.
    if (isValid && this.updatedContent !== this.editData.content) {
      // Update the post.
      const vuexResp: boolean = await this.updatePostVuex({
        content: this.updatedContent,
        postPublicId: this.editData.postPublicId
      });

      if (vuexResp) {
        // Do something that indicates that it has been updated.
        this.updateEditedPost({
          content: this.updatedContent,
          postPublicId: this.editData.postPublicId
        });

        this.toggleEditDialog();
      }
    }
  } // Validate fields
}
</script>
