<template>
  <v-card id="post" class="mb2">
    <PostTop />

    <v-card-text>
      <vue-markdown v-if="markdown" source="lorem" />

      <truncate
        clamp="Show More"
        text="lorem ipsum dolor sit amet."
        type="html"
        :length="3"
        v-else
      />
    </v-card-text>
    <!-- Post content -->

    <v-img
      @dblclick="toggleKek"
      src="https://source.unsplash.com/1600x900/?nature,water"
    >
      <template v-slot:placeholder>
        <v-row align="center" justify="center" class="fill-height primary">
          <v-progress-circular
            color="white"
            indeterminate
            width="3"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <!-- Post Image -->

    <PostActions ref="postActions" v-on:toggleCommenting="toggleCommenting" />
    <!-- Post Actions (Like, Comment, ...) -->

    <v-divider v-show="true"></v-divider>
    <!-- Comment divider, show if comments are available -->

    <div>
      <Comment />
    </div>

    <v-divider v-show="commenting"></v-divider>
    <Composer v-if="commenting" />
    <!-- Comment Composer -->
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";

import truncate from "vue-truncate-collapsed";

import PostTop from "./Top.vue";
import PostActions from "./Actions.vue";

@Component({
  components: {
    PostTop,
    PostActions,
    truncate,
    Comment: () => import("./Comment/Main.vue"),
    Composer: () => import("./Comment/Composer.vue"),
    /* 
      Lazy load markdown because it does need to get imported
      if it is turned off in the settings.
    */
    VueMarkdown: () => import("vue-markdown")
  }
})
export default class PostMain extends Vue {
  @Getter("markdown", { namespace: "settings" }) private markdown!: boolean;

  private commenting: boolean = false;

  public $refs!: {
    postActions: InstanceType<typeof PostActions>;
  };

  private toggleCommenting() {
    this.commenting = !this.commenting;
  }

  private toggleKek() {
    this.$refs.postActions.toggleKek();
  }
}
</script>

<style lang="scss">
#post {
  border-radius: 1em;
}
</style>
