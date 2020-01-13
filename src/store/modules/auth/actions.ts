import { ActionTree } from "vuex";
import { AuthState } from "./types";
import { RootState } from "@/store/types";
import { AuthService, AuthError } from "@/services/auth.service";

export const actions: ActionTree<AuthState, RootState> = {
  async login({ commit }, { email, password }) {
    commit("loginRequest");

    try {
      const serviceResp = await AuthService.login(email, password);

      commit("loginSuccess", {
        accessToken: serviceResp.accessToken,
        user: serviceResp.user
      });

      return true;
    } catch (error) {
      if (error instanceof AuthError) {
        commit("loginError", error.message);
      }

      return false;
    }
  },

  async register({ commit }, data) {
    commit("registerRequest");

    try {
      const serviceResp = await AuthService.register(data);

      commit("registerSuccess", {
        accessToken: serviceResp.accessToken,
        user: serviceResp.user
      });

      return true;
    } catch (error) {
      if (error instanceof AuthError) {
        commit("registerError", error.message);
      }
      return false;
    }
  },

  logout({commit}) {
    commit("logout");
  }
};
