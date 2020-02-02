import { PostState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/store/types";

import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const state: PostState = {
  replying: false,
  requesting: false,

  errorMsg: null,
  replyErrorMsg: null
};

const namespaced: boolean = true;

export const reply: Module<PostState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
