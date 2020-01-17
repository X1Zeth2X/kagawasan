import { ActionTree } from "vuex";
import { FeedState } from "./types";
import { RootState } from "@/store/types";
import FeedService, { FeedError } from "@/services/feed.service";

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

  async setFeedItems({ commit }, items: object[]) {
    commit("setFeedItems", items);
  } // Set feed
};
