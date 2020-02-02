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

  // Reply on post
  replyRequest(state) {
    state.replying = true;
    state.replyErrorMsg = null;
  },

  replySuccess(state) {
    state.replying = false;
  },

  replyError(state, errorMsg: string) {
    state.replying = false;
    state.replyErrorMsg = errorMsg;
  }
};
