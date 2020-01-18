import { AuthState } from "./types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<AuthState> = {
  registerRequest(state) {
    state.registering = true;
    state.error = false;
    state.registerErrorMsg = "";
  },

  loginRequest(state) {
    state.authenticating = true;
    state.error = false;
    state.loginErrorMsg = "";
  },

  registerSuccess(state, { accessToken, user }) {
    state.registering = false;
    state.accessToken = accessToken;
    state.currentUser = user;
  },

  loginSuccess(state, { accessToken, user }) {
    state.authenticating = false;
    state.accessToken = accessToken;
    state.currentUser = user;
  },

  registerError(state, errorMsg: string) {
    state.registering = false;
    state.error = true;
    state.registerErrorMsg = errorMsg;
  },

  loginError(state, errorMsg: string) {
    state.authenticating = false;
    state.error = true;
    state.loginErrorMsg = errorMsg;
  },

  logout(state) {
    state.accessToken = "";
    state.currentUser = null;
  }
};
