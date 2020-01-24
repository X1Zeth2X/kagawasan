import { PostState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/store/types";

import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const state: PostState = {
  requesting: false,

  errorMsg: null,
  createErrorMsg: null
};

const namespaced: boolean = true;

export const post: Module<PostState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
