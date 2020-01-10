import { AuthState } from "./types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<AuthState> = {
  registerRequest(state) {
    state.registering = true;
    state.error = false;
    state.errorMsg = "";
  },

  loginRequest(state) {
    state.authenticating = true;
    state.error = false;
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

  registerError(state, errorMsg) {
    state.registering = false;
    state.error = true;
    state.errorMsg = errorMsg;
  },

  loginError(state, errorMsg) {
    state.authenticating = false;
    state.error = true;
    state.errorMsg = errorMsg;
  }
};
