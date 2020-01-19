import { MutationTree } from "vuex";
import { FeedState } from "./types";
import { Post } from "@/store/post";

export const mutations: MutationTree<FeedState> = {
  feedRequest(state) {
    state.requesting = true;
    state.error = false;
    state.feedErrorMsg = "";
  },

  setFeedItems(state, items: object[]) {
    state.feedItems = items;
  },

  getIdSuccess(state, postIds: number[]) {
    state.requesting = false;
    state.postIds = postIds;
  },

  feedError(state, errorMsg: string) {
    state.requesting = false;
    state.error = true;
    state.feedErrorMsg = errorMsg;
  },

  removePost(state, post: Post) {
    const index = state.feedItems.indexOf(post);
    state.feedItems.splice(index, 1);
  }
};
