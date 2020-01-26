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

  postError(state, errorMsg: string) {
    state.requesting = false;
    state.errorMsg = errorMsg;
  },

  // Create
  createRequest(state) {
    state.creating = true;
    state.createErrorMsg = null;
  },

  createSuccess(state) {
    state.creating = false;
  },

  createError(state, errorMsg: string) {
    state.creating = false;
    state.createErrorMsg = errorMsg;
  }
};
