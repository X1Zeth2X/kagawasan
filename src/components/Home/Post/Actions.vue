<template>
  <v-card-actions>
    <v-btn icon @click="toggleKek">
      <v-icon :color="kekGiven ? 'red lighten-1' : ''">
        {{ kekGiven ? "ion-ios-heart" : "ion-ios-heart-empty" }}
      </v-icon>
    </v-btn>
    <span class="mb1 f6 mr1">{{ keks }}</span>

    <v-btn icon @click="$emit('comment')">
      <v-icon>ion-ios-chatboxes</v-icon>
    </v-btn>
    <span class="mb1 f6">{{ action.comments }}</span>

    <v-spacer></v-spacer>

    <v-chip color="info" v-if="action.edited" outlined>
      <v-icon left>ion-ios-information-circle</v-icon>
      Edited
    </v-chip>

    <v-btn icon class="ml1" disabled>
      <v-icon>ion-ios-save</v-icon>
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit, Prop } from "vue-property-decorator";
import { Action } from "vuex-class";

const namespace: string = "post";

type ActionProps = {
  kekGiven: boolean;
  keks: number;
};

@Component
export default class PostActions extends Vue {
  @Prop() action!: ActionProps;
  @Prop() postPublicId!: string;

  @Action("like", { namespace })
  private likePostVuex!: Function;

  @Action("unlike", { namespace })
  private unlikePostVuex!: Function;

  private kekGiven: boolean = this.action.kekGiven;
  private keks: number = this.action.keks;

  private likePost() {
    this.kekGiven = true;
    this.keks++;

    this.likePostVuex(this.postPublicId);
  }

  private unlikePost() {
    this.kekGiven = false;
    this.keks--;

    this.unlikePostVuex(this.postPublicId);
  }

  public toggleKek() {
    // If post is already liked
    if (this.kekGiven) {
      // Unlike
      this.unlikePost();
    } else {
      // Like
      this.likePost();
    }
  }
}
</script>
