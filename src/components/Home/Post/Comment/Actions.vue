<template>
  <div>
    <span class="f7">3 likes</span>
    &middot;

    <a @click="$emit('reply')" class="b f7 text-end">
      Reply
    </a>
    &middot;

    <v-btn x-small icon>
      <v-icon x-small color="red lighten-2">
        ion-ios-heart
      </v-icon>
    </v-btn>

    <div>
      <v-btn x-small rounded depressed block>
        Replies (3)
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CommentActions extends Vue {}
</script>
