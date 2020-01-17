<template>
  <v-card id="post" class="mb4">
    <PostTop :author="post.author" :date="post.created" />

    <v-card-text>
      <vue-markdown
        v-if="markdown"
        :source="post.content"
        :class="[
          $vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-4',
          'fw5'
        ]"
      />

      <truncate
        clamp="Show More"
        type="html"
        :class="[
          $vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-4',
          'fw5'
        ]"
        :text="post.content"
        :length="500"
        v-else
      />
    </v-card-text>
    <!-- Post content -->

    <v-img
      @dblclick="toggleKek"
      v-if="post.image"
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

    <PostActions
      ref="postActions"
      v-on:toggleCommenting="toggleCommenting"

      :action="actionProps"
      :commenting="commenting"
    />
    <!-- Post Actions (Like, Comment, ...) -->

    <div v-if="comments !== null">
      <v-divider></v-divider>
      <Comment
        v-for="comment in comments"
        :key="comment.public_id"
        :comment="comment"
      />
    </div>

    <v-scale-transition>
      <Composer v-if="commenting"/>
    </v-scale-transition>

    <!-- Comment Composer -->
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";

import PostTop from "./Top.vue";
import PostActions from "./Actions.vue";

import { Prop } from "vue-property-decorator";
import { Post } from "@/store/post";

const Comment = () => import("./Comment/Main.vue");
const Composer = () => import("./Comment/Composer.vue");

/* 
  Lazy load truncate/markdown because it does need to get imported
  if it is turned off in the settings.
*/
const VueMarkdown = () => import("vue-markdown");
const truncate = () => import("vue-truncate-collapsed");

@Component({
  components: {
    PostTop,
    PostActions,
    truncate,
    Comment,
    Composer,
    VueMarkdown
  }
})
export default class PostMain extends Vue {
  @Prop() post!: Post;

  @Getter("markdown", { namespace: "settings" }) private markdown!: boolean;

  public $refs!: {
    postActions: InstanceType<typeof PostActions>;
  };

  private comments: object[] | null = null;

  private commenting: boolean = false;

  // Props for the post actions.
  private actionProps: object = {
    kekGiven: this.post.liked,
    likes: this.post.likes.length,
    comments: this.post.comments
  };

  private mounted() {
    // Load initial comments
    if (this.post.initial_comments !== null) {
      setTimeout(() => {
        this.comments = this.post.initial_comments;
      }, 1000)
    }
  } // Lifecycle

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
