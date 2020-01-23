<template>
  <v-row align="start">
    <v-list-item three-line class="comment">
      <CommentAvatar v-show="$vuetify.breakpoint.mdAndUp" />

      <v-list-item-content
        :class="$vuetify.breakpoint.mdAndUp ? 'ml-negative' : 'ml2'"
      >
        <CommentDetails :author="comment.author" :date="comment.created" />

        <p class="f6 pt0">
          <Content :content="comment.content" :highlight="true" />
        </p>

        <CommentActions />
      </v-list-item-content>
    </v-list-item>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Prop } from "vue-property-decorator";
import { Comment } from "@/store/post";

import CommentAvatar from "./Avatar.vue";
import CommentDetails from "./Details.vue";
import CommentActions from "./Actions.vue";

// Import content component.
import Content from "../Common/Content.vue";

import { Getter } from "vuex-class";

@Component({
  components: {
    CommentAvatar,
    CommentDetails,
    CommentActions,
    Content
  }
})
export default class CommentMain extends Vue {
  @Prop() comment!: Comment;

  @Getter("markdown", { namespace: "settings" }) private markdown!: boolean;
}
</script>

<style lang="scss">
.comment {
  margin-left: 0.3em;
  margin-right: 0.75em;
}
</style>
