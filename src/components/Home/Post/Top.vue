<template>
  <v-list-item>
    <v-list-item-avatar>
      <a href="#">
        <v-avatar size="40" class="primary">
          <v-icon dark>ion-md-person</v-icon>
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
            <v-list-item @click="item.action" v-if="item.show">
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
import { Author } from "@/store/post";
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

  private menuActions: object[] = [
    {
      label: "Edit",
      action: this.editPost,
      show: true
    },
    {
      label: "Delete",
      action: this.deletePost,
      show: true
    },
    {
      label: "Report",
      action: () => null,
      show: true
    }
  ];

  private get prettyDate(): string {
    const prettyDate: string = moment
      .utc(this.date)
      .local()
      .format("MMM Do YYYY, h:mm A");
    return prettyDate;
  }

  private editPost() {
    this.$emit("editPost");
  }

  private async deletePost() {
    const isDeleted: boolean = await this.delete(this.postPublicId);

    // Self immolate if succeeded.
    if (isDeleted) {
      this.$emit("removePost");
    }
  }
}
</script>
