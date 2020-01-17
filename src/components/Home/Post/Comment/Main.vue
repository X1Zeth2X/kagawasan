<template>
  <v-row align="start">
    <v-list-item three-line class="comment">
      <CommentAvatar />

      <v-list-item-content style="margin-left: -.7em;">
        <CommentDetails :author="comment.author" :date="comment.created" />

        <p class="f6 pt0">
          <vue-markdown
            v-if="markdown"
            :source="comment.content"
            :class="[
              $vuetify.theme.dark
                ? 'white--text br3'
                : 'grey--text text--darken-4',
              'fw5'
            ]"
          />

          <truncate
            clamp="Show More"
            :class="[
              $vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-4',
              'fw5'
            ]"
            :text="comment.content"
            :length="500"
            v-else
          />
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
import { Getter } from "vuex-class";

/* 
  Lazy load truncate/markdown because it does need to get imported
  if it is turned off in the settings.
*/
const VueMarkdown = () => import("vue-markdown");
const truncate = () => import("vue-truncate-collapsed");

@Component({
  components: {
    CommentAvatar,
    CommentDetails,
    CommentActions,

    VueMarkdown,
    truncate
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
