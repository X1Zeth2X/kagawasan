import { MutationTree } from "vuex";
import { PostState } from "./types";

export const mutations: MutationTree<PostState> = {
  postRequest(state) {
    state.requesting = true;
    state.errorMsg = null;
  },

  postSuccess(state) {
    state.requesting = false;
  },

  createError(state, errorMsg: string) {
    state.requesting = false;
    state.createErrorMsg = errorMsg;
  },

  postError(state, errorMsg: string) {
    state.requesting = false;
    state.errorMsg = errorMsg;
  }
};
