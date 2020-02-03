import { ActionTree } from "vuex";
import { FeedState } from "./types";
import { RootState } from "@/store/types";
import FeedService, { FeedError } from "@/services/feed.service";
import { Post, Comment, Note } from "@/store/content";

export const actions: ActionTree<FeedState, RootState> = {
  async getIds({ commit }) {
    commit("feedRequest");

    try {
      const postIds = await FeedService.getIds();
      commit("getIdSuccess", postIds);

      return true;
    } catch (error) {
      if (error instanceof FeedError) {
        commit("feedError", error.message);
      }

      return false;
    }
  }, // Get Post IDs

  async getComments({ commit }, idArray: number[]) {
    commit("commentFeedRequest");

    try {
      const comments: Comment[] = await FeedService.getCommentsData(idArray);
      commit("commentFeedSuccess");

      return comments;
    } catch (error) {
      if (error instanceof FeedError) {
        commit("commentFeedError", error.message);
      }

      return false;
    }
  }, // Get post comments

  async getReplies({ commit }, idArray: number[]) {
    commit("replyFeedRequest");

    try {
      const replies: Note[] = await FeedService.getRepliesData(idArray);
      commit("replyFeedSuccess");

      return replies;
    } catch (error) {
      if (error instanceof FeedError) {
        commit("replyFeedError", error.message);
      }

      return false;
    }
  }, // Get comment replies

  setFeedItems({ commit }, items: Post[]) {
    commit("setFeedItems", items);
  }, // Set feed

  updateEditedPost({ commit }, { content, postPublicId }) {
    commit("updateEditedPost", {
      content,
      postPublicId
    });
  }, // Updates an edited post.

  removePost({ commit }, postPublicId: string) {
    commit("removePost", postPublicId);
  }
};
