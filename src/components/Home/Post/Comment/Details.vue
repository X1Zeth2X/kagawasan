<template>
  <div id="commentDetails">
    <a class="b link f6">
      {{ author.full_name ? author.full_name : `@${author.username}` }}
    </a>

    &middot;

    <span class="f7 fw5">{{ prettyDate }}</span>

    <span class="float-right">
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon x-small v-on="on">
            <v-icon small>ion-ios-arrow-down</v-icon>
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

import moment from "moment";
import { Prop } from "vue-property-decorator";
import { Author } from "@/store/post";

@Component
export default class CommentDetails extends Vue {
  @Prop() author!: Author;
  @Prop() date!: string;

  private get prettyDate(): string {
    const prettyDate: string = moment.utc(this.date).fromNow();

    return prettyDate;
  }
}
</script>
