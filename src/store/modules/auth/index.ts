import { AuthState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/store/types";

import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

export const state: AuthState = {
  registering: false,
  authenticating: false,

  accessToken: "",
  currentUser: null,

  error: false,

  loginErrorMsg: "",
  registerErrorMsg: "",
};

const namespaced: boolean = true;

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
