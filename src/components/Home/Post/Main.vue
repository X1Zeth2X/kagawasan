<template>
  <v-card id="post" class="mb4 b-card" outlined>
    <PostTop
      :author="post.author"
      :date="post.created"
      :postPublicId="post.public_id"
      v-on:editPost="editPost"
    />

    <v-card-text>
      <Content :content="post.content" :highlight="false" />
    </v-card-text>
    <!-- Post content -->

    <v-img
      @dblclick="toggleKek"
      v-if="post.image"
      :src="backendUrl + post.image_url"
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
      :action="actionProps"
      :commenting="commenting"
      :postPublicId="post.public_id"
      ref="postActions"
      v-on:toggleCommenting="toggleCommenting"
    />
    <!-- Post Actions (Like, Comment, ...) -->

    <div v-if="comments.length !== 0">
      <v-divider></v-divider>
      <div class="tc fw2">
        <v-btn
          block
          text
          tile
          color="primary"
          class="fw9"
          v-if="showLoadMore"
          @click="loadMore"
        >
          <v-icon class="mr2 mt1">ion-ios-arrow-dropup</v-icon>
          View Previous Comments
          {{ `(${comments.length}/${post.comments.length})` }}
        </v-btn>
      </div>

      <Comment
        v-for="comment in comments"
        :key="comment.public_id"
        :comment="comment"
      />
    </div>

    <v-scale-transition>
      <Composer v-if="commenting" :placeholder="'Write a comment...'" />
    </v-scale-transition>
    <!-- Comment Composer -->
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";

import PostTop from "./Top.vue";
import PostActions from "./Actions.vue";
import Content from "./Common/Content.vue";

import { Prop } from "vue-property-decorator";
import { backendUrl } from "@/services/api.service";
import { Post } from "@/store/post";

const Comment = () => import("./Comment/Main.vue");
const Composer = () => import("./Common/Composer.vue");

interface ActionProps {
  kekGiven: boolean;
  keks: number;
  comments: number;
  edited: boolean;
}

@Component({
  components: {
    PostTop,
    PostActions,
    Comment,
    Composer,
    Content
  }
})
export default class PostMain extends Vue {
  @Prop() post!: Post;

  @Getter("markdown", { namespace: "settings" }) private markdown!: boolean;

  @Action("toggleEditDialog", { namespace: "dialog" })
  private toggleEditDialog!: Function;

  @Action("setEditPost", { namespace: "dialog" })
  private setEditPost!: Function;

  public $refs!: {
    postActions: InstanceType<typeof PostActions>;
  };

  private comments: object[] = [];

  private commenting: boolean = false;

  // Slicing starts at 5 by default since there is 5 max initial comments.
  private loadMoreStart: number = 5;

  // Props for the post actions.
  private actionProps: ActionProps = {
    kekGiven: this.post.liked,
    keks: this.post.likes.length,
    comments: this.post.comments.length,
    edited: this.post.edited
  };

  private mounted() {
    // Load initial comments
    if (this.post.initial_comments !== null) {
      this.comments = this.post.initial_comments;
    }
  } // Lifecycle

  private toggleCommenting() {
    this.commenting = !this.commenting;
  }

  private toggleKek() {
    this.$refs.postActions.toggleKek();
  }

  private editPost() {
    // Also, I just did this for fun.
    const editData: {
      content: string;
      postPublicId: string;
    } = {
      content: this.post.content,
      postPublicId: this.post.public_id
    };

    // Set content being edited.
    this.setEditPost(editData);

    // Toggle edit dialog.
    this.toggleEditDialog();
  }

  private get showLoadMore(): boolean {
    /*
      Return true if the post comments length is greater than the initial comments (5 max),
      and that the 'this.comments' length is not the same (less) than the post comments length.
    */
    if (
      this.post.comments.length > 5 &&
      this.post.comments.length !== this.comments.length
    ) {
      return true;
    }

    return false;
  }

  private loadMore() {
    // Load 10 more comments on click.
    const idArray: number[] = this.post.comments.slice(
      this.loadMoreStart,
      this.loadMoreStart + 10
    );

    // Perform vuexRequest to add more comments.
    // Add the length of the comments from the API to the `loadMoreStart`
    // push the comments from the api to `this.comments`
  } // Load more comments
}
</script>
