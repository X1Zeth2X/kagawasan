import { MutationTree } from "vuex";
import { SettingState } from "./types";

export const mutations: MutationTree<SettingState> = {
  toggleMiniDrawer(state) {
    state.miniDrawer = !state.miniDrawer;
  },

  toggleMasonryLayout(state) {
    state.masonryLayout = !state.masonryLayout;
  },

  toggleDrawer(state) {
    state.showDrawer = !state.showDrawer;
  },

  toggleMarkdown(state) {
    state.markdown = !state.markdown;
  },

  toggleDarkMode(state) {
    state.darkMode = !state.darkMode;
  }
};
