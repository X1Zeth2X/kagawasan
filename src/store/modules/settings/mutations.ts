import { MutationTree } from "vuex";
import { SettingState } from "./types";

export const mutations: MutationTree<SettingState> = {
  toggleMiniDrawer(state) {
    state.miniDrawer = !state.miniDrawer;
  },

  toggleDrawer(state) {
    state.showDrawer = !state.showDrawer;
  },

  toggleMarkdown(state) {
    state.markdown = !state.markdown;
  },

  toggleDarkMode(state) {
    state.darkMode = !state.darkMode;
  },

  toggleRightContent(state) {
    state.rightContent = !state.rightContent;
  }
};
