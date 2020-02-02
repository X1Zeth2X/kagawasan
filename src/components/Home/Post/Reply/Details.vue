<template>
  <div>
    <a class="b f6">
      Johnson Smith
    </a>
    &middot;

    <span class="f7 fw5">
      38 mins ago
    </span>

    <span class="float-right">
      <v-btn icon x-small>
        <v-icon small>
          ion-ios-arrow-down
        </v-icon>
      </v-btn>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ReplyDetails extends Vue {}
</script>
