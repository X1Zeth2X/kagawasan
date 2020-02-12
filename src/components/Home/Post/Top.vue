<template>
  <v-list-item>
    <v-list-item-avatar>
      <a>
        <v-avatar size="40" class="primary">
          <v-img
            :src="`https://api.adorable.io/avatars/40/${author.email}.png`"
          ></v-img>
        </v-avatar>
      </a>
    </v-list-item-avatar>

    <v-list-item-content class="ml-negative">
      <v-list-item-title class="b">
        {{ author.full_name ? author.full_name : `@${author.username}` }}
      </v-list-item-title>

      <v-list-item-subtitle>
        {{ prettyDate }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon>
      <v-menu class="mr4">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>ion-ios-more</v-icon>
          </v-btn>
        </template>

        <v-list v-if="!isEditing">
          <div v-for="item in menuActions" :key="item.label">
            <v-list-item @click="item.action" v-if="modifiable(item.label)">
              {{ item.label }}
            </v-list-item>
          </div>
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
import { Author } from "@/store/content";
import { Action, Getter } from "vuex-class";
import { User } from "@/store/modules/auth/types";

const namespace: string = "post";

@Component
export default class PostTop extends Vue {
  @Prop() author!: Author;
  @Prop() date!: string;
  @Prop() postPublicId!: string;

  @Getter("currentUser", { namespace: "auth" })
  private currentUser!: User;

  // If edit dialog is true, it is being edited.
  @Getter("editDialog", { namespace: "dialog" })
  private isEditing!: boolean;

  @Action("delete", { namespace })
  private delete!: Function;

  @Action("removePost", { namespace: "feed" })
  private removePost!: Function;

  @Action("setSnackNotifier", { namespace: "dialog" })
  private setSnackNotifier!: Function;

  private menuActions: object[] = [
    {
      label: "Edit",
      action: this.editPost
    },
    {
      label: "Delete",
      action: this.deletePost
    },
    {
      label: "Report",
      action: () => null
    }
  ];

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

  private editPost() {
    this.$emit("editPost");
  }

  private async deletePost() {
    const isDeleted: boolean = await this.delete(this.postPublicId);

    // Self immolate if succeeded.
    if (isDeleted) {
      // Notify
      this.setSnackNotifier({
        color: "orange darken-3",
        message: "Post has been deleted! 🤔"
      });

      this.removePost(this.postPublicId);
    }
  }
}
</script>
