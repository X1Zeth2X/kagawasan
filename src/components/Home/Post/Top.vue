<template>
  <v-list-item>
    <v-list-item-avatar>
      <a href="#">
        <v-avatar size="45" class="primary">
          <v-icon dark>ion-md-person</v-icon>
        </v-avatar>
      </a>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="b">
        {{ author.full_name ? author.full_name : `@${author.username}` }}
      </v-list-item-title>

      <v-list-item-subtitle>
        {{ prettyDate }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>ion-md-more</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            Edit
          </v-list-item>

          <v-list-item>
            Delete
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-icon>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import moment from "moment";
import { Author } from "@/store/post";

@Component
export default class PostTop extends Vue {
  @Prop() author!: Author;
  @Prop() date!: string;

  private get prettyDate(): string {
    const prettyDate: string = moment
      .utc(this.date)
      .local()
      .format("MMM Do YYYY, h:mm A");
    return prettyDate;
  }
}
</script>
