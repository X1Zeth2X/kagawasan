<template>
  <div>
    <a class="b f6">
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
import moment from "moment";
import Component from "vue-class-component";

import { Prop, Emit } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

import { User } from "@/store/modules/auth/types";
import { Author } from "@/store/content";

const namespace: string = "reply";

@Component
export default class ReplyDetails extends Vue {
  @Prop() author!: Author;
  @Prop() date!: string;
  @Prop() replyPublicId!: string;
  @Prop() edited!: boolean;

  @Getter("currentUser", { namespace: "auth" }) private currentUser!: User;

  @Action("delete", { namespace: "reply" })
  private delete!: Function;

  @Action("setSnackNotifier", { namespace: "dialog" })
  private setSnackNotifier!: Function;

  private menuActions: object[] = [
    {
      label: "Edit",
      action: this.editReply
    },
    {
      label: "Delete",
      action: this.deleteReply
    },
    {
      label: "Report",
      action: () => null
    }
  ];

  @Emit("edit")
  private editReply() {
    return true;
  }

  private async deleteReply() {
    const isDeleted: boolean = await this.delete(this.replyPublicId);

    // Self immolate if succeeded.
    if (isDeleted) {
      // Notify
      this.setSnackNotifier({
        color: "orange darken-3",
        message: "Reply has been deleted!"
      });

      this.$emit("deleted");
    }
  }

  private modifiable(label: string): boolean {
    const ignore = ["Report"];

    if (!ignore.includes(label)) {
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
