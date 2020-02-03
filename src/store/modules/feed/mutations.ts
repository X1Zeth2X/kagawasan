import { MutationTree } from "vuex";
import { FeedState } from "./types";

export const mutations: MutationTree<FeedState> = {
  feedRequest(state) {
    state.requesting = true;
    state.error = false;
    state.feedErrorMsg = "";
  },

  commentFeedRequest(state) {
    state.commentsRequest = true;
    state.commentsFeedErrorMsg = null;
  },

  commentFeedSuccess(state) {
    state.commentsRequest = false;
  },

  replyFeedRequest(state) {
    state.repliesRequest = true;
    state.repliesFeedErrorMsg = null;
  },

  replyFeedSuccess(state) {
    state.repliesRequest = false;
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

  commentFeedError(state, errorMsg: string) {
    state.commentsRequest = false;
    state.commentsFeedErrorMsg = errorMsg;
  },

  replyFeedError(state, errorMsg: string) {
    state.repliesRequest = false;
    state.repliesFeedErrorMsg = errorMsg;
  },

  updateEditedPost(state, { content, postPublicId }) {
    const index = state.feedItems.findIndex(
      // @ts-ignore
      // Ignore this cause no types need to be specified.
      post => post.public_id === postPublicId
    );

    const post: any = state.feedItems[index];

    post.content = content;
    post.edited = true;
  },

  removePost(state, postPublicId: string) {
    const index = state.feedItems.findIndex(
      // @ts-ignore
      // Ignore this cause no types need to be specified.
      post => post.public_id === postPublicId
    );
    state.feedItems.splice(index, 1);
  }
};
