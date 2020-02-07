<template>
  <v-row align="start" justify="space-around">
    <!-- Left aligned items -->
    <v-col md="7">
      <HomeFAB />

      <div class="f3 fw7">Create</div>
      <p>What's on your mind?</p>
      <Composer v-on:addPost="addPost" />

      <v-divider class="mv4"></v-divider>

      <div v-for="post in feed" :key="post.public_id">
        <PostMain :post="post" />
      </div>

      <infinite-loading v-if="!requesting" @infinite="feedHandler">
        <div slot="no-more">
          <div class="f4 b mb0">No more posts to show</div>
          <p class="f5 fw2">Spend some time outside.</p>
        </div>

        <div slot="error">
          <div class="f4 b mb0 error--text">
            Something made an oopsie
          </div>

          <p class="f5 fw2">Error: {{ feedError }}</p>
        </div>

        <div slot="spinner">
          <div class="f4 b mb2">Loading Awesomeness</div>
          <v-progress-circular
            indeterminate
            color="amber"
            width="5"
          ></v-progress-circular>
        </div>
      </infinite-loading>

      <div v-else class="tc">
        <div class="f4 b mb2">
          Waking up the API
        </div>
        <v-progress-circular
          indeterminate
          color="deep-purple"
          width="5"
        ></v-progress-circular>
      </div>
    </v-col>

    <!-- Right aligned items: shown in medium viewpoints and up. -->
    <v-col md="4" v-if="$vuetify.breakpoint.mdAndUp && rightContent">
      <div class="f3 fw7">Announcements</div>

      <v-alert
        v-for="(announcement, index) in announcements"
        :key="index"
        :type="announcement.color"
        border="left"
        colored-border
        :icon="announcement.icon"
      >
        {{ announcement.message }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Getter, Action } from "vuex-class";
import ApiService, { backendUrl } from "../../services/api.service";
import { Post } from "@/store/content";

// Dynamically import InfiniteLoader
const InfiniteLoading = () => import("vue-infinite-loading");

import PostMain from "./Post/Main.vue";
import Composer from "./Composer.vue";
import HomeFAB from "./HomeFAB.vue";

const namespace: string = "feed";

@Component({
  components: {
    Composer,
    PostMain,
    InfiniteLoading,
    HomeFAB
  }
})
export default class StandardLayout extends Vue {
  @Getter("feedItems", { namespace })
  private feed!: object[];

  @Getter("requesting", { namespace })
  private requesting!: boolean;

  @Getter("postIds", { namespace })
  private postIds!: number[];

  @Getter("rightContent", { namespace: "settings" })
  private rightContent!: boolean;

  @Action("setFeedItems", { namespace })
  private setFeedItems!: Function;

  @Action("getIds", { namespace })
  private getIds!: Function;

  private announcements: object[] = [
    {
      message: "Welcome to Konishi's MVP testing",
      color: "success",
      icon: "ion-ios-checkmark-circle"
    },
    {
      message:
        "There are no confirmation prompts yet, so becareful when *deleting* posts.",
      color: "warning",
      icon: "ion-ios-information-circle"
    }
  ];

  private created() {
    this.getIds();
  } // Lifecycle

  private feedError: string = "";

  private async feedHandler($state: any) {
    // Set limit to 15 posts per request
    const limit = this.feed.length + 15;

    /*
      Check first if all the posts are loaded,
      this prevents unnecessary requests only to find out that it's complete ;)
    */
    if (this.feed.length === this.postIds.length) {
      $state.loaded();
      $state.complete();

      return true;
    }

    const resource: string = `${backendUrl}/feed/posts`;

    ApiService.setHeader();

    ApiService.post(resource, {
      post_ids: this.postIds.slice(this.feed.length, limit)
    })
      .then(resp => {
        if (resp.status === 200) {
          const posts: Post[] = resp.data.posts;
          this.setFeedItems(this.feed.concat(posts));

          setTimeout(() => {
            $state.loaded();
          }, 250);

          if (this.feed.length === this.postIds.length) {
            $state.complete();
          }
        } else if (resp.status === 204) {
          $state.loaded();
          $state.complete();
        }
      })
      .catch(error => {
        this.feedError = error.response.data.message;
        $state.error();
      });
  }

  private addPost(post: Post) {
    this.setFeedItems([post, ...this.feed]);
  }
}
</script>
