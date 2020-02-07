<template>
  <div>
    <a class="b link f6 primary--text">
      {{ author.full_name ? author.full_name : `@${author.username}` }}
    </a>
    &middot;

    <span class="f7 fw5">
      {{ prettyDate }}
    </span>

    <span v-show="edited">
      &middot;

      <v-chip x-small>
        Edited
      </v-chip>
    </span>

    <span class="float-right">
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon x-small v-on="on">
            <v-icon small>ion-ios-arrow-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <div v-for="item in menuActions" :key="item.label">
            <v-list-item @click="item.action" v-if="modifiable(item.label)">
              {{ item.label }}
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import moment from "moment";
import { Prop, Emit } from "vue-property-decorator";
import { Author } from "@/store/content";
import { Getter, Action } from "vuex-class";
import { User } from "@/store/modules/auth/types";

const namespace: string = "comment";

@Component
export default class CommentDetails extends Vue {
  @Prop() author!: Author;
  @Prop() date!: string;
  @Prop() commentPublicId!: string;
  @Prop() edited!: boolean;

  @Getter("currentUser", { namespace: "auth" })
  private currentUser!: User;

  @Action("delete", { namespace })
  private delete!: Function;

  @Action("setSnackNotifier", { namespace: "dialog" })
  private setSnackNotifier!: Function;

  private menuActions: object[] = [
    {
      label: "Edit",
      action: this.editComment
    },
    {
      label: "Delete",
      action: this.deleteComment
    },
    {
      label: "Report",
      action: () => null
    }
  ];

  @Emit("edit")
  private editComment() {
    return true;
  }

  private async deleteComment() {
    const isDeleted: boolean = await this.delete(this.commentPublicId);

    // Self immolate if succeeded.
    if (isDeleted) {
      // Notify
      this.setSnackNotifier({
        color: "orange darken-3",
        message: "Comment has been deleted!"
      });

      this.$emit("deleted");
    }
  }

  // Checks if the current user can modify the post.
  private modifiable(label: string): boolean {
    // Add more ignore options (If needed).
    const ignore = ["Report"];

    // Makes sure that the label is not in ignore.
    if (!ignore.includes(label)) {
      // Return true if the current user is the owner of the post.
      return this.currentUser.public_id === this.author.public_id
        ? true
        : false;
    }

    return true;
  }

  private get prettyDate(): string {
    const prettyDate: string = moment
      .utc(this.date)
      .local()
      .fromNow();

    return prettyDate;
  }
}
</script>
