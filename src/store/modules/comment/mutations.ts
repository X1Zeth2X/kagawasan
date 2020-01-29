import { MutationTree } from "vuex";
import { PostState } from "./types";

export const mutations: MutationTree<PostState> = {
  request(state) {
    state.requesting = true;
    state.errorMsg = null;
  },

  requestSuccess(state) {
    state.requesting = false;
  },

  requestError(state, errorMsg: string) {
    state.requesting = false;
    state.errorMsg = errorMsg;
  },

  // Comment on post
  commentRequest(state) {
    state.commenting = true;
    state.commentErrorMsg = null;
  },

  commentSuccess(state) {
    state.commenting = false;
  },

  commentError(state, errorMsg: string) {
    state.commenting = false;
    state.commentErrorMsg = errorMsg;
  }
};
