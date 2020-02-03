<template>
  <v-list-item three-line class="comment">
    <CommentAvatar class="hidden-sm-and-down" />

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
        <Reply
          v-for="(reply, index) in replies"
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

import CommentAvatar from "./Avatar.vue";
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
    CommentAvatar,
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

  public $refs!: {
    replyComposer: any;
  };

  private replies: Note[] = [];

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
    this.replies.splice(index, 1);
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
