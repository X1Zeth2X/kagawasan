<template>
  <v-card id="post" class="mb4 b-card" :outlined="$vuetify.theme.dark">
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
      :postPublicId="post.public_id"
      v-on:comment="commenting = true"
      ref="postActions"
    />
    <!-- Post Actions (Like, Comment, ...) -->

    <div v-if="comments.length !== 0">
      <v-divider></v-divider>
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

      <Comment
        v-for="(comment, index) in comments"
        v-on:removeComment="removeComment(index)"
        :key="comment.public_id"
        :comment="comment"
      />
    </div>

    <v-scroll-x-transition mode="out-in">
      <Composer
        ref="commentComposer"
        class="mb-negative-comment ph3 pt2"
        :placeholder="'Write a comment...'"
        :loading="creatingComment"
        :errorMsg="commentErrorMsg"
        v-if="commenting && post.status === 'normal'"
        v-on:submit="createComment"
      />

      <div v-else-if="post.status === 'locked'" class="pa2">
        <v-btn block disabled class="b-card" v-on="on">
          Post is locked.
        </v-btn>
      </div>
      <!-- Locked indicator -->

      <div v-else class="pa2">
        <v-btn block class="b-card" @click="commenting = true">Comment</v-btn>
      </div>
    </v-scroll-x-transition>
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
import { Post, Comment as CommentType } from "@/store/content";
import { CreateData } from "@/services/post.service";

const Comment = () => import("./Comment/Main.vue");
const Composer = () => import("./Common/Composer.vue");

type ActionProps = {
  kekGiven: boolean;
  keks: number;
  comments: number;
  edited: boolean;
};

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

  @Getter("commenting", { namespace: "comment" })
  private creatingComment!: boolean;

  @Getter("commentErrorMsg", { namespace: "comment" })
  private commentErrorMsg!: string;

  @Action("toggleEditDialog", { namespace: "dialog" })
  private toggleEditDialog!: Function;

  @Action("setEditPost", { namespace: "dialog" })
  private setEditPost!: Function;

  @Action("create", { namespace: "comment" })
  private commentOnPost!: Function;

  @Action("getComments", { namespace: "feed" })
  private getComments!: Function;

  public $refs!: {
    postActions: InstanceType<typeof PostActions>;
    commentComposer: any;
  };

  private comments: CommentType[] = [];

  // Comment IDs left to load.
  private commentIDsLeft: number[] = [];

  private commenting: boolean = false;

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

      if (this.post.comments.length > 5) {
        this.commentIDsLeft = this.post.comments.slice(
          0,
          this.post.comments.length - 5
        );
      }
    }
  } // Lifecycle

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

  private async createComment(createData: CreateData) {
    const vuexResp: CommentType = await this.commentOnPost({
      postPublicId: this.post.public_id,
      data: createData
    });

    if (vuexResp) {
      // Add newly created comment to comments array.
      this.comments = [...this.comments, vuexResp];
      this.$refs.commentComposer.resetFields();
    }
  }

  private removeComment(index: number) {
    this.post.comments.splice(index, 1);
    this.comments.splice(index, 1);
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

  private async loadMore() {
    if (this.commentIDsLeft.length > 0) {
      // Load 10 more comments on click.
      const idArray: number[] = this.commentIDsLeft.slice(-10);

      const comments: CommentType[] = await this.getComments(idArray);

      this.comments = [...comments, ...this.comments];
      this.commentIDsLeft.splice(this.commentIDsLeft.length - comments.length);
    }
  } // Load more comments
}
</script>
