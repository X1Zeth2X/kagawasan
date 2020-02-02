<template>
  <div>
    <span class="f7">3 likes</span>
    &middot;

    <a class="b f7 text-end">
      Reply
    </a>
    &middot;

    <v-btn x-small icon>
      <v-icon x-small>
        ion-ios-heart-empty
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ReplyActions extends Vue {}
</script>
