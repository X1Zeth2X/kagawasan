<template>
  <v-row align="start" justify="space-around">
    <v-col md="7">
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
    </v-col>

    <v-col md="4" v-if="$vuetify.breakpoint.mdAndUp">
      <div class="f3 fw7">Announcements</div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
        cumque?
      </p>

      <v-alert
        type="warning"
        border="left"
        colored-border
        icon="ion-ios-information-circle"
      >
        There are no confirmation prompts yet, so becareful when deleting posts.
      </v-alert>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Getter, Action } from "vuex-class";
import ApiService, { backendUrl } from "../../services/api.service";
import { Post } from "@/store/post";

// Dynamically import InfiniteLoader
const InfiniteLoading = () => import("vue-infinite-loading");

import PostMain from "./Post/Main.vue";
import Composer from "./Composer.vue";

const namespace: string = "feed";

@Component({
  components: {
    Composer,
    PostMain,
    InfiniteLoading
  }
})
export default class StandardLayout extends Vue {
  @Getter("feedItems", { namespace })
  private feed!: object[];

  @Getter("requesting", { namespace })
  private requesting!: boolean;

  @Getter("postIds", { namespace })
  private postIds!: number[];

  @Action("setFeedItems", { namespace })
  private setFeedItems!: Function;

  @Action("getIds", { namespace })
  private getIds!: Function;

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

    const resource: string = `${backendUrl}/feed/get`;

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
