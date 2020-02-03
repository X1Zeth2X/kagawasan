<template>
  <div>
    <span class="f7">{{ keks }} likes</span>
    &middot;

    <a @click="$emit('reply')" class="b f7 text-end">
      Reply
    </a>
    &middot;

    <v-btn x-small icon>
      <v-icon
        x-small
        :color="kekGiven ? 'red lighten-1' : ''"
        @click="toggleKek"
      >
        {{ kekGiven ? "ion-ios-heart" : "ion-ios-heart-empty" }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Action } from "vuex-class";

const namespace: string = "reply";

type ActionProps = {
  kekGiven: boolean;
  keks: number;
};

@Component
export default class ReplyActions extends Vue {
  @Prop() action!: ActionProps;
  @Prop() replyPublicId!: string;

  @Action("unlike", { namespace })
  private unlikeReplyVuex!: Function;

  @Action("like", { namespace })
  private likeReplyVuex!: Function;

  private kekGiven: boolean = this.action.kekGiven;
  private keks: number = this.action.keks;

  private likeReply() {
    this.kekGiven = true;
    this.keks++;

    this.likeReplyVuex(this.replyPublicId);
  }

  private unlikeReply() {
    this.kekGiven = false;
    this.keks--;

    this.unlikeReplyVuex(this.replyPublicId);
  }

  private toggleKek() {
    // If reply already liked
    if (this.kekGiven) {
      // Unlike
      this.unlikeReply();
    } else {
      // Like
      this.likeReply();
    }
  }
}
</script>
