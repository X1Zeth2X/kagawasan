import { MutationTree } from "vuex";
import { LayoutState } from "./types";

export const mutations: MutationTree<LayoutState> = {
  toggleMiniDrawer(state) {
    state.miniDrawer = !state.miniDrawer;
  },

  toggleMasonryLayout(state) {
    state.masonryLayout = !state.masonryLayout;
  },

  toggleDrawer(state) {
    state.showDrawer = !state.showDrawer;
  },

  toggleAnimations(state) {
    state.animations = !state.animations;
  }
};
