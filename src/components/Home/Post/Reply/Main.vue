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
      <ReplyDetails
        :author="reply.author"
        :date="reply.created"
        :replyPublicId="reply.public_id"
        v-on:deleted="$emit('removeReply')"
      />

      <p class="f6 pt0">
        <v-scroll-x-transition mode="out-in">
          <Content v-if="!replying" :content="reply.content" />

          <Edit v-else :content="reply.content" />
        </v-scroll-x-transition>
      </p>

      <ReplyActions />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Prop } from "vue-property-decorator";
import { Note } from "@/store/content";

import ReplyDetails from "./Details.vue";
import ReplyActions from "./Actions.vue";

import Content from "../Common/Content.vue";
const Edit = () => import("../Common/Edit.vue");

@Component({
  components: {
    ReplyDetails,
    ReplyActions,
    Content,
    Edit
  }
})
export default class Main extends Vue {
  @Prop() reply!: Note;

  private replying: boolean = false;
}
</script>

<style lang="scss" scoped>
.reply-margin {
  margin-left: -1em;
  margin-right: -1em;
}
</style>
