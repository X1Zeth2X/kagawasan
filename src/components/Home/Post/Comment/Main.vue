<template>
  <v-list-item three-line class="comment">
    <Avatar
      :avatarUrl="
        `https://api.adorable.io/avatars/40/${comment.author.email}.png`
      "
      class="hidden-sm-and-down"
    />

    <v-list-item-content
      :class="$vuetify.breakpoint.mdAndUp ? 'ml-negative' : 'ml2'"
    >
      <CommentDetails
        :author="comment.author"
        :date="comment.created"
        :commentPublicId="comment.public_id"
        :edited="comment.edited"
        v-on:deleted="$emit('removeComment')"
        v-on:edit="editing = true"
      />

      <p class="f6 pt0">
        <v-scroll-x-transition mode="out-in">
          <Content v-if="!editing" :content="comment.content" />

          <Edit
            v-else
            class="mb-negative-comment"
            :content="comment.content"
            v-on:cancel="editing = false"
            v-on:submit="updateComment"
          />
        </v-scroll-x-transition>
      </p>

      <CommentActions
        v-on:reply="replying = true"
        :action="actionProps"
        :commentPublicId="comment.public_id"
      />

      <div v-if="replies.length !== 0">
        <v-btn
          small
          text
          tile
          block
          color="primary"
          v-if="showLoadMore"
          @click="loadMore"
        >
          <v-icon class="mr2 mt1" small>ion-ios-arrow-dropup</v-icon>
          View Previous Replies
          {{ `(${replies.length}/${comment.replies.length})` }}
        </v-btn>

        <Reply
          v-for="(reply, index) in replies"
          v-on:reply="replying = true"
          v-on:removeReply="removeReply(index)"
          :reply="reply"
          :key="reply.public_id"
        />
      </div>

      <v-scroll-x-transition mode="out-in">
        <Composer
          class="mb-negative-reply pt2"
          ref="replyComposer"
          :placeholder="'Write a reply...'"
          v-if="replying"
          v-on:submit="createReply"
        />
      </v-scroll-x-transition>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Prop } from "vue-property-decorator";
import { Comment, Note } from "@/store/content";

import Avatar from "../Common/Avatar.vue";
import CommentDetails from "./Details.vue";
import CommentActions from "./Actions.vue";

// Import content component.
import Content from "../Common/Content.vue";

const Composer = () => import("../Common/Composer.vue");
const Edit = () => import("../Common/Edit.vue");
const Reply = () => import("../Reply/Main.vue");

import { Getter, Action } from "vuex-class";
import { CreateData } from "@/services/post.service";

const namespace: string = "comment";

@Component({
  components: {
    Avatar,
    CommentDetails,
    CommentActions,
    Content,
    Composer,
    Edit,
    Reply
  }
})
export default class CommentMain extends Vue {
  @Prop() comment!: Comment;

  @Getter("markdown", { namespace: "settings" }) private markdown!: boolean;

  @Action("update", { namespace })
  private updateCommentVuex!: Function;

  @Action("create", { namespace: "reply" })
  private replyOnComment!: Function;

  @Action("getReplies", { namespace: "feed" })
  private getReplies!: Function;

  public $refs!: {
    replyComposer: any;
  };

  private replies: Note[] = [];

  // Reply IDs left to load.
  private replyIDsLeft: number[] = [];

  private replying: boolean = false;

  private editing: boolean = false;

  private actionProps: object = {
    kekGiven: this.comment.liked,
    keks: this.comment.likes.length,
    replies: this.comment.replies.length
  };

  private mounted() {
    if (this.comment.initial_replies !== null) {
      this.replies = this.comment.initial_replies;

      if (this.comment.replies.length > 2) {
        this.replyIDsLeft = this.comment.replies.slice(
          0,
          this.comment.replies.length - 2
        );
      }
    }
  } // Lifecycle

  private async createReply(createData: CreateData) {
    const vuexResp: Note = await this.replyOnComment({
      commentPublicId: this.comment.public_id,
      data: createData
    });

    if (vuexResp) {
      // Add newly created reply to replies.
      this.replies = [...this.replies, vuexResp];
      this.$refs.replyComposer.resetFields();
    }
  }

  private removeReply(index: number) {
    this.comment.replies.splice(index, 1);
    this.replies.splice(index, 1);
  }

  private get showLoadMore(): boolean {
    if (
      this.comment.replies.length > 2 &&
      this.comment.replies.length !== this.replies.length
    ) {
      return true;
    }

    return false;
  }

  private async loadMore() {
    if (this.replyIDsLeft.length > 0) {
      // Load 5 more replies on click
      const idArray: number[] = this.replyIDsLeft.slice(-5);

      const replies: Note[] = await this.getReplies(idArray);

      this.replies = [...replies, ...this.replies];
      this.replyIDsLeft.splice(this.replyIDsLeft.length - replies.length);
    }
  }

  private async updateComment(updatedContent: string) {
    const isSuccessful: boolean = this.updateCommentVuex({
      content: updatedContent,
      commentPublicId: this.comment.public_id
    });

    // If update was successful (true).
    if (isSuccessful) {
      this.editing = false;

      this.comment.content = updatedContent;
      this.comment.edited = true;
    }
  }
}
</script>

<style lang="scss">
.comment {
  margin-left: -0.4em;
}
</style>
