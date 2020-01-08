<template>
  <div id="composer">
    <v-card class="c-main" hover>
      <v-window v-model="mode">
        <Writer v-on:update="syncContent" />
        <Uploader />
      </v-window>

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

        <v-btn fab small color="teal" dark>
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

interface PostData {
  content: string;
  imageId: string;
}

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
  private mode: number = 0;
  private postData: PostData = {
    content: "",
    imageId: ""
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
      icon: "ion-ios-aperture"
    }
  ];

  private syncContent(content: string) {
    this.postData.content = content;
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
