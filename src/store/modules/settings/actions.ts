import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { SettingState } from "./types";

export const actions: ActionTree<SettingState, RootState> = {
  toggleMiniDrawer({ commit }) {
    commit("toggleMiniDrawer");
  },

  toggleDrawer({ commit }) {
    commit("toggleDrawer");
  },

  toggleMarkdown({ commit }) {
    commit("toggleMarkdown");
  },

  toggleDarkMode({ commit }) {
    commit("toggleDarkMode");
  },

  toggleRightContent({ commit }) {
    commit("toggleRightContent");
  }
};
