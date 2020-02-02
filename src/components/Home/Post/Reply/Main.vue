<template>
  <v-list-item three-line class="reply-margin">
    <v-list-item-avatar size="35">
      <v-avatar class="primary">
        <v-icon small>ion-ios-person</v-icon>
      </v-avatar>
    </v-list-item-avatar>

    <v-list-item-content
      :class="$vuetify.breakpoint.mdAndUp ? 'ml-negative' : 'ml2'"
    >
      <ReplyDetails />

      <p class="f6 pt0">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur,
        architecto.
      </p>

      <ReplyActions />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ReplyDetails from "./Details.vue";
import ReplyActions from "./Actions.vue";

@Component({
  components: {
    ReplyDetails,
    ReplyActions
  }
})
export default class Main extends Vue {}
</script>

<style lang="scss" scoped>
.reply-margin {
  margin-left: -1em;
  margin-right: -1em;
}
</style>
