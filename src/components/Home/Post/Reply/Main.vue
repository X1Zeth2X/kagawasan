<template>
  <v-list-item three-line class="reply-margin">
    <Avatar
      :avatarUrl="
        `https://api.adorable.io/avatars/40/${reply.author.email}.png`
      "
    />

    <v-list-item-content
      :class="$vuetify.breakpoint.mdAndUp ? 'ml-negative' : 'ml2'"
    >
      <ReplyDetails
        :author="reply.author"
        :date="reply.created"
        :replyPublicId="reply.public_id"
        :edited="reply.edited"
        v-on:deleted="$emit('removeReply')"
        v-on:edit="editing = true"
      />

      <p class="f6 pt0">
        <v-scroll-x-transition mode="out-in">
          <Content v-if="!editing" :content="reply.content" />

          <Edit
            v-else
            class="mb-negative-reply"
            :content="reply.content"
            v-on:cancel="editing = false"
            v-on:submit="updateReply"
          />
        </v-scroll-x-transition>
      </p>

      <ReplyActions
        :action="actionProps"
        :replyPublicId="reply.public_id"
        v-on:reply="$emit('reply')"
      />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Prop } from "vue-property-decorator";
import { Note } from "@/store/content";

import Avatar from "../Common/Avatar.vue";
import ReplyDetails from "./Details.vue";
import ReplyActions from "./Actions.vue";

import Content from "../Common/Content.vue";
import { Action } from "vuex-class";
const Edit = () => import("../Common/Edit.vue");

const namespace: string = "reply";

@Component({
  components: {
    Avatar,
    ReplyDetails,
    ReplyActions,
    Content,
    Edit
  }
})
export default class Main extends Vue {
  @Prop() reply!: Note;

  @Action("update", { namespace })
  private updateReplyVuex!: Function;

  private editing: boolean = false;

  private actionProps: object = {
    kekGiven: this.reply.liked,
    keks: this.reply.likes.length
  };

  private async updateReply(updatedContent: string) {
    const isSuccessful: boolean = await this.updateReplyVuex({
      content: updatedContent,
      replyPublicId: this.reply.public_id
    });

    // If update was successful (true).
    if (isSuccessful) {
      this.editing = false;

      this.reply.content = updatedContent;
      this.reply.edited = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-margin {
  margin-left: -1em;
  margin-right: -1em;
}
</style>
