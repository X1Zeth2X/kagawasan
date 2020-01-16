<template>
  <v-row align="start">
    <v-list-item three-line class="comment">
      <CommentAvatar />

      <v-list-item-content style="margin-left: -.7em;">
        <CommentDetails />

        <p class="f6 pt0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, eligendi.
        </p>

        <CommentActions />
      </v-list-item-content>
    </v-list-item>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import CommentAvatar from "./Avatar.vue";
import CommentDetails from "./Details.vue";
import CommentActions from "./Actions.vue";

@Component({
  components: {
    CommentAvatar,
    CommentDetails,
    CommentActions
  }
})
export default class CommentMain extends Vue {}
</script>

<style lang="scss">
.comment {
  margin-left: .3em;
  margin-right: .75em
}
</style>
