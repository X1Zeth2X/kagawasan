import { GetterTree } from "vuex";
import { FeedState } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<FeedState, RootState> = {
  feedItems(state): object[] | null {
    return state.feedItems;
  },

  commentsRequest(state): boolean {
    return state.commentsRequest;
  },

  commentsFeedErrorMsg(state): string | null {
    return state.commentsFeedErrorMsg;
  },

  requesting(state): boolean {
    return state.requesting;
  },

  postIds(state): number[] {
    return state.postIds;
  }
};
