<template>
  <div id="commentDetails">
    <a class="b link f6">
      Zeth Leonardo
    </a>

    &middot;

    <span class="f7">3 days ago</span>

    <span class="float-right mr2">
      <v-menu transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon x-small v-on="on">
            <v-icon>ion-ios-more</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>Edit</v-list-item>
          <v-list-item>Delete</v-list-item>
        </v-list>
      </v-menu>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CommentDetails extends Vue {}
</script>
