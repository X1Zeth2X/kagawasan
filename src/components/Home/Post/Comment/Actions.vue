<template>
  <div>
    <span class="f7">{{ keks }} likes</span>
    &middot;

    <a @click="$emit('reply')" class="b f7 text-end">
      Reply
    </a>
    &middot;

    <v-btn x-small icon>
      <v-icon x-small :color="kekGiven ? 'red lighten-1' : ''" @click="toggleKek">
        {{ kekGiven ? 'ion-ios-heart' : 'ion-ios-heart-empty' }}
      </v-icon>
    </v-btn>

    <div>
      <v-btn x-small rounded depressed block> Replies ({{ action.replies }}) </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Action } from 'vuex-class';

const namespace: string = "comment";

interface ActionProps {
  kekGiven: boolean;
  keks: number;
  replies: number
}

@Component
export default class CommentActions extends Vue {
  @Prop() action!: ActionProps;
  @Prop() commentId!: number;

  @Action("unlike", { namespace })
  private unlikeCommentVuex!: Function;

  @Action("like", { namespace })
  private likeCommentVuex!: Function;

  private kekGiven: boolean = this.action.kekGiven;
  private keks: number = this.action.keks;

  private likeComment() {
    this.kekGiven = true;
    this.keks++;

    this.likeCommentVuex(this.commentId);
  }

  private unlikeComment() {
    this.kekGiven = false;
    this.keks--;

    this.unlikeCommentVuex(this.commentId);
  }

  private toggleKek() {
    // If post comment already liked
    if (this.kekGiven) {
      // Unlike
      this.unlikeComment();
    } else {
      // Like
      this.likeComment();
    }
  }
}
</script>
