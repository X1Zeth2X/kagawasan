<template>
  <v-card-actions>
    <v-btn icon @click="toggleKek">
      <v-icon :color="kekGiven ? 'red lighten-1' : ''">
        {{ kekGiven ? "ion-ios-heart" : "ion-ios-heart-empty" }}
      </v-icon>
    </v-btn>
    <span class="mb1 f6">{{ keks }}</span>

    <v-btn
      icon
      @click="$emit('toggleCommenting')"
      :color="commenting ? 'primary' : ''"
    >
      <v-icon>ion-ios-chatboxes</v-icon>
    </v-btn>
    <span class="mb1 f6">{{ action.comments }}</span>

    <v-btn icon>
      <v-icon>ion-ios-share-alt</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>ion-md-bookmark</v-icon>
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit, Prop } from "vue-property-decorator";
import { Action } from 'vuex-class';

const namespace: string = "post";

@Component
export default class PostActions extends Vue {
  @Prop() action!: any;
  @Prop() commenting!: boolean;
  @Prop() postPublicId!: string;

  @Action("like", { namespace })
  private likePostVuex!: Function;

  @Action("unlike", { namespace })
  private unlikePostVuex!: Function;

  private kekGiven: boolean = this.action.kekGiven;
  private keks: number = this.action.keks;

  private mounted() {
  } // Lifecycle

  private unlikePost() {
    this.kekGiven = false;
    this.keks = this.keks - 1;

    this.unlikePostVuex(this.postPublicId);
  }

  private likePost() {
    this.kekGiven = true;
    this.keks++;

    this.likePostVuex(this.postPublicId);
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
