<template>
  <div id="composer">
    <v-card class="c-main" hover>
      <v-window v-model="mode">
        <Writer ref="writer" v-on:update="syncContent" />
        <Uploader />
      </v-window>

      <v-alert
        v-if="createErrorMsg"
        dismissible
        icon="ion-ios-close"
        type="error"
        border="left"
        colored-border
        >Uh oh! {{ createErrorMsg }}</v-alert
      >

      <v-card-actions>
        <v-btn-toggle v-model="mode" rounded color="primary">
          <v-tooltip
            v-for="(composerMode, index) in composerModes"
            :key="index"
            bottom
          >
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">
                <v-icon>{{ composerMode.icon }}</v-icon>
              </v-btn>
            </template>
            {{ composerMode.desc }}
          </v-tooltip>
        </v-btn-toggle>
        <v-spacer></v-spacer>

        <v-btn fab small color="teal" dark @click="validateFields">
          <v-icon>
            ion-ios-send
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Writer from "./ComposerItems/Writer.vue";
import { Action, Getter } from "vuex-class";

import { CreateData } from "@/services/post.service";
import { Post } from "@/store/post";

const namespace: string = "post";

@Component({
  components: {
    Writer,
    /*
      Lazy import uploader since it
      is going to be a large component.
    */
    Uploader: () => import("./ComposerItems/Uploader.vue")
  }
})
export default class Composer extends Vue {
  @Getter("createErrorMsg", { namespace })
  private createErrorMsg!: string;

  @Action("create", { namespace })
  private create!: Function;

  public $refs!: {
    writer: InstanceType<typeof Writer>;
  };

  private mode: number = 0;

  private postData: CreateData = {
    content: "",
    image_id: ""
  };

  private composerModes: object[] = [
    {
      desc: "Write a post",
      icon: "ion-ios-create"
    },
    {
      desc: "Upload an image",
      icon: "ion-ios-image"
    },
    {
      desc: "Post settings",
      icon: "ion-ios-cog"
    }
  ];

  private syncContent(content: string) {
    this.postData.content = content;
  }

  private async validateFields() {
    const isValid: boolean = await this.$refs.writer.checkValidity();

    if (isValid) {
      this.submit();
    }
  }

  private async submit() {
    const vuexResp: boolean | Post = await this.create(this.postData);

    if (vuexResp !== false) {
      // Emit to parent.
      this.$emit("addPost", vuexResp);

      // Reset validator and fields.
      this.$refs.writer.resetValidator();
      this.postData.content = "";
      this.postData.image_id = "";
    }
  }
}
</script>

<style lang="scss">
#composer {
  .c-main {
    border-radius: 0.2em 0.2em 2em 2em;
  }
}
</style>
