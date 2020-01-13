import { GetterTree } from "vuex";
import { AuthState, User } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<AuthState, RootState> = {
  registering(state): boolean {
    return state.registering;
  },

  authenticating(state): boolean {
    return state.authenticating;
  },

  accessToken(state): string {
    return state.accessToken;
  },

  currentUser(state): User | null {
    return state.currentUser;
  },

  error(state): boolean {
    return state.error;
  },

  loginErrorMsg(state): string {
    return state.loginErrorMsg;
  },

  registerErrorMsg(state): string {
    return state.registerErrorMsg;
  }
};
