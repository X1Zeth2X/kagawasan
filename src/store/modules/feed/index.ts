import { FeedState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/store/types";

import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const state: FeedState = {
  feedItems: [],
  postIds: [],

  requesting: false,
  error: false,
  feedErrorMsg: "",

  commentsRequest: false,
  commentsFeedErrorMsg: null,

  repliesRequest: false,
  repliesFeedErrorMsg: null
};

const namespaced: boolean = true;

export const feed: Module<FeedState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
